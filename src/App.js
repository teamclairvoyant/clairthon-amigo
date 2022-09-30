import React from "react";
import './App.scss'
import {Amplify} from 'aws-amplify'
import config from './aws-exports'
import '@aws-amplify/ui-react/styles.css'
import { Routes, Route } from "react-router-dom"
import Login from './components/login/Login'
import RegisterUser from './components/register-user/RegisterUser'
import ConfirmUser from './components/confirm-user/confirmuser'
import Document from './components/document/document'
import SetNewPassword from './components/login/SetNewPassword'
import ForgotPassword from './components/forgot-password/ForgotPassword'
import RequestDocuments from './components/request-document/RequestDocuments'
import Protected from "./services/Protected";

Amplify.configure(config)

function App() {
  const user = localStorage.getItem("user");
  var isLoggedIn = false;
  if(user !== undefined && user !== null){
    isLoggedIn = true
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Login/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="confirm-user" element={ <ConfirmUser/> } />
        <Route path="set-new-password" element={ <SetNewPassword/> } />
        <Route path="forgot-password" element={ <ForgotPassword/> } />
        <Route path="register" element={ 
          <Protected isLoggedIn={isLoggedIn}>
            <RegisterUser/> 
          </Protected>
        } />
        <Route path="document" element={ 
            <Protected isLoggedIn={isLoggedIn}>
              <Document/>
            </Protected>
        } />
        <Route path="request-documents" element={ 
            <Protected isLoggedIn={isLoggedIn}>
              <RequestDocuments/>
            </Protected>
        } />
        <Route path="*" element={ <Login/> } />
      </Routes>
    </div>
  );
}

export default (App);
