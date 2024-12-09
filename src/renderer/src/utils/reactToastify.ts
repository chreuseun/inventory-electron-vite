import { toast } from 'react-toastify'

const showToast: (args: {
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}) => void = ({ message, type }) => {
  switch (type) {
    case 'success':
      toast.success(message)
      break
    case 'error':
      toast.error(message)
      break
    case 'info':
      toast.info(message)
      break
    case 'warning':
      toast.warn(message)
      break
    default:
      toast(message)
  }
}

export { showToast }
