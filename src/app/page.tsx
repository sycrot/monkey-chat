'use client'
import Login from './login/page'
import React from 'react'
import { auth, db } from './lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Chat from './chat/page'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { loginUser } from './redux/user/actions'
import { Heebo } from 'next/font/google'

const heebo = Heebo({ subsets: ['latin'] })

export default function Home() {
  const [logged, setLogged] = React.useState(false)
  const dispatch = useDispatch()

  const getUserDoc = React.useCallback(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid)

        await getDoc(userRef).then((doc) => {
          const userData = doc.data()

          dispatch(loginUser({
            uid: user.uid,
            email: userData?.email,
            name: userData?.name,
            photoURL: userData?.photoURL,
          }))

          handleOnlineUser(userRef, false)

          window.addEventListener('beforeunload', e => {
            handleOnlineUser(userRef, true)
          })
        }).catch(err => {
          console.log(err)
        })
        
        setLogged(true)
      } else {
        setLogged(false)
      }
    })
  }, [])


  React.useEffect(() => {
    getUserDoc()
  }, [getUserDoc])



  const handleOnlineUser = async (userRef: any, close: boolean) => {
    if (close) {
      await updateDoc(userRef, {
        online: false
      }).catch(() => {
        return
      })
    } else {
      await updateDoc(userRef, {
        online: true
      }).catch(() => {
        return
      })
    }
  }


  return (
    <main className={`${heebo.className} bg-light-blue h-screen`}>
      {logged === true ?
        <Chat />
        :
        <Login />
      }
    </main>
  )
}
