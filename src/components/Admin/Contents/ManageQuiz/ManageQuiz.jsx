import React, { useState } from 'react';
import './style/manage-quiz.scss';
import Select from 'react-select';
const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];
export default function ManageQuiz() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('EASY');
    const [image, setImage] = useState(null);

    const handleChangeFile = (event) => {

    }
    return (
        <div className='quiz-container'>
            <div className='quiz-title'>
                ManageQuiz
            </div>
            <hr />
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
                            value={type}
                            // onChange={this.handleChange}
                            options={options}
                            placeholder={"Quiz style"}
                        />
                    </div>
                    <div className='more-actions mb-3'>
                        <label>Upload Image</label>
                        <input type="file" className='form-control' onChange={(event) => handleChangeFile(event)} />
                    </div>
                </fieldset>
            </div>
            <div className='list-quiz'>
                <h2>List Quiz</h2>
            </div>
        </div>
    )
}