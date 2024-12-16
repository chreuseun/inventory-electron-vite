import { executeSQLiteQuery } from '@renderer/utils/sqlite'
import { useState } from 'react'
import { MaterialFormData } from '../reactForms/useMaterialForm'

const INSERT_ONE_MATERIAL = `
 INSERT INTO materials (
    reference_id,
    display_name,
    unit,
    format,
    price,
    category_id,
    sub_category_id,
    brand_id,
    alert_threshold,
    current_stock_quantity,
    stock_base_quantity,
    created_by,
    updated_by
  ) VALUES (
    @reference_id,
    @display_name, 
    @unit, 
    @format,
    @price,
    @category_id,
    @sub_category_id,
    @brand_id,
    @alert_threshold, 
    @current_stock_quantity, 
    @stock_base_quantity,
    @created_by,
    @updated_by
);
`
export interface ICreateMaterialItem {
  reference_id: string
  display_name: string
  unit: string
  format: string
  price: number
  category_id: string
  sub_category_id: string
  brand_id: string
  alert_threshold: number
  current_stock_quantity: number
  stock_base_quantity: number
  created_by: string
  updated_by: string | null
}

type IRunCreateMaterial = (arg: {
  newMaterial: MaterialFormData | MaterialFormData[]
}) => Promise<void>

interface IRunGetMaterialsListResult {
  success: boolean
  error: string | null
  result: {
    insertedCount: number
  }
}

type IUseCreateMaterialsList = (args: {
  onCompleted?: (data: IRunGetMaterialsListResult) => void
  onError?: (err: string) => void
}) => {
  loading: boolean
  runCreateMaterial: IRunCreateMaterial
}

const useCreateMaterial: IUseCreateMaterialsList = ({ onCompleted, onError }) => {
  const [loading, setLoading] = useState(false)

  const runCreateMaterial: IRunCreateMaterial = async ({ newMaterial }) => {
    setLoading(true)

    const params: ICreateMaterialItem[] = Array.isArray(newMaterial)
      ? newMaterial.map((i) => {
          return {
            ...i,
            reference_id: i.display_name.toLowerCase(),
            category_id: '',
            sub_category_id: '',
            brand_id: '',
            updated_by: null,
            created_by: ''
          }
        })
      : [
          {
            ...newMaterial,
            reference_id: newMaterial.display_name.toLowerCase(),
            category_id: '',
            sub_category_id: '',
            brand_id: '',
            updated_by: null,
            created_by: ''
          }
        ]

    const response = (await executeSQLiteQuery({
      sql: INSERT_ONE_MATERIAL,
      action: 'bulkUpsert',
      params,
      operationName: 'useGetMaterialsList'
    })) as IRunGetMaterialsListResult

    if (onCompleted) {
      onCompleted(response)
    } else {
      !!onError && onError(`Error Message`)
    }

    setLoading(false)
  }
  return {
    loading,
    runCreateMaterial
  }
}

export default useCreateMaterial
