
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getAllDataQuizForAdmin, getAllUsers } from "../../../../services/apiServices";

export default function AssignQuiz() {
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({});

    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    useEffect(() => {
        fetchAllDataQuiz();
        fetchQuizUser();
    }, [])

    const fetchAllDataQuiz = async () => {
        let res = await getAllDataQuizForAdmin();
        if (res.EC === 0) {
            let newQuiz = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`,
                }
            })
            setListQuiz(newQuiz);
        }
    }

    const fetchQuizUser = async () => {
        let res = await getAllUsers();
        console.log(res);
        if (res.EC === 0) {
            let newUser = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`,
                }
            })
            setListUser(newUser);
        }
    }
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="form-group col-md-6">
                    <label className="form-label">Select Quiz</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>
                <div className="form-group col-md-6">
                    <label className="form-label">Select User</label>
                    <Select
                        defaultValue={selectedUser}
                        onChange={setSelectedUser}
                        options={listUser}
                    />
                </div>
                <div className="form-group mt-3">
                    <button className="btn btn-warning">Asign</button>
                </div>
            </div>
        </div>
    )
}
