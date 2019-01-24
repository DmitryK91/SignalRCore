import React, { Component } from "react";
import { Row } from "reactstrap";
import axios from "axios";

class AddMessageForm extends Component {
  constructor() {
    super();

    this.state = {
      newMessage: "",
      fileLink: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      newMessage: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.connection
      .invoke(
        "SendMessage",
        this.props.roomId,
        this.props.user.id,
        this.state.newMessage,
        this.state.fileLink
      )
      .catch(err => console.error(err.toString()));

    this.setState({
      newMessage: "",
      fileLink: []
    });
  }

  handleUploadFile = (event) => {
    let files = this.state.fileLink;    

    let data = new FormData();
    data.append('file', event.target.files[0]);
    axios.post('/api/Message', data).then((response) => {
      files.append(response.data);
      this.setState({
        fileLink: files
      });
    });
  }

  render() {
    return (
      <div>
        <Row>
          <input type="file" onChange={this.handleUploadFile} /> 
        </Row>

        <Row>
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleChange}
              value={this.state.newMessage}
              placeholder="Say something to the room..."
              type="text"
            />
            <input type="submit" value="Submit" />
          </form>
        </Row>
      </div>
    );
  }
}

export default AddMessageForm;
