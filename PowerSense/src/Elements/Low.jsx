import React from 'react'
import AnomalyCard from './AnomalyCard'

const Low = ({ data, deviation }) => {
  return (
    <AnomalyCard
      label={data.label}
      severity="LOW"
      borderColor="border-yellow-300"
      bgColor="bg-yellow-50"
      textColor="text-yellow-600"
      buttonBg="bg-yellow-100"
      data={data}
      deviation={deviation}
    />
  )
}

export default Low
