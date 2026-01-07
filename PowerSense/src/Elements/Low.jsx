import React from 'react'

const Low = () => {
  return (
    <div>
      <div className='m-5 border-2 border-yellow-300 rounded-lg p-4 bg-yellow-50'>
            <div className='flex justify-between mb-4 '>
            <h1 className='text-yellow-600'>Date,Time</h1>
            <button className='mr-10 bg-yellow-100 text-yellow-600 px-4 rounded-lg font-semibold'>LOW</button>
            </div>
            <div className='flex justify-between px-10 mr-30'>
              <div>
                <h1 className='text-yellow-500'>Actual</h1>
                <h2 className="text-yellow-600 font-semibold">xyz kWh</h2>
              </div>
              <div>
                <h1 className='text-yellow-500'>Predicted</h1>
                <h2 className="text-yellow-600 font-semibold">xyz kWh</h2>
              </div>
              <div>
                <h1 className='text-yellow-500'>Deviation</h1>
                <h2 className="text-yellow-600 font-semibold">x %</h2>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Low
