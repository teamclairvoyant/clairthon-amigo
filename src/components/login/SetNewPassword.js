import React, {useState} from "react";
import { Auth } from "aws-amplify";
import { useNavigate, useLocation } from "react-router-dom";

function SetNewPassword({props}){
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const { state } = useLocation();
  console.log('state',useLocation);
  const userObj = state.userObj;


  const handleInputChange = (e) => {
    const {id, value} = e.target;
        if(id === "password"){
            setPassword(value);
        }
      }
  const goToDocumentPage = () => {
    navigate("/document");
  };

  async function SetNewPassword() {
    try {
        Auth.completeNewPassword(userObj, password).then(user => {
          // at this time the user is logged in if no MFA required
          console.log(userObj);
          goToDocumentPage();
        }).catch(e => {
          console.log(e);
        });
      
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
            <label>Enter new password</label>
            <input
              type="text"
              placeholder="Enter password"
              id="password"
              onChange = {(e) => handleInputChange(e)}
            />
          <div>
        </div>
        <button onClick={()=>SetNewPassword()} type="submit" className="btn">Confirm</button>
        <button onClick={()=>handleSignOut()} type="submit" className="btn">SignOut</button>
        </div>
      
    );
}
export default SetNewPassword;