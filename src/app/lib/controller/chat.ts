import * as EmailValidator from 'email-validator'
import { DocumentData, addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { setUserChat } from '@/app/redux/chat/actions'

export const handleCreateChat = async (
  user: any,
  email: string,
  openMenu: () => void,
  dispatch: any,
  chat: any,
  setEmail: (text: string) => void,
  setIncorrectEmail: (test: boolean) => void,
  setIncorrectMessage: (message: string) => void) => {
  if (!email) return

  const usersRef = query(collection(db, 'users'), where('email', '==', email))
  const chatsRef = query(collection(db, 'chats'), where('users', 'array-contains', user.email))
  const chatSnap: any = []

  await getDocs(chatsRef).then(doc => {
    doc.forEach(doc => {
      chatSnap.push({
        id: doc.id,
        users: doc.data().users
      })
    })
  })

  if (!EmailValidator.validate(email)) {
    setIncorrectEmail(true)
    setIncorrectMessage('E-mail inválido')
    return
  } else if (email === user.email) {
    setIncorrectEmail(true)
    setIncorrectMessage('Insira um e-mail diferente do seu')
    return
  } else if (chatExists(email, chatSnap)) {
    setIncorrectEmail(true)
    setIncorrectMessage('Chat já existe')
    return
  } else {
    onSnapshot(usersRef, doc => {
      if (doc.empty) {
        setIncorrectEmail(true)
        setIncorrectMessage('E-mail não encontrado')
        return
      }

      addDoc(collection(db, 'chats'), {
        users: [user.email, email]
      }).then(doc => {
        dispatch(setUserChat({ name: chat?.name, email: chat?.email, photoURL: chat?.photoURL, uid: chat?.id, chatId: doc.id }))
        openMenu()
        setEmail('')
        setIncorrectEmail(false)
        setIncorrectMessage('')
      })
    })
  }
}

const chatExists = (emailChat: string, chatData: DocumentData) => {
  return chatData.find(
    (chat: any) => chat.users.find((user: any) => user === emailChat)?.length > 0)
}

export const getChat = (users: [], user: any, setChat: (chat: any) => void) => {
  const getUser = () => users?.filter((userFill: any) => userFill !== user?.email)[0]

  try {
    const getUserItem = query(collection(db, 'users'), where("email", "==", getUser()))

    onSnapshot(getUserItem, (doc: DocumentData) => {
      doc.forEach((data: DocumentData) => {
        setChat({
          id: data.id,
          email: data.data().email,
          name: data.data().name,
          photoURL: data.data().photoURL,
          online: data.data().online
        })
      })
    })
  } catch (e) {
    console.log(e)
  }

}

export const getChatHeader = (userId: any, setOnline: (online: boolean) => void) => {
  try {
    const getUserItem = doc(db, 'users', userId)

    onSnapshot(getUserItem, (doc: DocumentData) => {
      setOnline(doc.data().online)
    })
  } catch (e) {
    console.log(e)
  }
}