import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
  ADD_USER,
  ADD_USER_FAILED,
  GET_ALL_DOCUMENTS,
  GET_ALL_SUCCESS,
  GET_ALL_FAILED
} from "../constants/user";

export const userReducer = (state = { users: [], documents: [] }, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        loading: true,
        users: [],
      };

    case GET_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };

    case GET_USERS_FAILED:
      return {
        loading: false,
        error: action.payload,
      };

    case ADD_USER:
      return {
        loading: false,
        message: action.payload,
      };
    case ADD_USER_FAILED:
      return {
        loading: false,
        error: action.payload,
      };

    case GET_ALL_DOCUMENTS:
      return {
        loading: true,
        documents: [],
    };

    case GET_ALL_SUCCESS:
      return {
        loading: false,
        documents: action.payload,
    };

    case GET_ALL_FAILED:
      return {
        loading: false,
        error: action.payload,
    };

    default:
      return state;
  }
};
