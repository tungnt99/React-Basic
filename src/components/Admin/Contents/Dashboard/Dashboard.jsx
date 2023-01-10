import React, { useState, useEffect } from 'react';
import '../../assets/admin.scss';
import { BarChart, Legend, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { getOverView } from '../../../../services/apiServices';
import { useTranslation } from 'react-i18next';

export default function DashBoard(props) {
  // translation
  const { t } = useTranslation();
  // end translation
  const [title] = useState('Dashboard');
  useEffect(() => {
    document.title = title;
  })

  const [dataOverView, setDataOverView] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  useEffect(() => {
    fetchDataChart()
  }, [])
  const fetchDataChart = async () => {
    let res = await getOverView()
    console.log('check data chart ', res);
    if (res && res.EC === 0) {
      setDataOverView(res.DT);
      // Process chart data
      let Qz = 0, Qs = 0, As = 0;
      Qz = res?.DT?.others?.countQuiz ?? 0;
      Qs = res?.DT?.others?.countQuestions ?? 0;
      As = res?.DT?.others?.countAnswers ?? 0;
      const data = [
        {
          "name": "Quizzes",
          "Qz": Qz,
        },
        {
          "name": "Questions",
          "Qs": Qs,
        },
        {
          "name": "Answers",
          "As": As,
        },

      ]
      setDataChart(data)
    }
  }
  return (
    <div className='dashboard-container container'>
      <div className='dashboard-title'>
        {t('dashboard.title')}
      </div>
      <div className='dashboard-content row'>
        <div className='dashboard-content-left col-md-5'>
          <div className='dashboard-content-left-total'>
            <div className='child col-6'>
              <div className='child-item'>
                <div className='total-title'>
                  {t('dashboard.totalusers')}
                </div>
                <div className='total-body'>
                  {dataOverView && dataOverView.users && dataOverView.users.total ?
                    <>{dataOverView.users.total}</>
                    :
                    <>0</>
                  }
                </div>
              </div>
            </div>
            <div className='child col-6'>
              <div className='child-item'>
                <div className='total-title'>
                  {t('dashboard.totalquiz')}
                </div>
                <div className='total-body'>
                  {dataOverView && dataOverView.others && dataOverView.others.countQuiz ?
                    <>{dataOverView.others.countQuiz}</>
                    :
                    <>0</>
                  }
                </div>
              </div>
            </div>
            <div className='child col-6'>
              <div className='child-item'>
                <div className='total-title'>
                  {t('dashboard.totalquestions')}
                </div>
                <div className='total-body'>
                  {dataOverView && dataOverView.others && dataOverView.others.countQuestions ?
                    <>{dataOverView.others.countQuestions}</>
                    :
                    <>0</>
                  }
                </div>
              </div>
            </div>
            <div className='child col-6'>
              <div className='child-item'>
                <div className='total-title'>
                  {t('dashboard.totalanswers')}
                </div>
                <div className='total-body'>
                  {dataOverView && dataOverView.others && dataOverView.others.countAnswers ?
                    <>{dataOverView.others.countAnswers}</>
                    :
                    <>0</>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='dashboard-content-right col-md-7'>
          <div className='dashboard-content-right-total'>
            <BarChart width={650} height={350} data={dataChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Qz" fill="#8884d8" />
              <Bar dataKey="Qs" fill="#82ca9d" />
              <Bar dataKey="As" fill="#82ca9d" />
            </BarChart>
          </div>

        </div>
      </div>
    </div>
  )
}