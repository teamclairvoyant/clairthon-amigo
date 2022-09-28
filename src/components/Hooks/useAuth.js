import { useMemo } from "react";
/**
 * Hook for getting the user Info
 */
function User() {
  const user = useMemo(() => {
    return localStorage.getItem("user");
  }, []);
  return JSON.parse(user);
}
export default User;
