import {
    UPLOAD_DOCUMENT ,
    UPLOAD_DOCUMENT_SUCCESS,
    UPLOAD_DOCUMENT_FAILED ,
    GET_REQUESTED_DOCUMENT ,
    GET_REQUESTED_DOCUMENT_SUCCESS ,
    GET_REQUESTED_DOCUMENT_FAILED ,
  } from "../constants/user";
  
  export const candidateReducer = (state = { documents: [] }, action) => {
    switch (action.type) {
      case GET_REQUESTED_DOCUMENT:
        return {
          loading: true,
          documents: [],
      };
  
      case GET_REQUESTED_DOCUMENT_SUCCESS:
        return {
          loading: false,
          documents: action.payload,
      };
  
      case GET_REQUESTED_DOCUMENT_FAILED:
        return {
          loading: false,
          error: action.payload,
      };

      case UPLOAD_DOCUMENT:
        return {
          loading: true,
          documents: [],
      };
  
      case UPLOAD_DOCUMENT_SUCCESS:
        return {
          loading: false,
          documents: action.payload,
      };
  
      case UPLOAD_DOCUMENT_FAILED:
        return {
          loading: false,
          error: action.payload,
      };
  
      default:
        return state;
    }
  };
  