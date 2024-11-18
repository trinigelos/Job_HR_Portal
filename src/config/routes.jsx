import { Navigate } from "react-router-dom";

import ProtectedPage from "../pages/Protected/ProtectedPage";
import * as PATHS from "../utils/paths";

const routes = (props) => {
  const { user } = props;
  return [
   
    {
      path: "/dashboard/*",
      element: user ? (
        <ProtectedPage {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      ),
    },

    // Default route to handle unmatched paths (redirect to homepage)
    {
      path: "*",
      element: <Navigate to={PATHS.LOGINPAGE} />,
    },
  ];
};

export default routes;
