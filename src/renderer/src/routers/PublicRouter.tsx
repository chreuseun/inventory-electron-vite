import React from 'react'

import { HashRouter as Router, Route, Routes } from 'react-router'

import { HomePage, ProfilePage, LandingPage, LoginPage } from '@renderer/components/pages'

const PublicRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </Router>
  )
}

export default PublicRouter
