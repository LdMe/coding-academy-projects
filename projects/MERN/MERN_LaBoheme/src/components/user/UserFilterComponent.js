import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar,Nav, Button} from 'react-bootstrap';
import LogoutComponent from './LogoutComponent';
import config from '../../config';
import verify from '../../verification';
const axios = config.axios;

class UserFilterComponent extends React.Component{
	state= {
		Authenticated: false
	}
	componentDidMount(){
		console.log(this.props.Authenticated)
		this.setState({Authenticated:false})
		this.verify= this.verify.bind(this);
		this.verify(this.props.Authenticated);
		

	}
	componentWillReceiveProps(newProps) {
   		this.verify(newProps.Authenticated);
	}
	verify=function(result){
		if(!result){
			this.setState({Authenticated: false});
			return;
		}
		if(this.props.admin){
			if(result=="admin"){
				this.setState({Authenticated: true});
			}
			else{
				this.setState({Authenticated: false});
			}
		}else if(this.props.kitchen){
			if(result=="kitchen" || result == "admin"){
				this.setState({Authenticated: true});
			}
			else{
				this.setState({Authenticated: false});
			}
		}
		else{
			if(result){
				this.setState({Authenticated: true});
			}
			else{
				this.setState({Authenticated: false});
			}
		}
	}
	render(){

		if(this.props.hide){
			if(this.state.Authenticated){
				return(<div></div>);
			}
			else{
				return(
					<div>{this.props.toRender}</div>
					);
			}
		}
		else{
			if(this.state.Authenticated){
				return(
					<div>{this.props.toRender}</div>
					);	
			}
			else{
				return(<div></div>);
			}
		}
	}
}
export default UserFilterComponent;