import PropTypes from 'prop-types'

const MainAppTemplate: React.FC<{ children: React.ReactNode; headerText?: string }> = ({
  children,
  headerText
}) => {
  return (
    <div className="mx-2 my-1 bg-background flex-grow rounded-lg p-4">
      {headerText ? <h1 className="font-bold text-secondaryText text-sm">{headerText}</h1> : null}

      {children}
    </div>
  )
}

MainAppTemplate.propTypes = {
  children: PropTypes.element,
  headerText: PropTypes.string
}

export default MainAppTemplate
