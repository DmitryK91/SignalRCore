import {
  REQUEST_MESSAGES_PENDING,
  REQUEST_MESSAGES_SUCCESS,
  REQUEST_MESSAGES_FAILED,
  RECEIVE_MESSAGE,
  UPLOAD_PENDING,
  UPLOAD_SUCCESS,
  UPLOAD_FAILED,
} from "../actions/actionTypes";

const initialState = {
  messages: [],
  currentRoomId: null
};

export const requestMessages = (state = initialState, action = {}) => {
  switch (action.type) {
    case REQUEST_MESSAGES_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_MESSAGES_SUCCESS:
      return Object.assign({}, state, {
        messages: action.payload,
        isPending: false
      });
    case REQUEST_MESSAGES_FAILED:
      return Object.assign({}, state, { error: action.payload });
    case RECEIVE_MESSAGE:
      if (action.payload.currentRoomId === action.payload.message.roomId) {
        return {
          ...state,
          messages: [...state.messages, action.payload.message]
        };
      } else {
        return state;
      }

    case UPLOAD_PENDING:
      return Object.assign({}, state, { isPending: true });
    case UPLOAD_SUCCESS:
      return Object.assign({}, state, {
        messages: action.payload,
        isPending: false
      });
    case UPLOAD_FAILED:
      return Object.assign({}, state, { error: action.payload });

    default:
      return state;
  }
};
