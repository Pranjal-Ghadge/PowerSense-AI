import React from 'react'
import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import Data from "../assets/Data.json"

const AvsP = () => {
  const labels = Data.map(d => d.label)
  const actual = Data.map(d => d.actual)
  const predicted = Data.map(d => d.predicted)

  return (
    <div className='bg-white border border-gray-200 rounded-2xl shadow-sm p-6 max-h-[600px] overflow-y-auto'>
      <div className='mb-4'>
        <h1 className='font-semibold text-2xl text-gray-800'>Actual vs Predicted Power Consumption</h1>
        <p className='text-gray-500 text-sm mt-1'>24-hour power usage analysis with anomaly detection</p>
      </div>

      <div className='h-[380px]'>
        <Line
          data={{
            labels,
            datasets: [
              {
                label: "Actual",
                data: actual,
                borderColor: "#1d4ed8",
                backgroundColor: "rgba(29,78,216,0.08)",
                tension: 0.35,
                pointRadius: 3,
              },
              {
                label: "Predicted",
                data: predicted,
                borderColor: "#f97316",
                backgroundColor: "rgba(249,115,22,0.08)",
                tension: 0.35,
                pointRadius: 3,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: {
                ticks: { color: '#6b7280' },
                grid: { color: '#e5e7eb' },
              },
              x: {
                ticks: { color: '#6b7280' },
                grid: { display: false },
              },
            },
          }}
        />
      </div>
    </div>
  )
}

export default AvsP
