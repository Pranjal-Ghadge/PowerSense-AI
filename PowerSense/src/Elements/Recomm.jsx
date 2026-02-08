import React from 'react'

const Recomm = () => {
  return (
    <div className='rounded-2xl p-4 bg-white border border-gray-200 shadow-sm'>
      <div className='flex gap-3 items-start border-l-4 border-l-green-400 pl-4'>
        <div className='w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-blue-600 text-xl shadow-sm'>
          ⚡
        </div>
        <div className='flex-1'>
          <div className='flex justify-between items-center flex-wrap gap-2'>
            <h2 className='text-lg font-semibold text-gray-800 leading-tight'>
              High consumption spike detected at 6:00 PM
            </h2>
            <span className='text-xs text-gray-700 border border-gray-200 rounded-full px-3 py-1 bg-gray-50'>
              High Impact
            </span>
          </div>
          <p className='text-gray-700 text-sm mt-2 leading-relaxed'>
            Consider investigating HVAC systems or production equipment during peak hours.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Recomm
