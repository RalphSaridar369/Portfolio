import React from 'react'
import Contact from './contact/Contact'
import './Footer.scss'

const Footer = () => {
  return (
    <>
    <div className='lighter'></div>
        <div className='footer-container'>
            <div className='footer-left'>
                <h5>Contact Us</h5><br/>
                <p>Ralph Saridar</p>
                <p>Mohammad Halawi</p>
                <p>Ali Hamdan</p>
            </div>
            <Contact className="footer-right"/>
        </div>
    </>
  )
}

export default Footer