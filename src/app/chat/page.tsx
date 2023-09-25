'use client'
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth, db } from "../lib/firebase"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../redux/user/actions"
import Image from "next/image"
import React from "react"
import Sidebar from "../components/sidebar"
import MessageContainer from "../components/message"
import ChatHeader from "../components/chat-header"
import ChatFooter from "../components/chat-footer"
import BateBapoIcon from '../../../public/icons/icone-de-balao-de-bate-papo.png'
import { DocumentData, collection, doc, orderBy, query, onSnapshot, updateDoc } from "firebase/firestore"
import ButtonBase from "../components/form-button"
import { setUserChat } from "../redux/chat/actions"

export default function Chat() {
  const { userChat } = useSelector((rootReducer: any) => rootReducer.chatReducer)
  const { user } = useSelector((rootReducer: any) => rootReducer.userReducer)
  const [messages, setMessages] = React.useState<[]>([])
  const [openInputChat, setOpenInputChat] = React.useState(false)
  const [openProfile, setOpenProfile] = React.useState(false)
  const [displayPhoto, setDisplayPhoto] = React.useState(false)
  const dispatch = useDispatch()
  const refBody = React.useRef<any>(null);

  React.useEffect(() => {
    const getMessages = () => {
      if (userChat) {
        try {
          const chatsRes = doc(db, 'chats', userChat.chatId)
          const messagesRes = query(collection(chatsRes, 'messages'), orderBy("timestamp", "asc"))

          onSnapshot(messagesRes, (doc: DocumentData) => {
            const msgs: any = []

            if (!doc.empty) {
              doc.forEach((data: DocumentData) => {
                msgs.push({
                  id: data?.id,
                  data: data?.data()
                })

                setMessages(msgs)
              })
            } else {
              setMessages(msgs)
            }
          })
        } catch (err) {
          console.log(err)
        }
      }
    }
    getMessages()
  }, [userChat])

  React.useEffect(() => {
    if (refBody.current !== null) {
      if (refBody.current.scrollHeight > refBody.current.offsetHeight) {
        refBody.current.scrollTop = refBody.current.scrollHeight - refBody.current.offsetHeight
      }
    }
  }, [messages])


  const handleSignOut = () => {
    const id = user?.uid

    signOut(auth).then(() => {
      dispatch(logoutUser())

      dispatch(setUserChat(null))

      updateDoc(doc(db, 'users', id), {
        online: false
      })
    }).catch(err => {
      console.log(err.code)
    })
  }

  const handleInput = () => {
    setOpenInputChat(!openInputChat)
  }

  const handleProfile = () => {
    setOpenProfile(!openProfile)
  }

  const setOpenDisplayPhoto = () => {
    setDisplayPhoto(!displayPhoto)
  }

  return (
    <div className="w-full h-full flex justify-center items-center box-border">
      <div className="md:flex justify-center items-center w-full h-full md:max-w-6xl md:max-h-813 box-border">
        <Sidebar handleInputEmail={handleInput} openNewChat={openInputChat} handleSignOut={handleSignOut} handleProfile={handleProfile} openProfile={openProfile} />
        {/* <h2>{user?.email} - {user?.phoneNumber} - {user?.photoUrl} - {user?.displayName}</h2> */}
        <div className={`${userChat === null ? 'hidden' : 'block'} md:block md:w-3/5 h-full bg-extra-superdark-blue flex flex-col justify-between pb-5`}>
          {userChat === null
            ?
            <div className="flex flex-col items-center justify-center h-full">
              <Image className="max-w-xs mb-8" src={BateBapoIcon} alt="" />
              <ButtonBase text="Inicie uma nova conversa" type="button" loading={false} onClick={handleInput} />
            </div>
            :
            <>
              <ChatHeader />
              {displayPhoto === false &&
                <>

                  <div className="h-79 flex flex-col justify-end">
                    <div ref={refBody} className="chat-container overflow-y-scroll pl-6 pr-2">
                      {messages?.map((item: any, index: any) => (
                        <MessageContainer uid={item.id} key={index} person={item.data.user} message={item.data.message} timestamp={item.data.timestamp} type={item.data.type} />
                      ))}
                    </div>
                  </div>
                </>
              }
              <div className={`relative px-6 ${displayPhoto ? 'h-full' : 'h-10a9'}`}>
                <ChatFooter displayPhoto={displayPhoto} setOpenDisplayPhoto={setOpenDisplayPhoto} />
              </div>
            </>
          }


        </div>

      </div>
    </div>
  )
}