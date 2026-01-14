import React from 'react'
import AnomalyCard from './AnomalyCard'

const Medium = ({ data, deviation }) => {
  return (
    <AnomalyCard
      label={data.label}
      severity="MEDIUM"
      borderColor="border-orange-300"
      bgColor="bg-orange-50"
      textColor="text-orange-600"
      buttonBg="bg-orange-100"
      data={data}
      deviation={deviation}
    />
  )
}

export default Medium
