import { Auth } from 'aws-amplify';
import React, {useState} from 'react';
import { User } from '../../model/user';
import './style.css'
function RegisterUser() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

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
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }

    }

    const handleSubmit  = () => {
        var user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = password;
        console.log(user);
        try {
            Auth.signUp({
                username:email,
                password:password,
                attributes: {
                    email:email, 
                    given_name: firstName,
                    family_name: lastName,
                    phone_number: "+15555555555",
                    "custom:user_type": "candidate",
                },
                autoSignIn: { // optional - enables auto sign in after user is confirmed
                    enabled: true,
                }
            });
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
                <div className="password">
                    <label>Password </label>
                    <input  type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                </div>
                <div className="confirm-password">
                    <label>Confirm Password </label>
                    <input  type="password" id="confirmPassword" value={confirmPassword} onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password"/>
                </div>
            </div>
            <div className="footer">
                <button onClick={()=>handleSubmit()} type="submit" className="btn">Register</button>
            </div>
        </div>
        
       
    )       
}
export default RegisterUser;