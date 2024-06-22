import React from 'react'
import Header from './layouts/Header'
import Footer from './layouts/Footer'
import AppRouter from './routes/Router'

function App() {
  return (
    <>
        <Header/>
        <AppRouter/>
        <Footer/>
    </>
  )
}

export default App