import React, {useState}from "react";
import { Auth } from "aws-amplify";
import { useNavigate, useLocation } from "react-router-dom";

function ConfirmUser(){
  const [code, setCode] = useState("");
  let navigate = useNavigate();
  const { state } = useLocation();
  const username = state.username;

  const handleInputChange = (e) => {
    const {id, value} = e.target;
        if(id === "confirmCode"){
            setCode(value);
        }
    }

  const goToDocumentPage = () => {
    navigate("/document");
  };

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, code);
      goToDocumentPage()
    } catch (error) {
        console.log('error confirming sign up', error);
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
            <label>Enter confirmation Code</label>
            <input
              type="text"
              placeholder="Enter code"
              id="confirmCode"
              onChange = {(e) => handleInputChange(e)}
            />
          <div>
        </div>
        <button onClick={()=>confirmSignUp()} type="submit" className="btn">Confirm</button>
        <button onClick={()=>handleSignOut()} type="submit" className="btn">SignOut</button>
        </div>
      
    );
}
export default ConfirmUser;