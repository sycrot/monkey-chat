interface Props {
  text: string
  type: string
  id: string
  placeholder?: string
}

export default function FormLabel(props: Props) {
  return (
    <>
      <label className="w-full text-base">{props.text}</label>
      <input type={props.type} placeholder={props.placeholder} id={props.id} name={props.id} className="w-full px-6 py-4 rounded-1xl bg-extradark-blue text-dark-gray text-base mt-4 outline-none" />
    </>
  )
}