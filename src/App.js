import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import MyComponent from './components/MyComponent';
// const App = () => {
//   const count = useSelector(state => state.counter.count);
//   const dispatch = useDispatch();

//   return (
//     <>
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />

//           <div>Count = {count}</div>
//           <button className='btn btn-warning' onClick={() => dispatch(increaseCounter())}>Increase</button>
//           <button className='btn btn-success' onClick={() => dispatch(decreaseCounter())}>Decrease</button>
//           <MyComponent />
//         </header>
//       </div>
//     </>
//   );
// }

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo"/>
          <MyComponent />
        </header>
      </div>
    )
  }
}

export default App;
