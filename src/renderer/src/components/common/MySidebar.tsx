import { SIDEBAR_DISPLAY_ARRAY } from '@renderer/configs/sidebar.config'

const MySidebar: React.FC = () => {
  return (
    <div className="hidden md:block w-52 bg-background">
      <div className="h-32 mb-4 rounded-full"></div>
      {SIDEBAR_DISPLAY_ARRAY.map((items, index) => {
        const { label } = items
        const isActive = index === 0

        return (
          <div
            className={`flex flex-row items-center mb-1 border-gray-400 px-4 py-4 ${isActive ? 'bg-secondaryBackground border-b-2' : 'hover:bg-dark'} cursor-pointer`}
            key={label}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M3 3h4v4H3V3zm0 6h4v4H3v-4zm0 6h4v4H3v-4zm6-12h8v4h-8V3zm0 6h8v4h-8V9zm0 6h8v4h-8v-4z" />
            </svg>

            <span className="t  ext-sm"> {label}</span>
          </div>
        )
      })}
    </div>
  )
}

export default MySidebar
