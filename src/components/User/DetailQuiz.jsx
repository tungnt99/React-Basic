import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDataQuestions } from '../../services/apiServices';

export default function DetailQuiz(props) {
    const [title] = useState('Test Quiz User')
    const params = useParams();
    const quizId = params.id;
    // console.log('check quizID: ', quizId);

    useEffect(() => {
        document.title = title;
        fetchDataQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, quizId])

    const fetchDataQuestion = async() => {
        let data = await getDataQuestions(quizId);
        console.log('data: ', data);
    }
  return (
    <div>DetailQuiz</div>
  )
}
