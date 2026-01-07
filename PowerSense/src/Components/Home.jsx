import React from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Detection from './Detection.jsx'
import Recommendation from './Recommendation.jsx'

const Home = () => {
  return (
    <div>
      <Header />
      <Detection />
      <Recommendation/>
      <Footer />
    </div>
  )
}

export default Home
