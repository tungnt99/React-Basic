import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getDataQuestions } from '../../services/apiServices';
import _ from 'lodash';
import './assets/detail-quiz.scss'
import Question from './Question';

export default function DetailQuiz(props) {
    const [title] = useState('Test Quiz User');
    const location = useLocation();
    // console.log('location: ', location);
    const params = useParams();
    // console.log('params: ', params);
    const quizId = params.id;
    // console.log('check quizID: ', quizId);

    const [dataQuiz, setDataQuiz] = useState([]);
    // đặt biến để biết người dùng ở câu hỏi bao nhiêu sẽ trả về giá trị đó -> tương tự phân trang
    const [index, setIndex] = useState(0);
    // console.log('index', index);
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
            // nhóm các mảng chung id lại với nhau
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
            setDataQuiz(data);

        }
    }
    // console.log("check data quiz: ", dataQuiz);
    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1);
    }
    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1)
            setIndex(index + 1);
    }
    return (
        <div className="detail-quiz-container container">
            <div className="d-flex justify-content-evenly">
                <div className="left-content col-md-7">
                    <div className="question-container">
                        <h2 className="title"><strong>Quiz {quizId}: {location?.state.quizTitle}</strong> </h2> <hr />
                        <div className="question-content">
                            <Question
                                data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
                                index={index}
                            />
                        </div>
                    </div>
                    <div className="question-prev-next" style={{ margin: '0 auto', display: 'table' }}>
                        <button className="btn btn-danger mx-2" onClick={() => handlePrev()}>Prev</button>
                        <button className="btn btn-success mx-2" onClick={() => handleNext()}>Next</button>

                    </div>
                </div>
                <div className="right-content col-md-4">count down</div>
            </div>
        </div>
    )
}
