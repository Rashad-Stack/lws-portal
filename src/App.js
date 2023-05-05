import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthLoading } from "./components/ui/";
import { authSelector } from "./features/auth/authSlice";
import useAuthCheck from "./hooks/useAuthCheck";
import {
  AdminLogin,
  Assignment,
  AssignmentMark,
  Dashboard,
  Quizzes,
  Videos,
} from "./pages/AdminPortal";
import {
  CoursePlayer,
  LeaderBoard,
  Quiz,
  StudentLogin,
  StudentRegistration,
} from "./pages/StudentPortal";
import PrivetRouter from "./routes/PrivetRouter";
import PublicRouter from "./routes/PublicRouter";
import { Page404 } from "./components/ui";

function App() {
  const authChecked = useAuthCheck();
  const { user } = useSelector(authSelector);

  return !authChecked ? (
    <AuthLoading />
  ) : (
    <Router>
      <Routes>
        {user?.role === "admin" ? (
          <>
            {/* Admin routes */}
            <Route path="/" element={<PrivetRouter />}>
              <Route path="/" element={<Navigate to="/admin/dashboard" />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/video" element={<Videos />} />
              <Route path="/admin/assignment" element={<Assignment />} />
              <Route path="/admin/quizzes" element={<Quizzes />} />
              <Route
                path="/admin/assignmentMark"
                element={<AssignmentMark />}
              />
            </Route>
          </>
        ) : (
          <>
            {/* Student routes */}
            <Route path="/" element={<PrivetRouter />}>
              <Route path="/" element={<CoursePlayer />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/leaderboard" element={<LeaderBoard />} />
            </Route>
          </>
        )}

        {/* Public routes */}
        <Route path="/" element={<PublicRouter />}>
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/student/registration"
            element={<StudentRegistration />}
          />
        </Route>

        {/* 404 Not Found route */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
