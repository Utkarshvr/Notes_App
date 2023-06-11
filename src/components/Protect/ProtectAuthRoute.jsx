import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth/AuthStore";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function ProtectAuthRoute({ children }) {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  if (user) {
    // Optional: Show loading state or fallback UI while checking authentication
    return <Loading />;
  }

  return <>{children}</>;
}
