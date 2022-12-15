import React, { Component } from 'react'

export default class AddUserInfo extends Component {
    state = {
        name: "",
        age: "",
        showForm: false
    }
    handleShowHide = () => {
        this.setState({
            showForm: !this.state.showForm
        });
    }
    handleOnChangeName = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    handleOnChangeAge = (event) => {
        this.setState({
            age: event.target.value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        if (!this.state.name || !this.state.age) {
            alert('Missing required params')
            return;
        }
        this.props.handleAddUser({
            id: Math.floor(Math.random() * 1001),
            name: this.state.name,
            age: this.state.age
        })
      
        this.setState({
            name: '',
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
                                    <input type="text" className='form-control' value={this.state.name} onChange={(event) => this.handleOnChangeName(event)} />
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
                    </>
                }
            </>
        )
    }
}
