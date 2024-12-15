// AuthContext.tsx - 인증 관련 컨텍스트를 관리하는 파일

// 필요한 리액트 훅과 타입들을 임포트
import { createContext, useContext, useState, ReactNode } from "react";

// 인증 컨텍스트에서 사용할 타입 정의
interface AuthContextType {
  isAuthenticated: boolean; // 인증 여부를 나타내는 불리언 값
  user: any; // 사용자 정보를 담는 객체 (any 타입)
  login: (token: string, userData: any) => void; // 로그인 함수: 토큰과 사용자 데이터를 받음
  logout: () => void; // 로그아웃 함수
}

// AuthContext 생성 - 초기값은 undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider 컴포넌트 - children prop을 받아 컨텍스트를 제공
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // localStorage의 토큰 존재 여부로 초기 인증 상태 설정
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("access_token")
  );

  // localStorage의 user 정보로 초기 사용자 상태 설정
  const [user, setUser] = useState<any>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  // 로그인 함수: 토큰과 사용자 정보를 저장하고 상태 업데이트
  const login = (token: string, userData: any) => {
    localStorage.setItem("access_token", token); // 토큰 저장
    localStorage.setItem("user", JSON.stringify(userData)); // 사용자 정보 저장
    setIsAuthenticated(true); // 인증 상태 true로 설정
    setUser(userData); // 사용자 정보 상태 업데이트
  };

  // 로그아웃 함수: 저장된 정보를 제거하고 상태 초기화
  const logout = () => {
    localStorage.removeItem("access_token"); // 토큰 제거
    localStorage.removeItem("user"); // 사용자 정보 제거
    setIsAuthenticated(false); // 인증 상태 false로 설정
    setUser(null); // 사용자 정보 null로 초기화
  };

  // AuthContext.Provider를 통해 상태와 함수들을 하위 컴포넌트에 제공
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth 커스텀 훅 - AuthContext 사용을 쉽게 만듦
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
