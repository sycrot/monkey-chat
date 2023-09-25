import React from "react";
import Image from "next/image";
import ArrowLeft from '../../../../public/icons/arrow-left.svg'
import { useDispatch, useSelector } from "react-redux";
import EditIcon from '../../../../public/icons/edit-profile.svg'
import CheckIcon from '../../../../public/icons/check-profile.svg'
import EditPhotoIcon from '../../../../public/icons/edit-photo-profile.svg'
import { db, storage } from "@/app/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { handleBack, handleImage } from "@/app/lib/utils/main";
import { loginUser } from "@/app/redux/user/actions";

interface Props {
  open: boolean
  setOpenProfile: () => void
}

export default function UserProfile(props: Props) {
  const refBody = React.useRef<any>(null);
  const { user } = useSelector((rootReducer: any) => rootReducer.userReducer)
  const [openInput, setOpenInput] = React.useState(false)
  const [name, setName] = React.useState('')
  const [photo, setPhoto] = React.useState<any>()
  const [photoURL, setPhotoURL] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [incorrectName, setIncorrectName] = React.useState(false)
  const [incorrectMessage, setIncorrectMessage] = React.useState('')
  const dispatch = useDispatch()

  React.useEffect(() => {
    const handleName = () => {
      setName(user?.name)
    }
    handleName()
  }, [user?.name])

  const handleUpdateName = async (e: any) => {
    if (e.keyCode === 13 || e.type === 'click') {
      if (name.length === 0 || !name.trim()) {
        setIncorrectName(true)
        setIncorrectMessage('Nome não pode ser vazio')
      } else {
        setIncorrectName(false)
        const userRef = doc(db, 'users', user?.uid)

        await updateDoc(userRef, {
          name: name
        }).then(() => {
          dispatch(loginUser({...user, name: name}))
          setOpenInput(false)
        })
      }
    }
  }

  const updateImage = () => {
    setLoading(true)

    const photoData = photo?.target.files[0]

    const storageRef = ref(storage, `images/${user?.uid}/perfil/${'profile_' + user?.uid}`)

    deleteObject(storageRef)

    uploadBytes(storageRef, photoData).then(snapshot => {
      getDownloadURL(ref(snapshot.ref)).then(url => {
        updateDoc(doc(db, 'users', user?.uid), {
          photoURL: url
        }).then(() => {
          setLoading(false)
          setPhotoURL('')
        })
      })
    })
  }

  const handleBackPage = () => {
    handleBack(refBody, props.setOpenProfile)
    setName(user?.name)
    setIncorrectName(false)
    setPhotoURL('')
  }

  return (
    <div ref={refBody} className={`w-full py-8 px-5 h-full absolute top-0 left-0 z-10 bg-dark-blue ${props.open === true ? 'block' : 'hidden'} animate-push`}>
      <div className="flex items-center mb-6">
        <button className="mr-3" onClick={handleBackPage}><Image src={ArrowLeft} alt="Arrow" /></button>
        <h2 className="text-3xl font-bold">Perfil</h2>
      </div>
      <div className="relative ml-auto mr-auto w-136">
        <div className="rounded-50p w-136 h-136 overflow-hidden bg-light-blue flex items-center">
          <Image src={photoURL === '' ? user?.photoURL : photoURL} alt="avatar" width={136} height={136} className="w-full h-full object-cover" />
        </div>

        {photoURL === '' ?
          <button className={`rounded-50p w-8 h-8 ${photoURL === '' ? 'bg-extralight-blue' : 'bg-white'} flex justify-center items-center absolute bottom-0 right-0`} >
            <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg, image/jpg" className="absolute w-full h-full opacity-0" onChange={e => handleImage(e, setPhotoURL, setPhoto)} />
            <Image src={EditPhotoIcon} alt="Edit photo" />
          </button>
          :
          <button className={`rounded-50p w-8 h-8 ${photoURL === '' ? 'bg-extralight-blue' : 'bg-white'} flex justify-center items-center absolute bottom-0 right-0 ${loading ? 'ease-linear duration-150' : ''}`} onClick={updateImage}>
            {loading ?
              <svg aria-hidden="true" role="status" className="inline w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#6BB0C6"></path>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
              </svg>
              :
              <Image src={CheckIcon} alt="Update image" />
            }
          </button>
        }
      </div>
      <div className="mt-14 flex flex-col">
        <span className="font-bold text-base">Name</span>
        {openInput === false ?
          <div className="flex justify-between mt-2">
            <span className="text-base">{user?.name}</span>
            <button onClick={() => setOpenInput(true)}><Image src={EditIcon} alt="edit" /></button>
          </div>
          :
          <>
            <div className="flex justify-between mt-2 relative">
              <input type="text" value={name} onChange={e => setName(e.target.value)} className={`bg-transparent outline-none border-b-2 ${incorrectName ? 'border-red' : 'border-light-blue'} w-full h-6 py-4 text-base`} placeholder="name" onKeyDown={handleUpdateName} />
              <button className="absolute right-0"><Image src={CheckIcon} alt="Check" onClick={handleUpdateName} /></button>
            </div>
            <span className={`${incorrectName ? 'block' : 'hidden'} text-base text-red mt-1`}>{incorrectMessage}</span>
          </>

        }

      </div>

    </div>
  )
}