import React from 'react';
import {Card, Button} from 'react-bootstrap';
import config from '../../config';
import ProductEditComponent from './ProductEditComponent';
import delete_product from './ProductDeleteComponent';
const axios = config.axios;
class ProductShowComponent extends React.Component{
    state= {
        comments: [],
        show: false,
        modal: null,
        showText: {
            true: "hide comments",
            false: "show comments"
        },
        showButton: {
            true: "secondary",
            false: "primary"
        }
    }
    componentDidMount(){
        this.setState({modal: this.refs.modal})
    }
    componentWillUnmount() {
        clearInterval(this.interval);

    }
    showComments= function(event){
        let show=!this.state.show;
        this.setState({show: show});
        if(show){
            console.log("Ssafdsaf");
            this.interval= setInterval(()=>{
                let params= {
                    _id: this.props.product._id
                }
                axios.get('/comment',{params: params}).then(res => {
                    console.log(res.data);
                    const comments = res.data;
                    this.setState({comments:comments});


                }).catch(error => {
                    console.log("error");


                });
            },1000);
        }
        else{
            clearInterval(this.interval);

        }

    }
    deleteProduct= function(event){
        delete_product(this.props.product._id);
    }
    showEditForm=function(event){
        event.preventDefault();
        console.log("modalllll")
        this.state.modal.handleShow();
    }
    showEditButton(){
     /*
        if(config.username()!= this.props.product.user.username){
            return "";
        }

      */
        return <div><Button variant="primary" onClick={this.showEditForm.bind(this)} >Edit</Button>
            <Button variant="danger"  onClick={this.deleteProduct.bind(this)}>Delete</Button></div>
            ;
    }
    render(){
        if(!this.props.product){
            return (<div/>);
        }
        let product= this.props.product;
        /*
        let commentText="";
        let commentCreate="";
        if(this.state.show){
            commentCreate=<CommentCreateComponent product_id={this.props.product._id}/>;

            if(this.state.comments.length){
                commentText=this.state.comments.map(comment => <div key={comment._id}>
                    <CommentShowComponent comment={comment} depth={1}/>
                </div>);
            }
            else{
                commentText= <h5>Be the first one to comment!</h5>
            }

        }
        */
        let image="";
        if(product.image){
            image= <Card.Img variant="left" src={config.url + '/images/products/'+product._id}/>;
        }
        return(
            <Card style={{width:"90%", height:"90%", margin: "auto"}}>
                {image}
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text>{(product.price /100 ).toFixed(2)}€</Card.Text>
                    <h4>visibility: {product.visibility}</h4>
                    {this.showEditButton()}
                    <ProductEditComponent ref="modal" modal={true} Product={this.props.product}/>

                    <Button variant={this.state.showButton[this.state.show]}  onClick={this.showComments.bind(this)}>{this.state.showText[this.state.show]}</Button>
                    
                </Card.Body>
            </Card>
        );
    }
}
export default ProductShowComponent;