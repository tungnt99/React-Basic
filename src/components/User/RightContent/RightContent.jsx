import React, { useRef } from 'react'
import CountDown from './CountDown';

export default function RightContent(props) {
    const { dataQuiz } = props;
    const onTimeUp = () => {
        props.handleFinishQuiz();
    }

    const refDiv = useRef([]);
    const getClassQuestion = (index, question) => {
        // console.log(index + 1, question)
        // check answers
        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.find(answer => answer.isSelected === true);
            // console.log(isAnswered, index);
            if (isAnswered) {
                return "question active";
            }
        }
        return "question";
    }
    const handleClickQuestion = (question, index) => {
        props.setIndex(index)
        if (refDiv.current) {
            refDiv.current.forEach(item => {
                if (item && item.className === "question clicked") {
                    item.className = "question"
                }
            })
        }
        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.find(answer => answer.isSelected === true);
            if (isAnswered) {
                return;
            }
        }
        refDiv.current[index].className = "question clicked"
    }
    return (
        <>
            <div className='main-timer text-center'>
                <CountDown
                    onTimeUp={onTimeUp}
                />
            </div>
            <div className='main-question'>
                {dataQuiz && dataQuiz.length && dataQuiz.map((item, index) => {
                    return (
                        <div className={getClassQuestion(index, item)} key={index}
                            onClick={() => handleClickQuestion(item, index)}
                            ref={element => refDiv.current[index] = element}
                        >{index + 1}</div>
                    )
                })}

            </div>
        </>
    )
}
