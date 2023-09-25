'use client'
import React from "react";
import FormLabel from "../form-label";
import Image from "next/image";
import ArrowLeft from '../../../../public/icons/arrow-left.svg'
import CheckIcon from '../../../../public/icons/check-profile.svg'
import { useDispatch, useSelector } from "react-redux";
import { handleCreateChat } from "@/app/lib/controller/chat";
import { DocumentData, collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { handleBack } from "@/app/lib/utils/main";

interface Props {
  open: boolean
  setOpenNewChat: () => void
}
export default function NewChat(props: Props) {
  const [email, setEmail] = React.useState('')
  const { user } = useSelector((rootReducer: any) => rootReducer.userReducer)
  const refBody = React.useRef<any>(null);
  const [chat, setChat] = React.useState<DocumentData>()
  const [incorrectEmail, setIncorrectEmail] = React.useState(false)
  const [incorrectMessage, setIncorrectMessage] = React.useState('')
  const dispatch = useDispatch()

  React.useEffect(() => {
    const getSnapshot = () => {
      const getUserItem = query(collection(db, 'users'), where("email", "==", email))

      onSnapshot(getUserItem, doc => {
        doc.forEach(docData => {
          const data: any = {
            id: docData.id,
            email: docData.data().email,
            name: docData.data().name,
            photoURL: docData.data().photoURL
          }
          setChat(data)
        })
      })
    }
    getSnapshot()
  }, [email])

  const handleContact = (e: any) => {
    if (e.keyCode === 13 || e.type === 'click') {
      if (email.length === 0 || !email.trim()) {
        setIncorrectEmail(true)
        setIncorrectMessage('Digite um e-mail')
      } else {
        setIncorrectEmail(false) 
        handleCreateChat(user, email, props.setOpenNewChat, dispatch, chat, setEmail, setIncorrectEmail, setIncorrectMessage)
      }
    }
  }

  const handleBackPage = () => {
    handleBack(refBody, props.setOpenNewChat)
    setIncorrectEmail(false)
    setIncorrectMessage('')
    setEmail('')
  }

  return (
    <div ref={refBody} className={`w-full py-8 px-5 h-full absolute top-0 left-0 z-10 bg-dark-blue ${props.open === true ? 'block' : 'hidden'} animate-push`}>
      <div className="flex items-center mb-8">
        <button className="mr-3" onClick={handleBackPage}><Image src={ArrowLeft} alt="Arrow" /></button>
        <h2 className="text-3xl font-bold">Nova conversa</h2>
      </div>
      <div>
        <label><p className="text-base font-bold">E-mail</p></label>
      </div>
      <div className="relative mt-3">
        <input id="email" type="text"  className={`bg-transparent outline-none border-b-2 ${incorrectEmail ? 'border-red': 'border-light-blue'} w-full h-6 py-4 text-base`} placeholder="Digite o e-mail do contato" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={handleContact} />
        <button className="absolute right-0"><Image src={CheckIcon} alt="Check" onClick={handleContact} /></button>
      </div>
      <span className={`${incorrectEmail ? 'block' : 'hidden'} text-base text-red mt-2`}>{incorrectMessage}</span>
    </div>
  )
}