import React, { useState } from 'react'

export default function AddUserInfo(props) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleOnChangeName = (event) => {
        setName(event.target.value);
    }
    const handleOnChangeAge = (event) => {
        setAge(event.target.value);
    }

    const handleShowHide = () => {
        setShowForm(!showForm);
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (!name || !age) {
            alert('Missing required params')
            return;
        }
        props.handleAddUser({
            id: Math.floor(Math.random() * 1001),
            name: name,
            age: age
        })

        setName('');
        setAge('');
    }
    return (
        <>
            {showForm === false && <div><button onClick={() => handleShowHide()}>Show</button></div>}
            {showForm &&
                <>
                    <div><button onClick={() => handleShowHide()}>Hide</button></div>
                    <div>
                        <form onSubmit={(event) => handleOnSubmit(event)}>
                            <div className='form-group'>
                                <label className='form-label'>Your name:</label>
                                <input type="text" className='form-control' value={name} onChange={(event) => handleOnChangeName(event)} />
                            </div>
                            <div className='form-group'>
                                <label className='form-label'>Age:</label>
                                <input type="number" className='form-control' value={age} onChange={(event) => handleOnChangeAge(event)} />
                            </div>
                            <div className='form-group mt-3'>
                                <button className='btn btn-warning'>Submit</button>
                            </div>
                        </form>
                    </div>
                </>
            }
        </>
    )
}

