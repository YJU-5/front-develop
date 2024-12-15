import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import BulletinBoard from "./pages/bulletinBoard/BulletinBoard";
import Introduction from "./pages/introduction/Introduction";
import IntroductionDescription from "./pages/introduction/IntroductionDescription";
import LocalSemester from "./pages/localSemester/LocalSemester";
import CreateMember from "./pages/introduction/CreateMember";
import DetailedPost from "./pages/bulletinBoard/DetailedPost";
import NewPost from "./pages/bulletinBoard/NewPost";
import Login from "./pages/login/Login";
import Sign_up from "./pages/login/SignUp";
import Semester_create from "./pages/localSemester/SemesterCreate";
import Detailed_Page from "./pages/localSemester/DetailedPage";
import Update_Page from "./pages/localSemester/UpdatePage";
import Navbar from "./pages/components/Navbar";
import { AuthProvider } from "./pages/contexts/AuthContext";
import ProtectedRoute from "./pages/contexts/ProtectedRoute";
import Logout from "./pages/components/Logout";

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <Router>
          <h1 className="m-3 text-3xl font-bold">5조 홈페이지</h1>
          <Logout />
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/introduction" />} />

            {/* 조원 소개 */}
            <Route path="/introduction" element={<Introduction />} />
            <Route
              path="/introduction-description"
              element={
                <ProtectedRoute>
                  <IntroductionDescription />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/create-member"
              element={
                <ProtectedRoute>
                  <CreateMember />
                </ProtectedRoute>
              }
            />

            {/* 현지 학기 */}
            <Route path="/local-semester" element={<LocalSemester />} />
            <Route
              path="/semester-create"
              element={
                <ProtectedRoute>
                  <Semester_create />
                </ProtectedRoute>
              }
            />
            <Route
              path="/detailed-page"
              element={
                <ProtectedRoute>
                  <Detailed_Page />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update-page"
              element={
                <ProtectedRoute>
                  <Update_Page />
                </ProtectedRoute>
              }
            />

            {/* 로그인 */}
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Sign_up />} />

            {/* 게시판 */}
            <Route path="/bulletin-board" element={<BulletinBoard />} />
            <Route
              path="/detailed-post/:id"
              element={
                <ProtectedRoute>
                  <DetailedPost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/new-post"
              element={
                <ProtectedRoute>
                  <NewPost />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
