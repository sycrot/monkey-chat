import ButtonBase from "../components/form-button";
import FormLabel from "../components/form-label";

export default function SignUp() {
  return (
    <div className="flex justify-center md:items-center h-full w-full md:mt-20">
      <div className="bg-dark-blue w-full p-8 md:rounded-3xl md:w-2/3 h-screen md:h-auto">
        <h2 className="text-4xl text-white text-center md:text-left font-bold mt-9">Sign up</h2>
        <form className="mt-7">
          <div className="flex flex-wrap">
            <FormLabel text="User or e-mail" type="text" id="email" placeholder="example@example.com" />
          </div>
          <div className="flex flex-wrap mt-10">
            <FormLabel text="Password" type="password" id="password" placeholder="*********" />
          </div>
          <div className="flex flex-wrap mt-10">
            <FormLabel text="Repeat password" type="password" id="repeatPassword" placeholder="*********" />
          </div>
          <div className="flex flex-wrap flex-col mt-14">
            <ButtonBase type="button" text="Sign up" />
          </div>
        </form>
      </div>
    </div>
  )
}