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
import {RECRUITER} from '../../model/Constants'

function SetNewPassword(props) {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [open, setOpen] = React.useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  

  const oldPassword = location.state?.password ?? null;
  const username = location.state?.username ?? null;

  const handleInputChange = useCallback((e) => {
    const { id, value } = e.target;
    if (id === "password") {
      setPasswordError(false);
      setPassword(value);
    }
  },[]);

  const handleClose = () => {
    setOpen(false);
    navigate("/login");
  };

  const setNewPassword = useCallback(async() => {
    if (!password || password === '') {
      setPasswordError(true);
    }
    try {
      if (username && password) {
        Auth.signIn(username, oldPassword).then((user) => {
          Auth.completeNewPassword(user, password)
            .then((user) => {
              localStorage.setItem("user", JSON.stringify(user?.challengeParam?.userAttributes));
              if(user?.challengeParam?.userAttributes?.["custom:user_type"] == RECRUITER){
                navigate("/register");
              }else{
                navigate("/document");
              }
            })
            .catch((e) => {
              console.log(e);
            });
        });
      }
    } catch (error) {
      console.log("error occured for log out", error);
    }
  }, [oldPassword, password, username]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="text-md">Set New Password</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <label className="text-main text-black mr-4 font-normal">
              Enter new password
            </label>
            <input
              type="text"
              placeholder="Enter password"
              id="password"
              className="text-md"
              onChange={(e) => handleInputChange(e)}
            />
          </DialogContentText>
         {passwordError &&(<span className={`${styles.errorMessage} text-sm`}>{COPY.REQUIRED_FIELD}</span>)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={setNewPassword} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default SetNewPassword;
