import { IPageNames } from '@renderer/interfaces/pages.interface'
import { navigateToGoBack, navigateToPage } from '@renderer/utils/reactRouter'
import { useNavigate } from 'react-router'

const HomePage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div>
      <div>
        <button
          onClick={() => {
            navigateToGoBack({
              navigate
            })
          }}
        >
          Go Back
        </button>
      </div>
      <h1>HomePage</h1>
      <>
        <div>
          <button
            onClick={() => {
              navigateToPage({ navigate, pageName: IPageNames.HOME_PAGE })
            }}
          >
            To Home Page
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              navigateToPage({ navigate, pageName: IPageNames.LANDING_PAGE })
            }}
          >
            To Landing
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              navigateToPage({ navigate, pageName: IPageNames.PROFILE_PAGE })
            }}
          >
            To Profile
          </button>
        </div>
      </>
    </div>
  )
}

export default HomePage
