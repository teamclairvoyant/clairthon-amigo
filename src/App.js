import React from 'react'
import './App.css'
import {Amplify} from 'aws-amplify'
import config from './aws-exports'
import '@aws-amplify/ui-react/styles.css'
import { Routes, Route } from "react-router-dom"
import Login from './components/login/Login'
import RegisterUser from './components/register-user/RegisterUser'
import ConfirmUser from './components/confirm-user/confirmuser'
import Document from './components/document/document'
import SetNewPassword from './components/login/SetNewPassword'


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
        <Route path="set-new-password" element={ <SetNewPassword/> } />
      </Routes>
    </div>
  );
}

export default (App);
