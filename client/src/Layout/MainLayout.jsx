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
    <div className='flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900 dark:to-slate-900'>
      <ScrollToTop/>
      <Navbar/>
      <div className='flex-1 mt-12 sm:mt-14 lg:mt-16 min-h-[calc(100vh-72px)] sm:min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-100px)]'>
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}

export default MainLayout