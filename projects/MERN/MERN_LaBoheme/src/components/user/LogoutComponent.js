import React from 'react';
import {Link,Redirect} from 'react-router-dom';
import config from '../../config';
let axios= config.axios;
class LogoutComponent extends React.Component {
	
	state = {
		redirection: '',
		parent: this.props.parent,
	}
	logout=(event) =>{
		
		let result= window.confirm("Do you really want to log out?");
		
		if(result==true){
			axios.get('/logout').then(res => {
				
				
				config.removeToken();
				if(this.props.redirect){
					this.setState({redirection:<Redirect to='/login' />});
				}
				if(this.state.parent){
						
						this.state.parent.refresh();
					}
			}).catch(error => {
				this.setState({redirection: ''});
			});
		}
		else{
			this.setState({redirection: ''});
		}
		
		

	}

	
	render(){
		if(this.state.redirection.length){
			return this.state.redirection;
		}
		else{
			return <Link to="#" onClick={this.logout} >Log out</Link>;
		}
		
	}
}
export default LogoutComponent;