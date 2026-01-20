import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Detection from './Detection'
import Recommendation from './Recommendation'
import AvsP from '../Elements/AvsP'

const Home = ({ setView, onLogout }) => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Header onLogout={onLogout} />

      <main className='px-4 py-4'>
        <div className='max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-4'>
          <div className='xl:col-span-2'>
            <AvsP />
          </div>
          <div className='flex flex-col gap-5'>
            <Detection />
            <Recommendation />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home
