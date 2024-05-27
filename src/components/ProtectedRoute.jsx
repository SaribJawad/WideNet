import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import { useEffect } from "react";

export default function ProtectedRoute({ Component }) {
  const { currentUser } = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate("/login");
  }, [currentUser]);

  return (
    <div>
      <Component />
    </div>
  );
}
