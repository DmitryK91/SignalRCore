import React, { Component } from "react";
import { connect } from "react-redux";
import { uploadFiles } from "../../store/actions/messageActions";
import { Row } from "reactstrap";

class AddMessageForm extends Component {
  constructor() {
    super();

    this.state = {
      newMessage: "",
      file: null
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

    this.props.uploadFiles(this.state.file, this.props.user.id);

    this.props.connection
      .invoke(
        "SendMessage",
        this.props.roomId,
        this.props.user.id,
        this.state.newMessage + this.props.link
      )
      .catch(err => console.error(err.toString()));

    this.setState({
      newMessage: "",
      file: null
    });
  }

  handleUploadFile = (event) => {
    let data = new FormData();
    data.append('file', event.target.files[0]);

    this.setState({
      file: data
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

const mapStateToProps = state => {
  return {
    link: state.requestMessages.link
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadFiles: (data, userID) =>
      dispatch(uploadFiles(data, userID))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMessageForm);
