import axios from 'axios';
import Cookie from "js-cookie";
let url= 'http:'+window.location.href.split(":")[1]+':4242';
axios.defaults.baseURL = url;
axios.defaults.headers.common['Authorization'] =Cookie.get("token") ? Cookie.get("token") : null;
axios.defaults.headers.common['Content-Type'] ='application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
let config = {
  url: url,
	axios: axios,
  components: {
    navbar: null, 
  },
	key : "randomkey",
	last_web: "/",
  	current_web: "/",
  	updateToken: function(username,token){
      Cookie.set("username", username);
  		Cookie.set("token", token);
  		axios.defaults.headers.common['Authorization'] =token;
      console.log(".....token........")
      console.log(token);
      console.log("..................")
  	},
  	getToken: function(){
  		return (Cookie.get("token") ? Cookie.get("token") : null);
  	},
    username:function(){
      return (Cookie.get("username") ? Cookie.get("username") : null);
    },
  	removeToken: function(){
  		Cookie.remove("username");
      Cookie.remove("token");
      axios.defaults.headers.common['Authorization'] = null;
  	}

}
export default config;