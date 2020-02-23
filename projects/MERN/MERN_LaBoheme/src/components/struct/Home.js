import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import config from '../../config';
import LogoutComponent from '../user/LogoutComponent';
import AboutUsComponent from './AboutUsComponent';
import {Button} from 'react-bootstrap';
import ProductShowComponent from "../product/ProductShowComponent";
import MapComponent from "./MapComponent";


const axios = config.axios;

const HomeStyle={
}

class Home extends React.Component {

  state= {
    products: [],
    full: false,
    modal: null
  }

  componentDidMount() {

    
    
    axios.get('/product').then(res => {
      console.log("first step");
      if(res.data){
        const products = res.data;
        this.state.products=products;
        console.log("products");
        console.log(products);
        this.setState({full: true});
      }
      else{
        this.setState({full: false});
      }


    }).catch(error => {
      console.log("no step");
      console.log("error");
      
    }); 
    this.interval= setInterval(()=>{
      axios.get('/product').then(res => {
       
        const products = res.data;
        console.log("products");
        console.log(products);
        this.state.products=products;

      }).catch(error => {
        console.log("error");
        console.log(error);

      }); 
    },5000);

  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    let result ="noproductfoundnospacefound";
    if(Array.isArray(this.state.products) && this.state.products.length){
      result= this.state.products.map(product => <ProductShowComponent key={product._id} product={product}/>);
    }
    return (
      <div
          className="App"
          style={HomeStyle}
      >
      <h1>Hello, {config.username()}</h1>

      {result}
      <div>
        <ProductShowComponent/>
      </div>
      <div>
        <AboutUsComponent/>
      </div>
        <div>
          <MapComponent/>
        </div>
      </div>
      );
  }
}
export default Home;