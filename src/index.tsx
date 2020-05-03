import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Cognito configuration
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

// Basic connection to AWS
fetch("https://t5oilhwxk3.execute-api.us-east-2.amazonaws.com/dev/test",{
    headers: { 'sfHeader': 'header' }
}).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})





ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
