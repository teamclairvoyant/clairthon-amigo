import React, {useState}from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

function Login(){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  let navigate = useNavigate();

  const handleInputChange = (e) => {
    const {id, value} = e.target;
    if(id === "email"){
      setEmail(value);
    }
    if(id === "password"){
      setPassword(value);
  }
  }
  const goToRegister = () => {
    navigate("/register");
  };
  const goToConfirmPage = () => {
    navigate("/confirm-user", 
    { state: { username: email } }
    );
  };

  async function handleSignIn() {
    
    try {
        const user = await Auth.signIn(email, password);
        console.log('user signing in', user);
   
        goToRegister();
    } catch (error) {
        console.log('error signing in', error);
        if(error.code === 'UserNotConfirmedException'){
          goToConfirmPage();
        }
    }
  }

  async function handleSignOut(){    // You can pass an object which has the username, password and validationData which is sent to a PreAuthentication Lambda trigger
    Auth.signOut()
      .then(user => {
        console.log(user);
      })
      .catch(err => console.log(err));
  };

    return (
      <div>
            <label>Email address</label>
            <input
              type="email"
              placeholder="Enter email"
              id="email"
              onChange = {(e) => handleInputChange(e)}
            />
          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              id="password"
              onChange = {(e) => handleInputChange(e)}
            />
      </div>
        <button onClick={()=>handleSignIn()} type="submit" className="btn">SignIn</button>
        <button onClick={()=>handleSignOut()} type="submit" className="btn">SignOut</button>
        </div>
      
    );
}
export default Login;