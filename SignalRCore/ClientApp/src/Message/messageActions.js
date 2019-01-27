import axios from "axios";
import {
    REQUEST_MESSAGES_PENDING,
    REQUEST_MESSAGES_SUCCESS,
    REQUEST_MESSAGES_FAILED,
    RECEIVE_MESSAGE,
    UPLOAD_PENDING,
    UPLOAD_SUCCESS,
    UPLOAD_FAILED,
    DOWNLOAD_PENDING,
    DOWNLOAD_SUCCESS,
    DOWNLOAD_FAILED,
} from "./messageTypes";

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

export const uploadFiles = (data, userID) => async dispatch => {
    const url = `${baseUrl}/${userID}`;
    dispatch({ type: UPLOAD_PENDING });

    await axios.post(url, data)
        .then((response) => dispatch({ type: UPLOAD_SUCCESS, payload: response.data }))
        .catch(error =>
            dispatch({ type: UPLOAD_FAILED, payload: error })
        );
}

export const downloadFiles = (fileID, fileName) => async dispatch => {
    const url = `${baseUrl}/DownloadFile/${fileID}`;
    dispatch({ type: DOWNLOAD_PENDING });

    axios.get(url, {
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/octet-stream',
        },
    })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();

            return dispatch({ type: DOWNLOAD_SUCCESS });
        })
        .catch(error =>
            dispatch({ type: DOWNLOAD_FAILED, payload: error })
        );
}

export function receiveMessage(
    userName = "",
    message = "",
    messageID = "",
    roomId = null,
    postedAt = null,
    currentRoomId = null,
    files = null
) {
    var filteredMessage = message
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    return {
        type: RECEIVE_MESSAGE,
        payload: {
            message: {
                messageID,
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
