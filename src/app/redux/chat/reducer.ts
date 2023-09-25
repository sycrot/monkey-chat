import ChatActionsTypes from "./action-types"

const initialState = {
  userChat: null
}

const chatReducer = (state = initialState, action: any) => {
  switch(action.type) {
    case ChatActionsTypes.SET_USERCHAT:
      return {...state, userChat: action.payload}
    default:
      return state
  }
}

export default chatReducer