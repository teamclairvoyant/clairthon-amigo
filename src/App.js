import React from 'react'
import './App.css'
import {Amplify} from 'aws-amplify'
import config from './aws-exports'
import '@aws-amplify/ui-react/styles.css'
import { Routes, Route } from "react-router-dom"
import Login from './component/login/Login'
import RegisterUser from './component/signup/RegisterUser'
import ConfirmUser from './component/confirm-user/confirmuser'
import Document from './component/document/document'


Amplify.configure(config)

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Login/> } />
        <Route path="login" element={ <Login/> } />
        <Route path="register" element={ <RegisterUser/> } />
        <Route path="document" element={ <Document/> } />
        <Route path="confirm-user" element={ <ConfirmUser/> } />
      </Routes>
    </div>
  );
}

export default (App);
