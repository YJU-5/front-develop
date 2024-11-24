import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import BulletinBoard from "./pages/bulletinBoard/BulletinBoard";
import Introduction from "./pages/Introduction";
import LocalSemester from "./pages/LocalSemester";
import DetailedPost from "./pages/bulletinBoard/DetailedPost";
import NewPost from "./pages/bulletinBoard/NewPost";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          {/* 필요한가? /이랑 home부분, 다시 체크해야겠다 */}
          <Route path="/" element={<Navigate to="/home" />} /> 
          <Route path="/home" element={<Home />} />
          <Route path="/bulletinBoard" element={<BulletinBoard />} />
          <Route path="/introduction" element={<Introduction />} />
          <Route path="/localSemester" element={<LocalSemester />} />
          <Route path="/detailedPost/:id" element={<DetailedPost />} />
          <Route path="/newPost" element={<NewPost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
