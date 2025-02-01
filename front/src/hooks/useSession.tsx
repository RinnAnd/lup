import { useNavigate } from "react-router-dom";

const useSession = () => {
  const navigate = useNavigate();

  const checkSession = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    } else {
      navigate("/my-todos");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return { checkSession, logout };
};

export default useSession;
