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
import NativeSelect from "@mui/material/NativeSelect";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import UserData from "../Hooks/useAuth";
import { CANDIDATE, RECRUITER, ADMIN } from "../../model/Constants";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import { GET_USERS, ADD_USER } from "../../redux/constants/user";
import { toast } from "react-toastify";
import BasicTable from "../common/RegisterTable";

function RegisterUser() {
  const [userType, setUserType] = useState("Recruiter");
  const [loggedInUsrType, setLoggedInUserType] = useState("");
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const loading = useSelector((state) => state.loading);
  const userData = UserData();
  const navigate = useNavigate();
  const [Authdata, setData] = useState(null);

  const recruiterData = {
    recruiterId: userData?.sub ?? "",
  };
  useEffect(() => {
    Auth.currentUserInfo().then((userInfo) => {
      if (userInfo?.attributes["custom:user_type"] == "Candidate") {
        navigate("/document");
      }
      setLoggedInUserType(userInfo.attributes["custom:user_type"]);
    });

    dispatch(userAction(GET_USERS, recruiterData));
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

    if (id === "userType") {
      setUserType(value);
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

  const onSubmit = useCallback(async () => {
    const user = {
      firstName: getValues("firstName"),
      lastName: getValues("lastName"),
      email: getValues("email"),
      phoneNumber: "+" + getValues("phoneNumber"),
      userType: userType,
      recruiterId: userData?.sub ?? "",
    };
  
    Auth.currentAuthenticatedUser()
      .then((data) => {
        setData(data ?? null);
      })
      .catch((err) => console.log(err));

      const useData = {
        user: user,
        token: Authdata?.signInUserSession?.idToken?.jwtToken,
      };
      if (loggedInUsrType === RECRUITER) {
        user.userType = CANDIDATE;
      }
      await dispatch(userAction(ADD_USER, useData));
      await dispatch(userAction(GET_USERS, recruiterData));
  }, [Authdata?.signInUserSession?.idToken?.jwtToken, dispatch, getValues, loggedInUsrType, recruiterData, userData?.sub, userType]);

  const onError = useCallback(() => {}, []);

  function dropDown() {
    return (
      <div className="pb-5">
        <Controller
          control={control}
          name={"userType"}
          render={({ field: { onChange, value, onBlur } }) => (
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  User Type
                </InputLabel>
                <NativeSelect
                  defaultValue={RECRUITER}
                  inputProps={{
                    name: "userType",
                    id: "userType",
                  }}
                  onChange={handleInputChange}
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
    <>
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
              {loggedInUsrType == ADMIN && dropDown()}
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
      <BasicTable loading={loading} userList={userList} />
    </>
  );
}
export default withHeader(RegisterUser);
