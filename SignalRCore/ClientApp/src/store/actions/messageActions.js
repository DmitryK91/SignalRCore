import { getData, postData } from "../../api/api";
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
  getData(url)
    .then(data => dispatch({ type: REQUEST_MESSAGES_SUCCESS, payload: data }))
    .catch(error =>
      dispatch({ type: REQUEST_MESSAGES_FAILED, payload: error })
    );
};

export const uploadFiles = (files, roomId) => dispatch => {
  const url = `${baseUrl}/${roomId}`;
  dispatch({ type: UPLOAD_PENDING });
  postData(url, files, "multipart/form-data")
    .then(data => dispatch({ type: UPLOAD_SUCCESS, payload: data }))
    .catch(error =>
      dispatch({ type: UPLOAD_FAILED, payload: error })
    );
};

export function receiveMessage(
  userName = "",
  message = "",
  roomId = null,
  postedAt = null,
  currentRoomId = null,
  files = null
) {
  const filteredMessage = message
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
        files
      },
      currentRoomId
    }
  };
}
