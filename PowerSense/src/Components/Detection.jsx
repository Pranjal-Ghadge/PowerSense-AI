import React from 'react'
import High from '../Elements/High'
import Medium from '../Elements/Medium'
import Low from '../Elements/Low'
import Data from '../assets/Data.json'
import { calculateDeviation, classifyAnomaly } from '../utils/anomalyUtils'

const Detection = () => {
  const latest = Data[Data.length - 1]
  const deviation = calculateDeviation(latest.actual, latest.predicted)
  const type = classifyAnomaly(deviation)

  return (
    <div className='border-2 border-gray-200 rounded-lg m-10 p-5'>
      <h1 className='font-semibold text-2xl '>Anomaly Detection</h1>

      {type === "HIGH" && <High data={latest} deviation={deviation} />}
      {type === "MEDIUM" && <Medium data={latest} deviation={deviation} />}
      {type === "LOW" && <Low data={latest} deviation={deviation} />}
    </div>
  )
}

export default Detection
