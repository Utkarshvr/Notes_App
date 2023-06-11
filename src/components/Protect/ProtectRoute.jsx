import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthStore";
import Loading from "../Loading/Loading";

export default function ProtectRoute({ children }) {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (user === null || user === undefined) {
      navigate("/");
    } else {
      setIsLoading(false); // Set loading state to false when user is available
    }
  }, [user, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
}
