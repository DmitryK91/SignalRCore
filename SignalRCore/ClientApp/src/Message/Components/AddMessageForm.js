import React, { Component } from "react";
import { connect } from "react-redux";
import { uploadFiles } from "../messageActions";
import { Row, Col } from "reactstrap";

class AddMessageForm extends Component {

    constructor() {
        super();

        this.state = {
            newMessage: "",
            files: null,
            formValid: false,
            fileNames: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRemoveFile = this.handleRemoveFile.bind(this);
    }

    handleChange(e) {
        this.setState({
            newMessage: e.target.value,
            formValid: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        
        if (this.state.files) {
            await this.props.onUploadFiles(this.state.files, this.props.userInfo.userID);
        }

        this.props.connection
            .invoke(
                "SendMessage",
                this.props.roomId,
                this.props.userInfo.userID,
                this.state.newMessage,
                this.props.fileID
            )
            .catch(err => console.error(err.toString()));

        this.setState({
            newMessage: "",
            files: null,
            formValid: false,
            fileNames: null
        });
    }

    handleUploadFile = (event) => {

        if (event.target.files) {
            let data = new FormData();
            let fileNames = [];

            for (var i = 0; i < event.target.files.length; i++) {
                data.append('file', event.target.files[i]);
                fileNames[i] = event.target.files[i].name;
            }

            this.setState({
                files: data,
                fileNames: fileNames,
                formValid: event.target.files
            });
        }
    }

    handleRemoveFile = (e) => {
        e.preventDefault();

        this.setState({
            files: null,
            fileNames: null,
            formValid: this.state.newMessage
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col md="6">
                            <input className="form-control"
                                onChange={this.handleChange}
                                value={this.state.newMessage}
                                placeholder="Enter message..."
                                type="text" />
                        </Col>
                        <Col md="2">
                            <input type="submit" value="Submit"
                                disabled={!this.state.formValid}
                                className="btn btn-primary" />
                        </Col>
                    </Row>
                </form>

                <Row>
                    <Col>
                        <input type="file" name="file" id="file" className="file-select" onChange={this.handleUploadFile} required multiple />
                        <label htmlFor="file">
                            {
                                !this.state.fileNames ? (
                                    <div><i className="fa fa-arrow-circle-o-up"></i> Upload File </div>
                                ) : (
                                        this.state.fileNames.map((file) => {
                                            return (
                                                <div>
                                                    <i className="fa fa-file"></i> {file}
                                                    <input type="button" className="btn btn-danger" value="x" onClick={this.handleRemoveFile} />
                                                </div>
                                            )
                                        })
                                    )
                            }
                        </label>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        fileID: state.requestMessages.fileID
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUploadFiles: (data, userID) =>
            dispatch(uploadFiles(data, userID))
    };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMessageForm);
