import PropTypes from 'prop-types'

const LoadingModal: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  if (!isOpen) return null // Return nothing if `isOpen` is false

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg flex flex-col items-center">
        <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-16 h-16"></div>
        <p className="mt-4 text-gray-700">Loading...</p>
      </div>
    </div>
  )
}

LoadingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired
}

export default LoadingModal
