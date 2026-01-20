import React from 'react'
import Header from './Header'
import Footer from './Footer'
import AvsP from '../Elements/AvsP'
import OtherInfo from '../Elements/OtherInfo'

const Graph = ({ setView, onLogout }) => {
  return (
    <>
      <Header onLogout={onLogout} />
      <AvsP />
      <OtherInfo />
      <Footer />
    </>
  )
}

export default Graph
