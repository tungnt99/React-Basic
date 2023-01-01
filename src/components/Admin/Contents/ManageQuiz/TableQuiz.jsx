import React, { useEffect, useState } from 'react'
import { getAllDataQuizForAdmin } from '../../../../services/apiServices';

export default function TableQuiz(props) {
    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        fetchQuiz();
    }, [])

    const fetchQuiz = async() => {
        let res = await getAllDataQuizForAdmin()
        // console.log(res);
        if(res.EC === 0) {
            setListQuiz(res.DT);
        }
    }
    console.log(listQuiz)
    return (
        <div className='container'>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                {listQuiz && listQuiz.length > 0 && listQuiz.map((item, index) => {
                    return(
                        <tr key={index}>
                            <th>{item.id}</th>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.difficulty}</td>
                            <td>
                                <button className='btn btn-info'>View</button>
                                <button className='btn btn-warning mx-2'>Edit</button>
                                <button className='btn btn-dark'>Delete</button>

                            </td>
                        </tr>
                    )
                })}
                {listQuiz && listQuiz.length === 0 && <tr><td colSpan={'4'}>Not found data</td></tr>}
                </tbody>
            </table>

        </div>
    )
}
