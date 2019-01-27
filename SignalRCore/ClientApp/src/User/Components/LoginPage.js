import React, { Component } from "react";
import { connect } from "react-redux";
import { Login } from "../userActions";
import { Col, Row } from 'reactstrap';

class LoginPage extends Component {

    constructor() {
        super();

        this.state = {
            userName: "",
            formValid: false
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            userName: e.target.value,
            formValid: e.target.value !== ""
        });
    }
    
    render() {
        return (
            <Row className="form-signin">
                <Col>
                    <input type="login" placeholder="Enter Login"
                        onChange={this.handleChange}
                        value={this.state.userName}
                        className="form-control" />
                </Col>

                <Col md="2">
                    <input type="button" value="Submit"
                        onClick={() => this.props.onLogin(this.state.userName)}
                        className="btn btn-primary"
                        disabled={!this.state.formValid} />
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: name => dispatch(Login(name))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);