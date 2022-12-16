import React, { Component } from 'react'

export default class DisplayInfo extends Component {
  constructor(props) {
    console.log('constructor: 1');
    super(props);
    this.state = {

    };
  }
  componentDidMount(){
    console.log('>>>componentDidMount');
    setTimeout(() => {
      document.title='Test Lifecycle'
    }, 2000)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('>>>componentDidUpdate', this.props, prevProps);
    if(this.props.listUsers !== prevProps.listUsers){
      if(this.props.listUsers.length === 5){
        alert('you got 5 user')
      }
    }
  }
  render() {
    // props
    console.log('render');

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
