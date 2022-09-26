import axios from "axios";
import {
  GET_ALL_DOCUMENTS,
  GET_ALL_SUCCESS,
  GET_ALL_FAILED,
} from "../constants/user";
export const documentAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_DOCUMENTS });
    const { data } = await axios.get(
      "http://document-manager-backend.eba-uaum3bdf.ap-south-1.elasticbeanstalk.com/api/document"
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
};

