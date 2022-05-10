import React from 'react';
import ReactDOM, { hydrate } from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Store from '../src/redux/Store';
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";

Store.subscribe(()=>{
	localStorage.setItem('reduxState', JSON.stringify(Store.getState()))
  })
//   const getTodosFromLocalStorage = () => {
// 	try { 
// 	  const persistedState = localStorage.getItem('reduxState') 
// 	  if (persistedState) 
// 		return JSON.parse(persistedState)
// 	}
// 	catch (e){ 
// 	  console.log(e)
// 	}
//   }
  
//   const todos = getTodosFromLocalStorage()
//   if(todos){
// 	Store.dispatch(hydrate(todos))
//   }
ReactDOM.render(
	<BrowserRouter>
	 <React.StrictMode>
		<Provider store={Store}>
		<App />	
		</Provider>
	</React.StrictMode>
	</BrowserRouter>,
	
  document.getElementById('root')

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
