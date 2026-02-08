import React from 'react'

const AnomalyCard = ({
  label,
  severity,
  borderColor,
  bgColor,
  textColor,
  buttonBg,
  data,
  deviation
}) => {
  return (
    <div className='bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden'>
      <div className={`px-4 py-4 ${bgColor} ${borderColor}`}>
        <div className='flex items-center gap-2 text-orange-600 mb-3'>
          <span className='text-lg'>⚠</span>
          <span className='text-sm text-gray-700'>{label}</span>
          <span className='text-xs text-gray-500'>- 12:00 PM</span>
        </div>

        <div className='flex items-center justify-between'>
          <div>
            <p className='text-gray-600 text-xs'>Actual</p>
            <p className='text-lg font-semibold text-gray-800'>{data.actual} kWh</p>
          </div>
          <div>
            <p className='text-gray-600 text-xs'>Predicted</p>
            <p className='text-lg font-semibold text-gray-800'>{data.predicted} kWh</p>
          </div>
          <div className='text-right'>
            <p className='text-gray-600 text-xs'>Deviation</p>
            <p className='text-lg font-semibold text-gray-800'>{deviation} %</p>
          </div>
        </div>

        <div className='flex justify-end mt-3'>
          <span className={`${buttonBg} ${textColor} px-4 py-1 rounded-full text-sm font-semibold`}>
            {severity}
          </span>
        </div>
      </div>
    </div>
  )
}

export default AnomalyCard
