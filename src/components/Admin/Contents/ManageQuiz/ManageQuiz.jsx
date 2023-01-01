import React, { useState } from 'react';
import './style/manage-quiz.scss';
import Select from 'react-select';
import { toast } from "react-toastify";
import { postCreateNewQuiz } from '../../../../services/apiServices';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];


export default function ManageQuiz(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('EASY');
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    }

    const handleSubmitQuiz = async () => {
        if (!name || !description) {
            toast.error('Please enter a name or description for quiz');
            return;
        }
        let data = await postCreateNewQuiz(name, description, type?.value, image)
        // console.log(data);
        if (data && data.EC === 0) {
            toast.success(data.EM)
            setName('')
            setDescription('')
            setType('')
            setImage('')
        } else {
            toast.error(data.EM)
        }
    }
    return (
        <div className='quiz-container'>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>ManageQuiz</Accordion.Header>
                    <Accordion.Body>
                        <div className='add-new'>
                            <fieldset className="border rounded-3 p-3" >
                                <legend className="float-none w-auto px-3">Add New Quiz:</legend>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" placeholder='Your quiz name' value={name} onChange={(event) => setName(event.target.value)} />
                                    <label>Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" placeholder='Description' value={description} onChange={(event) => setDescription(event.target.value)} />
                                    <label >Description</label>
                                </div>
                                <div className=' mb-3'>
                                    <Select
                                        defaultValue={type}
                                        onChange={setType}
                                        options={options}
                                        placeholder={"Quiz style"}
                                    />
                                </div>
                                <div className='more-actions mb-3'>
                                    <label>Upload Image</label>
                                    <input type="file" className='form-control' onChange={(event) => handleChangeFile(event)} />
                                </div>
                                <div className='col-md-12 img-preview'>
                                    {previewImage ?
                                        <img src={previewImage} alt={image} />
                                        :
                                        <span>Preview Image</span>
                                    }
                                </div>
                                <div className='form-group my-3'>
                                    <button onClick={() => handleSubmitQuiz()} className='btn btn-warning'>Create Quiz</button>
                                </div>
                            </fieldset>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Table Quizs</Accordion.Header>
                    <Accordion.Body>
                        <div className='list-quiz'>
                            <TableQuiz />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>


        </div>
    )
}