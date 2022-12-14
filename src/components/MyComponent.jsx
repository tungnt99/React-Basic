import React, { Component } from 'react'

export default class MyComponent extends Component {
    state = {
        name: 'Thanh Tung',
        age: "24",
        address: "HN"
    }
  render() {
    return (
        <>
            <div>MyComponent {Math.random()}</div>
            <div>Name: {this.state.name}</div>
            <div>Age: {this.state.age}</div>
            <div>Address: {this.state.address}</div>
        </>
    )
  }
}
