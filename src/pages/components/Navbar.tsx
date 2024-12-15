import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex w-full mb-6 bg-blue-600 justify-left">
      <button
        onClick={() => handleNavigation("/introduction")}
        className="w-1/3 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        조원소개
      </button>
      <button
        onClick={() => handleNavigation("/local-semester")}
        className="w-1/3 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        현지학기
      </button>
      <button
        onClick={() => handleNavigation("/bulletin-board")}
        className="w-1/3 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        게시판
      </button>
    </div>
  );
};

export default Navbar;
