import React from 'react'
import {Chart as ChartJS} from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import Data from "../assets/Data.json";

const AvsP = () => {
  return (
    <div className='border-2 border-gray-200 rounded-lg m-10 p-5'>
      <h1 className='font-semibold text-2xl '>Actual and Predicted graph
        </h1>
      <Line
              data={{
                labels: Data.map((data) => data.label),
                datasets: [
                  {
                    label: "Actual",
                    data: Data.map((data) => data.actual),
                    backgroundColor: "#064FF0",
                    borderColor: "#064FF0",
                  },
                  {
                    label: "Prediced",
                    data: Data.map((data) => data.predicted),
                    backgroundColor: "#FF3030",
                    borderColor: "#FF3030",
                  },
                ],
              }}
            />
    </div>
  )
}

export default AvsP
