import React from 'react'

import { HashRouter as Router, Route, Routes, Navigate } from 'react-router'

import {
  MaterialFormPage,
  MaterialsMainPage,
  ProductsMainPage,
  RecipesMainPage,
  ReportsMainPage,
  ProductFormPage,
  RecipeFormPage
} from '@renderer/components/pages'
import { MySidebar } from '@renderer/components/common'
import { APPLICATION_ROUTES } from '@renderer/configs/applicationRouter.config'

const PublicRouter: React.FC = () => {
  return (
    <Router>
      <div className="h-full   flex justify-start bg-secondaryBackground">
        <MySidebar />
        <Routes>
          <Route path={APPLICATION_ROUTES.MANAGE_MATERIALS.path} element={<MaterialsMainPage />} />
          <Route path={APPLICATION_ROUTES.MANAGE_PRODUCTS.path} element={<ProductsMainPage />} />
          <Route path={APPLICATION_ROUTES.MANAGE_RECIPES.path} element={<RecipesMainPage />} />
          <Route path={APPLICATION_ROUTES.MANAGE_REPORTS.path} element={<ReportsMainPage />} />
          <Route path={APPLICATION_ROUTES.MATERIAL_FORM.path} element={<MaterialFormPage />} />
          <Route path={APPLICATION_ROUTES.PRODUCT_FORM.path} element={<ProductFormPage />} />
          <Route path={APPLICATION_ROUTES.RECIPE_FORM.path} element={<RecipeFormPage />} />
          <Route
            path="*"
            element={<Navigate to={APPLICATION_ROUTES.MANAGE_MATERIALS.path} replace />}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default PublicRouter
