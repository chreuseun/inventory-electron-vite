import { Provider } from 'react-redux'

import store from '@renderer/redux/store'
import AuthWrapperRoute from './routers'
import { ToastContainer } from 'react-toastify'

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <AuthWrapperRoute />
      <ToastContainer />
    </Provider>
  )
}

export default App
