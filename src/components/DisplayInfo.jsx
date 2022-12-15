import React, { Component } from 'react'

export default class DisplayInfo extends Component {
  render() {
    // props
    let {listUsers} = this.props
    return (
      <div>
        {listUsers && listUsers.length > 0 && listUsers.map(item => {
          
          return(
            <div key={item.id} className={+item.age > 18 ? "green": "red"}>
              <div className='d-flex justify-content-center align-items-center'>
                <div>{item.name} - {item.age}</div>
                <span><button onClick={() => this.props.onClick(item)}>Delete</button></span>

              </div>

            </div>
          )
        })}
      </div>
    )
  }
}
