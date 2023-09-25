/* eslint-disable @next/next/no-img-element */
import React from "react"
import Image from "next/image"
import ImageMenu from '../../../../public/icons/menu-pontos-vertical.svg'
import UserImage from '../../../../public/icons/user-icon.svg'
import ArrowIcon from '../../../../public/icons/arrow-left2.svg'
import { useDispatch, useSelector } from "react-redux"
import { DocumentData, collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from "firebase/firestore"
import { db } from "@/app/lib/firebase"
import { setUserChat } from "@/app/redux/chat/actions"
import { handleOpenCloseMenu, pageClickEvent } from "@/app/lib/utils/menu"
import { getChat, getChatHeader } from "@/app/lib/controller/chat"

export default function ChatHeader() {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [online, setOnline] = React.useState(false)
  const { userChat } = useSelector((rootReducer: any) => rootReducer.chatReducer)
  const { user } = useSelector((rootReducer: any) => rootReducer.userReducer)
  const dispatch = useDispatch()
  const menuRef = React.useRef<any>(null)
  const menuBody = React.useRef<any>(null)

  React.useEffect(() => {
    if (menuOpen) {
      window.addEventListener('click', e => pageClickEvent(e, menuRef, menuOpen, menuBody, setMenuOpen))
    }

    return () => {
      window.removeEventListener('click', e => pageClickEvent(e, menuRef, menuOpen, menuBody, setMenuOpen))
    }
  }, [menuOpen])

  React.useEffect(() => {
    getChatHeader(userChat?.uid, setOnline)
  }, [])

  const deleteMessages = async () => {
    const chatsRes = doc(db, 'chats', userChat.chatId)
    const messagesRes = query(collection(chatsRes, 'messages'))

    await getDocs(messagesRes).then((docData: DocumentData) => {
      docData.forEach((data: DocumentData) => {
        const messageRef = collection(chatsRes, 'messages')
        deleteDoc(doc(messageRef, data.id))
        setMenuOpen(false)
      })
    })
  }

  const handleChatUser = () => {
    dispatch(setUserChat(null))
  }

  return (
    <div className="bg-extradark-blue flex justify-between items-center px-3 py-6 relative ">
      <div className="flex items-center">
        <button className="mr-4 md:hidden"><Image src={ArrowIcon} alt="back" width={30} height={20} onClick={handleChatUser} /></button>
        <div className="relative">
          <div className="rounded-50p w-10 h-10 bg-light-blue overflow-hidden flex items-center">
            <Image src={userChat?.photoURL || UserImage} alt="" width={40} height={40} className="w-full h-full object-cover" />
          </div>
          <span className={`rounded-50p w-2 h-2 ${online === true ? 'bg-green' : 'bg-none border-2 border-dark-gray'} absolute right-0 bottom-0`}></span>
        </div>
        <p className="text-base ml-2">{userChat?.name}</p>
      </div>
      {/* <div ref={menuRef}>
        <button className="w-5 h-5" onClick={() => handleOpenCloseMenu(menuOpen, menuBody, setMenuOpen)}><Image src={ImageMenu} alt="Menu" /></button>
        <div ref={menuBody} className={`${menuOpen === true ? 'flex' : 'hidden'} absolute top-22 right-0 bg-extradark-blue flex-col drop-shadow-md animate-menuDropdown origin-top z-10`}>
          <button className='text-base py-8 pl-7 pr-20 hover:bg-dark-blue'>Dados do contato</button>
          <button className='text-base py-8 pl-7 pr-20 hover:bg-dark-blue' onClick={deleteMessages}>Limpar conversa</button>
        </div>
      </div> */}
    </div>
  )
}