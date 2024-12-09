import PropTypes from 'prop-types'

const MainAppTemplate: React.FC<{
  children: React.ReactNode
  headerText?: string
  className?: string
}> = ({ children, headerText, className }) => {
  return (
    <div className={`m-4 bg-background flex-grow rounded-lg p-4 ${className || ''}`}>
      {headerText ? <h1 className="font-bold text-secondaryText text-sm">{headerText}</h1> : null}
      {children}
    </div>
  )
}

MainAppTemplate.propTypes = {
  children: PropTypes.element,
  headerText: PropTypes.string,
  className: PropTypes.string
}

export default MainAppTemplate
