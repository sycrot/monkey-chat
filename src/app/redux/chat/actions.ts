import ChatActionsTypes from "./action-types"

export const setUserChat = (payload: any) => ({
  type: ChatActionsTypes.SET_USERCHAT,
  payload
})