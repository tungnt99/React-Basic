import React, { useState } from "react";
import Select from "react-select";
import { BsPlusCircle } from "react-icons/bs";
import { MdRemoveCircleOutline } from "react-icons/md";
import { MdRemoveCircle } from "react-icons/md";
import { AiFillPlusCircle } from "react-icons/ai";
import './assets/style.scss';

export default function Questions() {
    const options = [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
    ];

    const [selectQuiz, setSelectQuiz] = useState({});
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
                    <div className="row question-content">
                        <div class="form-floating mt-3 col-6">
                            <label>Description</label>
                            <input type="text" class="form-control" placeholder="name@example.com"/>
                        </div>
                        <div className="col-4 px-3">
                            <label className="">Upload Image</label>
                            <input type="file" class="form-control" />
                            <span>0 file is uploaded</span>
                        </div>

                        <div className="col-2 d-flex align-items-center gap-2">
                            <button className="btn btn-success d-flex">
                                <BsPlusCircle />
                            </button>
                            <button className="btn btn-danger d-flex">
                                <MdRemoveCircleOutline />
                            </button>
                        </div>
                    </div>
                    <div className="answers-content col-12 mt-3 d-flex align-items-center flex-start">
                        <input type="checkbox" className="form-check-input" />
                        <div class="form-floating mt-3 mx-3 col-6">
                            <input
                                type="text"
                                class="form-control"
                                placeholder="name@example.com"
                            />
                            <label>Answer 1</label>
                        </div>
                        <div className="col-3 mt-3 d-flex align-items-center gap-2">
                            <button className="btn btn-success d-flex">
                                <AiFillPlusCircle />
                            </button>
                            <button className="btn btn-danger d-flex">
                                <MdRemoveCircle />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}