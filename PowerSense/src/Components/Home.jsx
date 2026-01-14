import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Detection from './Detection'
import Recommendation from './Recommendation'

const Home = ({ setView }) => {
  return (
    <>
      <Header view="HOME" setView={setView} />
      <Detection />
      <Recommendation />
      <Footer />
    </>
  )
}

export default Home
