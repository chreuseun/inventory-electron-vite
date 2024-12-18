import React from 'react'

const MaterialCardItem: React.FC<{ material }> = ({ material }) => {
  return (
    <div className="w-full sm:w-1/6 text-xs bg-light text-dark rounded-lg p-2 mb-1 mr-1 shadow-md">
      <h2 className="font-bold">
        {material.current_stock_quantity} - {material.display_name}
      </h2>

      <div>
        <p className="text-sectBorder text-px9">
          {material.format || '??'}
          {material.unit || '??'}
        </p>

        {/* <p>Stock: {material.current_stock_quantity}</p> */}
        {/* <p>Alert Threshold: {material.alert_threshold}</p> */}
      </div>
    </div>
  )
}

export default MaterialCardItem
