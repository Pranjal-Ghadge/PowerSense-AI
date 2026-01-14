import React from 'react'
import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import Data from "../assets/Data.json"

const AvsP = () => {
  const labels = Data.map(d => d.label)
  const actual = Data.map(d => d.actual)
  const predicted = Data.map(d => d.predicted)

  return (
    <div className='border-2 border-gray-200 rounded-lg m-10 p-5'>
      <h1 className='font-semibold text-2xl '>Actual and Predicted graph</h1>

      <Line
        data={{
          labels,
          datasets: [
            { label: "Actual", data: actual, borderColor: "#064FF0" },
            { label: "Predicted", data: predicted, borderColor: "#FF3030" },
          ],
        }}
      />
    </div>
  )
}

export default AvsP
