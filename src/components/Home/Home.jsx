import React, { useEffect, useState } from 'react'
import videoHomepage from '../../media/video-homepage.mp4';
import './assets/home.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
export default function Home() {
  // translation
  const { t } = useTranslation();
  // end translation
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
          <div className='home-title'>
            {t('homepage.hometitle')}
          </div>
          <div className='home-desc'>{t('homepage.homedesc')}</div>
          <div className='home-btn'>
            {isAuthenticated === false ?
              <button className='btn btn-dark' onClick={() => handleBackLogin()}>{t('homepage.button1')}</button>
              :
              <button className='btn btn-dark' onClick={() => handleToQuiz()}>{t('homepage.button2')}</button>
            }

          </div>
        </div>
      </div>
    </>
  )
}
