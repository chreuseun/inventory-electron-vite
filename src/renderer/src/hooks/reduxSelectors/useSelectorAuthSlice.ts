import { IReducerState } from '@renderer/redux/reducer.inferface'
import { IAuthSliceInitialState } from '@renderer/redux/slices/authSlice'
import { useSelector } from 'react-redux'

const useAuthSelector: () => IAuthSliceInitialState = () => {
  const { auth } = useSelector((state) => state) as IReducerState

  return auth
}

export default useAuthSelector
