
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getAllDataQuizForAdmin, getAllUsers, postAssignQuiz } from "../../../../services/apiServices";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';

export default function AssignQuiz() {
    // translation
    const { t } = useTranslation();
    // end translation
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
                    label: `${item.id} - ${item.name} - ${item.description}`,
                }
            })
            setListQuiz(newQuiz);
        }
    }

    const fetchQuizUser = async () => {
        let res = await getAllUsers();
        // console.log(res);
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

    const handleAssign = async () => {
        let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
        console.log(res);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setSelectedQuiz({});
            setSelectedUser({});

        } else {
            toast.error(res.EM);
        }

    }
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="form-group col-md-6">
                    <label className="form-label">{t('assgin.selectquiz')}</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>
                <div className="form-group col-md-6">
                    <label className="form-label">{t('assgin.selectuser')}</label>
                    <Select
                        defaultValue={selectedUser}
                        onChange={setSelectedUser}
                        options={listUser}
                    />
                </div>
                <div className="form-group mt-3">
                    <button onClick={() => handleAssign()} className="btn btn-warning">{t('assgin.assign')}</button>
                </div>
            </div>
        </div>
    )
}
