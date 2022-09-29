import axios from "axios";
import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
  ADD_USER,
  ADD_USER_FAILED
} from "../constants/user";
import { toast } from "react-toastify";
import { DM_BACKEND_SERVICE_URL } from "../../model/Constants";

export const userAction = (type,userData) => async (dispatch) => {
  switch (type) {
    case GET_USERS:
        {
      try {
        dispatch({ type: GET_USERS });
        const { data } = await axios.get(
          DM_BACKEND_SERVICE_URL+ "/api/recruiter/df799490-2433-4a03-8f6b-02f458ed2930"
        )
        dispatch({ type: GET_USERS_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: GET_USERS_FAILED,
          payload:
            error.data && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
      break;
    }
    case ADD_USER:
        {
            try {
                const { data } = await axios.post(
                  "https://u8evk630vj.execute-api.ap-south-1.amazonaws.com/dev/user", {user:userData.user},{
                  headers:{
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': userData.token,
                  }
                });
                if(data.code==='UsernameExistsException'){
                  dispatch({
                    type: ADD_USER_FAILED,
                    payload:
                      data && data.message
                  });
                  toast.error("Account with given email already exist");
                }else if(data.code==='InvalidParameterException'){
                  dispatch({
                    type: ADD_USER_FAILED,
                    payload:
                      data && data.message
                  });
                  toast.error("Invalid parameter provided");
                }else{
                  dispatch({ type: ADD_USER, payload: data });
                  toast.success(userData.user.userType+" Successfully registered");
                }
                
              } catch (error) {
                dispatch({
                  type: ADD_USER_FAILED,
                  payload:
                    error.data && error.response.data.message
                      ? error.response.data.message
                      : error.message,
                });
                toast.error(error.message);
                
              } 
        break;
    }      
        default :
     }
};
