import React from "react";
import { Container, Jumbotron} from 'react-bootstrap';

const AboutUsStyle = {
    marginBottom: '0',
    backgroundColor: 'rgba(255, 183, 0, 0.28)'
};

class AboutUsComponent extends React.Component {
    render(){
        return(
            <Jumbotron
                fluid
                style={AboutUsStyle}
            >
                <Container>
                    <h1>NEED HELP? CONTACT US</h1>
                    <p>
                        We understand that everything doesn’t always go to plan. That’s why we pride ourselves on top-notch quality of support, any time of the day.
                    </p>

                    <p>
                        Call us: 69696969
                    </p>
                </Container>
            </Jumbotron>
        )
    }
}
export default AboutUsComponent;