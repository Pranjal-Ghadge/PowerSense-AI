import React from 'react'

const High = () => {
  return (
    <div>
        <div className='m-5 border-2 border-red-300 rounded-lg p-4 bg-red-50'>
            <div className='flex justify-between mb-4 '>
            <h1 className='text-red-600'>Date,Time</h1>
            <button className='mr-10 bg-red-100 text-red-600 px-4 rounded-lg font-semibold'>HIGH</button>
            </div>
            <div className='flex justify-between px-10 mr-30'>
              <div>
                <h1 className='text-red-400'>Actual</h1>
                <h2 className="text-red-600 font-semibold">xyz kWh</h2>
              </div>
              <div>
                <h1 className='text-red-400'>Predicted</h1>
                <h2 className="text-red-600 font-semibold">xyz kWh</h2>
              </div>
              <div>
                <h1 className='text-red-400'>Deviation</h1>
                <h2 className="text-red-600 font-semibold">x %</h2>
              </div>
            </div>
        </div>
      
    </div>
  )
}

export default High
