import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginDashboard from "./components/LoginDashboard";
import UserDashboard from "./components/UserDashboard";

/**
 * Private route for the user dashborad
 * @param param0 the jsx element
 * @returns the route to navigate
 */
function PrivateRouteUser({ children }: { children: JSX.Element }) {
  const userId = localStorage.getItem("userId");
  return userId ? children : <Navigate to={"/login"} />;
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginDashboard />} />
          <Route
            path="/user-dashboard"
            element={
              <PrivateRouteUser>
                <UserDashboard />
              </PrivateRouteUser>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
