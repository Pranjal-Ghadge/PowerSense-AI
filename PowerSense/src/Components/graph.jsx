import React from 'react'
import Header from './Header'
import Footer from './Footer'
import AvsP from '../Elements/AvsP'
import OtherInfo from '../Elements/OtherInfo'

const Graph = ({ setView }) => {
  return (
    <>
      <Header view="GRAPH" setView={setView} />
      <AvsP />
      <OtherInfo />
      <Footer />
    </>
  )
}

export default Graph
