import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const PrivateRoute = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsChecking(false);
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(data => {
        if (data?.id) {
          setIsAuthenticated(true);
        }
        setIsChecking(false);
      })
      .catch(() => setIsChecking(false));
  }, []);

  if (isChecking) {
    return <div className="p-6">Checking authentication...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
