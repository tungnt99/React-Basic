import React from 'react'
import CountDown from './CountDown';

export default function RightContent(props) {
    const { dataQuiz } = props;
    const onTimeUp = () => {
        props.handleFinishQuiz();
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
                        <div className='question' key={index}>{index + 1}</div>
                    )
                })}

            </div>
        </>
    )
}
