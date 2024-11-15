import { useEffect, useState,  } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import LoadingComponent from "./components/Loading";
// import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Login from "./pages/LogIn";
import ProtectedPage from "./pages/ProtectedPage";
import JobList from "./pages/Protected/JobList";
import JobPostForm from "./pages/Protected/CRUD/JobPostForm";
import { getLoggedIn, logout } from "./services/auth";
import routes from "./config/routes";
import * as USER_HELPERS from "./utils/userToken";
import * as PATHS from "./utils/paths";
import JobDetail from "./pages/Protected/JobDetail";
import JobEditForm from "./pages/Protected/CRUD/JobEditForm";

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = USER_HELPERS.getUserToken();
    if (!accessToken) {
      return setIsLoading(false);
    }
    getLoggedIn(accessToken).then((res) => {
      if (!res.status) {
        return setIsLoading(false);
      }
      setUser(res.data.user);
      setIsLoading(false);
    });
  }, []);

  // handling logout 
  function handleLogout() {
    const accessToken = USER_HELPERS.getUserToken();
    if (!accessToken) {
      setUser(null);
      setIsLoading(false);
      navigate(PATHS.LOGINPAGE)
      return;
      
    }
    setIsLoading(true);
    logout(accessToken).then((res) => {
      if (!res.status) {
        // deal with error here
        console.error("Logout was unsuccessful: ", res);
      }
      USER_HELPERS.removeUserToken();
      setIsLoading(false);
      return setUser(null);
    });
  }

  function authenticate(user) {
    setUser(user);
  }

  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <div className="App">
      {/* <Navbar handleLogout={handleLogout} user={user} /> */}
      <Routes>
         {/* Parent Route for HomePage */}
         <Route path={PATHS.HOMEPAGE} element={<HomePage user={user} authenticate={authenticate} handleLogout={handleLogout} />}>
          {/* Nested Signup and Login Routes */}
          <Route index element={<Navigate to={PATHS.LOGINPAGE} />} /> {/* Redirect root to Login by default */}

          <Route path={PATHS.SIGNUPPAGE} element={<Signup authenticate={authenticate} />} />
          <Route path={PATHS.LOGINPAGE} element={<Login authenticate={authenticate} />} />
        </Route>

    {/* Dashboard and Nested Routes */}
    <Route path="dashboard/" element={<ProtectedPage handleLogout={handleLogout} />}>
  <Route path= "jobs" element={<JobList />} />
  <Route path="job/:jobId" element={<JobDetail />} />
  <Route path="edit-job/:jobId" element={<JobEditForm />} />
  <Route path="post-job" element={<JobPostForm />} />
</Route>


        {/* dynamic routing */}
        {routes({ user, authenticate, handleLogout }).map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}
