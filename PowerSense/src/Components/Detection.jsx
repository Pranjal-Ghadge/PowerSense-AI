import React from 'react'
import High from '../Elements/High'
import Medium from '../Elements/Medium'
import Low from '../Elements/Low'

const Detection = () => {
  return (
    <div className='border-2 border-gray-200 rounded-lg m-10 p-5'>
        <h1 className='font-semibold text-2xl '>Anomaly Detection</h1>
        <High />
        <Medium/>
        <Low/>
        
    </div>
  )
}

export default Detection
