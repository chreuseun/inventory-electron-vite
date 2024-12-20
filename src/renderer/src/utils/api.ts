import { showToast } from './reactToastify'

export const handleError: (errMsg: string, callback?: (errMsg: string) => void) => void = (
  errMsg,
  callback
) => {
  showToast({
    message: errMsg,
    type: 'error'
  })

  callback && callback(errMsg)
}
