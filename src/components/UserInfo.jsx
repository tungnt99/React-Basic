import React, { Component } from 'react'

export default class UserInfo extends Component {
    state = {
        age: "",
        address: "",
        showForm: false
    }
    handleShowHide = () => {
        this.setState({
            showForm: !this.state.showForm
        });
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
        this.setState({
            diachi: this.state.address,
            tuoi: this.state.age
        })
        this.setState({
            address: '',
            age: ''
        })
    }
    render() {
        let { showForm } = this.state;
        return (
            <>
                {showForm === false && <div><button onClick={this.handleShowHide}>Show</button></div>}
                {showForm &&
                    <>
                        <div><button onClick={this.handleShowHide}>Hide</button></div>
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
                            <div>{this.state.diachi} - {this.state.tuoi}</div>
                        </div>
                    </>
                }
            </>
        )
    }
}
