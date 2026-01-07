import React from 'react'

const OtherInfo = () => {
  return (
    <div  className='flex justify-between m-10 mb-20 ' >
      <div  className='border-2 border-gray-200 rounded-lg p-5'>
        <h1 className='mb-5 text-gray-500'>Current Load</h1>
        <p className='mb-5 font-semibold text-2xl'>Amount</p>
        <p className='text-gray-500 '>description</p>
      </div>
      <div  className='border-2 border-gray-200 rounded-lg p-5'>
        <h1>Daily Average</h1>
        <p>Amount</p>
        <p>description</p>
      </div>
      <div className='border-2 border-gray-200 rounded-lg  p-5'>
        <h1>No. of Anomalies</h1>
        <p>Amount</p>
        <p>description</p>
      </div>
    </div>
  )
}

export default OtherInfo
