/* eslint-disable @next/next/no-img-element */
'use client'
import React from "react";
import ButtonBase from "../components/form-button";
import FormLabel from "../components/form-label";
import Image from "next/image";
import Logo from '../../../public/logo-monkey.png'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../lib/firebase";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import ShareImage from '../../../public/icons/envio.svg'
import UserImage from '../../../public/icons/user-image.svg'
import DumpIcon from '../../../public/icons/dump-icon.svg'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { handleImage } from "../lib/utils/main";

export default function SignUp() {
  const [user, setUser] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [photo, setPhoto] = React.useState<any>()
  const [photoURL, setPhotoURL] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [repeatPassword, setRepeatPassword] = React.useState('')
  const [invalidPassword, setInvalidPassword] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [invalidEmail, setInvalidEmail] = React.useState(false)
  const [messageError, setMessageError] = React.useState('')
  const router = useRouter()

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)

    if (password !== repeatPassword) {
      setInvalidPassword(true)
      setMessageError('Passwords do not match')
      setLoading(false)
    } else {
      setInvalidPassword(false)
      setInvalidEmail(false)
      createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const userData = userCredential.user

        const photoData = photo?.target.files[0]

        const storageRef = ref(storage, `images/${userData.uid}/perfil/${'profile_' + userData.uid}`)

        uploadBytes(storageRef, photoData).then(snapshot => {
          getDownloadURL(ref(snapshot.ref)).then(url => {
            setDoc(doc(db, 'users', userData.uid), {
              email: userData.email,
              name: user,
              photoURL: url
            }).then(() => {
              setLoading(false)
              router.push('/')
            })
          })
        })
      }).catch(err => {
        if (err.code === 'auth/invalid-email') {
          setInvalidEmail(true)
          setMessageError('Invalid e-mail')
        }
        if (err.code === 'auth/email-already-in-use') {
          setInvalidEmail(true)
          setMessageError('Email already in use')
        }
        if (err.code === 'auth/missing-password') {
          setInvalidPassword(true)
          setMessageError('Missing password')
        }
        if (err.code === 'auth/weak-password') {
          setInvalidPassword(true)
          setMessageError('Password should be at least 6 characters')
        }
        setLoading(false)
      })
    }

    e.preventDefault()
  }


  return (
    <div className="flex justify-center md:items-center w-full md:h-screen">
      <div className="bg-dark-blue w-full md:rounded-3xl md:w-2/3 md:h-auto md:flex">
        <div className="md:bg-extradark-blue p-8 flex items-center md:w-2/5 md:rounded-l-3xl">
          <Image src={Logo} alt="Logo Monkey" className="mx-auto w-44" />
        </div>
        <div className="p-8 md:w-3/5">
          <h2 className="text-4xl text-white text-center md:text-left font-bold mt-9">Sign up</h2>
          <form className="mt-7" onSubmit={handleOnSubmit}>
            <div className="w-full flex justify-center relative">
              <div className="relative">
                <div className="rounded-50p overflow-hidden w-form-photo h-form-photo bg-extradark-blue relative flex items-center justify-center">
                  <Image src={photoURL === '' ? UserImage : photoURL} alt="Avatar" width={120} height={120} className={`w-full h-full object-cover ${photoURL === '' && 'max-w-82 max-h-82'}`}/>
                </div>
                <div className={`rounded-50p overflow-hidden ${photoURL === '' ? 'bg-light-blue' : 'bg-red'} w-8 h-8 absolute bottom-0 right-0 flex items-center justify-center cursor-pointer`}>
                  {photoURL === '' ?
                    <>
                      <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg, image/jpg" className="absolute w-full h-full opacity-0" onChange={e => handleImage(e, setPhotoURL, setPhoto)} />
                      <Image src={ShareImage} alt="edit" />
                    </>
                    :
                    <>
                      <button type="button" className="absolute w-full h-full opacity-0" onClick={e => setPhotoURL('')} />
                      <Image src={DumpIcon} alt="edit" />
                    </>
                  }

                </div>
              </div>
            </div>
            <div className="flex flex-wrap mt-10 gap-4">
              <FormLabel text="E-mail" type="text" id="email" placeholder="example@example.com" onChange={e => setEmail(e.target.value)} value={email} invalid={invalidEmail} textError={messageError} className="w-full md:w-form" />
              <FormLabel text="Username" type="text" id="user" placeholder="user" onChange={e => setUser(e.target.value)} value={user} className="w-full md:w-form md:mt-0" />
            </div>
            <div className="flex flex-wrap mt-4 md:mt-10 gap-4">
              <FormLabel text="Password" type="password" id="password" placeholder="*********" onChange={e => setPassword(e.target.value)} value={password} invalid={invalidPassword} textError={messageError} className="w-full md:w-form" />
              <FormLabel text="Repeat password" type="password" id="repeatPassword" placeholder="*********" onChange={e => setRepeatPassword(e.target.value)} value={repeatPassword} invalid={invalidPassword} className="w-full md:w-form" />
            </div>
            <div className="flex flex-wrap mt-10">

            </div>
            <div className="flex flex-wrap flex-col mt-14">
              <ButtonBase type="button" text="Sign up" loading={loading} />
              <ButtonBase type="link" text="Login" link="/" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}