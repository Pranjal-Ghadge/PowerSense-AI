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
    <div className={`m-5 border-2 ${borderColor} rounded-lg p-4 ${bgColor}`}>
      <div className='flex justify-between mb-4 '>
        <h1 className={textColor}>{label}</h1>
        <button className={`mr-10 ${buttonBg} ${textColor} px-4 rounded-lg font-semibold`}>
          {severity}
        </button>
      </div>

      <div className='flex justify-between px-10 mr-30'>
        <div>
          <h1 className={textColor}>Actual</h1>
          <h2 className={`font-semibold ${textColor}`}>{data.actual} kWh</h2>
        </div>
        <div>
          <h1 className={textColor}>Predicted</h1>
          <h2 className={`font-semibold ${textColor}`}>{data.predicted} kWh</h2>
        </div>
        <div>
          <h1 className={textColor}>Deviation</h1>
          <h2 className={`font-semibold ${textColor}`}>{deviation} %</h2>
        </div>
      </div>
    </div>
  )
}

export default AnomalyCard
