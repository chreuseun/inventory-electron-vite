import React from 'react'

const MaterialCardItem: React.FC<{ material }> = ({ material }) => {
  return (
    <div className="bg-light text-dark shadow-md rounded-lg p-4 m-2">
      <h2 className="text-xl font-bold mb-2">{material.display_name}</h2>
      <p className="text-sm text-gray-600 mb-4">Reference ID: {material.reference_id}</p>
      <p className="text-lg font-semibold">Price: ${material.price}</p>
      <p>Unit: {material.unit}</p>
      <p>Format: {material.format}</p>
      <p>Stock: {material.current_stock_quantity}</p>
      <p>Alert Threshold: {material.alert_threshold}</p>
      <p className="text-xs text-gray-500 mt-4">Created At: {material.created_at}</p>
    </div>
  )
}

export default MaterialCardItem
