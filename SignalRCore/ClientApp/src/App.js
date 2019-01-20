import React, { Component } from "react";
import { connect } from "react-redux";
import { setUserName } from "./store/actions/userActions";
import { receiveMessage } from "./store/actions/messageActions";
import { HubConnectionBuilder } from "@aspnet/signalr";

import AddChatRoomForm from "./components/AddChatRoomForm";
import AddMessageForm from "./components/AddMessageForm";
import ChatRoomList from "./components/ChatRoomList";
import MessageList from "./components/MessageList";
import UserNameForm from "./components/UserNameForm";
import NoRoomSelected from "./components/NoRoomSelected";
import Layout from "./components/Layout";
import { BrowserRouter as Router } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.connection = new HubConnectionBuilder()
      .withUrl("/chat")
      .build();
  }
  componentDidMount() {
    this.connection
      .start({ withCredentials: false })
      .catch(err => console.error(err.toString()));
  }

  render() {
    const { userName, onSetUserName, currentRoom } = this.props;

    return (      
      <Router>
          <Layout>

          { userName ? (
            <div>
              <Col xs="3">
                <Row>
                  <AddChatRoomForm connection={this.connection} />
                </Row>
                <Row>
                  <ChatRoomList openRoom={() => 1} connection={this.connection} />
                </Row>
              </Col>

              <Col>
                <Row>
                  { currentRoom ? (<MessageList roomId={currentRoom.id} connection={this.connection} />) : (<NoRoomSelected />) }                
                </Row>

                <Row>
                  <AddMessageForm roomId={currentRoom.id} userName={userName} connection={this.connection} />
                    {/* (currentRoom ? (<UserNameForm onSetUserName={onSetUserName} />) : <div> Pick a room.</div>) } */}
                </Row>
              </Col> 
            </div> ) :
            (<UserNameForm onSetUserName={onSetUserName} />)
          }
          </Layout>      
      </Router>      
    );
  }
}

const mapStateToProps = state => {
  return {
    userName: state.userInfo.userName,
    currentRoom: state.requestRooms.currentRoom
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetUserName: name => dispatch(setUserName(name)),
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
