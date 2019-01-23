import React, { Component } from "react";

class AddMessageForm extends Component {
  constructor() {
    super();

    this.state = {
      newMessage: "",
      files: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.filesOnChange = this.filesOnChange.bind(this);
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
        this.state.files
      )
      .catch(err => console.error(err.toString()));

    this.setState({
      newMessage: "",
      files: null
    });
  }

  filesOnChange(sender) {
    this.setState({
      files: sender.target.files
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="add-message-form">
        <input type="file" onChange={this.filesOnChange} />
        <br />

        <input
          onChange={this.handleChange}
          value={this.state.newMessage}
          placeholder="Say something to the room..."
          type="text"
        />
        <button type="submit" onClick={this.handleSubmit}>
          Submit
        </button>
      </form>
    );
  }
}

export default AddMessageForm;
