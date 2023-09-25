'use client'
import Image from "next/image";
import Logo from '../../../public/logo-monkey.png'
import ButtonBase from "../components/form-button";
import FormLabel from "../components/form-label";
import React from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/user/actions";
import { AppDispatch } from "../redux/store";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Login() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const dispatch = useDispatch<AppDispatch>()
  const [invalidUser, setInvalidUser] = React.useState(false)
  const [invalidPassword, setInvalidPassword] = React.useState(false)
  const [loadingButton, setLoadingButton] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (username === '') {
      setInvalidUser(true)
    } else {
      setInvalidUser(false)
    }

    if (password === '') {
      setInvalidPassword(true)
    } else {
      setInvalidPassword(false)
    }

    if (username !== '' && password !== '') {
      setLoadingButton(true)
      signInWithEmailAndPassword(auth, username, password).then((userCredential) => {
        const user = userCredential.user
        setInvalidUser(false)
        setInvalidPassword(false)
        dispatch(loginUser({ uid: user.uid, username: username, password: password }))
        setLoadingButton(false)
      }).catch(err => {
        setLoadingButton(false)
        setInvalidUser(true)
        setInvalidPassword(true)
        console.log(`${err.code}: ${err.message}`)
        if (err.code === 'auth/user-not-found') {
          setErrorMessage('User not found')
        }
        if (err.code === 'auth/wrong-password') {
          setErrorMessage('Incorrect email or password')
        }
      })
    }
  }

  return (
    <div className="flex justify-center md:items-center md:h-full w-full">
      <div className="bg-dark-blue w-full md:rounded-3xl md:w-2/3 md:flex">
        <div className="md:bg-extradark-blue p-8 flex items-center md:w-2/5 md:rounded-l-3xl">
          <Image src={Logo} alt="Logo Monkey" className="mx-auto w-44" />
        </div>
        <div className="p-8 md:w-3/5">
          <h2 className="text-4xl text-white text-center md:text-left font-bold">Login</h2>
          <form className="mt-7" onSubmit={handleOnSubmit}>
            <div className="flex flex-wrap">
              <FormLabel text="User or e-mail" type="text" id="email" placeholder="example@example.com" onChange={e => setUsername(e.target.value)} value={username} textError={errorMessage} invalid={invalidUser} className="w-full"/>
            </div>
            <div className="flex flex-wrap mt-10">
              <FormLabel text="Password" type="password" id="password" placeholder="*******" onChange={e => setPassword(e.target.value)} value={password} invalid={invalidPassword} className="w-full"/>
            </div>
            <div className="flex flex-wrap flex-col mt-14">
              <ButtonBase type="button" text="Enter" loading={loadingButton} />
              <ButtonBase type="link" link="signup" text="Sign up" />
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}