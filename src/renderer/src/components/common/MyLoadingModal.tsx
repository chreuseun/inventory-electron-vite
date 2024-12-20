import PropTypes from 'prop-types'

const MyLoadingModal: React.FC<{ show: boolean }> = ({ show }) => {
  if (show) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
        <div className="bg-light p-8 rounded shadow-lg flex flex-col items-center">
          <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-16 h-16"></div>
          <p className="mt-4 text-dark">Loading...</p>
        </div>
      </div>
    )
  } else {
    return null
  }
}

MyLoadingModal.propTypes = {
  show: PropTypes.bool.isRequired
}

export default MyLoadingModal
