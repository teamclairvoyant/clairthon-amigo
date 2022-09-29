import React, { useState, useCallback } from "react";
import { Auth } from "aws-amplify";
import { useNavigate, useLocation } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { COPY } from "../../constant";
import styles from "../login/Login.module.scss";

function ConfirmUser() {
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  let navigate = useNavigate();
  const { state } = useLocation();
  const username = state?.username;
  const [passwordError, setPasswordError] = useState(false);
  const [open, setOpen] = React.useState(true);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "confirmCode") {
      setCode(value);
    }
    if (id === "newPassword") {
      setNewPassword(value);
    }
  }

  const goToDocumentPage = () => {
    navigate("/document");
  };

  const confirmSignUp = useCallback(async () => {
    if (!code || code === '') {
      setPasswordError(true);
    }
    try {
      if (username && code) {
        try {
          await Auth.confirmSignUp(username, code);
          goToDocumentPage()
        } catch (error) {
          console.log('error confirming sign up', error);
        }
      }
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  }, [goToDocumentPage, code, username, newPassword]);

  const handleClose = () => {
    setOpen(false);
    navigate("/login");
  };

  async function confirmNewPassword() {
    try {
      await Auth.forgotPasswordSubmit(username, code, newPassword)
      goToDocumentPage()
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }

  async function handleSignOut() {    // You can pass an object which has the username, password and validationData which is sent to a PreAuthentication Lambda trigger
    Auth.signOut()
      .then(user => {
        console.log(user);
      })
      .catch(err => console.log(err));
  };


  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="text-md">Enter confirmation Code & Password</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <label className="text-main text-black mr-4 font-normal">
              Enter 
            </label>
            <input
              type="text"
              placeholder="Confirmation Code"
              id="confirmCode"
              className="text-md"
              onChange={(e) => handleInputChange(e)}
            />
          </DialogContentText>
          {passwordError && (<span className={`${styles.errorMessage} text-sm`}>{COPY.REQUIRED_FIELD}</span>)}

          <DialogContentText id="alert-dialog-description">
            <label className="text-main text-black mr-4 font-normal">
              Enter
            </label>
            <input
              type="text"
              placeholder="New password"
              id="newPassword"
              className="text-md"
              onChange={(e) => handleInputChange(e)}
            />
          </DialogContentText>
          {passwordError && (<span className={`${styles.errorMessage} text-sm`}>{COPY.REQUIRED_FIELD}</span>)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={confirmNewPassword} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  );
}
export default ConfirmUser;