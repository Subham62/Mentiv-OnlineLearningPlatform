import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const MainLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <ScrollToTop/>
        <Navbar/>
        <div className='flex-1 mt-16 min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-100px)]'>
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default MainLayout