import React, { useCallback, useState, useEffect } from "react";
import { User } from "../../model/user";
import styles from "./Register.module.scss";
import addUser from "../../services/dmservice";
import { Auth } from "aws-amplify";
import { COPY } from "../../constant";
import Button from "@mui/material/Button";
import withHeader from "../HOCS/withHeader";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextBox from "../common/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Toster from "../common/Toster";
import NativeSelect from '@mui/material/NativeSelect';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import { CANDIDATE, RECRUITER, ADMIN } from "../../model/Constants";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/actions/userAction";
import {
  GET_USERS,
  ADD_USER
} from "../../redux/constants/user";
import { toast } from "react-toastify";


function RegisterUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loggedInUsrType, setLoggedInUserType] = useState("");
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, users, error,message } = userList;

  useEffect(() => {
    Auth.currentUserInfo().then((userInfo) => {
      setLoggedInUserType(userInfo.attributes["custom:user_type"])
    });
    dispatch(userAction(GET_USERS));
  }, [dispatch]);



  const phoneRegExp =
    /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;

  const validationSchema = yup.object({
    firstName: yup.string().trim().required(COPY.FIRST_NAME_REQUIRED),
    lastName: yup.string().trim().required(COPY.LAST_NAME_REQUIRED),
    email: yup
      .string()
      .email(COPY.ENTER_VALID_EMAIL)
      .trim()
      .required(COPY.EMAIL_REQUIRED),
    phoneNumber: yup
      .string()
      .trim()
      .required(COPY.PHONE_NUMBER_REQUIRED)
      .matches(phoneRegExp, "Phone number is not valid")
      .min(10, "Phone number is not valid")
      .max(12, "Phone number is not valid"),
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "firstName") {
      setFirstName(value);
    }
    if (id === "lastName") {
      setLastName(value);
    }
    if (id === "email") {
      setEmail(value);
    }
    if (id === "phoneNumber") {
      setPhoneNumber(value);
    }
  };

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = () => {
    const user={
      firstName:getValues('firstName'),
      lastName:getValues('lastName'),
      email:getValues('email'),
      phoneNumber:getValues('phoneNumber'),
      userType:'Candidate'
    }

    Auth.currentAuthenticatedUser()
        .then((data) => {
          if (loggedInUsrType === RECRUITER) {
            user.userType = CANDIDATE;
          }
          const userData = {
            user:user,
            token: data.signInUserSession.idToken.jwtToken
          }
          dispatch(userAction(ADD_USER, userData));
          dispatch(userAction(GET_USERS));
          toast.message("Successfully added"+ user.email);
        })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
  };

  const onError = useCallback(() => {
    //notificationService.showError(COPY.VALIDATION_ENTER_ALL_FIELDS);
    // setLoader(false);
  }, []);

  function dropDown() {
    return (
      <div className="pb-5">
        <Controller
          control={control}
          name={"user Type"}
          render={({ field: { onChange, value, onBlur } }) => (
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  User Type
                </InputLabel>
                <NativeSelect
                  defaultValue={RECRUITER}
                  inputProps={{
                    name: 'userType',
                    id: 'uncontrolled-native',
                  }}
                >
                  <option value={CANDIDATE}>Candidate</option>
                  <option value={RECRUITER}>Recruiter</option>
                </NativeSelect>
              </FormControl>
            </Box>
          )}
        />
      </div>
    );
  }

  return (
    <section className="conatiner mt-8 mb-20 h-full">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div
          className={`flex bg-primary bg-no-repeat bg-cover marginTop ${styles.backImg}`}
        >
          <main
            className={`${styles.backgroundColor} w-full max-w-md px-12 marginTop rounded mx-auto`}
          >
            <div className={styles.tenantLogoContainer}>
              <img
                src="clair-logo-white.svg"
                alt={COPY.ALT_TEXT_LOGO}
                className="my-0 mx-auto my-auto"
              />
            </div>
            <h5 className="text-center font-semibold text-main">
              {COPY.REGISTER_USER}
            </h5>
            <div className="pb-3">
              <Controller
                control={control}
                name={"firstName"}
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextBox
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              <FormHelperText className={styles.errorMessage}>
                {errors?.firstName && errors.firstName.message}
              </FormHelperText>
            </div>
            <div className="pb-3">
              <Controller
                control={control}
                name={"lastName"}
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextBox
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              <FormHelperText className={styles.errorMessage}>
                {errors?.lastName && errors.lastName.message}
              </FormHelperText>
            </div>
            <div className="pb-3">
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
                name={"phoneNumber"}
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextBox
                    fullWidth
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    value={value}
                    type="number"
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              <FormHelperText className={styles.errorMessage}>
                {errors?.phoneNumber && errors.phoneNumber.message}
              </FormHelperText>
            </div>
            {
              loggedInUsrType == ADMIN && dropDown()
            }
            <div className="flex w-full justify-center pb-4">
              <span className={styles.gradeButtonWrapper}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  className={styles.loginButton}
                  onClick={handleSubmit(onSubmit, onError)}
                >
                  {COPY.REGISTER}
                </Button>
              </span>
            </div>
          </main>
        </div>
        <Toster />
      </form>
    </section>
  );
}
export default withHeader(RegisterUser);
