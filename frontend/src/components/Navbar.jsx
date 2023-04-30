import React from 'react'
import {GiAirplaneDeparture} from 'react-icons/gi'
import {FaQuestion} from 'react-icons/fa'
import {FaLanguage} from 'react-icons/fa'
import logo from '../images/logo.png'
import { devAPI } from "../services/axios"


const Navbar = () => {
  let loginRoute = devAPI + "/auth/google"

  return (
    <div className = "navBar flex">
      <div className="navBarOne flex">
        <div className='none flex'>
          <li className='flex'> <FaQuestion className='icon'/> FAQ</li>
          <li className='flex'> <FaLanguage className = 'icon'/> Languages</li>
        <div className="login flex">
          <a href={loginRoute} >Log in</a>
        </div>
      </div>
      <div>
        <img src = {logo} className='logo'/>
      </div>
        <div className="navMenu">
          <ul className='menu flex'>
            <li className='listItem'>Home</li>
          </ul>
          <button className='button contactButton flex'>Contact</button>
        </div>
      </div>
    </div>
    )
  }
  
  export default Navbar