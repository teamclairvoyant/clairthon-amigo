import { useMemo } from "react";
/**
 * Hook for getting the user Info
 */
function User() {
  const user = useMemo(() => {
    return localStorage.getItem("user");
  }, []);
   if(user !== null && user != "undefined"){
      return JSON.parse(user);
   }
   return {}
}
export default User;
