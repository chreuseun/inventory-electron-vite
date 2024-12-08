import { Provider } from 'react-redux'

import store from '@renderer/redux/store'
import AuthWrapperRoute from './routers'

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <AuthWrapperRoute />
    </Provider>
  )
}

export default App
