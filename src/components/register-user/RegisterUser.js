import React, { useCallback, useState } from 'react';
import { User } from '../../model/user';
import styles from './Register.module.scss'
import addUser from '../../services/dmservice'
import { Auth } from 'aws-amplify';
import { COPY } from "../../constant";
import Button from "@mui/material/Button";
import withHeader from "../HOCS/withHeader";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextBox from "../common/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Toster from "../common/Toster";

import { CANDIDATE, RECRUITER } from '../../model/Constants'


function RegisterUser() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loggedInUsrType, setLoggedInUserType] = useState("");

    Auth.currentUserInfo()
        .then((userInfo) => setLoggedInUserType(userInfo.attributes["custom:user_type"]));

    const validationSchema = yup.object({
        email: yup.string().email(COPY.ENTER_VALID_EMAIL).trim().required(COPY.EMAIL_REQUIRED),
        password: yup.string().trim().required(COPY.PASSWORD_REQUIRED),
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

    }

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

    const handleSubmit1 = () => {
        var user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.phoneNumber = phoneNumber
        try {

            Auth.currentAuthenticatedUser()
                .then(data => {
                    if (loggedInUsrType === RECRUITER) {
                        user.userType = CANDIDATE;
                    }
                    addUser(user, data.signInUserSession.idToken.jwtToken);
                })
                .then(data => console.log(data))
                .catch(err => console.log(err));

        } catch (error) {
            console.log('error signing up:', error);
        }

    }

    const onSubmit = () => {
        //Register
    };

    const onError = useCallback(() => {
        //notificationService.showError(COPY.VALIDATION_ENTER_ALL_FIELDS);
        // setLoader(false);
      }, []);

    function dropDown() {
        return <div>
            <select>
                <option value="Recruiter">Recruiter</option>
                <option value="Candidate">Candidate</option>
            </select>
        </div>
    }

    return (

        <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div
        className={`h-screen flex bg-primary bg-no-repeat bg-cover marginTop ${styles.backImg}`}
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
            {COPY.LOGIN_HEADING_LABEL}
          </h5>
          <div className="pb-5">
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
                  label="phoneNumber"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            <FormHelperText className={styles.errorMessage}>
              {errors?.phoneNumber && errors.phoneNumber.message}
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
                {COPY.REGISTER}
              </Button>
            </span>
          </div>
          <div>
          </div>
        </main>
      </div>
      <Toster/>
    </form>



        // <div className={`form h-screen bg-primary bg-no-repeat bg-cover ${styles.backImg}`}>
        //     <main
        //         className={`${styles.backgroundColor} max-w-md px-12 self-center rounded mx-auto`}
        //     >
        //         <h5 className="text-center font-semibold text-main">
        //             {COPY.REGISTER_CANDIDATE}
        //         </h5>
        //         <div className="username">
        //             <label>First Name </label>
        //             <input type="text" value={firstName} onChange={(e) => handleInputChange(e)} id="firstName" placeholder="First Name" />
        //         </div>
        //         <div className="lastname">
        //             <label >Last Name </label>
        //             <input type="text" name="" id="lastName" value={lastName} onChange={(e) => handleInputChange(e)} placeholder="LastName" />
        //         </div>
        //         <div className="email">
        //             <label>Email </label>
        //             <input type="email" id="email" value={email} onChange={(e) => handleInputChange(e)} placeholder="Email" />
        //         </div>
        //         <div className="phoneNumber">
        //             <label>Phone Number </label>
        //             <input type="phoneNumber" id="phoneNumber" value={phoneNumber} onChange={(e) => handleInputChange(e)} placeholder="phoneNumber" />
        //         </div>
        //         <div>
        //             {loggedInUsrType === "admin-user" && dropDown()}
        //         </div>
        //         <div className="flex w-full justify-center pb-4">
        //             <span className={styles.gradeButtonWrapper}>
        //                 <Button
        //                     type="submit"
        //                     variant="contained"
        //                     size="large"
        //                     className={styles.loginButton}
        //                 >
        //                     {COPY.REGISTER}
        //                 </Button>
        //             </span>
        //         </div>
        //         {/* <div className="footer">
        //             <button onClick={() => handleSubmit()} type="submit" className="btn">Register</button>
        //         </div> */}
        //     </main>
        // </div>


    )
}
export default withHeader(RegisterUser);