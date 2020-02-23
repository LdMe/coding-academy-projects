import React from 'react';
import {Link} from 'react-router-dom';
import {Row,Col, Modal, Form, FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button} from 'react-bootstrap';
import config from '../../config';
const axios = config.axios;



class ProductCreateComponent extends React.Component {
    variations= {
        public: "success",
        kitchen: "warning",
        admin: "danger"
    }
    state= {
        title:'',
        username:'',
        description: '',
        image: null,
        price: 0,
        categories: null,
        category: null,
        visibility: "public",
        localImage: null,
        show: false,
    };
    error= {
        title: 'title must not be empty',
        image: ''
    };
    handleClose = () => {
        this.reset();
        this.setState({show: false});
    };
    componentDidMount(){
        this.reset();
        this.setState({show: false});
    }
    handleShow = () => this.setState({show: true});
    reset= function(){
        this.setState( {
            title:'',
            username:'',
            description: '',
            image: null,
            price: 0,
            visibility: "public",
            localImage: null,
            show: false,
            categories: null,
            category: null,
        });
        this.error= {
            title: 'title must not be empty',
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
        if(value.length<4){
            this.error.description="description must be longer";
        }
        else if(value.length > 250){
            this.error.description="description must be shorter ";
        }
        else{
            this.error.description='';
            this.setState({
                description: event.target.value
            })
        }
    }
    priceHandler = (event) => {
        this.setState({price: event.target.value});
    }
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
    categoryHandler = (e) => {
        this.setState({category : e.target.value});

    };
    submitHandler=(event) => {
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
        let visibility = this.state.visibility;
        let category= this.state.category;
        form_data.append('title', title);
        form_data.append('price', price);
        if(category){
            form_data.append('category', category);
        }
        form_data.append('username', username);
        form_data.append('description', description);
        form_data.append('visibility', visibility);
        if(this.state.image){
            form_data.append('image',this.state.image,this.state.image.name);
        }
        let url = config.url +'/Product/add';
        console.log(form_data);
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
                alert(err);
            })
    };
    render(){
        let result ="";
        if(Array.isArray(this.state.categories) && this.state.categories.length){
            result= this.state.categories.map(category => <option key={category._id} value={category._id}>{category.title}</option>);
        }
        let visibility={
            public: this.state.visibility == "public" ? this.variations.public : "secondary",
            kitchen: this.state.visibility == "kitchen" ? this.variations.kitchen : "secondary",
            admin: this.state.visibility == "admin" ? this.variations.admin : "secondary",
        }
        if(this.props.modal){
            return(
                <div>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create a new Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                            <Form encType="multipart/form-data">
                                <Form.Group controlId="title">
                                    <Form.Label>Product title</Form.Label>
                                    <Form.Control type="text"  placeholder="Product title" onChange={this.titleHandler} />
                                </Form.Group>
                                <Form.Group controlId="description">
                                    <Form.Label>Product text</Form.Label>
                                    <Form.Control as="textarea"  placeholder="Some text..." onChange={this.descriptionHandler} />
                                </Form.Group>
                                <Form.Group controlId="price">
                                    <Form.Label>Product price</Form.Label>
                                    <Form.Control type="number"   onChange={this.priceHandler} />
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
                                <Form.Group controlId="visibility">
                                    <Row>
                                        <Col><Button style={{"width":"100%"}} variant={visibility.public} value="public" admin="true" onClick={this.visibilityHandler}>Public</Button></Col>
                                        <Col><Button style={{"width":"100%"}} variant={visibility.kitchen} value="kitchen" admin="true" onClick={this.visibilityHandler}>Kitchen</Button></Col>
                                        <Col><Button style={{"width":"100%"}} variant={visibility.admin} value="admin" admin="true" onClick={this.visibilityHandler}>Admin</Button></Col>
                                    </Row>
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
                    <Modal.Title>Create a new Product</Modal.Title>
                    <Form encType="multipart/form-data">
                        <Form.Group controlId="title">
                            <Form.Label>Product title</Form.Label>
                            <Form.Control type="text"  placeholder="Product title" onChange={this.titleHandler} />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Product text</Form.Label>
                            <Form.Control type="text"  placeholder="Some text..." onChange={this.descriptionHandler} />
                        </Form.Group>
                        <Form.Group controlId="price">
                                    <Form.Label>Product price</Form.Label>
                                    <Form.Control type="number"   onChange={this.priceHandler} />
                                </Form.Group>
                        <Form.Group controlId="image">
                            <Form.Label>Product image</Form.Label>
                            <Form.Control type="file"  onChange={this.imageHandler} />
                        </Form.Group>
                        <Form.Group controlId="visibility">
                            <Row>
                                <Col><Button style={{"width":"100%"}} variant={visibility.public} value="public" admin="true" onClick={this.visibilityHandler}>Public</Button></Col>
                                <Col><Button style={{"width":"100%"}} variant={visibility.kitchen} value="kitchen" admin="true" onClick={this.visibilityHandler}>Kitchen</Button></Col>
                                <Col><Button style={{"width":"100%"}} variant={visibility.admin} value="admin" admin="true" onClick={this.visibilityHandler}>Admin</Button></Col>
                            </Row>
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
export default ProductCreateComponent;