import { useSelectorAuthSlice } from '@renderer/hooks/reduxSelectors'
import ApplicationRouter from '@renderer/routers/ApplicationRouter'
import PublicRouter from '@renderer/routers/PublicRouter'
import { useEffect } from 'react'

const AuthWrapperRoute: React.FC = () => {
  const { isAuthorized } = useSelectorAuthSlice()

  useEffect(() => {
    console.log('--isAuthorized:', isAuthorized)
  }, [isAuthorized])

  if (isAuthorized) {
    return <ApplicationRouter />
  }

  return <PublicRouter />
}

export default AuthWrapperRoute
