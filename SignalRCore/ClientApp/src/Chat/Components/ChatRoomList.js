import React, {Component} from 'react';
import { connect } from 'react-redux';
import { requestRooms, receiveRoom, setRoom } from '../roomActions';
import { Row } from "reactstrap";

class ChatRoomList extends Component {

    componentDidMount() {
        this.props.onRequestRooms();

        this.props.connection.on(
            "NewRoom",
            (roomName, roomId) => {
                this.props.onReceiveRoom(
                    roomName,
                    roomId
                )
            }
        )
    }

    render() {
        return (
            <div className='room_list'>
                {
                    this.props.rooms.map((room, i) => {
                        return (
                            <Row key={room.id}>
                                <a href="#active" className="text-dark"
                                    key={room.id} onClick={() => this.props.onSetRoom(room)}>{room.name}</a>
                            </Row>
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        rooms: state.requestRooms.rooms,
        currentRoom: state.requestRooms.currentRoom
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRequestRooms: () => dispatch(requestRooms()),
        onReceiveRoom: (
            roomName,
            id
        ) =>
            dispatch(
                receiveRoom(
                    roomName,
                    id
                )
            ),
        onSetRoom: (room) => dispatch(setRoom(room))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomList);