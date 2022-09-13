import React, { useCallback, useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { CANDIDATE } from "../../model/Constants";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import styles from "./Login.module.scss";
import TextBox from "../common/TextField";
import { COPY } from "../../constant";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "@mui/material/Link";
import ForgotPassword from '../forgot-password/ForgotPassword'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUsrType, setLoggedInUserType] = useState("");
  const [userObj, setUserObj] = useState("");

  const validationSchema = yup.object({
    email: yup.string().trim().required(COPY.EMAIL_REQUIRED),
    password: yup.string().trim().required(COPY.PASSWORD_REQUIRED),
  });

  const {
    handleSubmit,
    control,
    setValue,
    setError,
    reset,
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

  console.log(errors);

  // Auth.currentUserInfo().then((userInfo).catch(e) =>
  //   setLoggedInUserType(userInfo?.attributes["custom:user_type"])
  // );

  let navigate = useNavigate();

  const handleInputChange = useCallback((e) => {
    const { id, value } = e.target;
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
  }, []);

  const goToSetPassword = useCallback(
    (user) => {
      setUserObj(user);
      navigate("/set-new-password", { state: { currentUser: userObj } });
    },
    [navigate, userObj]
  );
  const goToRegister = useCallback(() => {
    navigate("/register");
  }, [navigate]);
  const goToConfirmPage = useCallback(() => {
    navigate("/confirm-user", { state: { username: email } });
  }, [navigate, email]);

  const handleSignIn = useCallback(async () => {
    try {
      await Auth.signIn(getValues("email"), getValues("password"))
        .then((user) => {
          if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
            goToSetPassword(user);
          } else if (loggedInUsrType !== CANDIDATE) {
            goToRegister();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("error signing in", error);
      if (error.code === "UserNotConfirmedException") {
        goToConfirmPage();
      }
    }
  }, [
    goToRegister,
    goToConfirmPage,
    goToSetPassword,
    loggedInUsrType,
    getValues,
  ]);

  const handleSignOut = useCallback(async () => {
    // You can pass an object which has the username, password and validationData which is sent to a PreAuthentication Lambda trigger
    Auth.signOut()
      .then((user) => {
        console.log(user);
      })
      .catch((err) => console.log(err));
  }, []);

  const onError = useCallback(() => {
    //notificationService.showError(COPY.VALIDATION_ENTER_ALL_FIELDS);
    // setLoader(false);
  }, []);

  const onSubmit = () => {
    setEmail(getValues("email"));
    setPassword(getValues("password"));
    handleSignIn();
  };
  const goToForgotPassword=useCallback(()=>{
    navigate("/ForgotPassword", { state: { username: email } });
  },[email,navigate]);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className={`h-screen flex bg-primary bg-no-repeat bg-cover ${styles.backImg}`}>
        <main
          className={`${styles.backgroundColor} max-w-md px-12 self-center rounded mx-auto`}
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
              render={({ field: { onChange, value } }) => (
                <TextBox
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <FormHelperText className="text-red">
              {errors?.email && errors.email.message}
            </FormHelperText>
          </div>
          <div className="pb-5">
            <Controller
              control={control}
              name={"password"}
              render={({ field: { onChange, value } }) => (
                <TextBox
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <FormHelperText className="text-red">
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
          <Link className="ml-1 pb-4 cursor-pointer" onClick={goToForgotPassword}>{COPY.FORGOT_PASSWORD}</Link>
          </div>
        </main>
      </div>
    </form>
  );
}
export default Login;
