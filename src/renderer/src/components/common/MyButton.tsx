import React from 'react'

const MyButton: React.FC<{
  onClick: React.MouseEventHandler<HTMLButtonElement>
  className?: string
  label: string | null
}> = ({ onClick, label, className }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border-border border hover:bg-light hover:border-light  hover:text-dark text-light font-bold p-2 text-xs px-4 ${className}`}
    >
      {label || ''}
    </button>
  )
}

export default MyButton
