import { createBrowserRouter } from "react-router-dom";
import { getCourseById } from "../apis/courseApi";

// layout import
import MainLayout from "../layouts/MainLayout";

//import components
import Error from "../components/shared/Error";


// import pages
import App from "../App";




const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  }  
]);

export default router;