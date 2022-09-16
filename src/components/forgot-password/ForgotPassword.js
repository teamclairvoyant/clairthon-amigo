import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import styles from "../login/Login.module.scss";
import TextBox from "../common/TextField";
import { COPY } from "../../constant";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "@mui/material/Link";
import Toster from "../common/Toster";
import { toast } from "react-toastify";
import { Auth } from "aws-amplify";

function ForgotPassword() {
  const validationSchema = yup.object({
    email: yup.string().email(COPY.ENTER_VALID_EMAIL).trim().required(COPY.EMAIL_REQUIRED),
  });

  
  let navigate = useNavigate();

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

  const onError = useCallback(() => {
    //notificationService.showError(COPY.VALIDATION_ENTER_ALL_FIELDS);
    // setLoader(false);
  }, []);

  const onSubmit = useCallback(async() => {
   //setEmail(getValues("email"));
  try {
    await Auth.forgotPassword(getValues("email"))
      .then((user) => {
        if (user) {
          navigate("/register");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  } catch (error) {
    toast.error("Error Occured Please try again later");
  }
  },[getValues,navigate]);

  const goBack=useCallback(()=>{
    navigate("/login");
  },[navigate]);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div
        className={`h-screen flex bg-primary bg-no-repeat bg-cover ${styles.backImg}`}
      >
        <main
          className={`${styles.backgroundColor} w-full max-w-md px-12 self-center rounded mx-auto`}
        >
          <h5 className="text-center font-semibold text-main pt-2">
            {COPY.FORGOT_PASSWORD}
          </h5>
          <div className="pb-5">
            <Controller
              control={control}
              name={"email"}
              render={({ field: { onChange, value,onBlur } }) => (
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
          <div className="flex w-full justify-center pb-4">
            <span className={styles.gradeButtonWrapper}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                className={styles.loginButton}
                onClick={handleSubmit(onSubmit, onError)}
              >
                {COPY.SEND}
              </Button>
            </span>
          </div>
          <div className="pb-4">
            <Link className="ml-1 pb-4 cursor-pointer" onClick={goBack}>{COPY.BACK}</Link>
          </div>
        </main>
      </div>
      <Toster/>
    </form>
  );
}
export default ForgotPassword;
