import React, {useState} from 'react';
import { User } from '../../model/user';
import './style.css'
import addUser from '../../services/dmservice'
import { Auth } from 'aws-amplify';

import {CANDIDATE} from '../../model/Constants'


function RegisterUser() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "firstName"){
            setFirstName(value);
        }
        if(id === "lastName"){
            setLastName(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "phoneNumber"){
            setPhoneNumber(value);
        }

    }

    const handleSubmit  = () => {
        var user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.phoneNumber = phoneNumber
        console.log(user);
        try {

            Auth.currentAuthenticatedUser()
                .then(data => {
                    user.userType = CANDIDATE;
                    addUser(user, data.signInUserSession.idToken.jwtToken);
                })
                .then(data => console.log(data))
                .catch(err => console.log(err));

            console.log(user);
            
        } catch (error) {
            console.log('error signing up:', error);
        }


    }

    return(
        <div className="form">
            <div className="form-body">
                <div className="username">
                    <label>First Name </label>
                    <input  type="text" value={firstName} onChange = {(e) => handleInputChange(e)} id="firstName" placeholder="First Name"/>
                </div>
                <div className="lastname">
                    <label >Last Name </label>
                    <input  type="text" name="" id="lastName" value={lastName}   onChange = {(e) => handleInputChange(e)} placeholder="LastName"/>
                </div>
                <div className="email">
                    <label>Email </label>
                    <input  type="email" id="email"  value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                </div>
                <div className="phoneNumber">
                    <label>Phone Number </label>
                    <input  type="phoneNumber" id="phoneNumber"  value={phoneNumber} onChange = {(e) => handleInputChange(e)} placeholder="phoneNumber"/>
                </div>
            </div>
            <div className="footer">
                <button onClick={()=>handleSubmit()} type="submit" className="btn">Register</button>
            </div>
        </div>
        
       
    )       
}
export default RegisterUser;