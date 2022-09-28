import axios from "axios";
import {
  GET_REQUESTED_DOCUMENT,
  GET_REQUESTED_DOCUMENT_SUCCESS,
  GET_REQUESTED_DOCUMENT_FAILED,
  UPLOAD_DOCUMENT,
  UPLOAD_DOCUMENT_SUCCESS,
  UPLOAD_DOCUMENT_FAILED,
} from "../constants/user";
export const CandidatedocumentAction = (type, userData) => async (dispatch) => {
  switch (type) {
    case GET_REQUESTED_DOCUMENT:
      try {
        dispatch({ type: GET_REQUESTED_DOCUMENT });
        const { data } = await axios.get(
          `http://document-manager-backend.eba-uaum3bdf.ap-south-1.elasticbeanstalk.com/api/requiredDocuments/32bd9e35-9217-4631-85a2-9229ad1e96e1`
        );
        dispatch({ type: GET_REQUESTED_DOCUMENT_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: GET_REQUESTED_DOCUMENT_FAILED,
          payload:
            error.data && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
      break;
    case UPLOAD_DOCUMENT:
      try {
        dispatch({ type: UPLOAD_DOCUMENT });
        const { data } = await axios.post(
          "http://document-manager-backend.eba-uaum3bdf.ap-south-1.elasticbeanstalk.com/api/upload",
          userData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        dispatch({ type: UPLOAD_DOCUMENT_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: UPLOAD_DOCUMENT_FAILED,
          payload:
            error.data && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
      break;
    default:
      return;
  }
};
