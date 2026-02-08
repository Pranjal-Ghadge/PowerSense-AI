import React from 'react'
import AnomalyCard from './AnomalyCard'

const High = ({ data, deviation }) => {
  return (
    <AnomalyCard
      label={data.label}
      severity="HIGH"
      borderColor="border-red-300"
      bgColor="bg-red-50"
      textColor="text-red-600"
      buttonBg="bg-red-100"
      data={data}
      deviation={deviation}
    />
  )
}

export default High
