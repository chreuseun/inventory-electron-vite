interface IMyTextInput {
  placeholder: string
  label?: string
}

const MyTextInput: React.FC<IMyTextInput> = ({ placeholder, label }: IMyTextInput) => {
  return (
    <div className="">
      {label ? <div className="text-light text-xs mb-1">{label}</div> : null}
      <input
        className="bg-light text-dark p-2 rounded-lg outline-border w-full"
        type={'password'}
        placeholder={placeholder}
      />
    </div>
  )
}

export default MyTextInput
