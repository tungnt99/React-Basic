import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import MyComponent from './components/MyComponent';
const App = () => {
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();

  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          
          <div>Count = {count}</div>
          <button className='btn btn-warning' onClick={() => dispatch(increaseCounter())}>Increase</button>
          <button className='btn btn-success' onClick={() => dispatch(decreaseCounter())}>Decrease</button>
        </header>
      </div>
      <MyComponent />
    </>
  );
}

export default App;
