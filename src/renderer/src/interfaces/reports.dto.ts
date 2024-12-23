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
