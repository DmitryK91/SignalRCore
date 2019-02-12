import React, { Component } from "react";
import { Col, Row } from 'reactstrap';

class AddChatRoomForm extends Component {
    constructor() {
        super();

        this.state = {
            roomName: "",
            formValid: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            roomName: e.target.value,
            formValid: e.target.value !== ""
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.connection
            .invoke("AddChatRoom", this.state.roomName)
            .catch(err => console.error(err.toString()));

        this.setState({
            roomName: "",
            formValid: false
        });
        console.log(this.state.roomName);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form-group">
                <input onChange={this.handleChange} value={this.state.roomName}
                    placeholder="Create room..." className="form-control"
                    type="text" required />
                <input type="submit" value="Submit"
                    className="btn btn-secondary"
                    disabled={!this.state.formValid} />
            </form>
        );
    }
}

export default AddChatRoomForm;
