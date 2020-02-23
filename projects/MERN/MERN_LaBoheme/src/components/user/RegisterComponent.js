import React from 'react';
import {Link} from 'react-router-dom';
import {Modal, Form, FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button} from 'react-bootstrap';
import config from '../../config';
const axios = config.axios;
class RegisterComponent extends React.Component {
	state = {
		username: '',
		email: '',
		password: '',
		password_confirm: '',
		success: false,
		show:this.props.show,
		parent: this.props.parent,
		error : {
			username: "username can't be empty",
			email: "email can't be empty",
			password: "password can't be empty",
			password_confirm: 'password must be confirmed'
			
		}

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
	
	reset= function(){
		this.setState( {
			username: '',
			email: '',
			password: '',
			password_confirm: '',
			show: false,
			success: false,
			error : {
				username: "username can't be empty",
				email: "email can't be empty",
				password: "password can't be empty",
				password_confirm: 'password must be confirmed'

			}
		});
	}
	passwordHandler =(event) =>{
		let password= event.target.value;
		if(password.length <= 4){
			let er= this.state.error;
			er.password="password must be longer than 4 characters"
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
		if(username.length <= 4){
			let er= this.state.error;
			er.username="username must be longer than 4 characters"
			this.setState({error: er});
		}
		else if(username.length >= 16){
			let er= this.state.error;
			er.username="username must be shorter than 16 characters"
			this.setState({error: er});
		}
		else{
			let er= this.state.error;
			er.username="";
			this.setState({error: er});
			this.setState({username: username});
		}
	}
	emailHandler =(event) => {
		let email = event.target.value;
		if(email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
			let er= this.state.error;
			er.email="";
			this.setState({error: er});
			this.setState({email: event.target.value});
		}
		else{
			let er= this.state.error;
			er.email="email format not correct";
			this.setState({error: er});
		}
		
	}
	showLoginForm=(event)=> {
		event.preventDefault();
		if(this.state.parent){
			this.handleClose();
			this.state.parent.showLoginForm(event);

		}
	}
	passwordConfirmHandler =(event) =>{
		
		if(event.target.value != this.state.password){
			let er= this.state.error;
			er.password_confirm="passwords must match"
			this.setState({error: er});
		}
		else{
			let er= this.state.error;
			er.password_confirm="";
			this.setState({error: er});
			this.setState({error: er});
			this.setState({password_confirm: event.target.value});
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
				username:this.state.username,
				email: this.state.email,
				password:this.state.password,
				password_confirm: this.state.password_confirm
			}
			const querystring = require('querystring');
			
			axios.post("/register",querystring.stringify(body)).then(res => {
				this.setState({success:true});
				this.handleClose();
				alert("user created successfully");
			});
		}
	}
	render() {
		let name= this.state.username;
		let greetings="";
		if(name){
			greetings= "Welcome "+name;
		}
		else{
			greetings="";
		}
		if(this.props.modal){
			return(
				<Modal show={this.state.show} onHide={this.handleClose}>
				<div>
				<Modal.Header closeButton>
				<Modal.Title>Register</Modal.Title>
				</Modal.Header>
				<Modal.Body >
				
				<Form >
				<Form.Group controlId="formUsername">
				<Form.Label>Username</Form.Label>
				<Form.Control type="text" placeholder="Username" onChange={this.usernameHandler} />
				</Form.Group>

				<Form.Group controlId="formemail">
				<Form.Label>Email</Form.Label>
				<Form.Control type="text" placeholder="Email" onChange={this.emailHandler} />
				</Form.Group>
				<Form.Group controlId="formPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control type="password" placeholder="Password" onChange={this.passwordHandler} />
				</Form.Group>
				<Form.Group controlId="formPasswordRepeat">
				<Form.Label>Repeat Password</Form.Label>
				<Form.Control type="password" placeholder="Repeat Password" onChange={this.passwordConfirmHandler} />
				</Form.Group>
				<Form.Group controlId="formSubmit">
				<Button variant="primary" onClick={this.submitHandler}>Submit</Button>
				</Form.Group>
				</Form>
				<p>Already have an account? <a href="#" onClick={this.showLoginForm}>Login</a></p>
				</Modal.Body>
				</div>
				</Modal>
				
				);
		}
		else{
			return (
				<div className="App">
				<h1>{greetings}</h1>
				<h2>Register</h2>
				
				<Form >
				<Form.Group controlId="formUsername">
				<Form.Label>Username</Form.Label>
				<Form.Control type="text" placeholder="Username" onChange={this.usernameHandler} />
				</Form.Group>

				<Form.Group controlId="formemail">
				<Form.Label>Email</Form.Label>
				<Form.Control type="text" placeholder="Email" onChange={this.emailHandler} />
				</Form.Group>
				<Form.Group controlId="formPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control type="password" placeholder="Password" onChange={this.passwordHandler} />
				</Form.Group>
				<Form.Group controlId="formPasswordRepeat">
				<Form.Label>Repeat Password</Form.Label>
				<Form.Control type="password" placeholder="Repeat Password" onChange={this.passwordConfirmHandler} />
				</Form.Group>
				<Form.Group controlId="formSubmit">
				<Button variant="primary" onClick={this.submitHandler}>Submit</Button>
				</Form.Group>
				</Form>
				<p>Already have an account? <Link to="/login">Login</Link></p>
				</div>
				);
		}
	}
}
export default RegisterComponent;