import React, { Component } from "react";
import { connect } from "react-redux";
import { Login } from "./store/actions/userActions";
import { receiveMessage } from "./store/actions/messageActions";
import { HubConnectionBuilder } from "@aspnet/signalr";

import AddChatRoomForm from "./components/Chat/AddChatRoomForm";
import AddMessageForm from "./components/Message/AddMessageForm";
import ChatRoomList from "./components/Chat/ChatRoomList";
import MessageList from "./components/Message/MessageList";
import NoRoomSelected from "./components/Chat/NoRoomSelected";
import Layout from "./components/Layout";
import { BrowserRouter as Router } from 'react-router-dom';

import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.connection = new HubConnectionBuilder()
      .withUrl("/chat")
      .build();
  }
  componentDidMount() {
    this.props.onLogin(window.prompt('Your name:', 'John'));

    this.connection
      .start({ withCredentials: false })
      .catch(err => console.error(err.toString()));
  }

  render() {
    const { currentRoom, user } = this.props;

    return (
      <Router>
          <Layout>
            <div>
              <AddChatRoomForm connection={this.connection} />
              <ChatRoomList openRoom={() => 1} connection={this.connection} />
              {
                currentRoom ? (
                <div>
                  <MessageList roomId={currentRoom.id} connection={this.connection} />
                  <AddMessageForm roomId={currentRoom.id} user={user} connection={this.connection} />
                </div>
                ) : (<NoRoomSelected />)
              }
            </div>
          </Layout>
      </Router>
    );
  }
};

const mapStateToProps = state => {
  return {
    user: state.userInfo.login,
    currentRoom: state.requestRooms.currentRoom
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: name => dispatch(Login(name)),
    onReceiveMessage: (
      user,
      message,
      roomId,
      messageId,
      postedAt,
      currentRoomId
    ) =>
      dispatch(
        receiveMessage(
          user,
          message,
          roomId,
          messageId,
          postedAt,
          currentRoomId
        )
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);