 import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar,Nav, Button} from 'react-bootstrap';
import LogoutComponent from '../user/LogoutComponent';
import config from '../../config';
import UserFilterComponent from '../user/UserFilterComponent';
import LoginComponent from '../user/LoginComponent';
import RegisterComponent from '../user/RegisterComponent';
import AdminUserComponent from "../user/AdminUserComponent";
import ProductCreateComponent from "../product/ProductCreateComponent";
import verify from '../../verification'
import MenuComponent from './MenuComponent';

const axios = config.axios;


class NavbarComponent extends React.Component{
	state={
		redirection: '',
		login : null,
		register: null,
		product: null,
		user: null,
		refresh : false,
		Authenticated: {}
	}
	constructor(props) {
		super(props);
		this.showUserForm = this.showUserForm.bind(this);
		this.showLoginForm = this.showLoginForm.bind(this);
		this.showRegisterForm = this.showRegisterForm.bind(this);
		this.showProductForm = this.showProductForm.bind(this);
		this.refresh= this.refresh.bind(this);
		this.verify= this.verify.bind(this);
		this.verify_ext=verify.bind(this);
	}
	componentDidMount(){
		config.navbar=this;
		this.setState({user:this.refs.user});
		this.setState({login:this.refs.login});
		this.setState({product:this.refs.product});
		this.setState({register:this.refs.register});
		this.verify();
		setTimeout(()=>{console.log(this.state)},3000);
		
	}
	verify = function(){
		
		try{
			this.verify_ext((result)=>{
				
				this.setState({Authenticated:result});
				this.setState({refresh: true});
				this.forceUpdate();
			});
		}
		catch(error){
			console.log("error");
		}
		
	}
	showCreateForm=function(event){
		event.preventDefault();
		
		this.state.modal.handleShow();
	}
	showLoginForm=function(event){
		event.preventDefault();
		
		this.state.login.handleShow();
	}
	showRegisterForm = function(event){
		event.preventDefault();
		
		this.state.register.handleShow();
	}
	showUserForm = function(event){
		event.preventDefault();
		this.state.user.handleShow();
	}
	showProductForm = function(event){
		event.preventDefault();
		this.state.product.handleShow();
	}

	refresh= function(){
		this.verify();

	}
	render(){
		let homeLink=<Nav.Link href="/" >Home</Nav.Link>;
		let logoutLink=<Navbar.Text  ><LogoutComponent parent={this}/></Navbar.Text>;
		let loginLink=<Nav.Link onClick={this.showLoginForm} >Login</Nav.Link>;
		let registerLink=<Nav.Link onClick={this.showRegisterForm} >Register</Nav.Link>;
		let productLink=<Nav.Link onClick={this.showProductForm}>Product</Nav.Link>;
		let userLink=<Nav.Link onClick={this.showUserForm}>Users</Nav.Link>;


		console.log("Authenticated");
		console.log(this.state.Authenticated);

		return(
		<div>
		<Navbar bg="light" expand="sm">
		<Nav className="mr-auto">
		{homeLink}
		<UserFilterComponent toRender={logoutLink} Authenticated={this.state.Authenticated}/>
		<UserFilterComponent  toRender={loginLink} hide={true} Authenticated={this.state.Authenticated}/>
		<UserFilterComponent toRender={registerLink} hide={true} Authenticated={this.state.Authenticated}/>
		<UserFilterComponent toRender={productLink}  admin={true} Authenticated={this.state.Authenticated}/>
		<UserFilterComponent toRender={userLink}  admin={true} Authenticated={this.state.Authenticated}/>

		</Nav>
		</Navbar>
		<LoginComponent modal={true} ref="login" parent={this}/>
		<RegisterComponent modal={true} parent={this} ref="register"/>
		<ProductCreateComponent modal={true} parent={this} ref="product"/>
		<AdminUserComponent modal={true} parent={this} ref="users"/>
		</div>
		);
	}
}
export default NavbarComponent;