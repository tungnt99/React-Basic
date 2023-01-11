import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getDataQuestions, postSubmitQuiz } from '../../services/apiServices';
import _ from 'lodash';
import './assets/detail-quiz.scss'
import Question from './Question';
import ModalResult from './ModalResult';
import RightContent from './RightContent/RightContent';
import { useTranslation } from 'react-i18next';

export default function DetailQuiz(props) {
    // translation
    const { t } = useTranslation();
    // end translation
    const [title] = useState('Test Quiz User');
    const location = useLocation(); //lấy state được trả ra từ "state: { quizTitle: item.description }"
    // console.log('location: ', location);
    const params = useParams();
    // console.log('params: ', params);
    const quizId = params.id; //nhận id của bài test từ list-quiz
    // console.log('check quizID: ', quizId);

    const [dataQuiz, setDataQuiz] = useState([]);
    // đặt biến để biết người dùng ở câu hỏi bao nhiêu sẽ trả về giá trị đó -> tương tự phân trang
    const [index, setIndex] = useState(0);
    // console.log('index', index);

    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({});
    // state show result
    const [isSubmitQuiz, setIsSubmitQuiz] = useState(false);
    const [isShowAnswer, setIsShowAnswer] = useState(false);
    // end state show result

    useEffect(() => {
        document.title = title;
        fetchDataQuestion();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, quizId])


    const fetchDataQuestion = async () => {
        let res = await getDataQuestions(quizId);
        // console.log('res: ', res);
        if (res && res.EC === 0) {
            let raw = res.DT //DT sẽ trả ra tất cả các phần tử trong đó chứa các object có id trùng nhau
            // console.log('raw: ', raw);
            // nhóm các mảng chung id lại với nhau
            let data = _.chain(raw) //nhóm chung object trong biến {raw} có id trùng nhau
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => { //map ra từng thành phần trùng id trong biến raw gộp lại thành 1 object -> trả về {id: 1, id: 1, id:1, ...}
                    // console.log('value', value, 'key', key);
                    let answers = []; // tạo 1 array rỗng chứa câu trả lời trùng id trong value-> được truyền vào giá trị id mới
                    let questionDescription, image = null;
                    // answers.questionId = key;
                    value.forEach((item, index) => { //lấy ra từng đối tượng các câu trả lời trong biến value ở trên -> trả về 1 object {id: 1}, {id: 1}, {id: 1}...
                        if (index === 0) {
                            questionDescription = item.description; //description là các tên câu hỏi được trả về
                            image = item.image;
                        }
                        // console.log('item: ', item);
                        // console.log('items answer', item.answers);
                        item.answers.isSelected = false; // Mặc định đặt câu trả lời là false
                        item.answers.isCorrect = false; //đặt mặc định đáp án sẽ là false
                        answers.push(item.answers); //push các đáp án vào mảng answers //item.answers -> các đáp án 
                    })
                    answers = _.orderBy(answers, ['id'], ['asc']); //sắp xếp câu hỏi theo id
                    return { questionId: key, answers, questionDescription, image } // key: id của câu hỏi, answers: các câu trả lời được trả về, questionDescription: tên câu hỏi, image: hình ảnh câu hỏi
                })
                .value();
            // console.log("data: ", data);
            setDataQuiz(data); // cuối dùng data trả về từng câu hỏi cùng các đáp án riêng biệt và set vào dataQuiz

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

    const handleCheckBox = (answerId, questionId) => {
        // console.log(answerId, questionId);
        let dataQuizClone = _.cloneDeep(dataQuiz); //clone dataQuiz
        let question = dataQuizClone.find((item) => +item.questionId === +questionId)
        if (question && question.answers) {
            // console.log('question: ', question);

            let b = question.answers.map((item) => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            question.answers = b;
            // console.log("b", b);
        }
        // console.log('question: ', question);

        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    }

    // submit đáp án
    const handleFinishQuiz = async () => {
        // console.log('submit', dataQuiz);
        // {
        //     "quizId": 1,
        //     "answers": [
        //         { 
        //             "questionId": 1,
        //             "userAnswerId": [3]
        //         },
        //         { 
        //             "questionId": 2,
        //             "userAnswerId": [6]
        //         }
        //     ]
        // }
        let payload = {
            quizId: +quizId,
            answers: [],
        }
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                // console.log('question: ', question)
                let questionId = +question.questionId
                let userAnswerId = [];
                // todo xử lý user answer 
                question.answers.forEach(a => {
                    if (a.isSelected === true) {
                        userAnswerId.push(a.id);
                    }
                })
                // console.log('questionId: ', questionId)
                answers.push({
                    questionId: questionId,
                    userAnswerId: userAnswerId
                })
            })
            payload.answers = answers;
            // console.log('payload: ', payload)
            // submit api

            let res = await postSubmitQuiz(payload);
            // console.log('submit res: ', res);
            if (res && res.EC === 0) {
                setIsSubmitQuiz(true);
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                })
                setIsShowModalResult(true);

                // update Dataquiz with correct answer
                if (res.DT && res.DT.quizData) {
                    let dataQuizClone = _.cloneDeep(dataQuiz);
                    let a = res.DT.quizData;

                    for (let q of a) {
                        for (let i = 0; i < dataQuizClone.length; i++) {
                            if (+q.questionId === +dataQuizClone[i].questionId) {
                                // update answer
                                let newAnswers = [];
                                for (let j = 0; j < dataQuizClone[i].answers.length; j++) {
                                    let s = q.systemAnswers.find(item => +item.id === +dataQuizClone[i].answers[j].id)
                                    if (s) {
                                        dataQuizClone[i].answers[j].isCorrect = true
                                    }
                                    newAnswers.push(dataQuizClone[i].answers[j]);
                                }
                                dataQuizClone[i].answers = newAnswers;
                            }
                        }
                    }
                    setDataQuiz(dataQuizClone);
                }
            } else {
                alert('An error occurred');
            }
        }
    }
    const handleShowAnswer = () => {
        if (!isSubmitQuiz) return;
        setIsShowAnswer(true);
    }
    return (
        <div className="detail-quiz-container container">
            <div className="d-flex justify-content-evenly">
                <div className="left-content col-md-7">
                    <div className="question-container">
                        <h2 className="title"><strong>{t('listquiz.quiz')} {quizId}: {location?.state.quizTitle}</strong> </h2> <hr />
                        <div className="question-content">
                            <Question
                                data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
                                index={index}
                                handleCheckBox={handleCheckBox}
                                isShowAnswer={isShowAnswer}
                                isSubmitQuiz={isSubmitQuiz}
                            />
                        </div>
                    </div>
                    <div className="question-prev-next" style={{ margin: '0 auto', display: 'table' }}>
                        <button className="btn btn-danger mx-2" onClick={() => handlePrev()}>{t('listquiz.prev')}</button>
                        <button className="btn btn-success mx-2" onClick={() => handleNext()}>{t('listquiz.next')}</button>
                        <button className="btn btn-warning mx-2" onClick={() => handleFinishQuiz()} disabled={isSubmitQuiz}>{t('listquiz.finish')}</button>
                    </div>
                </div>
                <div className="right-content col-md-4">
                    <RightContent
                        dataQuiz={dataQuiz}
                        handleFinishQuiz={handleFinishQuiz}
                        setIndex={setIndex}
                    />
                </div>
            </div>
            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModalResult}
                dataModalResult={dataModalResult}
                handleShowAnswer={handleShowAnswer}
            />
        </div>
    )
}
