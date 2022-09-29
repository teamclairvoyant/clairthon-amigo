import React from 'react'
import './App.scss'
import {Amplify} from 'aws-amplify'
import config from './aws-exports'
import '@aws-amplify/ui-react/styles.css'
import { Routes, Route } from "react-router-dom"
import Login from './components/login/Login'
import RegisterUser from './components/register-user/RegisterUser'
import ConfirmUser from './components/confirm-user/ConfirmUser'
import Document from './components/document/document'
import SetNewPassword from './components/login/SetNewPassword'
import ForgotPassword from './components/forgot-password/ForgotPassword'
import RequestDocuments from './components/request-document/RequestDocuments'

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
        <Route path="forgot-password" element={ <ForgotPassword/> } />
        <Route path="request-documents" element={ <RequestDocuments/> } />
        
      </Routes>
    </div>
  );
}

export default (App);
