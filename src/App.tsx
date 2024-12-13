import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import BulletinBoard from "./pages/bulletinBoard/BulletinBoard";
import Introduction from "./pages/introduction/Introduction";
import IntroductionDescription from "./pages/introduction/IntroductionDescription";
import LocalSemester from "./pages/LocalSemester/LocalSemester";
import CreateMember from "./pages/introduction/CreateMember";
import DetailedPost from "./pages/bulletinBoard/DetailedPost";
import NewPost from "./pages/bulletinBoard/NewPost";
import Login from "./pages/Login/Login";
import Sign_up from "./pages/Login/SignUp";
import Semester_create from "./pages/LocalSemester/SemesterCreate";
import Detailed_Page from "./pages/LocalSemester/DetailedPage";
import Update_Page from "./pages/LocalSemester/UpdatePage";
import Navbar from "./pages/components/Navbar";

function App() {
  return (
    <div className="app">
      <Router>
        <h1 className="m-3 text-3xl font-bold">5조 홈페이지</h1>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/introduction" />} />

          {/* 조원 소개 */}
          <Route path="/introduction" element={<Introduction />} />
          <Route
            path="/introduction-description"
            element={<IntroductionDescription />}
          ></Route>
          <Route path="/create-member" element={<CreateMember />} />

          {/* 현지 학기 */}
          <Route path="/local-semester" element={<LocalSemester />} />
          <Route path="/semester-create" element={<Semester_create />} />
          <Route path="/detailed-page" element={<Detailed_Page />} />
          <Route path="/update-page" element={<Update_Page />} />

          {/* 로그인 */}
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Sign_up />} />

          {/* 게시판 */}
          <Route path="/bulletin-board" element={<BulletinBoard />} />
          <Route path="/detailed-post/:id" element={<DetailedPost />} />
          <Route path="/new-post" element={<NewPost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
