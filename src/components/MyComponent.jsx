import React, { useState } from 'react'
import DisplayInfo from './DisplayInfo'
import AddUserInfo from './AddUserInfo'


export default function MyComponent(props) {
    const [name, setName] = useState('Thanh Tung');
    const [age, setAge] = useState('24');
    const [address, setAddress] = useState('Ha Noi');
    const [listUsers, setListUsers] = useState([
        { id: 1, name: "Thanh Tung", age: "14" },
        { id: 2, name: "Nguyen Thanh Tung", age: "15" },
        { id: 3, name: "Tung Biu", age: "19" },
    ]);

    const handleClick = (event) => {
        setName('Nguyen Thanh Tung');
        setAge('25');
        setAddress('Hoai Duc');

    }
    const handleOnChange = (event) => {
        setName(event.target.value);
    }
    const handleOnMouseOver = (event) => {
        // console.log("Random: ", Math.floor(Math.random() * 100) + 1);
        setAge(Math.floor(Math.random() * 100) + 1);
    }
    const handleAddUser = (user) => {
        
        setListUsers([user, ...listUsers])
    }

    const deleteUser = (user) => {
        let currentUsers = listUsers;
        currentUsers = currentUsers.filter((item) => item.id !== user.id);
       
        setListUsers(currentUsers);
    }
    return (
        <>
            <div className='react-basic'>
                <div>MyComponent</div>
                <div>Name: {name}</div>
                <div>Age: {age}</div>
                <div>Address: {address}</div>

                <input type="text" value={name} onChange={(event) => handleOnChange(event)} />
                <button className='btn btn-danger' onClick={(event) => handleClick(event)}>Click me!</button>
                <button className='btn btn-danger' onMouseOver={(event) => handleOnMouseOver(event)}>Hover me!</button>
            </div>
            <div className='form-react mt-3 container'>
                <AddUserInfo
                    handleAddUser={handleAddUser}
                />
                <DisplayInfo
                    listUsers={listUsers}
                    onClick={deleteUser}

                />
            </div>

        </>
    )
}
