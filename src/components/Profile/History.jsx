import React, { useState, useEffect } from 'react'
import { getHistory } from '../../services/apiServices'
import moment from 'moment';

export default function History() {
  const [listHistory, setListHistory] = useState([]);

  useEffect(() => {
    fetchHistory()
  }, [])
  const fetchHistory = async () => {
    let res = await getHistory();
    // console.log(res);
    if (res && res.EC === 0) {
      let newData = res?.DT?.data.map(item => {
        return {
          total_correct: item.total_correct,
          total_questions: item.total_questions,
          name: item?.quizHistory?.name ?? "",
          id: item.id,
          date: moment(item.createAt).utc().format('DD/MM/YYYY hh:mm:ss A'),
        }
      })
      if (newData.length > 10) {
        newData = newData.slice(newData.length - 10, newData.length);
      }
      setListHistory(newData)
    }
  }
  console.log(listHistory)
  return (
    <div className='history-container container'>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>QuizName</th>
            <th>Total Question</th>
            <th>Total Correct</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {listHistory && listHistory.length > 0 && listHistory.map((item, index) => {
            return (
              <tr key={index}>
                <th>{item.id}</th>
                <td>{item.name}</td>
                <td>{item.total_questions}</td>
                <td>{item.total_correct}</td>
                <td>{item.date}</td>
              </tr>
            )
          })}
          {listHistory && listHistory.length === 0 &&
            <tr >
              <th colSpan={'4'}>Not found data</th>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}
