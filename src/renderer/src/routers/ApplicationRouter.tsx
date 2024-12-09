import React from 'react'

import { HashRouter as Router, Route, Routes, Navigate } from 'react-router'

import { MaterialsMainPage, HomePage } from '@renderer/components/pages'
import { MySidebar } from '@renderer/components/common'
import { APPLICATION_ROUTES } from '@renderer/configs/applicationRouter.config'

const PublicRouter: React.FC = () => {
  return (
    <Router>
      <div className="h-full overflow-y-scroll flex justify-start bg-secondaryBackground">
        <MySidebar />
        <Routes>
          <Route path={APPLICATION_ROUTES.HOME.path} element={<HomePage />} />
          <Route path={APPLICATION_ROUTES.MANAGE_MATERIALS.path} element={<MaterialsMainPage />} />
          <Route path="*" element={<Navigate to={APPLICATION_ROUTES.HOME.path} replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default PublicRouter
