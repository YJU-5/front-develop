import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import BulletinBoard from "./pages/BulletinBoard";
import Introduction from "./pages/Introduction";
import IntroductionDescription from "./pages/introduction/IntroductionDescription";
import LocalSemester from "./pages/LocalSemester";
import CreateMember from "./pages/introduction/CreateMember";

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
          <Route path="/localSemester" element={<LocalSemester />} />
        </Routes>
      </Router>{" "}
    </div>
  );
}

export default App;
