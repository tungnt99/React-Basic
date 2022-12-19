import React, { useEffect, useState } from 'react'
import videoHomepage from '../../media/video-homepage.mp4';
import './assets/home.scss';
export default function Home() {
  const [title] = useState("Home");
  useEffect(() => {
    document.title = title
  }, [title])
  return (
    <>
      <div className="homepage-container">
        <video autoPlay muted loop>
          <source src={videoHomepage} type='video/mp4' />
        </video>
        <div className="homepage-content">
          <div className='home-title'>There's a better way to ask</div>
          <div className='home-desc'>You don't want to make a boring form. And your audience won't answer one. Create a typeform instead—and make everyone happy.</div>
          <div className='home-btn'><button className='btn btn-dark'>Get started - it's free</button></div>
        </div>
      </div>
    </>
  )
}
