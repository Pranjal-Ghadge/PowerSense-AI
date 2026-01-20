import React from 'react'
import Recomm from '../Elements/Recomm'

const Recommendation = () => {
  return (
    <div className='bg-white border border-gray-200 rounded-2xl shadow-sm p-5 h-full max-h-[360px] overflow-y-auto'>
      <h1 className='font-semibold text-2xl text-gray-800 mb-4'>Recommendations</h1>
      <Recomm />
    </div>
  )
}

export default Recommendation
