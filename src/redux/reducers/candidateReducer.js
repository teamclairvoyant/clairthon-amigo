import {
  UPLOAD_DOCUMENT,
  UPLOAD_DOCUMENT_SUCCESS,
  UPLOAD_DOCUMENT_FAILED,
  GET_REQUESTED_DOCUMENT,
  GET_REQUESTED_DOCUMENT_SUCCESS,
  GET_REQUESTED_DOCUMENT_FAILED,
  VIEW_FILE,
  VIEW_FILE_SUCCESS,
  VIEW_FILE_FILED,
  DOWNLOAD_ALL,
  DOWNLOAD_ALL_SUCCESS,
  DOWNLOAD_ALL_FILED
} from "../constants/user";

export const candidateReducer = (state = { documents: [] }, action) => {
  switch (action.type) {
    case GET_REQUESTED_DOCUMENT:
      return {
        ...state,
        loading: true,
        documents: [],
      };

    case GET_REQUESTED_DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        documents: action.payload,
      };

    case GET_REQUESTED_DOCUMENT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPLOAD_DOCUMENT:
      return {
        ...state,
        loading: true,
        message: action.payload,
      };

    case UPLOAD_DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        documents: action.payload,
      };

    case UPLOAD_DOCUMENT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case VIEW_FILE:
      return {
        loading: true,
        ...state,
        message: action.payload,
      };

    case VIEW_FILE_SUCCESS:
      return {
        loading: false,
        ...state,
        message: action.payload,
      };

    case VIEW_FILE_FILED:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };


      case DOWNLOAD_ALL:
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
  
      case DOWNLOAD_ALL_SUCCESS:
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
  
      case DOWNLOAD_ALL_FILED:
        return {
          ...state,
          loading: false,
          message: action.payload,
        };

    default:
      return state;
  }
};
