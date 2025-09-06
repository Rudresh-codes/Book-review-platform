import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminRoute = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsChecking(false);
      return;
    }

    // Verify user with backend
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data?.isAdmin) {
          setIsAdmin(true);
        }
        setIsChecking(false);
      })
      .catch(() => setIsChecking(false));
  }, []);

  if (isChecking) {
    return <div className="p-6">Checking permissions...</div>;
  }

  if (!isAdmin) {
    alert("access denaid")
    return <Navigate to="/books" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
