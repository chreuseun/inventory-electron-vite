import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router'

import { HomePage, ProfilePage, LandingPage } from '@renderer/components/pages'

const PublicRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default PublicRouter
