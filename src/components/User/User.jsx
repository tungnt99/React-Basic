import React, { useEffect, useState } from 'react'
import ListQuiz from './ListQuiz'
import './assets/listquiz.scss'
export default function User(props) {
  const [title] = useState("Test Quiz")
  
  useEffect(() => {
    document.title = title
  }, [title])
  return (
    <div>
      <ListQuiz />
    </div>
  )
}
