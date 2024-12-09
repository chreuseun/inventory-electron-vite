import { SIDEBAR_DISPLAY_ARRAY } from '@renderer/configs/sidebar.config'
import { NavLink, useLocation } from 'react-router'

const MySidebar: React.FC = () => {
  const { pathname } = useLocation()

  return (
    <div className="hidden md:block w-52 bg-background">
      <div className="h-32 mb-4 rounded-full text-sm">{pathname}</div>
      {SIDEBAR_DISPLAY_ARRAY.map((items) => {
        const { label, path } = items

        return (
          <NavLink to={path} key={label}>
            {({ isActive }) => {
              return (
                <div
                  className={`flex flex-row items-center mb-1 border-gray-400 px-4 py-4 ${isActive ? 'bg-secondaryBackground border-b-2' : 'hover:bg-dark'} cursor-pointer`}
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
            }}
          </NavLink>
        )
      })}
    </div>
  )
}

export default MySidebar
