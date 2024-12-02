import { NavigateFunction } from 'react-router'

const navigateToPage: (args: { navigate: NavigateFunction; pageName: string }) => void = ({
  navigate,
  pageName
}) => {
  navigate(pageName)
}

const navigateToGoBack: (args: { navigate: NavigateFunction }) => void = ({ navigate }) => {
  navigate(-1)
}

export { navigateToPage, navigateToGoBack }
