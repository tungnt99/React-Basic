import React, { useState } from "react";
import Select from "react-select";
import { BsPlusCircle } from "react-icons/bs";
import { MdRemoveCircleOutline } from "react-icons/md";
import { MdRemoveCircle } from "react-icons/md";
import { AiFillPlusCircle } from "react-icons/ai";
import './assets/style.scss';
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

export default function Questions() {
    const options = [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
    ];

    const [selectQuiz, setSelectQuiz] = useState({});

    const [questions, setQuestions] = useState([
        {
            id: uuidv4(),
            description: "",
            imageFile: "",
            imageName: "",
            answers: [
                {
                    id: uuidv4(),
                    description: "",
                    isCorrect: false,
                },
            ],
        },
    ]);
    // console.log(questions);
    const handleAddRemoveQuestion = (type, id) => {
        // console.log('type: ', type, 'id: ',id);
        if (type === "ADD") {
            const newQuestion = {
                id: uuidv4(),
                description: "",
                imageFile: "",
                imageName: "",
                answers: [
                    {
                        id: uuidv4(),
                        description: "",
                        isCorrect: false,
                    },
                ],
            };
            setQuestions([...questions, newQuestion]);
        }
        if (type === "REMOVE") {
            let questionClone = _.cloneDeep(questions);
            questionClone = questionClone.filter((item) => item.id !== id);
            setQuestions(questionClone);
        }
    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        // console.log(type, questionId, answerId);
        let questionClone = _.cloneDeep(questions); // clone lại dữ liệu trong mảng questions ban đầu
        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: "",
                isCorrect: false,
            };
            let index = questionClone.findIndex((item) => item.id === questionId);
            // console.log(index);
            questionClone[index].answers.push(newAnswer); //cập nhật mảng newAnswer mới vào mảng ban đầu

            // console.log("index", index);
            setQuestions(questionClone);
        }
        if (type === "REMOVE") {
            let index = questionClone.findIndex((item) => item.id === questionId);

            questionClone[index].answers = questionClone[index].answers.filter(
                (item) => item.id !== answerId
            );

            setQuestions(questionClone);
        } // remove old questions
    }
    return (
        <div className="questions-container container">
            <div className="question-title">Questions</div>
            <div className="add-new-question">
                <div className="col-12">
                    <label>Select Quiz:</label>
                    <Select
                        defaultValue={selectQuiz}
                        onChange={setSelectQuiz}
                        options={options}
                    />
                </div>
                <div className="mt-3">
                    <div>Add question: </div>
                    {questions && questions.length > 0 && questions.map((question, index) => {
                        return (
                            <div className="question-main my-3" key={question.id}>
                                <div className="row question-content">
                                    <div className="form-floating mt-3 col-6">
                                        <input type="text" className="form-control" placeholder="Question: {index + 1}" defaultValue={question.description} />
                                        <label>Question: {index + 1}</label>
                                    </div>
                                    <div className="col-4 px-3">
                                        <label className="">Upload Image</label>
                                        <input type="file" className="form-control" />
                                        <span>0 file is uploaded</span>
                                    </div>

                                    <div className="col-2 d-flex align-items-center gap-2">
                                        <button className="btn btn-success d-flex">
                                            <BsPlusCircle onClick={() => handleAddRemoveQuestion("ADD", "")} />
                                        </button>
                                        {questions.length > 1 &&
                                            <button className="btn btn-danger d-flex">
                                                <MdRemoveCircleOutline onClick={() => handleAddRemoveQuestion("REMOVE", question.id)} />
                                            </button>
                                        }
                                    </div>
                                </div>
                                <div className="answers-content col-12 mt-5">
                                    {question.answers && question.answers.length > 0 && question.answers.map((answer, index) => {
                                        return (
                                            <div className="d-flex align-items-center flex-start mb-3" key={answer.id}>
                                                <input type="checkbox" className="form-check-input" />
                                                <div className="form-floating mx-3 col-6">
                                                    <input type="text" className="form-control" placeholder="Answer {index + 1}" defaultValue={answer.description} />
                                                    <label>Answer: {index + 1}</label>
                                                </div>
                                                <div className="col-3 d-flex align-items-center gap-2">
                                                    <button className="btn btn-success d-flex">
                                                        <AiFillPlusCircle onClick={() => handleAddRemoveAnswer("ADD", question.id)} />
                                                    </button>
                                                    {question.answers.length > 1 &&
                                                        <button className="btn btn-danger d-flex">
                                                            <MdRemoveCircle onClick={() => handleAddRemoveAnswer("REMOVE", question.id, answer.id)} />
                                                        </button>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}