import { useContext } from "react";
import { AuthContext } from "../auth/auth.context";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContxet context is not inside of AuthProvider Tag");
  }
  return context;
};
export default useAuth;
