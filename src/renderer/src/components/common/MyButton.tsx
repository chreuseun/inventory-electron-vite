import React from 'react'

const MyButton: React.FC<{
  onClick: React.MouseEventHandler<HTMLButtonElement>
  className?: string
  label: string | null
}> = ({ onClick, label, className }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg border-border border-2 hover:bg-light hover:border-light  hover:text-dark text-light font-bold p-1 ${className || ''}`}
    >
      {label || ''}
    </button>
  )
}

export default MyButton
