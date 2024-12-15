// 라우터 네비게이션을 위한 hook import
import { useNavigate } from "react-router-dom";
// 인증 컨텍스트 사용을 위한 hook import
import { useAuth } from "../contexts/AuthContext";

// Navbar 함수형 컴포넌트 선언
const Navbar = () => {
  // useAuth hook에서 인증 상태와 로그아웃 함수 구조분해할당
  // isAuthenticated: boolean
  // logout: () => void
  const { isAuthenticated, logout } = useAuth();

  // 페이지 이동을 위한 navigate 함수 선언
  // navigate: (path: string) => void
  const navigate = useNavigate();

  // 페이지 이동 핸들러 함수
  // path: string
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // 로그아웃 처리 핸들러 함수
  // 반환값: void
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // JSX 반환
  return (
    // 네비게이션 바 컨테이너
    <div className="flex w-full mb-6 bg-blue-600 justify-left">
      {/* 조원소개 버튼 - path: /introduction */}
      <button className="w-1/3 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
        조원소개
      </button>

      {/* 현지학기 버튼 - path: /local-semester */}
      <button className="w-1/3 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
        현지학기
      </button>

      {/* 게시판 버튼 - path: /bulletin-board */}
      <button className="w-1/3 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
        게시판
      </button>
    </div>
  );
};

// 컴포넌트 내보내기
export default Navbar;
