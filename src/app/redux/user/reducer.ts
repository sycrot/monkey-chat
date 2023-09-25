import UserActionTypes from "./action-types";

const initialState = {
  user: null
}

const userReducer = (state = initialState, action: any) => {
  switch(action.type) {
    case UserActionTypes.LOGIN:
      return { ...state, user: action.payload };
    case UserActionTypes.SINGUP:
      return { ...state, user: action.payload };
    case UserActionTypes.LOGOUT:
      return { ...state, user: null }
    default:
      return state
  }
}

export default userReducer