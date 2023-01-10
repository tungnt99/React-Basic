import React, { useState, useEffect } from 'react';
import '../../assets/admin.scss';
import { BarChart, Legend, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
const data = [
  {
    "name": "Page A",
    "uv": 4000,
    "pv": 2400
  },
  {
    "name": "Page B",
    "uv": 3000,
    "pv": 1398
  },
  {
    "name": "Page C",
    "uv": 2000,
    "pv": 9800
  },
  {
    "name": "Page D",
    "uv": 2780,
    "pv": 3908
  },
  {
    "name": "Page E",
    "uv": 1890,
    "pv": 4800
  },
  {
    "name": "Page F",
    "uv": 2390,
    "pv": 3800
  },
  {
    "name": "Page G",
    "uv": 3490,
    "pv": 4300
  }
]
export default function DashBoard(props) {
  const [title] = useState('Dashboard');
  useEffect(() => {
    document.title = title;
  })
  return (
    <div className='dashboard-container container'>
      <div className='dashboard-title'>
        Analytics DashBoard
      </div>
      <div className='dashboard-content row'>
        <div className='dashboard-content-left col-md-5'>
          <div className='dashboard-content-left-total'>
            <div className='child col-6'>
              <div className='child-item'>Total users</div>
            </div>
            <div className='child col-6'>
              <div className='child-item'>Total Quizzes</div>
            </div>
            <div className='child col-6'>
              <div className='child-item'>Total Questions</div>
            </div>
            <div className='child col-6'>
              <div className='child-item'>Total Answers</div>
            </div>
          </div>
        </div>
        <div className='dashboard-content-right col-md-7'>
          <div className='dashboard-content-right-total'>
            <BarChart width={730} height={350} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </div>

        </div>
      </div>
    </div>
  )
}