import { FC, ReactNode, useEffect } from "react";
import useProfile from "../../hooks/useProfile";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { authUser } = useProfile();

  const navigate = useNavigate();

  useEffect(() => {
    if (authUser === null || authUser.role !== "recruiter") {
      navigate("/");
    }
  });

  return <div>{children}</div>;
};

export default ProtectedRoute;
