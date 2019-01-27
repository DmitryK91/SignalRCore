import {
    REQUEST_ROOMS_PENDING,
    REQUEST_ROOMS_SUCCESS,
    REQUEST_ROOMS_FAILED,
    RECEIVE_ROOM,
    SET_ROOM
} from './roomTypes';

const initialState = {
    rooms: [],
    currentRoom: null
}

export const requestRooms = (state = initialState, action = {}) => {
    switch (action.type) {
        case REQUEST_ROOMS_PENDING:
            return {
                ...state,
                isPending: true
            };

        case REQUEST_ROOMS_SUCCESS:
            return {
                ...state,
                rooms: action.payload,
                isPending: false
            };

        case REQUEST_ROOMS_FAILED:
            return {
                ...state,
                error: action.payload
            };

        case RECEIVE_ROOM:
            return {
                ...state,
                rooms: [...state.rooms, action.payload.room]
            };

        case SET_ROOM:
            return {
                ...state,
                currentRoom: action.payload
            }

        default:
            return state;
    }
}