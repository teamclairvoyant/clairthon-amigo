import axios from "axios";
import {
  GET_ALL_DOCUMENTS,
  GET_ALL_SUCCESS,
  GET_ALL_FAILED,
  ADD_REQUESTED_DOCUMENT,
  ADD_REQUESTED_DOCUMENT_SUCCESS,
  ADD_REQUESTED_DOCUMENT_FAILED
} from "../constants/user";
import {DM_BACKEND_SERVICE_URL} from "../../model/Constants"
export const documentAction = (type, userData) => async (dispatch) => {
  switch (type) {
    case GET_ALL_DOCUMENTS:
      {
        try {
          dispatch({ type: GET_ALL_DOCUMENTS });
          const { data } = await axios.get(
            DM_BACKEND_SERVICE_URL+ "/api/document"
          );
          dispatch({ type: GET_ALL_SUCCESS, payload: data });
        } catch (error) {
          dispatch({
            type: GET_ALL_FAILED,
            payload:
              error.data && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
        }
        break;
      }
      
      case ADD_REQUESTED_DOCUMENT:
      {
        try {
          dispatch({ type: ADD_REQUESTED_DOCUMENT });
          const { data } = await axios.post(
            DM_BACKEND_SERVICE_URL+"/api/submit", userData
          );
          dispatch({ type: ADD_REQUESTED_DOCUMENT_SUCCESS, payload: data });
        } catch (error) {
          dispatch({
            type: ADD_REQUESTED_DOCUMENT_FAILED,
            payload:
              error.data && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
        }
        break;
      }
  }
};


