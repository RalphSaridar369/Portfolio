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
                <p><a href="https://www.linkedin.com/in/ralph-saridar-7278021b3/" target="blank_">Ralph Saridar</a></p>
                {/* <p>Mohammad Halawi</p> */}
                <p><a href="https://www.linkedin.com/in/ali-hamdan-24855b252/" target='blank_'>Ali Hamdan</a></p>
            </div>
            <Contact className="footer-right"/>
        </div>
    </>
  )
}

export default Footer