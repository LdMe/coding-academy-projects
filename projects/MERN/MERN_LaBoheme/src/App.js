import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from "./components/struct/Home";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import RegisterComponent from "./components/user/RegisterComponent";
import LoginComponent from "./components/user/LoginComponent";
import LogoutComponent from "./components/user/LogoutComponent";
import NavbarComponent from "./components/struct/NavbarComponent";
import UserShowComponent from "./components/user/UserShowComponent";
import UserEditComponent from "./components/user/UserEditComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import config from './config';
import ProductEditComponent from "./components/product/ProductEditComponent";
import ProductCreateComponent from "./components/product/ProductCreateComponent";
import ProductDeleteComponent from "./components/product/ProductDeleteComponent";
import ProductShowComponent from "./components/product/ProductShowComponent";
import MenuComponent from "./components/struct/MenuComponent";

class App extends Component {
  last_web="/";
  current_web="/";
  render() {
    
    if(config.current_web !== window.location.pathname){
      config.last_web= config.current_web;
      config.current_web= window.location.pathname;
    }
    return (
        <div>
        
          <Router>
            <NavbarComponent/>
          
            <div>
              <Route exact path="/"
                     render={(props) => <Home />}/>
              <Route exact path="/menu"
                     render={(props) => <MenuComponent />}/>
              <Route path="/register" component={()=><RegisterComponent/>}/>
              <Route path="/login" component={LoginComponent}/>
              <Route path="/logout" component={LogoutComponent}/>
              <Route path="/user/show" component={()=><UserShowComponent />}  />
              <Route path="/user/edit" component={()=><UserEditComponent />}  />
              <Route path="/product/delete" component={()=><ProductDeleteComponent />}  />
              <Route path="/product/new" component={()=><ProductCreateComponent show={true}/>}  />
              <Route path="/product/show" component={()=><ProductShowComponent />}  />
              <Route path="/product/edit" component={()=><ProductEditComponent />}  />
            </div>
          </Router>
        </div>
    );
  }
}

export default App;
  