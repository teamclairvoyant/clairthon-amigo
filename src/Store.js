import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./redux/reducers/userReducer";
import {InitialState} from "./redux/InitialState";
const rootReducer = combineReducers({ userList: userReducer });

const middleWare = [thunk];

const Store = createStore(
  rootReducer,
  InitialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default Store;
