import React, { useCallback, useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { RECRUITER, CANDIDATE, ADMIN } from "../../model/Constants";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import styles from "./Login.module.scss";
import TextBox from "../common/TextField";
import { COPY } from "../../constant";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "@mui/material/Link";
import Toster from "../common/Toster";
import { toast } from "react-toastify";
import User from "../Hooks/useAuth";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUsrType, setLoggedInUserType] = useState("");
  const navigate = useNavigate();
  const user = User();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email(COPY.ENTER_VALID_EMAIL)
      .trim()
      .required(COPY.EMAIL_REQUIRED),
    password: yup.string().trim().required(COPY.PASSWORD_REQUIRED),
  });

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  const goToRegister = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  useEffect(()=>{
    if(user !=={} && (user?.["custom:user_type"] == RECRUITER ||  user?.["custom:user_type"] == ADMIN)){
      goToRegister();
    }
    if(user !=={} && user?.["custom:user_type"] == CANDIDATE){
      navigate("/document");
    }
  },[goToRegister]);

  const goToSetPassword = useCallback(
    (username, password) => {
      navigate("/set-new-password", {
        state: { username: username, password: password },
      });
    },
    [navigate]
  );

 
  const goToConfirmPage = useCallback(() => {
    navigate("/confirm-user", { state: { username: email } });
  }, [navigate, email]);

  const handleSignIn = useCallback(async () => {
    try {
      await Auth.signIn(getValues("email"), getValues("password"))
        .then((user) => {
          localStorage.setItem("user", JSON.stringify(user?.attributes));
          if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
            goToSetPassword(getValues("email"), getValues("password"));
          } else if (loggedInUsrType !== CANDIDATE) {
            goToRegister();
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } catch (error) {
      toast.error("Incorrect username or password");
      if (error.code === "UserNotConfirmedException") {
        goToConfirmPage();
      }
    }
  }, [goToRegister, goToConfirmPage, loggedInUsrType, getValues,goToSetPassword]);

  const onError = useCallback(() => {}, []);

  const onSubmit = () => {
    setEmail(getValues("email"));
    setPassword(getValues("password"));
    handleSignIn();
  };
  const goToForgotPassword = useCallback(() => {
    navigate("/forgot-password", { state: { username: email } });
  }, [email, navigate]);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div
        className={`h-screen flex bg-primary bg-no-repeat bg-cover ${styles.backImg}`}
      >
        <main
          className={`${styles.backgroundColor} w-full max-w-md px-12 self-center rounded mx-auto`}
        >
          <div className={styles.tenantLogoContainer}>
            <img
              src="clair-logo-white.svg"
              alt={COPY.ALT_TEXT_LOGO}
              className="my-0 mx-auto my-auto"
            />
          </div>
          <h5 className="text-center font-semibold text-main">
            {COPY.LOGIN_HEADING_LABEL}
          </h5>
          <div className="pb-5">
            <Controller
              control={control}
              name={"email"}
              render={({ field: { onChange, value, onBlur } }) => (
                <TextBox
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            <FormHelperText className={styles.errorMessage}>
              {errors?.email && errors.email.message}
            </FormHelperText>
          </div>
          <div className="pb-5">
            <Controller
              control={control}
              name={"password"}
              render={({ field: { onChange, value, onBlur } }) => (
                <TextBox
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            <FormHelperText className={styles.errorMessage}>
              {errors?.password && errors.password.message}
            </FormHelperText>
          </div>
          <div className="flex w-full justify-center pb-4">
            <span className={styles.gradeButtonWrapper}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                className={styles.loginButton}
                onClick={handleSubmit(onSubmit, onError)}
              >
                {COPY.LOG_IN}
              </Button>
            </span>
          </div>
          <div className="pb-4">
            <Link
              className="ml-1 pb-4 cursor-pointer"
              onClick={goToForgotPassword}
            >
              {COPY.FORGOT_PASSWORD}
            </Link>
          </div>
          <div></div>
        </main>
      </div>
      <Toster />
    </form>
  );
}
export default Login;
