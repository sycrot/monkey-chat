import { Timestamp, deleteDoc, doc } from "firebase/firestore"
import React from "react"
import { useSelector } from "react-redux"
import ArrowDown from '../../../../public/icons/arrow-down.svg'
import Image from "next/image"
import { db } from "@/app/lib/firebase"

interface Props {
  person: string
  message: string
  timestamp: Timestamp
  uid: string
  type: string
}

export default function MessageContainer(props: Props) {
  const { user } = useSelector((rootReducer: any) => rootReducer.userReducer)
  const { userChat } = useSelector((rootReducer: any) => rootReducer.chatReducer)
  const [time, setTime] = React.useState('00:00')
  const [menu, setMenu] = React.useState(false)
  const [openMenu, setOpenMenu] = React.useState(false)
  const msgRef = React.useRef<any>(null)

  React.useEffect(() => {
    const getHour = () => {
      let date = props.timestamp?.toDate()
      if (date !== undefined) {
        setTime(`${handleHour(date?.getHours())}:${handleHour(date?.getMinutes())}`)
      }
    }
    getHour()
  }, [props.timestamp])

  React.useEffect(() => {
    const pageClickEvent = (e: any) => {
      if (msgRef.current !== null && !msgRef.current.contains(e.target)) {
        setOpenMenu(!openMenu)
      }
    }
    if (openMenu) {
      window.addEventListener('click', pageClickEvent)
    }

    return () => {
      window.removeEventListener('click', pageClickEvent)
    }
  }, [openMenu])

  const handleHour = (num: any) => {
    if (num < 10) {
      num = `0${num}`
    }
    return num
  }

  const handleMenu = () => {
    setOpenMenu(!openMenu)
  }

  const deleteMessage = () => {
    const chatsRef = doc(db, 'chats', userChat.chatId)
    const messageRef = doc(chatsRef, 'messages', props.uid)

    deleteDoc(messageRef).then(() => {
      setOpenMenu(!openMenu)
    })
  }

  return (
    <div ref={msgRef} className={`w-full flex ${props.person === user?.email ? 'justify-end' : 'justify-start'} my-3 relative`}>
      <div onMouseOver={() => setMenu(true)} onMouseOut={() => setMenu(false)} className={`${props.person === user.email ? 'bg-light-blue' : 'bg-marine-blue'} rounded-30px max-w-250 sm:max-w-lg relative overflow-hidden`}>
        {props.person === user.email &&
          <button onClick={handleMenu} className={`${menu ? 'block' : 'hidden'} absolute right-0 ${props.type === 'text' ? 'bg-light-blue' : 'bg-gradient-to-tr to-black-opacity from-transparent from-40%'} top-0 p-3 z-20`}><Image src={ArrowDown} alt="Message menu" width={20} height={20} /></button>
        }
        {props.type === 'text' ?
          <div className="py-4 px-6">
            <p>{props.message}</p>
            <span className="flex justify-end text-base font-light text-slate-300">{time}</span>
          </div>
          :
          <div className="w-full max-w-250 sm:max-w-sm overflow-hidden relative">
            <Image src={props.message} alt={props.message} width={500} height={500} className="w-full" />
            <div className="w-full h-10 absolute bottom-0 bg-gradient-to-b to-black-opacity from-transparent">
              <span className="text-base font-light text-white absolute bottom-2 right-6" style={{ textShadow: '#000 0 0 4px' }}>{time}</span>
            </div>
          </div>
        }

      </div>
      {props.person === user.email &&
        <div className={`${openMenu ? 'none' : 'hidden'} absolute top-8 right-2} drop-shadow-md bg-extradark-blue z-10`}>
          <button onClick={deleteMessage} className="hover:bg-dark-blue py-8 pl-7 pr-16">Apagar</button>
        </div>
      }
    </div>
  )
}