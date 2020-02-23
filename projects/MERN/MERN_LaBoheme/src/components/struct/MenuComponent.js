import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import config from '../../config';
import CategoryShowComponent from '../category/CategoryShowComponent';
import {Button, Row} from 'react-bootstrap';

const axios = config.axios;
class MenuComponent extends React.Component {

    state= {
        categories: [],
        full: false,
        modal: null,
        data: null,
        products: null
    }

    showProduct(product){
        this.setState({products: product})
    }

    componentDidMount() {



        axios.get('/category').then(res => {
            console.log("first step");
            const categories = res.data;
            this.state.categories=categories;
            console.log("categories");
            console.log(categories);
            this.setState({full: true});

        }).catch(error => {
            console.log("no step");
            console.log("error");
            this.setState({full: false});

        });
        this.interval= setInterval(()=>{
            axios.get('/category').then(res => {

                const categories = res.data;
                console.log("categories");
                console.log(categories);
                this.state.categories=categories;
                this.setState({full: true});

            }).catch(error => {
                console.log("kakakak step");
                console.log("error");
                console.log(error);
                this.setState({full: false});

            });
        },5000);

    }
    componentWillUnmount() {
        clearInterval(this.interval);

    }

    render() {
        let result ="";
        if(Array.isArray(this.state.categories) && this.state.categories.length){
            result= this.state.categories.map(category => <CategoryShowComponent key={category._id} menu={this} category={category}/>);
        }

        return (
            <div className="App">
                <Row>{result}</Row>
                {this.state.products}
            </div>
        );
    }
}
export default MenuComponent;