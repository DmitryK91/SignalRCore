import axios from "axios";
import {
  REQUEST_MESSAGES_PENDING,
  REQUEST_MESSAGES_SUCCESS,
  REQUEST_MESSAGES_FAILED,
  RECEIVE_MESSAGE,
  UPLOAD_PENDING,
  UPLOAD_SUCCESS,
  UPLOAD_FAILED,
} from "./actionTypes";

const baseUrl = "/api/Message";

export const requestMessages = (roomId = "") => dispatch => {
  const url = roomId ? `${baseUrl}/${roomId}` : baseUrl;
  dispatch({ type: REQUEST_MESSAGES_PENDING });

  axios.get(url)
    .then((response) => dispatch({ type: REQUEST_MESSAGES_SUCCESS, payload: response.data }))
    .catch(error =>
      dispatch({ type: REQUEST_MESSAGES_FAILED, payload: error })
    );
}

export const uploadFiles = (data, userID) => dispatch => {
  const url = `${baseUrl}/${userID}`;
  dispatch({ type: UPLOAD_PENDING });

  axios.post(url, data)
    .then((response) => dispatch({ type: UPLOAD_SUCCESS, payload: response.data }))
    .catch(error =>
      dispatch({ type: UPLOAD_FAILED, payload: error })
    );
}

export function receiveMessage(
  userName = "",
  message = "",
  roomId = null,
  postedAt = null,
  currentRoomId = null,
  link = null
) {
  var filteredMessage = message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return {
    type: RECEIVE_MESSAGE,
    payload: {
      message: {
        userName,
        roomId,
        postedAt,
        content: filteredMessage,
        link
      },
      currentRoomId
    }
  };
}
