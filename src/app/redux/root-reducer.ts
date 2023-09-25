import { combineReducers } from "redux";
import userReducer from "./user/reducer";
import chatReducer from "./chat/reducer";


const rootReducer = combineReducers({ userReducer, chatReducer })

export default rootReducer