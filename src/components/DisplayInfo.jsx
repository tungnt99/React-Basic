import React, { Component } from 'react'

export default class DisplayInfo extends Component {
  render() {
    // props
    let {listUsers} = this.props
    return (
      <div>
        {listUsers && listUsers.length > 0 && listUsers.map(item => {
          return(
            <div key={item.id}>
              <div>{item.name} - {item.age}</div>
            </div>
          )
        })}
      </div>
    )
  }
}
