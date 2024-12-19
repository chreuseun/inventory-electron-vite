import { SIDEBAR_DISPLAY_ARRAY } from '@renderer/configs/sidebar.config'
import React, { useState } from 'react'
import { NavLink } from 'react-router'

import appIcon from '@renderer/assets/icon.png'

const MySidebar: React.FC = () => {
  const [showSideBar, setShowSidebar] = useState(false)

  return (
    <React.Fragment>
      {showSideBar ? (
        <div
          onMouseLeave={() => {
            setShowSidebar(false)
          }}
          className={`flex bg-background w-52 flex-shrink-0  flex-col items-center transition-transform duration-300 translate-x-300`}
        >
          <div className="h-24 border w-24 overflow-hidden rounded-full m-3">
            <img src={appIcon} className="w-full h-full" />
          </div>
          <div className="flex-grow overflow-y-auto w-full">
            {SIDEBAR_DISPLAY_ARRAY.map((items) => {
              const { label, path, icon: SideBarIcon } = items

              return (
                <NavLink to={path} key={label}>
                  {({ isActive }) => {
                    return (
                      <div
                        className={`flex flex-row items-center mb-1 border-gray-400 px-4 py-4 ${isActive ? 'bg-secondaryBackground  text-white border-b-2' : 'hover:bg-dark'} cursor-pointer text-light`}
                      >
                        <SideBarIcon className="mr-1" />
                        <span className="text-xs"> {label}</span>
                      </div>
                    )
                  }}
                </NavLink>
              )
            })}
          </div>
          <div
            className="cursor-pointer p-2 text-right font-bold text-xs w-full"
            onClick={() => {
              setShowSidebar(false)
            }}
          >{`<< Hide Sidebar `}</div>
        </div>
      ) : (
        <div
          className="bg-background"
          onMouseEnter={() => {
            setShowSidebar(true)
          }}
        >
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
