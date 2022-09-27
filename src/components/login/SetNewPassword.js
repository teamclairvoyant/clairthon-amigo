import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useNavigate, useLocation } from "react-router-dom";

function SetNewPassword(props) {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const oldPassword = location.state.password
  const username = location.state.username

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "password") {
      setPassword(value);
    }
  }
  const goToDocumentPage = () => {
    navigate("/document");
  };

  async function setNewPassword() {
    try {
      Auth.signIn(username, oldPassword)
        .then(user => {
          Auth.completeNewPassword(user, password).then(user => {
            goToDocumentPage();
          }).catch(e => {
            console.log(e);
          });

        })
      } catch (error) {
          console.log('error confirming sign up', error);
        }

    }

  return (
    <div>
      <label>Enter new password</label>
      <input
        type="text"
        placeholder="Enter password"
        id="password"
        onChange={(e) => handleInputChange(e)}
      />
      <div>
      </div>
      <button onClick={() => setNewPassword()} type="submit" className="btn">Confirm</button>
    </div>

  );
}
export default SetNewPassword;