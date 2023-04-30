import React from 'react'
import background from '../images/background.mp4'
import airplane from '../images/airplane.png'
const Home = () => {
  return (
    <div className='home flex container'>
      <div className="main">
        <h1>Fly smart, fly wise, with AirWiseGuru</h1>
      </div>
      <div className="homeGIF flex">
        <div className="GIF">
          <video src={background} autoPlay muted loop className = 'vid'></video>
        </div>
        <img src={airplane} className='planePicture' />
      </div>
    </div>
  )
}

export default Home