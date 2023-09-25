interface Props {
  text: string
  type: string
  id: string
  placeholder?: string
  value: string
  onChange: (e: any) => void
  onKeyDown?: (e: any) => void
  textError?: string
  invalid?: boolean
  className?: string
}

export default function FormLabel(props: Props) {
  return (
    <div className={props.className}>
      <label className="w-full text-base"><p className="flex justify-between">{props.text}{props.invalid === true && <span className="text-red">{props.textError}</span>}</p></label>
      <input type={props.type} placeholder={props.placeholder} id={props.id} name={props.id} className={`w-full px-6 py-4 rounded-1xl bg-extradark-blue text-dark-gray text-base mt-4 outline-none ${props.invalid === true ? 'outline-1 outline-red' : 'outline-0'}`} onChange={props.onChange} value={props.value} onKeyDown={props.onKeyDown}/>
    </div>
  )
}