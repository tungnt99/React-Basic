import React, { useEffect, useState } from 'react'
import { getQuizByUser } from '../../services/apiServices';

export default function ListQuiz(props) {
    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        getQuizData();
    }, [])

    const getQuizData = async () => {
        const data = await getQuizByUser();
        // console.log("check data quiz", data);
        if (data && data.EC === 0) {
            setListQuiz(data.DT);
        }
    }
    return (
        <>
            
            <div className='list-quiz-content container'>
                <div className='row cart-list'>
                    {listQuiz && listQuiz.length > 0 && listQuiz.map((item, index) => {
                        return (
                            <div className="card-item border border-secondary" key={index} style={{width: "20rem"}}>
                                <img src={`data:image/png;base64, ${item.image}`} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Quiz {index + 1}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <button className="btn btn-primary">Start Now</button>
                                </div>
                            </div>

                        )
                    })}
                    {listQuiz && listQuiz.length === 0 &&
                        <div>You don't any quiz now... </div>
                    }
                </div>
            </div>
        </>
    )
}
