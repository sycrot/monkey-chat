import Image from "next/image";
import Link from "next/link";
import Logo from '../../../public/logo-monkey.png'
import ButtonBase from "../components/form-button";
import FormLabel from "../components/form-label";

export default function Login() {
  return (
    <div className="flex justify-center md:items-center h-full w-full">
      <div className="bg-dark-blue w-full p-8 md:rounded-3xl md:w-2/3">
        <Image src={Logo} alt="Logo Monkey" className="mx-auto w-40"/>
        <h2 className="text-4xl text-white text-center md:text-left font-bold">Login</h2>
        <form className="mt-7">
          <div className="flex flex-wrap">
            <FormLabel text="User or e-mail" type="text" id="email" placeholder="example@example.com" />
          </div>
          <div className="flex flex-wrap mt-10">
            <FormLabel text="Password" type="password" id="password" placeholder="*********" />
          </div>
          <div className="flex flex-wrap flex-col mt-14">
            <ButtonBase type="button" text="Login" />
            <ButtonBase type="link" text="Sign up" link="/signup" />
          </div>
        </form>
      </div>
    </div>
  )
}