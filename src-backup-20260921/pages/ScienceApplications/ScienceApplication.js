import React, { useEffect } from 'react'
import './ScienceApplication.css'

import './DialogBox/DialogBox.css'
import ParamNavbar from '../../components/Navbar'
import Content from './Content'
import Footer from '../../components/footer/Footer'

export default function ScienceApplication() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  })
  
  return (
    <div className='sciAppContainer'>
        <ParamNavbar />
        <Content />
        <Footer />
    </div>
  )
}
