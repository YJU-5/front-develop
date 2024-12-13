import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import BulletinBoard from "./pages/bulletinBoard/BulletinBoard";
import DetailedPost from "./pages/bulletinBoard/DetailedPost";
import NewPost from "./pages/bulletinBoard/NewPost";
import Introduction from "./pages/Introduction";
import LocalSemester from "./pages/LocalSemester/LocalSemester";
import CreateMember from "./pages/introduction/CreateMember";
import IntroductionDescription from "./pages/introduction/IntroductionDescription";
import Semester_create from "./pages/LocalSemester/Semester_create";
import Detailed_Page from "./pages/LocalSemester/Detailed_Page";
import Update_Page from "./pages/LocalSemester/Update_Page";
import Login from "./pages/Login/Login";
import Sign_up from "./pages/Login/Sign_up";

function App() {


  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/bulletinBoard" element={<BulletinBoard />} />
          <Route path="/introduction" element={<Introduction />} />
          <Route
            path="/introduction_description"
            element={<IntroductionDescription />}
          ></Route>
          <Route path="/create-member" element={<CreateMember />} />
          
          {/* 현지학기 */}
          <Route path="/localSemester" element={<LocalSemester />} />
          <Route path="/Semester-create" element={<Semester_create />} />
            <Route path="/Detailed_Page" element={<Detailed_Page />} />
            <Route path="/Update_Page" element={<Update_Page />} />
           {/* 로그인 */}
           <Route path="/login" element={<Login />} />
            <Route path="/Sign_up" element={<Sign_up />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;