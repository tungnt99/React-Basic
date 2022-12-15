import React, { Component } from 'react'

export default class DisplayInfo extends Component {
  render() {
    // props
    let {name, age} = this.props
    return (
      <div>
        <div>My name: {name}</div>
        <div>My Age: {age}</div>
      </div>
    )
  }
}
