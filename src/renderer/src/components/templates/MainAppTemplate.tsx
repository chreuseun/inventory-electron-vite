import PropTypes from 'prop-types'
import { useNavigate } from 'react-router'
import { MyLoadingModal } from '../common'

const MainAppTemplate: React.FC<{
  children: React.ReactNode
  headerText?: string
  className?: string
  allowGoBack?: boolean
  loading?: boolean
}> = ({ children, headerText, className, allowGoBack, loading }) => {
  const navigation = useNavigate()

  const onDefaultGoBack: () => void = () => {
    navigation(-1)
  }

  return (
    <div className={`m-4 shadow-2xl bg-background flex-grow rounded-lg p-4 ${className || ''}`}>
      <div className="flex items-center mb-2">
        {allowGoBack ? (
          <div
            onClick={onDefaultGoBack}
            className="px-6 py-2 p-1 border mr-2 rounded-full cursor-pointer hover:bg-light text-light hover:text-background"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 13h-3"
              />
            </svg>
          </div>
        ) : null}
        {headerText ? <h1 className="font-bold text-secondaryText text-sm">{headerText}</h1> : null}
      </div>
      {children}
      <MyLoadingModal show={!!loading} />
    </div>
  )
}

MainAppTemplate.propTypes = {
  children: PropTypes.element,
  headerText: PropTypes.string,
  className: PropTypes.string,
  allowGoBack: PropTypes.bool,
  loading: PropTypes.bool
}

export default MainAppTemplate
