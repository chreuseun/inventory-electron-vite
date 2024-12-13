import { SIDEBAR_DISPLAY_ARRAY } from '@renderer/configs/sidebar.config'
import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router'

const MySidebar: React.FC = () => {
  const { pathname } = useLocation()

  const [showSideBar, setShowSidebar] = useState(false)

  return (
    <React.Fragment>
      {showSideBar ? (
        <div className={`flex bg-background w-52 flex-shrink-0  flex-col`}>
          <div className="h-32 mb-4 rounded-full text-sm text-white">{pathname}</div>

          <div className="border flex-grow overflow-y-auto">
            {SIDEBAR_DISPLAY_ARRAY.map((items) => {
              const { label, path } = items

              return (
                <NavLink to={path} key={label}>
                  {({ isActive }) => {
                    return (
                      <div
                        className={`flex flex-row items-center mb-1 border-gray-400 px-4 py-4 ${isActive ? 'bg-secondaryBackground  text-white border-b-2' : 'hover:bg-dark'} cursor-pointer text-light`}
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
          <div
            className="cursor-pointer p-2 text-right font-bold text-xs"
            onClick={() => {
              setShowSidebar(false)
            }}
          >{`<< Hide Sidebar `}</div>
        </div>
      ) : (
        <div className="bg-background">
          <div
            onClick={() => {
              setShowSidebar(true)
            }}
            className="cursor-pointer p-2 text-right font-bold text-xs"
          >{`>>`}</div>
        </div>
      )}
    </React.Fragment>
  )
}

export default MySidebar
