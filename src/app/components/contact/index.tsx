/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import UserImage from '../../../../public/icons/user-icon.svg'

interface Props {
  name: string
  image: string
  online: boolean
  onClick: () => void
}

export default function Contact(props: Props) {
  return (
    <div onClick={props.onClick} className="flex items-center cursor-pointer hover:bg-extradark-blue ease-in-out duration-300 pl-5 pr-3 py-3">
      <div className="relative">
        <div className="rounded-50p w-10 h-10 overflow-hidden bg-light-blue flex items-center">
          <Image src={props.image !== '' ? props.image : UserImage} alt="User" width={40} height={40} className="w-full h-full object-cover"/>
        </div>
        <span className={`rounded-50p w-2 h-2 ${props.online === true ? 'bg-green' : 'bg-none border-2 border-dark-gray'} absolute right-0 bottom-0`}></span>
      </div>
      <p className='ml-2 text-base'>{props.name}</p>
    </div>
  )
}