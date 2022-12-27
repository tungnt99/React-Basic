import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getDataQuestions } from '../../services/apiServices';
import _ from 'lodash';
import './assets/detail-quiz.scss'
export default function DetailQuiz(props) {
    const [title] = useState('Test Quiz User');
    const location = useLocation();
    // console.log('location: ', location);
    const params = useParams();
    console.log('params: ', params);
    const quizId = params.id;
    // console.log('check quizID: ', quizId);

    useEffect(() => {
        document.title = title;
        fetchDataQuestion();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, quizId])

    const fetchDataQuestion = async () => {
        let res = await getDataQuestions(quizId);
        // console.log('res: ', res);
        if (res && res.EC === 0) {
            let raw = res.DT
            // console.log('raw: ', raw);
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    // console.log('value', value, 'key', key);
                    let answers = [];
                    let questionDescription, image = null;
                    // answers.questionId = key;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        // console.log('item: ', item);
                        // console.log('items answer', item.answers);
                        answers.push(item.answers);
                    })

                    return { questionId: key, answers, questionDescription, image }
                })
                .value();
            // console.log("data: ", data);

        }
    }
    return (
        <div className="detail-quiz-container container">
            <div className="d-flex justify-content-evenly">
                <div className="left-content col-md-7">
                    <div className="question-container">
                        <h2 className="title"><strong>Quiz {quizId}: {location?.state.quizTitle}</strong> </h2> <hr />
                        <div className="question-image">
                            <img alt="anh" />
                        </div>
                        <div className="question-content">
                            <h3 className="question-title">Question</h3>
                            <div className="question-answer">
                                <div>A. answer1</div>
                                <div>B. answer1</div>
                                <div>C. answer1</div>

                            </div>
                        </div>
                    </div>
                    <div className="question-prev-next" style={{ margin: '0 auto', display: 'table' }}>
                        <button className="btn btn-danger mx-2">Prev</button>
                        <button className="btn btn-success mx-2">Next</button>

                    </div>
                </div>
                <div className="right-content col-md-4">count down</div>
            </div>
        </div>
    )
}
