export enum InventoryType {
  SHELF = 'SHELF',
  POTENTIAL = 'POTENTIAL'
}

export enum ShelfTransactionTypes {
  IN = 'IN',
  OUT = 'OUT'
}

export enum StandardTransactors {
  ADMIN = 'ADMIN',
  SYSTEM = 'SYSTEM'
}

export enum StandardInventoryReason {
  Damaged = 'Damaged',
  EXPIRED = 'Expired',
  SALE = 'Sale',
  RESTOCK_SHELF = 'Restock Shelf'
}

export enum StandardInventoryIntention {
  ADJUSTMENT = 'ADJUSTMENT',
  TRANSFER = 'TRANSFER',
  PURCHASE = 'PURCHASE'
}
