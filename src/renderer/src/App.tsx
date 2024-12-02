import { Provider } from 'react-redux'

import PublicRouter from '@renderer/routers/PublicRouter'
import store from '@renderer/redux/store'

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PublicRouter />
    </Provider>
  )
}

export default App
