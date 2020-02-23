import React from 'react';
import {Link} from 'react-router-dom';
import {Row,Col, Modal, Form, FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button} from 'react-bootstrap';
import config from '../../config';
const axios = config.axios;



class ProductEditComponent extends React.Component {
    variations= {
        public: "success",
        friends: "warning",
        private: "danger"
    }
    state= {
        title:'',
        username:'',
        description:'',
        price: 0,
        image: null,
        categories: null,
        category: null,
        localImage: null,
        show: false,
    };
    error= {
        title: '',
        image: ''
    };
    componentWillReceiveProps(newProps) {
        this.props=newProps;
    }
    handleClose = () => {
        this.reset();
        this.setState({show: false});
    }
    handleShow = () => this.setState({show: true});
    componentDidMount(){
        this.reset();
        this.setState({show: this.props.show});
    };
    handler= {
        user: function(event){
        },
        price: function(event){
        }
    }
    reset= function(){
        this.setState( {
            title:this.props.Product.title,
            username:'',
            description: this.props.Product.description,
            image: null,
            price: this.props.Product.price,
            category: this.props.Product.category,
            localImage: null,
            show: false,
        });
        this.error= {
            title: '',
            image: ''
        };
        axios.get('/category').then(res => {
            console.log(res.data);
            const categories = res.data;
            this.setState({categories :categories});
        }).catch(error => {
            console.log("fucking!!");
        });
    }
    titleHandler =(event) => {
        let value= event.target.value;
        if(value.length<4){
            this.error.title="title must be longer";
        }
        else if(value.length > 50){
            this.error.title="title must be shorter";
        }
        else{
            this.error.title='';
            this.setState({
                title: event.target.value
            })
        }
    }
    descriptionHandler= (event)=> {
        let value= event.target.value;
        if(value.length > 250){
            this.error.description="description must be shorter ";
        }
        else if (value != this.props.Product.description){
            this.error.description='';
            this.setState({
                description: event.target.value
            })
        }
    }
    priceHandler = (event) => {
        this.setState({price: event.target.value});
    }
    categoryHandler = (e) => {
        this.setState({category : e.target.value});
    };
    imageHandler = (e) => {
        e.preventDefault();
        if( !e.target.files){
            this.error.image='';
            return;
        }
        let ext_array= e.target.files[0].name.split(".");
        let ext= ext_array[ext_array.length-1];

        if(ext!= "jpg" && ext!="jpeg" && ext!="png" && ext!="gif"){
            alert("image format is not correct");
            this.error.image='image format is not correct';
            return;
        }
        this.error.image='';
        this.setState({
            image: e.target.files[0],
            localImage: URL.createObjectURL(e.target.files[0])
        })
    };
    changeHandler = (e) => {
        this.setState({description : e.target.value});

    };
    submitHandler=(event) => {
        console.log("fssfsd")
        let error_alert="";
        for (let error in this.error){
            if(this.error[error]){
                error_alert = error_alert +this.error[error]+"\n";
            }
        }
        if(error_alert){
            alert(error_alert);
            return;
        }
        event.preventDefault();
        let form_data= new FormData();
        let title= this.state.title;
        let price= this.state.price;
        let username= config.username();
        let description= this.state.description;
        let category= this.state.category;
        form_data.append('username',config.username());
        form_data.append('_id',this.props.Product._id);
        form_data.append('title', title);
        form_data.append('price', price);
        if(category){
            form_data.append('category', category);
        }
        form_data.append('description', description);
        if(this.state.image){
            form_data.append('image',this.state.image,this.state.image.name);
        }
        let url = config.url +'/Product/edit';
        axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(res => {
            this.reset();
            alert(res.data);
            this.handleClose();
        })
        .catch(err => {
            alert(err.response.data);
        })
    };
    render(){
        let categoryDefault=""
        if(this.props.Product.category){
            categoryDefault= this.props.Product.category._id;
        }  
        let result ="";
        if(Array.isArray(this.state.categories) && this.state.categories.length){
            result= this.state.categories.map(category => <option key={category._id} selected={category._id==categoryDefault}value={category._id}>{category.title}</option>);
        }
        if(!this.props.Product){
            return (<div/>);
        }
        if(this.props.modal){
            return(
            <div>
            <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body >
            <Form encType="multipart/form-data">
            <Form.Group controlId="title">
            <Form.Label>Product title</Form.Label>
            <Form.Control type="text"  defaultValue={this.props.Product.title} onChange={this.titleHandler} />
            </Form.Group>
            <Form.Group controlId="description">
            <Form.Label>Product text</Form.Label>
            <Form.Control type="text"   defaultValue={this.props.Product.description}  onChange={this.descriptionHandler} />
            </Form.Group>
            <Form.Group controlId="price">
            <Form.Label>Product price</Form.Label>
            <Form.Control type="number"   onChange={this.priceHandler} defaultValue={this.props.Product.price} />
            </Form.Group>
            <Form.Group controlId="category" >
            <Form.Label>Product category</Form.Label>
            <select   onChange={this.categoryHandler} >
            <option  key="0" value="null" >no category</option>
            {result}
            </select>

            </Form.Group>
            <Form.Group controlId="image">
            <Form.Label>Product image</Form.Label>
            <Form.Control type="file"  onChange={this.imageHandler} />
            </Form.Group>

            <Form.Group controlId="formSubmit">
            <Button variant="primary" onClick={this.submitHandler}>Submit</Button>
            </Form.Group>
            </Form>
            </Modal.Body>
            </Modal>

            </div>
            );
        }
        else{
            return(
            <div>

            <h2>Edit Product</h2>


            <Form encType="multipart/form-data">
            <Form.Group controlId="title">
            <Form.Label>Product title</Form.Label>
            <Form.Control type="text"  placeholder="Product title" onChange={this.titleHandler} />
            </Form.Group>
            <Form.Group controlId="description">
            <Form.Label>Product text</Form.Label>
            <Form.Control type="text"   onChange={this.descriptionHandler} defaultValue={this.props.Product.description} />
            </Form.Group>
            <Form.Group controlId="price">
            <Form.Label>Product price</Form.Label>
            <Form.Control type="number"   onChange={this.priceHandler} defaultValue={this.props.Product.price}/>
            </Form.Group>
            <Form.Group controlId="category">
            <Form.Label>Product category</Form.Label>
            <select   onChange={this.categoryHandler} >
            {result}
            </select>
            </Form.Group>
            <Form.Group controlId="image">
            <Form.Label>Product image</Form.Label>
            <Form.Control type="file"  onChange={this.imageHandler} />
            </Form.Group>
            
            <Form.Group controlId="formSubmit">
            <Button variant="primary" onClick={this.submitHandler}>Submit</Button>
            </Form.Group>
            </Form>


            </div>
            );
        }
    }
}
export default ProductEditComponent;