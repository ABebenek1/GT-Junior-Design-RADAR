import React from 'react';
import ReactDOM from 'react-dom';
// App.js is where we will render our application

// Connect this file to the CSS styling
import './index.css';

// import login page 
import Login from './components/login.js';

function App(){
    console.log(Login)
    return (
        <>
            <Login />
        </>


    )
}


ReactDOM.render(<App />, document.getElementById('root'));
