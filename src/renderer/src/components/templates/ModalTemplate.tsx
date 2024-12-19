/* eslint-disable react/prop-types */
import { ReactNode } from 'react'

const ModalTemplate: React.FC<{
  children?: ReactNode
}> = ({ children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      {children}
    </div>
  )
}

export default ModalTemplate
