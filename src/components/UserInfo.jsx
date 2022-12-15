import React, { Component } from 'react'

export default class UserInfo extends Component {
    state = {
        name: 'Thanh Tung',
        age: "24",
        address: "HN"
    }
    handleOnChangeAddress = (event) => {
        this.setState({
            address: event.target.value
        })
    }
    handleOnChangeAge = (event) => {
        this.setState({
            age: event.target.value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        console.log("state: ", this.state);
    }
    render() {
        return (
            <div>
                <form onSubmit={(event) => this.handleOnSubmit(event)}>
                    <div className='form-group'>
                        <label className='form-label'>Your name:</label>
                        <input type="text" className='form-control' value={this.state.address} onChange={(event) => this.handleOnChangeAddress(event)} />
                    </div>
                    <div className='form-group'>
                        <label className='form-label'>Age:</label>
                        <input type="number" className='form-control' value={this.state.age} onChange={(event) => this.handleOnChangeAge(event)} />
                    </div>
                    <div className='form-group mt-3'>
                        <button className='btn btn-warning'>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}
