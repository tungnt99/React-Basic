import React, { Component } from 'react'
import DisplayInfo from './DisplayInfo'
import UserInfo from './UserInfo'

export default class MyComponent extends Component {
    state = {
        name: 'Thanh Tung',
        age: "24",
        address: "HN",
        listUsers: [
            {id: 1, name: "Thanh Tung", age: "14"},
            {id: 2, name: "Nguyen Thanh Tung", age: "15"},
            {id: 3, name: "Tung Biu", age: "19"},

        ],
    }
    handleClick = (event) => {
        this.setState({
            name: "Nguyen Thanh Tung",
            age: "25",
            address: "Hoai Duc",
        })
        // console.log(event.target)
    }
    handleOnChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    handleOnMouseOver = (event) => {
        // 
        // console.log("Random: ", Math.floor(Math.random() * 100) + 1);
        this.setState({
            age: Math.floor(Math.random() * 100) + 1,
        })
    }

    render() {
        return (
            <>
                <div className='react-basic'>
                    <div>MyComponent</div>
                    <div>Name: {this.state.name}</div>
                    <div>Age: {this.state.age}</div>
                    <div>Address: {this.state.address}</div>

                    <input type="text" value={this.state.name} onChange={(event) => this.handleOnChange(event)} />
                    <button className='btn btn-danger' onClick={(event) => this.handleClick(event)}>Click me!</button>
                    <button className='btn btn-danger' onMouseOver={(event) => this.handleOnMouseOver(event)}>Hover me!</button>
                </div>
                <div className='form-react mt-3 container'>
                    <UserInfo />
                    <DisplayInfo 
                       listUsers={this.state.listUsers}
                    />
                </div>

            </>
        )
    }
}
