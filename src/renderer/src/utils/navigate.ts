import { NavigateFunction } from 'react-router'

const navigateToScreen: (
  navigate: NavigateFunction,
  args: {
    path: string
    replace: boolean
  }
) => void = (navigate, { path, replace = false }) => {
  navigate(path, {
    replace
  })
}

export { navigateToScreen }
