import React from 'react'

import { HashRouter as Router, Route, Routes } from 'react-router'

import { LoginPage } from '@renderer/components/pages'

const PublicRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default PublicRouter
