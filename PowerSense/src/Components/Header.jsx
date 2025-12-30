import React from 'react'
import logo from '../assets/logo.png'

const Header = () => {
  return (
    <div className='flex justify-between items-center bg-white border-b-2 border-gray-200'>
      <div className='flex justify-center gap-10 p-5 '>
        <img src={logo} alt="PowerSense Logo" className="w-15 h-15 object-contain rounded-lg shadow-md"/>
        <div>
        <h2 className='font-semibold text-2xl'>PowerSense</h2>
        <h4 className='text-gray-500'>Power Consumption Anomaly Prediction</h4>
        </div>
      </div>
      <div className='flex justify-center gap-10 mr-30 '>
        <button className='text-xl font-semibold bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white'>Home</button>
        <button className='text-xl font-semibold bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white'>Graph</button>
      </div>
    </div>
  )
}

export default Header
