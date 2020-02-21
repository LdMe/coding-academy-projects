$(document).ready(function(){
	var CELL_COUNT = $(".quantity").val();
	var DENSITY = $(".density").val() / 100.0;
	let width = $(".game").width();
	let cell_width= width / CELL_COUNT;
	let height = $(".game").height();
	let cell_height= height / CELL_COUNT;
	var game= null;
	class Game{
		constructor(){
			this.stopped= true;
			this.initialize();
			this.timeout=null;
			this.showTimeout=null;
			this.swapAreas=false;
			this.lastTime=new Date();
			game=this;
			$(".quantity").on("change",function(){
				CELL_COUNT= $(".quantity").val();
				game.initialize();
			});
			$(".density").on("change",function(){
				DENSITY= $(".density").val() / 100.0;
			});
			$(".reset_graph").on("click",function(){
				game.area1=[];
				game.area2=[];
				game.perimeter=[];
				game.iterations=[];
				game.n_iteration=0;
				try{
					while($("#graph").data.length>1){
						Plotly.deleteTraces('graph',0);
					}
				} catch(error){
					console.log("can't delete more traces");
				}


			})
			$(".resetButton").on("click",function(){
				if(game.timeout){
					clearTimeout(game.timeout);
					game.timeout=null;
					clearTimeout(game.showTimeout);
					game.showTimeout=null;
				}
				game.clear();
				game.board.randomize(DENSITY);
				game.show();
			});
			$(".clearButton").on("click",function(){
				if(game.timeout){
					clearTimeout(game.timeout);
					game.timeout=null;
					clearTimeout(game.showTimeout);
					game.showTimeout=null;
				}
				game.clear();
				game.board.clear();
				game.show();
			});

			$(".capture").on("click",function(){
				game.sendImage();
			});

			$(".colorCheck").change(function(){
				game.show();
			})
			$(".stepButton").on("click",function(){
				game.play();
			})
			$(".playButton").on("click",function(){
				game.stopped= !game.stopped;
				if(!game.stopped){
					$(this).html("stop");
					game.show();
				}
				else{
					if(game.timeout){
						clearTimeout(game.timeout);
						game.timeout=null;
						clearTimeout(game.showTimeout);
						game.showTimeout=null;
					}
					$(this).html("start");
				}

				$(this).toggleClass("btn-success");
				$(this).toggleClass("btn-danger");
			});
			$(".param").change(function(){
				game.setParameters();
			});

		}
		setParameters(){
			let revive= $(".revive").val();
			let stayAlive=$(".stayAlive").val();
			let reviveArray= revive.toString().split("");
			let aliveArray= stayAlive.toString().split("");
			this.board.setParameters(aliveArray,reviveArray);
		}
		clear(){
			this.area1=[];
			this.area2=[];
			this.perimeter=[];
			this.iterations=[];
			this.n_iteration=0;
			$(".showFrame").text(0);
		}
		initialize(){

			this.area1=[];
			this.area2=[];
			this.perimeter=[];
			this.iterations=[];
			this.state=[];
			this.n_iteration=0;
			$(".showFrame").text(0);
			width = $(".game").width();
			cell_width= width / CELL_COUNT;
			height = $(".game").height();
			cell_height= height / CELL_COUNT;
			$(".game").empty();
			for(let i = 0; i <  CELL_COUNT; i++){
				this.state[i]=[];
				let row= $(".game").append("<div  style='height:"+cell_height+"px'class='row row"+i.toString()+"'/>");
				for(let j = 0; j <  CELL_COUNT; j++){
					this.state[i][j]=0;
					let status="alive"
					if(Math.random() > 0.5){
						status="dead";
					}
					$(".row"+i.toString()).append("<div class='col'><div class='cell cell"+i.toString()+"-"+j.toString()+" "+status+"' i="+i+" j="+j+"></div></div>");	
				}   
			}
			let game= this;
			$(".cell").on("click",function(){
				let i = $(this).attr("i");
				let j = $(this).attr("j");
				game.board.cells[i][j].changeState();
				$(this).toggleClass("alive");
				$(this).toggleClass("dead");
			});

			if(this.timeout){
				clearTimeout(this.timeout);
				this.timeout=null;
			}
			this.board= new Board(CELL_COUNT);
			this.board.randomize(DENSITY);
			this.setParameters();
			this.show();


		}
		show(){
			let values= this.board.getCells();
			let cells= values[0];
			let next = values[1];
			let area1=0;
			let area2= 0;
			let perimeter=0;
			for(let i = 0; i < this.board.size;i++){
				for(let j = 0; j < this.board.size;j++){
					let alive= cells[i][j];
					let nextAlive= next[i][j];
					let cell =$(".cell"+i.toString()+"-"+j.toString());
					if(cell.hasClass("special")){
						cell.removeClass("special");
					}
					if(alive){
						if(cell.hasClass("dead")){

							cell.removeClass("dead");
						}
						if(!cell.hasClass("alive")){
							cell.addClass("alive");
						}
						this.state[i][j]=1;
						if($(".colorCheck").is(":checked")){

							if(!nextAlive){
								area1+=1;
								if(!cell.hasClass("special")){
									cell.addClass("special");
								}
								this.state[i][j]=3;
							}
							else{

								if(cell.hasClass("special")){
									cell.removeClass("special");
								}
							}
						}
					}
					else{
						this.state[i][j]=0;
						if(cell.hasClass("alive")){

							cell.removeClass("alive");
						}
						if(!cell.hasClass("dead")){
							cell.addClass("dead");
						}
						if($(".colorCheck").is(":checked")){

							if(nextAlive){
								area2+=1;
								this.state[i][j]=2;
								if(!cell.hasClass("special")){
									cell.addClass("special");
								}
							}
							else{
								if(cell.hasClass("special")){
									cell.removeClass("special");
								}
								perimeter+=1;
							}
						}

					}
				}
			}
			if(this.swapAreas){
				let temp= area1;
				area1=area2;
				area2=temp;
			}

			this.area1.push(area1);
			this.area2.push(area2);
			this.perimeter.push(perimeter);
			this.iterations.push(this.n_iteration);
			this.n_iteration+=1;
			var trace_area1= {
				x: this.iterations,
				y: this.area1,
				mode: 'lines',
				line:{
					color: 'rgb(0,255,0)'
				},
				name: "area 1"
			}
			var trace_area2= {
				x: this.iterations,
				y: this.area2,
				mode: 'lines',
				line:{
					color: 'rgb(255,0,0)'
				},
				name: "area 2"
			}
			var trace_perimeter= {
				x: this.iterations,
				y: this.perimeter,
				mode: 'lines',
				line:{
					color: 'rgb(0,0,0)'
				},
				name: "perimeter"
			}
		var data=[];// [trace_area1,trace_area2,trace_perimeter];
		if($(".area1Check").is(":checked")){
			data.push(trace_area1);
		}
		if($(".area2Check").is(":checked")){
			data.push(trace_area2);
		}
		if($(".perimeterCheck").is(":checked")){
			data.push(trace_perimeter);
		}
		var layout= {
			title: "areas and perimeter"
		};
		Plotly.newPlot("graph",data,layout);
		$(".area1").html(area1.toString());
		$(".area2").html(area2.toString());
		$(".perimeter").html(perimeter.toString());
		if(!this.stopped){
			const board= this;
			if(!this.timeout){

				this.timeout=setTimeout(function(){board.play()},1000 - $(".speed").val());
			}
		}
	}
	sendImage(){
		let image=[];
		for(let i = 0; i < this.state.length;i++){
			for(let j = 0; j < this.state[i].length;j++){
				let image1=[255,255,255];
				switch(this.state[i][j]){
					case 1:
					image1=[0,0,0];
					break;
					case 2:
					image1=[0,255,0];
					break;
					case 3:
					image1=[0,0,255];
					break;
				}
				image.push(image1);
			}
		}
		let game=this;
		$(".sizeInput").attr("value",CELL_COUNT);
		$(".arrayInput").attr("value",JSON.stringify(image));

		
		let revive= $(".revive").val();
		let stayAlive=$(".stayAlive").val();
		let date= new Date();

		let name= "capture_"+stayAlive.toString()+"-"+revive.toString()+"_"+date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+"-"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+".png";
		
		$(".nameInput").attr("value",name);
		$("#captureForm").submit();
		
	}
	
	play(){

		this.board.act();
		$(".showFrame").text(parseInt($(".showFrame").text())+1);
		if(!this.stopped){
			const board= this;
			this.timeout=setTimeout(function(){board.play()},1000 - $(".speed").val());
		}
		this.swapAreas=!this.swapAreas;
		if(!$(".renderCheck").is(":checked")){
			return;
		}
		this.show();
		let time= new Date();

		let seconds= ( time - this.lastTime)/1000;
		let fps= 1.0 / seconds;
		$(".showFPS").html(fps.toFixed(2));
		this.lastTime=time;
	}

}

game= new Game();
});