import Link from "next/link"

interface Props {
  type: string
  text: string
  link?: string
}

export default function ButtonBase(props: Props) {
  return (
    <>
      {props.type === 'button' ?
        <button className="px-14 py-4 text-white font-bold bg-extralight-blue rounded-1xl mx-auto hover:bg-light-blue ease-linear duration-150" type="submit">{props.text}</button>
        :
        <Link href={props.link || ''} className="text-white font-bold text-base mx-auto mt-6 px-12 py-4 hover:bg-light-blue rounded-1xl ease-linear duration-150">{props.text}</Link>
      }

    </>

  )
}