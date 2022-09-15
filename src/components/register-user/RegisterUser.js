import React, { useState } from 'react';
import { User } from '../../model/user';
import styles from './RegisterUser.module.scss'
import addUser from '../../services/dmservice'
import { Auth } from 'aws-amplify';

import { CANDIDATE, RECRUITER } from '../../model/Constants'


function RegisterUser() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loggedInUsrType, setLoggedInUserType] = useState("");

    Auth.currentUserInfo()
        .then((userInfo) => setLoggedInUserType(userInfo.attributes["custom:user_type"]));

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "firstName") {
            setFirstName(value);
        }
        if (id === "lastName") {
            setLastName(value);
        }
        if (id === "email") {
            setEmail(value);
        }
        if (id === "phoneNumber") {
            setPhoneNumber(value);
        }

    }

    const handleSubmit = () => {
        var user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.phoneNumber = phoneNumber
        console.log(user);
        try {

            Auth.currentAuthenticatedUser()
                .then(data => {
                    if (loggedInUsrType === RECRUITER) {
                        user.userType = CANDIDATE;
                    }
                    addUser(user, data.signInUserSession.idToken.jwtToken);
                })
                .then(data => console.log(data))
                .catch(err => console.log(err));

        } catch (error) {
            console.log('error signing up:', error);
        }

    }

    function dropDown() {
        return <div>
            <select>
                <option value="Recruiter">Recruiter</option>
                <option value="Candidate">Candidate</option>
            </select>
        </div>
    }

    return (
        <div className="form">
            <div className="form-body">
                <div className="username">
                    <label>First Name </label>
                    <input type="text" value={firstName} onChange={(e) => handleInputChange(e)} id="firstName" placeholder="First Name" />
                </div>
                <div className="lastname">
                    <label >Last Name </label>
                    <input type="text" name="" id="lastName" value={lastName} onChange={(e) => handleInputChange(e)} placeholder="LastName" />
                </div>
                <div className="email">
                    <label>Email </label>
                    <input type="email" id="email" value={email} onChange={(e) => handleInputChange(e)} placeholder="Email" />
                </div>
                <div className="phoneNumber">
                    <label>Phone Number </label>
                    <input type="phoneNumber" id="phoneNumber" value={phoneNumber} onChange={(e) => handleInputChange(e)} placeholder="phoneNumber" />
                </div>
                <div>
                    {loggedInUsrType === "admin-user" && dropDown()}
                </div>

            </div>
            <div className="footer">
                <button onClick={() => handleSubmit()} type="submit" className="btn">Register</button>
            </div>
        </div>


    )
}
export default RegisterUser;