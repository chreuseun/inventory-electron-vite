import { MyButton } from '@renderer/components/common'
import { MainAppTemplate, TableListTemplate } from '@renderer/components/templates'
import { APPLICATION_ROUTES } from '@renderer/configs/applicationRouter.config'
import { navigateToScreen } from '@renderer/utils/navigate'
import { useNavigate } from 'react-router'
import { useGetProductsInventory } from '@renderer/hooks/products'
import React, { useEffect } from 'react'
import { IDTOProductPotentialStock } from '@renderer/interfaces/dtos/products.dto'
import ProductPotentialInventoryView from './components/ProductPotentialInventoryView'
import ProductShelfInventoryUpdateView from './components/ProductShelfInventoryUpdateView'
import { IRowConfigs } from '@renderer/interfaces/tableTemplate.interface'

const generateProductInventoryRowConfig: (product: IDTOProductPotentialStock) => IRowConfigs = (
  product
) => {
  const { display_name } = product

  return [
    display_name,
    <ProductPotentialInventoryView key={'potential_stock'} product={product} />,
    <ProductShelfInventoryUpdateView key={'shelf_stock'} product={product} />
  ]
}

const ProductsMainPage: React.FC = () => {
  const navigate = useNavigate()
  const { fetchingProducts, runGetProductsInventory, products } = useGetProductsInventory()

  useEffect(() => {
    runGetProductsInventory()
  }, [])

  return (
    <MainAppTemplate
      headerText="Manage Products"
      className="flex flex-col"
      loading={fetchingProducts}
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
        </div>
        <TableListTemplate
          listTitle="Products"
          columns={['Product', 'Stock', 'Shelf Stock']}
          data={products}
          rowConfig={generateProductInventoryRowConfig}
        />
      </div>
    </MainAppTemplate>
  )
}

export default ProductsMainPage
