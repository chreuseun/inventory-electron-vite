import React from 'react'

import { HashRouter as Router, Route, Routes, Navigate } from 'react-router'

import { HomePage, ProfilePage, LandingPage } from '@renderer/components/pages'

const PublicRouter: React.FC = () => {
  return (
    <Router>
      <div className="border-red-500 border">
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
