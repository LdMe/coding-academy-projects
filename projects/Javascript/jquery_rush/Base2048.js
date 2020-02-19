(function($)
{
	$.fn.game2048 = function()
	{
		function generateMap() {
			let table = $("<table></table");
			for(let y = 0; y < 4; y++) {
				let line = $('<tr></tr>');
				for(let x = 0; x < 4; x++) {
					let cell = $('<td> 0 </td>').attr("x",x).attr("y",y).attr("nbr",0);
					line.append(cell);
				}
				table.append(line);

			}
			return table;
		}
		function generateCell(num =2) {
			let counter =0;
			while(counter < num) {
				let x= Math.round(Math.random() * 4);
				let y= Math.round(Math.random() * 4);
				let elem = $("[x='"+x+"'][y='"+y+"'][nbr=0]");
				if(elem.length){
					counter++;
					elem.attr("nbr",2);
					elem.text("2");
				}
			}
		}
		
		function getLeft(x,y){
			let counter =0;
			x=parseInt(x);
			y=parseInt(y);
			for(let i = x - 1; i >= 0; i--) {
				if($("[x='"+i+"'][y='"+y+"']").length){

					if($("[x='"+i+"'][y='"+y+"']").attr("nbr") == 0){

					counter ++;
					}
					/*else if($("[x='"+i+"'][y='"+y+"']").attr("nbr") == $("[x='"+x+"'][y='"+y+"']").attr("nbr")){
						counter ++;
						return counter;
					}*/
				}
				else {
					return counter;
				}
			}
			return counter;
		}
		function getRight(x,y){
			let counter =0;
			x=parseInt(x);
			y=parseInt(y);
			for(let i =x + 1; i < 4; i++) {
				if($("[x='"+i+"'][y='"+y+"']").length){

					if($("[x='"+i+"'][y='"+y+"']").attr("nbr") == 0){

					counter ++;
					}
					/*else if($("[x='"+i+"'][y='"+y+"']").attr("nbr") == $("[x='"+x+"'][y='"+y+"']").attr("nbr")){
						counter ++;
						return counter;
					}*/
				}
				else {
					return counter;
				}
			}
			return counter;
		}
		function getUp(x,y){
			let counter =0;
			x=parseInt(x);
			y=parseInt(y);
			for(let i = y - 1; i >= 0; i--) {
				if($("[x='"+x+"'][y='"+i+"']").length){
					if($("[x='"+x+"'][y='"+i+"']").attr("nbr") == 0){

					counter ++;
					}
					/*else if($("[x='"+x+"'][y='"+i+"']").attr("nbr") == $("[x='"+x+"'][y='"+y+"']").attr("nbr")){
						counter ++;
						return counter;
					}*/
				}
				else {
					return counter;
				}
			}
			return counter;
		}
		function getDown(x,y){
			let counter =0;
			x=parseInt(x);
			y=parseInt(y);
			for(let i = y +1; i < 10; i++) {
				console.log("length:"+ i.toString());
				if($("[x='"+x+"'][y='"+i+"']").length){
					console.log("nbr: "+ $("[x='"+x+"'][y='"+i+"']").attr("nbr"));
					if($("[x='"+x+"'][y='"+i+"']").attr("nbr") == 0){

					counter ++;
					}
					/*else if($("[x='"+x+"'][y='"+i+"']").attr("nbr") == $("[x='"+x+"'][y='"+y+"']").attr("nbr")){
						counter ++;
						return counter;
					}*/
				}
				else {
					return counter;
				}
			}
			return counter;
		}
		
		function moveRowLeft(y){
			let done =false;
			for(let i = 0; i < 4; i++) {
				let element= $("[x='"+i+"'][y='"+y+"']");
				let num = element.attr("nbr");
				if(num == 0) {
					continue;
				}
				let x= element.attr("x");
				let offset= -getLeft(x,y);
				let element1= $("[x='"+(i + offset)+"'][y='"+y+"']");
				if(element1.length && offset< 0) {
					console.log("exists");
					let x1=element1.attr("x");
					let x2=element1.attr("y");
					let num2 = element1.attr("nbr");
					console.log(num2);
					if(num2== 0) {
						console.log("is zero");
						element1.attr("nbr",num);
						element1.text(num.toString());
						element.attr("nbr",num2);
						element.text(num2.toString());
						done = true;
					}
				}
			}
			return done;
		}
		function mergeRowLeft(y){
			let done =false;

			console.log("moving");
			for(let i = 0; i < 3; i++) {
				let element1= $("[x='"+i+"'][y='"+y+"']");
				let element2= $("[x='"+(i + 1)+"'][y='"+y+"']");
				let num1= element1.attr("nbr");
				let num2= element2.attr("nbr");
				console.log("num1:"+num1+", num2:"+num2);
				if(num1== num2) {

					console.log("fuckingfuck");
					element1.attr("nbr",num1* 2);
					element1.text((num1 * 2).toString());
					element2.attr("nbr",0);
					element2.text("0");
					done =true;
				}

			}
			return done;
		}
		function moveRowRight(y){
			let done =false;
			for(let i = 3; i >=0; i--) {
				let element= $("[x='"+i+"'][y='"+y+"']");
				let num = element.attr("nbr");
				if(num == 0) {
					continue;
				}
				let x= element.attr("x");
				let offset= getRight(x,y);
				let element1= $("[x='"+(i + offset)+"'][y='"+y+"']");
				if(element1.length && offset> 0) {
					console.log("exists");
					let x1=element1.attr("x");
					let x2=element1.attr("y");
					let num2 = element1.attr("nbr");
					console.log(num2);
					if(num2== 0) {
						console.log("is zero");
						element1.attr("nbr",num);
						element1.text(num.toString());
						element.attr("nbr",num2);
						element.text(num2.toString());
						done = true;
					}
				}
			}
			return done;
		}
		function mergeRowRight(y){
			let done =false;

			console.log("moving");
			for(let i = 3; i >0; i--) {
				let element1= $("[x='"+i+"'][y='"+y+"']");
				let element2= $("[x='"+(i - 1)+"'][y='"+y+"']");
				let num1= element1.attr("nbr");
				let num2= element2.attr("nbr");
				console.log("num1:"+num1+", num2:"+num2);
				if(num1== num2) {

					console.log("fuckingfuck");
					element1.attr("nbr",num1* 2);
					element1.text((num1 * 2).toString());
					element2.attr("nbr",0);
					element2.text("0");
					done =true;
				}

			}
			return done;
		}
		function moveColDown(x){
			let done =false;
			for(let i = 3; i >=0; i--) {
				let element= $("[x='"+x+"'][y='"+i+"']");
				let num = element.attr("nbr");
				if(num == 0) {
					continue;
				}
				let y= element.attr("y");
				let offset= getDown(x,y);
				let element1= $("[x='"+x+"'][y='"+(i + offset)+"']");
				if(element1.length && offset> 0) {
					console.log("exists");
					let x1=element1.attr("x");
					let x2=element1.attr("y");
					let num2 = element1.attr("nbr");
					console.log(num2);
					if(num2== 0) {
						console.log("is zero");
						element1.attr("nbr",num);
						element1.text(num.toString());
						element.attr("nbr",num2);
						element.text(num2.toString());
						done = true;
					}
				}
			}
			return done;
		}
		function mergeColDown(x){
			let done =false;

			console.log("moving");
			for(let i = 3; i >0; i--) {
				let element1= $("[x='"+x+"'][y='"+i+"']");
				let element2= $("[x='"+x+"'][y='"+(i - 1)+"']");
				let num1= element1.attr("nbr");
				let num2= element2.attr("nbr");
				console.log("num1:"+num1+", num2:"+num2);
				if(num1== num2) {

					console.log("fuckingfuck");
					element1.attr("nbr",num1* 2);
					element1.text((num1 * 2).toString());
					element2.attr("nbr",0);
					element2.text("0");
					done =true;
				}

			}
			return done;
		}
		function moveColUp(x){
			let done =false;
			for(let i = 0; i <4; i++) {
				let element= $("[x='"+x+"'][y='"+i+"']");
				let num = element.attr("nbr");
				if(num == 0) {
					continue;
				}
				let y= element.attr("y");
				let offset= -getUp(x,y);
				let element1= $("[x='"+x+"'][y='"+(i + offset)+"']");
				if(element1.length && offset< 0) {
					console.log("exists");
					let x1=element1.attr("x");
					let x2=element1.attr("y");
					let num2 = element1.attr("nbr");
					console.log(num2);
					if(num2== 0) {
						console.log("is zero");
						element1.attr("nbr",num);
						element1.text(num.toString());
						element.attr("nbr",num2);
						element.text(num2.toString());
						done = true;
					}
				}
			}
			return done;
		}
		function color(){
			$("[nbr]").each(function(){
				$(this).css("background-color","rgba("+(($(this).attr("nbr") *2))+","+(255 /($(this).attr("nbr") *10 + 1))+","+((255-$(this).attr("nbr")* 2))+",0.7)");
			});
			$("[nbr=0]").each(function(){
				$(this).css("background-color","rgba(255,255,255,1)");
			});
			
		}
		function mergeColUp(x){
			let done =false;

			console.log("moving");
			for(let i = 0; i <4; i++) {
				let element1= $("[x='"+x+"'][y='"+i+"']");
				let element2= $("[x='"+x+"'][y='"+(i+1)+"']");
				let num1= element1.attr("nbr");
				let num2= element2.attr("nbr");
				console.log("num1:"+num1+", num2:"+num2);
				if(num1== num2) {

					console.log("fuckingfuck");
					element1.attr("nbr",num1* 2);
					element1.text((num1 * 2).toString());
					element2.attr("nbr",0);
					element2.text("0");
					done =true;
				}

			}
			return done;
		}
		function moveLeft(){
			let done=false;
			for(let i = 0; i < 4; i++){
				done = moveRowLeft(i) || done;
				done = mergeRowLeft(i) || done;
				done = moveRowLeft(i) || done;

			}
			if(done) {
			generateCell(1);
			}
			else{
				if(!check_space()){
					$("html").unbind();
					alert("game over");
				}
			}
		}
		function moveRight(){
			let done=false;
			for(let i = 3; i >=0; i--){
				done = moveRowRight(i) || done;
				done =mergeRowRight(i) || done;
				done = moveRowRight(i) || done;

			}
			if(done) {
			generateCell(1);
			}
			else{
				if(!check_space()){
					$("html").unbind();
					alert("game over");
				}
			}
		}
		function moveDown(){
			let done=false;
			for(let i = 3; i >= 0; i--){
				done = moveColDown(i) || done;
				done=mergeColDown(i) || done;
				done = mergeColDown(i) || done;

			}
			if(done) {
			generateCell(1);
			}
			else{
				if(!check_space()){
					$("html").unbind();
					alert("game over");
				}
			}
		}
		function moveUp(){
			let done=false;
			for(let i = 0; i <4; i++){
				done = moveColUp(i) || done;
				done= mergeColUp(i) || done;
				done = moveColUp(i) || done;

			}
			if(done) {
			generateCell(1);
			}
			else{
				if(!check_space()){
					$("html").unbind();
					alert("game over");
				}
			}
		}
		
		function check_space(){
			let empty=false;
			let len = $("[nbr]").length;
			
			for (var i = $("[nbr]").length - 1; i >= 0; i--) {
				let x= $($("[nbr]")[i]).attr("x");
				let y=$($("[nbr]")[i]).attr("y");
				let left= $($("[nbr]")[i]).attr("nbr")
				if($($("[nbr]")[i]).attr("nbr")==0){
					empty=true;
				}
				color($("[nbr]")[i]);
			}
			if(!empty){

			}
			return empty;
		}
		function check_ended(num=256){
			let len = $("[nbr]").length;
			
			for (var i = $("[nbr]").length - 1; i >= 0; i--) {
				if($($("[nbr]")[i]).attr("nbr")==num){
					return true;
				}
				color($("[nbr]")[i]);
			}
			return false;
		}
		
		$("html").keydown(function(event) {
			switch (event["key"]) {
				case 'ArrowLeft':
					console.log("left");
					moveLeft();
					break;
				case 'ArrowRight':
					console.log("right");
					moveRight();
					break;
				case 'ArrowUp':
					console.log("up");
					moveUp();
					break;
				case 'ArrowDown':
					console.log("down");
					moveDown();
					break;

			}
			
			if(check_ended()){
				$("html").unbind();
				alert("you win");
			}
			
		});
		$(this).append(generateMap());
		generateCell();
		color();
	};
}
)(jQuery);