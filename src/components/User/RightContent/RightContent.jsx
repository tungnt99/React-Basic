import React from 'react'

export default function RightContent(props) {
    const { dataQuiz } = props;
    return (
        <>
            <div className='main-timer text-center'>10:10</div>
            <div className='main-question'>
                {dataQuiz && dataQuiz.length && dataQuiz.map((item, index) => {
                    console.log(item)
                    return (
                        <div className='question' key={index}>{index + 1}</div>
                    )
                })}

            </div>
        </>
    )
}
