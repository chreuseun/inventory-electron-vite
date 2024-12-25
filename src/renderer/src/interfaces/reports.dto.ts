import { StockTransactionTypes } from './inventory.interface'

export interface IDTOShelfStockRecord {
  shelf_transaction_ID: string
  transacted_by: string
  product_id: string
  display_name: string
  quantity: number
  transaction_type: string
  reason: string
  intention: string
  created_at: string
}

export type IDTOShelfStockRecordID = 'shelf_transaction_ID'

export interface IDTOInventoryStockRecord {
  id: string
  reference_id: string
  product: string
  material: string
  material_quantity: number
  product_quantity: number
  reason: string
  intention: string
  transaction_type: StockTransactionTypes
  transacted_by: string
  created_at: string
}
