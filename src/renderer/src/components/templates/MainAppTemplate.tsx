import PropTypes from 'prop-types'

const MainAppTemplate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="mx-2 my-1 bg-background flex-grow rounded-lg p-4">
      <h1 className="font-bold text-secondaryText text-sm">
        Manage Materials
        {children}
      </h1>
    </div>
  )
}

MainAppTemplate.propTypes = {
  children: PropTypes.element
}

export default MainAppTemplate
