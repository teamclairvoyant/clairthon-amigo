import axios from "axios";
import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
  ADD_USER,
  ADD_USER_FAILED
} from "../constants/user";
import { toast } from "react-toastify";
export const userAction = (type,userData) => async (dispatch) => {
    console.log(type,userData);
  switch (type) {
    case GET_USERS:
        {
      try {
        dispatch({ type: GET_USERS });
        const { data } = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
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
                  "https://jsonplaceholder.typicode."
                );
                console.log(data);
                dispatch({ type: ADD_USER, payload: data });
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
