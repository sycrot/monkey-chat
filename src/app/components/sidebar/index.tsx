/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import Commment from '../../../../public/icons/comentario.svg'
import Menu from '../../../../public/icons/menu-pontos-vertical.svg'
import ContactIcon from '../../../../public/icons/usuarios.svg'
import React from 'react'
import { useSelector } from 'react-redux'
import { db } from '@/app/lib/firebase'
import { DocumentData, Query, collection, onSnapshot, query, where } from 'firebase/firestore'
import SidebarChatItems from '../sidebar-chatitems'
import NewChat from '../new-chat'
import UserImage from '../../../../public/icons/user-icon.svg'
import UserProfile from '../user-profile'
import { handleOpenCloseMenu, pageClickEvent } from '@/app/lib/utils/menu'

interface Props {
  handleSignOut: () => void
  openNewChat: boolean
  handleInputEmail: () => void
  handleProfile: () => void
  openProfile: boolean
}

export default function Sidebar(props: Props) {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [chats, setChats] = React.useState<[]>([])

  const { user } = useSelector((rootReducer: any) => rootReducer.userReducer)
  const { userChat } = useSelector((rootReducer: any) => rootReducer.chatReducer)

  const [usersRef, setUsersRef] = React.useState<Query>()

  const menuRef = React.useRef<any>(null)
  const menuBody = React.useRef<any>(null)

  React.useEffect(() => {
    if (user?.email) {
      setUsersRef(query(collection(db, 'chats'), where("users", "array-contains", user?.email)))
    }
  }, [user?.email])

  React.useEffect(() => {
    const getSnapshot = () => {
      try {
        if (usersRef) {
          onSnapshot(usersRef, (doc: DocumentData) => {
            const newChats: any = []

            doc.forEach((data: DocumentData) => {
              newChats.push({
                id: data.id,
                data: data.data()
              })
            })
            setChats(newChats)
          })
        }
      } catch (err) {
        console.log(err)
      }
    }

    getSnapshot()
  }, [usersRef])

  React.useEffect(() => {
    if (menuOpen) {
      window.addEventListener('click', e => pageClickEvent(e, menuRef, menuOpen, menuBody, setMenuOpen))
    }

    return () => {
      window.removeEventListener('click', e => pageClickEvent(e, menuRef, menuOpen, menuBody, setMenuOpen))
    }
  }, [menuOpen])

  return (
    <div className={`${userChat !== null ? 'hidden' : 'block'} md:block md:w-2/5 h-full bg-dark-blue relative overflow-hidden`}>
      <NewChat open={props.openNewChat} setOpenNewChat={props.handleInputEmail} />
      <UserProfile open={props.openProfile} setOpenProfile={props.handleProfile} />
      <div className="bg-extradark-blue flex justify-between items-center px-3 py-6 relative">
        <button className="rounded-50p w-10 h-10 bg-dark-blue overflow-hidden flex items-center" onClick={props.handleProfile}>
          <Image src={user?.photoURL ? user?.photoURL : UserImage} alt="Avatar" className='w-full h-full object-cover' width={40} height={40} />
        </button>
        <div ref={menuRef}>
          <button className="w-5 h-5 mr-4" onClick={props.handleInputEmail}><Image src={Commment} alt="To talk" /></button>
          <button className="w-5 h-5" onClick={() => handleOpenCloseMenu(menuOpen, menuBody, setMenuOpen)}><Image src={Menu} alt="Menu" /></button>
          <div ref={menuBody} className={`${menuOpen === true ? 'block' : 'hidden'} absolute top-22 right-0 bg-extradark-blue drop-shadow-md animate-menuDropdown origin-top`}>
            <button className='text-base py-8 pl-7 pr-16 hover:bg-dark-blue' onClick={props.handleSignOut}>Desconectar</button>
          </div>
        </div>
      </div>
      <div className='h-3/4 md:h-83'>
        <div className="text-light-blue flex pt-4 px-3">
          <Image src={ContactIcon} alt="Usuarios" /><p className='text-base font-bold ml-2'>Contacts</p>
        </div>
        <div className="sidebar mt-2 overflow-y-scroll h-full">
          {chats?.map((item: any, index: any) => (
            <SidebarChatItems key={index}
              id={item.id}
              users={item.data.users}
            />
          ))}
        </div>
      </div>
    </div>
  )
}