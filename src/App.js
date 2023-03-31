import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLoading from "./components/ui/authLoading";
import useAuthCheck from "./hooks/useAuthCheck";
import {
  CoursePlayer,
  LeaderBoard,
  Quiz,
  StudentLogin,
  StudentRegistration,
} from "./pages/StudentPortal";
import PrivetRouter from "./routes/PrivetRouter";
import PublicRouter from "./routes/PublicRouter";

function App() {
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <AuthLoading />
  ) : (
    <Router>
      <Routes>
        <Route path="/" element={<PrivetRouter />}>
          <Route path="/" element={<CoursePlayer />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
        </Route>
        <Route path="/" element={<PublicRouter />}>
          <Route path="/student/login" element={<StudentLogin />} />
          <Route
            path="/student/registration"
            element={<StudentRegistration />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
