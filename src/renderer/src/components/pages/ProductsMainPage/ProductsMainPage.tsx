import { MyButton } from '@renderer/components/common'
import { MainAppTemplate } from '@renderer/components/templates'
import { APPLICATION_ROUTES } from '@renderer/configs/applicationRouter.config'
import { navigateToScreen } from '@renderer/utils/navigate'
import { useNavigate } from 'react-router'
import { useCreateProducts, useGetProductsInventory } from '@renderer/hooks/products'
import { testProducts } from '@renderer/configs/placeholders/testProducts'
import React, { useEffect } from 'react'
import { ProductsInventoryList } from './components'

const ProductsMainPage: React.FC = () => {
  const navigate = useNavigate()
  const { fetchingProducts, runGetProductsInventory, products } = useGetProductsInventory()
  const { runCreateProducts, isCreatingProducts } = useCreateProducts()

  useEffect(() => {
    runGetProductsInventory()
  }, [])

  const onRunTextProducts: () => void = () => {
    runCreateProducts({
      products: testProducts
    })
  }

  return (
    <MainAppTemplate
      headerText="Manage Products"
      className="flex flex-col"
      loading={isCreatingProducts || fetchingProducts}
    >
      <div className="p-2 flex-grow flex flex-col overflow-auto">
        <div className="mb-2 flex justify-between ">
          <MyButton
            label={`+ Product`}
            onClick={() => {
              navigateToScreen(navigate, {
                replace: false,
                path: APPLICATION_ROUTES.PRODUCT_FORM.path
              })
            }}
          />
          <MyButton label={`Add Test Products`} onClick={onRunTextProducts} />
        </div>
        <div className="border-b-sectBorder border-b-2 mb-2">Products</div>
        <div className="border border-sectBorder p-1 rounded-xs flex-grow flex flex-col overflow-auto">
          <ProductsInventoryList products={products} />
        </div>
      </div>
    </MainAppTemplate>
  )
}

export default ProductsMainPage
