import { db } from "@/app/lib/firebase"
import { DocumentData, QuerySnapshot, collection, getDocs, onSnapshot, query, where } from "firebase/firestore"
import { useDispatch, useSelector } from "react-redux"
import Contact from "../contact"
import React from "react"
import { setUserChat } from "@/app/redux/chat/actions"
import { getChat } from "@/app/lib/controller/chat"

interface Props {
  id: string
  users: []
}


export default function SidebarChatItems (props: Props){
  const { user } = useSelector((rootReducer: any) => rootReducer.userReducer)
  const [chat, setChat] = React.useState<DocumentData>()
  const dispatch = useDispatch()

  React.useEffect(() => {
    getChat(props.users, user, setChat)
  }, [])

  const handleUserChat = () => {
    dispatch(setUserChat({name: chat?.name, email: chat?.email, photoURL: chat?.photoURL, uid: chat?.id, chatId: props.id}))
  }

  return(
    <Contact onClick={handleUserChat} name={chat?.name} image={chat?.photoURL || ''} online={chat?.online} />
  )
}