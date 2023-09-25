import Image from "next/image"
import SendMessage from '../../../../public/icons/enter.svg'
import SendPhoto from '../../../../public/icons/image-picture.svg'
import DeleteImage from '../../../../public/icons/close-bold.svg'
import React from "react"
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore"
import { db, storage } from "@/app/lib/firebase"
import { useSelector } from "react-redux"
import { handleImage } from "@/app/lib/utils/main"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

interface Props {
  displayPhoto: boolean
  setOpenDisplayPhoto: () => void
}

export default function ChatFooter(props: Props) {
  const { user } = useSelector((rootReducer: any) => rootReducer.userReducer)
  const { userChat } = useSelector((rootReducer: any) => rootReducer.chatReducer)
  const [message, setMessage] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [photo, setPhoto] = React.useState<any>();
  const [photoURL, setPhotoURL] = React.useState('')


  const messageRef = React.useRef<any>(null)

  React.useEffect(() => {
    if (messageRef.current) {
      messageRef.current.style.height = 'auto'
      messageRef.current.style.height = messageRef.current.scrollHeight + 'px'
    }
  }, [message])

  const handleSendMessage = (type: string) => {
    const chatRef = doc(db, 'chats', userChat.chatId)

    switch (type) {
      case 'text':
        if (message.length === 0 || !message.trim()) {
          return false
        } else {
          addDoc(collection(chatRef, 'messages'), {
            message: message,
            user: user.email,
            type: type,
            timestamp: serverTimestamp()
          })

          setMessage('')
        }

        break;
      case 'photo':
        setLoading(true)

        const photoData = photo?.target.files[0]

        const storageRef = ref(storage, `images/${user.uid}/messages/${'chat_' + userChat.chatId}/${'message_' + photoData.lastModified}`)

        uploadBytes(storageRef, photoData).then(snapshot => {
          getDownloadURL(ref(snapshot.ref)).then(url => {
            addDoc(collection(chatRef, 'messages'), {
              message: url,
              user: user.email,
              type: type,
              timestamp: serverTimestamp()
            }).then(() => {
              setLoading(false)
              handleClosePhoto()
            })
          })
        })
        break;
    }
  }

  const handleSendPhoto = (e: any) => {
    props.setOpenDisplayPhoto()
    handleImage(e, setPhotoURL, setPhoto)
  }

  const handleClosePhoto = () => {
    props.setOpenDisplayPhoto()
    setPhotoURL('')
    setPhoto(undefined)
  }

  return (
    <>
      {props.displayPhoto ?
        <div className="flex justify-center items-center h-885">
          <div className="relative">
            <Image src={photoURL} alt="send photo" width={400} height={400} />
            <div className="flex justify-center w-full gap-4 absolute -bottom-6">
              <button className={`w-12 h-12 hover:brightness-90 ${loading && 'pointer-events-none'}`}><Image src={DeleteImage} alt="close" onClick={handleClosePhoto} /></button>
              <button className={`w-12 h-12 hover:brightness-90 ${loading ? 'ease-linear duration-150 pointer-events-none' : ''}`} onClick={() => handleSendMessage('photo')}>
                {loading ?
                  <svg aria-hidden="true" role="status" className="inline w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#6BB0C6"></path>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                  </svg>
                  :
                  <Image src={SendMessage} alt="send" />
                }

              </button>
            </div>
          </div>
        </div>
        :
        <div className="absolute px-6 bottom-0 left-0 w-full flex items-center">
          <div className="relative flex items-center mr-5">
            <input type="file" accept="image/png, image/jpeg, image/jpg" className="w-full h-full absolute opacity-0" onChange={handleSendPhoto} />
            <button><Image src={SendPhoto} alt="" /></button>
          </div>

          <div className="absolute bottom-5 right-12 flex items-center">
            <button onClick={() => handleSendMessage('text')}><Image src={SendMessage} alt="" /></button>
          </div>
          <textarea className="bg-dark-blue border border-light-blue border-300 rounded-40xl text-gray-900 text-sm block w-full pr-20 px-10 py-7 resize-none overflow-clip active:outline-none focus:outline-none focus:text-white" placeholder="Mensagem" value={message} onChange={e => setMessage(e.target.value)} rows={1} ref={messageRef}></textarea>
        </div>
      }
    </>
  )
}