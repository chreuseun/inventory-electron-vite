import { ChangeEventHandler } from 'react'

interface IMyTextInput {
  placeholder: string
  label?: string
  type?: React.HTMLInputTypeAttribute
  className?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const MyTextInput: React.FC<IMyTextInput> = ({
  placeholder,
  label,
  type,
  className,
  onChange
}: IMyTextInput) => {
  return (
    <div className={className}>
      {label ? <div className="text-light text-xs mb-1">{label}</div> : null}
      <input
        className="bg-light text-dark p-2 px-4 rounded-lg outline-border w-full"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  )
}

export default MyTextInput
