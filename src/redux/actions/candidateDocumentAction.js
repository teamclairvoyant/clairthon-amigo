import axios from "axios";
import {
  GET_REQUESTED_DOCUMENT,
  GET_REQUESTED_DOCUMENT_SUCCESS,
  GET_REQUESTED_DOCUMENT_FAILED,
  UPLOAD_DOCUMENT,
  UPLOAD_DOCUMENT_SUCCESS,
  UPLOAD_DOCUMENT_FAILED,
  VIEW_FILE,
  VIEW_FILE_SUCCESS,
  VIEW_FILE_FILED,
  DOWNLOAD_ALL,
  DOWNLOAD_ALL_SUCCESS,
  DOWNLOAD_ALL_FILED
} from "../constants/user";
import { toast } from "react-toastify";
import { DM_BACKEND_SERVICE_URL } from "../../model/Constants";

export const CandidatedocumentAction = (type, userData) => async (dispatch) => {
  switch (type) {
    case GET_REQUESTED_DOCUMENT:
      try {
        dispatch({ type: GET_REQUESTED_DOCUMENT });
        const { data } = await axios.get(
          `${DM_BACKEND_SERVICE_URL}/api/requiredDocuments/32bd9e35-9217-4631-85a2-9229ad1e96e1`
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
        toast.error(
          "Error occured.Please try again later."
        );
      }
      break;
    case UPLOAD_DOCUMENT:
      try {
        dispatch({ type: UPLOAD_DOCUMENT });
        await axios.post(
          `${DM_BACKEND_SERVICE_URL}/api/upload`,
          userData
        );
        dispatch({ type: UPLOAD_DOCUMENT_SUCCESS, message: "success" });
        toast.success("File successfully uploaded");
      } catch (error) {
        dispatch({
          type: UPLOAD_DOCUMENT_FAILED,
          payload:
            error.data && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
        toast.error(
          "Upload document failed.Please try again later."
        );
      }
      break;

    case VIEW_FILE:
      try {
        dispatch({ type: VIEW_FILE });
        const { data } = await axios.get(
          `${DM_BACKEND_SERVICE_URL}/api/download/32bd9e35-9217-4631-85a2-9229ad1e96e1?description=${userData}`
        );

        window.open(`${DM_BACKEND_SERVICE_URL}/api/download/32bd9e35-9217-4631-85a2-9229ad1e96e1?description=${userData}`)
        dispatch({ type: VIEW_FILE_SUCCESS, message: "success" });
      } catch (error) {
        dispatch({
          type: VIEW_FILE_FILED,
          payload:
            error.data && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
        toast.error(
          "Download failed.Please try again later."
        );
      }
      break;

      case DOWNLOAD_ALL:
        try {
          dispatch({ type: DOWNLOAD_ALL });
          const { data } = await axios.get(
            `${DM_BACKEND_SERVICE_URL}/api/downloadAll/32bd9e35-9217-4631-85a2-9229ad1e96e1`
          );
          window.open(`${DM_BACKEND_SERVICE_URL}/api/download/32bd9e35-9217-4631-85a2-9229ad1e96e1`)
  
          dispatch({ type: DOWNLOAD_ALL_SUCCESS, message: "success" });
        } catch (error) {
          dispatch({
            type: DOWNLOAD_ALL_FILED,
            payload:
              error.data && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
          toast.error(
            "Download failed.Please try again later."
          );
        }
        break;
    default:
      return;
  }
};
