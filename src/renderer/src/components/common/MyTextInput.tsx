import { ChangeEventHandler } from 'react'

interface IMyTextInput {
  placeholder: string
  label?: string
  type?: React.HTMLInputTypeAttribute
  className?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  value?: string | readonly string[] | number | undefined | null
  autoFocus?: boolean
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
}

const MyTextInput: React.FC<IMyTextInput> = ({
  placeholder,
  label,
  type,
  className,
  onChange,
  value,
  autoFocus = false,
  onKeyDown
}: IMyTextInput) => {
  return (
    <div className={className}>
      {label ? <div className="text-light text-xs mb-1">{label}</div> : null}
      <input
        className="bg-light text-dark p-2 px-4 rounded-lg outline-border w-full"
        type={type}
        autoFocus={autoFocus}
        placeholder={placeholder}
        onChange={onChange}
        value={value || ''}
        onKeyDown={onKeyDown}
      />
    </div>
  )
}

export default MyTextInput
