import { useSelectorAuthSlice } from '@renderer/hooks/reduxSelectors'
import ApplicationRouter from '@renderer/routers/ApplicationRouter'
import PublicRouter from '@renderer/routers/PublicRouter'

const IS_DEV = true

const AuthWrapperRoute: React.FC = () => {
  const { isAuthorized } = useSelectorAuthSlice()

  if (isAuthorized || IS_DEV) {
    return <ApplicationRouter />
  }

  return <PublicRouter />
}

export default AuthWrapperRoute
