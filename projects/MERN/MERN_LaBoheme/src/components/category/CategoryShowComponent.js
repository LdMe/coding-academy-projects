import React from 'react';
import config from '../../config';
import {Button, Row, Col} from 'react-bootstrap';
import ProductShowComponent from '../product/ProductShowComponent';
const axios = config.axios;

class CategoryShowComponent extends React.Component{
    state = {
        products: null
    }

    getProducts(event){
        axios.get('/product', { params: { _id: this.props.category._id }}).then(res => {
            
            const products = res.data;
            this.state.products=products;
            console.log(products);
            if(Array.isArray(this.state.products) && this.state.products.length){
                let result= this.state.products.map(product => <ProductShowComponent key={product._id} product={product}/>);
                this.props.menu.showProduct(result);
            }
        }).catch(error => {
            console.log("no step");
            console.log(error);
        });
    } 
    render(){
     return(
        <div>
        <Col><Button id={this.props.category.title} onClick={this.getProducts.bind(this)} > {this.props.category.title}</Button></Col>
        </div>
        ) 
        
    }
}

export default CategoryShowComponent;