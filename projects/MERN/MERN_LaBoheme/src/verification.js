import config from './config';
const axios = config.axios;
export default function(callback){
	let result= null;
	if(config.getToken()){
		axios.get('/verify').then(res => {
			console.log("dataaaaaaaaaaaa")
			console.log(res.data);
			result=res.data;
			return callback(result);
			
		}).catch(error => {
			console.log("error")
			console.log(error);
			return callback(null);

		}); 
	}
	else{
		return callback(result);
	}
}