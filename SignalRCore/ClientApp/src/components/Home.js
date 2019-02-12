import React, { Component } from "react";
import { connect } from "react-redux";
import { HubConnectionBuilder } from "@aspnet/signalr";

///////////////////Chat import////////////////////////////////////
import AddChatRoomForm from "../Chat/Components/AddChatRoomForm";
import NoRoomSelected from "../Chat/Components/NoRoomSelected";
import ChatRoomList from "../Chat/Components/ChatRoomList";
/////////////////////////////////////////////////////////////////

///////////////////Message import/////////////////////////////////
import AddMessageForm from "../Message/Components/AddMessageForm";
import MessageList from "../Message/Components/MessageList";
/////////////////////////////////////////////////////////////////

import { Col, Row, Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";
import "./App.css";

class Home extends Component {

    constructor() {
        super();

        this.toggle = this.toggle.bind(this);

        this.connection = new HubConnectionBuilder()
            .withUrl("/chat")
            .build();

        this.state = {
            isLogged: false,
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentDidMount() {
        this.connection
            .start({ withCredentials: false })
            .catch(err => console.error(err.toString()));
    }

    render() {
        const { currentRoom, userInfo } = this.props;

        return (
            <Row>
                <Col md="3">
                    <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light >
                        <Container>
                            <NavbarToggler onClick={this.toggle} className="mr-2" />
                            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                                <nav className='nav-stacked'>
                                    <AddChatRoomForm connection={this.connection} />
                                    <ChatRoomList openRoom={() => 1} connection={this.connection} />
                                </nav>
                            </Collapse>
                        </Container>
                    </Navbar>
                </Col>

                <Col>
                    {
                        currentRoom ? (
                            <div className="border">
                                <MessageList roomId={currentRoom.id} connection={this.connection} />
                                <div>
                                    <AddMessageForm roomId={currentRoom.id} userInfo={userInfo} connection={this.connection} />
                                </div>
                            </div>
                        ) : (<NoRoomSelected />)
                    }
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo,
        currentRoom: state.requestRooms.currentRoom
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);