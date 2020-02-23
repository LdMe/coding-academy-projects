import React from 'react';
import {Link,Redirect} from 'react-router-dom'
import {Modal,Form, FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button} from 'react-bootstrap';
import config from '../../config';
const axios = config.axios;
class LoginComponent extends React.Component {
	state = {
		success: false,
		username: '',
		password: '',
		show:this.props.show,
		parent: this.props.parent,
		error : {
			username: "username can't be empty",
			password: "password can't be empty",
			
		}

	}
	reset= function(){
		this.setState( {
			success: false,
			username: '',
			password: '',
			show:this.props.show,
			parent: this.props.parent,
			error : {
				username: "username can't be empty",
				password: "password can't be empty",

			}
		});
	}
	componentDidMount() {
		this.reset();
		this.setState({show: this.props.show});
		this.forceUpdate();
		this.setState({success:false});

	}
	handleClose = () => {
		this.reset();
		this.setState({show: false});
	}
	handleShow = () => this.setState({show: true});
	
	passwordHandler =(event) =>{
		let password= event.target.value;
		if(password.length <= 3){
			let er= this.state.error;
			er.password="password must be longer than 3 characters"
			this.setState({error: er});
		}
		else if(password.length >= 16){
			let er= this.state.error;
			er.password="password must be shorter than 16 characters"
			this.setState({error: er});
		}
		else{
			let er= this.state.error;
			er.password="";
			this.setState({error: er});
			this.setState({password: password});
		}
		
	}
	usernameHandler =(event) => {
		let name= event.target.value;
		let username= event.target.value;
		if(username.length <= 3){
			let er= this.state.error;
			er.username="username must be longer than 4 characters"
			this.setState({error: er});
			this.setState({username: ""});
		}
		else if(username.length >= 16){
			let er= this.state.error;
			er.username="username must be shorter than 16 characters"
			this.setState({error: er});
			this.setState({username: ""});
		}
		else{
			let er= this.state.error;
			er.username="";
			this.setState({error: er});
			this.setState({username: username});
		}
	}
	
	inputHandler=(event) => {
		if(event.key=="Enter"){
			if(event.target.type!="button")
			this.submitHandler(event);
		}
	};
	showRegisterForm=(event)=> {
		event.preventDefault();
		if(this.state.parent){
			this.handleClose();
			this.state.parent.showRegisterForm(event);

		}
	}
	submitHandler=(event) => {
		let error_alert="";
		for (let error in this.state.error){
			if(this.state.error[error]){
				error_alert = error_alert +this.state.error[error]+"\n";
			}
		}
		if(error_alert){
			alert(error_alert);
		}
		else {
			let body= {
				"username":this.state.username,
				"email": this.state.email,
				"password":this.state.password,
				"password_confirm": this.state.password_confirm
			}
			const querystring = require('querystring');
			
			axios.post("/login",querystring.stringify(body)).then(res => {
				
				if(res.data.token){
					
					
					config.updateToken(res.data.token);
					
					config.updateToken(this.state.username,res.data.token);
					//this.setState({success:true});
					this.handleClose();
					if(this.state.parent){
						
						this.state.parent.refresh();
					}
					//location.reload(true);
				}
				else{

					alert(res.data);	
				}
			}).catch(function(error){
				console.log(error);
				alert(error.message);
			});
		}
	}
	render() {
		let modalStart= "";
		
		let redirect= this.state.success;
		
		if(redirect){
			return <Redirect to='/' />
		}
		let name= this.state.username;
		let greetings="";
		if(name){
			greetings= "Welcome "+name;
		}
		else{
			greetings="";
		}
		if(this.props.modal){
			return (

				<Modal show={this.state.show} onHide={this.handleClose}>
				<div>
				<Modal.Header closeButton>
				<Modal.Title>Login</Modal.Title>
				</Modal.Header>
				<Modal.Body >
				<h1>{greetings}</h1>
				

				<Form onKeyDown={this.inputHandler}>
				<Form.Group controlId="formUsername">
				<Form.Label>Username</Form.Label>
				<Form.Control type="text" placeholder="Username" onChange={this.usernameHandler} />
				</Form.Group>


				<Form.Group controlId="formPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control type="password" placeholder="Password" onChange={this.passwordHandler} />
				</Form.Group>

				<Form.Group controlId="formSubmit">
				<Button variant="primary" onClick={this.submitHandler}>Submit</Button>
				</Form.Group>
				</Form>
				<p>You don't have an account? <a href="#" onClick={this.showRegisterForm}>Register</a></p>
				</Modal.Body>
				</div>
				</Modal>

				);
		}
		return (

			<div>
			<h1>{greetings}</h1>
			<h2>Login</h2>
			
			<Form onKeyDown={this.inputHandler}>
			<Form.Group controlId="formUsername">
			<Form.Label>Username</Form.Label>
			<Form.Control type="text" placeholder="Username" onChange={this.usernameHandler} />
			</Form.Group>


			<Form.Group controlId="formPassword">
			<Form.Label>Password</Form.Label>
			<Form.Control type="password" placeholder="Password" onChange={this.passwordHandler} />
			</Form.Group>

			<Form.Group controlId="formSubmit">
			<Button variant="primary" onClick={this.submitHandler} >Submit</Button>
			</Form.Group>
			</Form>
			<p>You don't have an account? <Link to="/register">Register</Link></p>
			</div>
			
			);

		}
	}
	export default LoginComponent;