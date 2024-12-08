import React from 'react'

import { HashRouter as Router, Route, Routes, Navigate } from 'react-router'

import { HomePage, ProfilePage, LandingPage } from '@renderer/components/pages'
import { MySidebar } from '@renderer/components/common'

const PublicRouter: React.FC = () => {
  return (
    <Router>
      <div className="h-full overflow-y-scroll flex justify-start  border border-red-500">
        <MySidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default PublicRouter
