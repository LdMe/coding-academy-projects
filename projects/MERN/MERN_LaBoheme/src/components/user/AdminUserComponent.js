import React from 'react';
import {Link,Redirect} from 'react-router-dom'
import {Card, Button} from 'react-bootstrap';
import config from '../../config';
const axios = config.axios;
class AdminUserComponent extends React.Component{
    state= {
        user: [],
        interval:null
    }
    componentDidMount(){
        let url = window.location.pathname.split("/");
        let username = config.username();
        if(this.props.username){
            username= this.props.username;
        }
        console.log("username");
        console.log(username);
        this.interval=setInterval( function(){
            if(username){
                if(this.state.user){
                    if(this.interval){
                        clearInterval(this.interval);
                    }
                    return;
                }
                console.log("find user "+ username);
                axios.get('/user/'+username).then(res => {
                    console.log("user");
                    console.log(res.data);
                    const user = res.data;
                    this.setState({user:user});


                }).catch(error => {
                    console.log("error");


                });
            }
        }.bind(this),1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);

    }
    render(){
        let greetings= <h2> no user found</h2>
        let user= this.state.user;
        if(this.state.user){
            greetings=
                <div>
                    <h1>Hello, {this.state.user.username}</h1>

                </div>
            return(
                <div>
                    {greetings}
                    <Card style={{width:"90%", margin: "auto"}}>

                        <Card.Body>
                            <Card.Title>{user.username}</Card.Title>
                            <Card.Text>{user.email}</Card.Text>
                            <Link to="#">edit info</Link>
                        </Card.Body>
                    </Card>
                </div>
            );

        }
        return(<div/>);

    }
}
export default AdminUserComponent;