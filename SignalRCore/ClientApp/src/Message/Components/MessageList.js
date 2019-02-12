import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
    receiveMessage,
    requestMessages,
    downloadFiles
} from "../messageActions";
import Message from "./Message";

class MessageList extends Component {

    componentDidMount() {
        this.props.connection.on(
            "ReceiveMessage",
            (user, message, messageID, roomId, postedAt, files) => {
                this.props.onReceiveMessage(
                    user,
                    message,
                    messageID,
                    roomId,
                    postedAt,
                    this.props.currentRoom.id,
                    files
                );
            }
        );

        this.props.onRequestMessages(this.props.roomId);
        this.scrollToBottom();
    }

    componentDidUpdate(prevProps) {
        if (this.props.roomId !== prevProps.roomId) {
            this.props.onRequestMessages(this.props.roomId);
        }
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.el.scrollIntoView({ behavior: 'smooth' });
    }

    render() {
        return (
            <div className="message-list">
                {
                    this.props.roomId ? (
                        <Fragment>
                            {
                                this.props.messages.map((message) => {
                                    return (
                                        <Message
                                            key={message.messageID}
                                            userName={message.userName}
                                            content={message.content}
                                            postedAt={message.postedAt}
                                            files={message.files}
                                            onDownloadFile={this.props.onDownloadFile}
                                        />
                                    );
                                })
                            }
                            <div ref={el => { this.el = el; }} />
                        </Fragment>
                    ) :
                    ( <div className="join-room">Join a room to start chatting.</div> )
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        messages: state.requestMessages.messages,
        currentRoom: state.requestRooms.currentRoom
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDownloadFile: (fileID, fileName) => dispatch(downloadFiles(fileID, fileName)),
        onRequestMessages: currentRoomId => dispatch(requestMessages(currentRoomId)),
        onReceiveMessage: (
            user,
            message,
            messageID,
            roomId,
            postedAt,
            currentRoomId,
            files
        ) =>
            dispatch(
                receiveMessage(
                    user,
                    message,
                    messageID,
                    roomId,
                    postedAt,
                    currentRoomId,
                    files
                )
            )
    };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageList);
