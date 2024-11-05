import { Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../pages/LogIn";
import Signup from "../pages/Signup";
import ProtectedPage from "../pages/ProtectedPage";
import * as PATHS from "../utils/paths";

const routes = (props) => {
  const { user } = props;
  return [
   
    {
      path: PATHS.PROTECTEDPAGE,
      element: user ? (
        <ProtectedPage {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      ),
    },

    // Default route to handle unmatched paths (redirect to homepage)
    {
      path: "*",
      element: <Navigate to={PATHS.HOMEPAGE} />,
    },
  ];
};

export default routes;
