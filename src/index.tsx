import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

import AppContainer from './App'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

const ADD_AGE = "ADD_AGE";

export function addAge():{type:string;} {
  return {
    type: ADD_AGE
  }
}

function ageApp(state : {age:number}= {age :35}, action: {type : 'ADD_AGE'}){
  if(action.type === ADD_AGE){
    return{
      age: state.age+1
    }
  }
  return state;
}

const store = createStore(ageApp);

ReactDOM.render(
  <Provider store = {store}>
    <AppContainer />
  </Provider>,
    document.getElementById('root')
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
