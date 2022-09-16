import { useMemo } from "react";
import { USER } from "../../model/Constants";
import jwt_decode from "jwt-decode";
/**
 * Hook for getting the user Info
 */
function User() {
  const user = useMemo(() => {
    return jwt_decode(localStorage.getItem(USER));
  }, []);
  return user;
}
export default User;
