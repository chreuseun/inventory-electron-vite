import { MaterialsIcon, ProductsIcon, RecipesIcon, ReportsIcon } from '@renderer/components/icons'
import { APPLICATION_ROUTES } from './applicationRouter.config'

const SIDEBAR_ITEMS = {
  DASHBOARD: {
    label: 'Dashboard'
  },
  MANAGE_MATERIALS: {
    label: 'Manage Materials',
    path: APPLICATION_ROUTES.MANAGE_MATERIALS.path,
    icon: MaterialsIcon
  },
  MANAGE_PRODUCTS: {
    label: 'Manage Products',
    path: APPLICATION_ROUTES.MANAGE_PRODUCTS.path,
    icon: ProductsIcon
  },
  MANAGE_RECIPES: {
    label: 'Manage Recipes',
    path: APPLICATION_ROUTES.MANAGE_RECIPES.path,
    icon: RecipesIcon
  },
  REPORTS: {
    label: 'Reports',
    path: APPLICATION_ROUTES.MANAGE_REPORTS.path,
    icon: ReportsIcon
  }
}

const SIDEBAR_DISPLAY_ARRAY = [
  SIDEBAR_ITEMS.MANAGE_MATERIALS,
  SIDEBAR_ITEMS.MANAGE_PRODUCTS,
  SIDEBAR_ITEMS.MANAGE_RECIPES,
  SIDEBAR_ITEMS.REPORTS
]

export { SIDEBAR_ITEMS, SIDEBAR_DISPLAY_ARRAY }
