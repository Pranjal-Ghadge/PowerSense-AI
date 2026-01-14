import React from 'react'
import Data from '../assets/Data.json'

const OtherInfo = () => {
  const avg =
    (Data.reduce((sum, d) => sum + d.actual, 0) / Data.length).toFixed(2)

  const currentLoad = Data[Data.length - 1].actual

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 m-10 mb-28'>
      
      {/* Current Load */}
      <div className='border-2 border-gray-200 rounded-xl p-6 text-center bg-white shadow-sm hover:shadow-md transition'>
        <h1 className='text-gray-500 text-sm mb-3'>Current Load</h1>
        <p className='text-3xl font-bold text-gray-800 mb-2'>
          {currentLoad} kWh
        </p>
        <p className='text-gray-400 text-sm'>Latest consumption</p>
      </div>

      {/* Daily Average */}
      <div className='border-2 border-gray-200 rounded-xl p-6 text-center bg-white shadow-sm hover:shadow-md transition'>
        <h1 className='text-gray-500 text-sm mb-3'>Daily Average</h1>
        <p className='text-3xl font-bold text-gray-800 mb-2'>
          {avg} kWh
        </p>
        <p className='text-gray-400 text-sm'>Average usage</p>
      </div>

      {/* No. of Anomalies */}
      <div className='border-2 border-gray-200 rounded-xl p-6 text-center bg-white shadow-sm hover:shadow-md transition'>
        <h1 className='text-gray-500 text-sm mb-3'>No. of Anomalies</h1>
        <p className='text-3xl font-bold text-gray-800 mb-2'>
          {Data.length}
        </p>
        <p className='text-gray-400 text-sm'>Observed points</p>
      </div>

    </div>
  )
}

export default OtherInfo
