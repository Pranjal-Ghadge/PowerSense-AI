import React from 'react'

const LightningIcon = ({ size = 48 }) => (
  <div
    className="rounded-2xl shadow flex items-center justify-center bg-blue-600"
    style={{ width: size, height: size }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="w-6 h-6"
    >
      <path
        d="M13.5 2.5 6.75 13h4.25l-.5 8.5 6.75-10.5h-4.25z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
)

const Header = ({ onLogout }) => {
  return (
    <header className='flex justify-between items-center bg-white border-b border-gray-200 px-6 py-4 shadow-sm'>
      <div className='flex items-center gap-4'>
        <LightningIcon />
        <div>
          <h2 className='font-semibold text-2xl text-gray-800'>PowerSense</h2>
          <h4 className='text-gray-500 text-sm'>Power Consumption Anomaly Prediction</h4>
        </div>
      </div>

      <button
        onClick={onLogout}
        className='flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow'
      >
        <span>Logout</span>
      </button>
    </header>
  )
}

export default Header
