import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { requestRooms } from "../Chat/roomReducer";
import { requestMessages } from "../Message/messageReducer";
import { userInfo } from "../User/userReducer";

export default function configureStore(initialState) {

    const rootReducer = combineReducers({
        requestRooms,
        requestMessages,
        userInfo
    });

    const logger = createLogger();
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(thunkMiddleware, logger))
    );

    return store
}