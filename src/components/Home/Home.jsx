import React, { useEffect, useState } from 'react'
import videoHomepage from '../../media/video-homepage.mp4';
import './assets/home.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  // const account = useSelector(state => state.user.account)
  // console.log('account', account)
  // console.log('isAuthenticated', isAuthenticated)

  const [title] = useState("Home");
  useEffect(() => {
    document.title = title
  }, [title])

  const handleBackLogin = () => {
    navigate('/login');
  }
  const handleToQuiz = () => {
    navigate('/user');
  }
  return (
    <>
      <div className="homepage-container">
        <video autoPlay muted loop>
          <source src={videoHomepage} type='video/mp4' />
        </video>
        <div className="homepage-content">
          <div className='home-title'>There's a better way to ask</div>
          <div className='home-desc'>You don't want to make a boring form. And your audience won't answer one. Create a typeform instead—and make everyone happy.</div>
          <div className='home-btn'>
            {isAuthenticated === false ?
              <button className='btn btn-dark' onClick={() => handleBackLogin()}>Get started - it's free</button>
              :
              <button className='btn btn-dark' onClick={() => handleToQuiz()}>Doing Quiz Now</button>
            }

          </div>
        </div>
      </div>
    </>
  )
}
