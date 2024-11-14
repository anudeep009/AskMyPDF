import React from 'react'
import { Navbar } from './src/components/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './src/components/Footer'

function Layout() {
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}

export default Layout