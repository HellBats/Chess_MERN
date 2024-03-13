
import './App.css'
import * as ReactDOM from "react-dom/client";
import Home from './Routes/HomePage'
import Play from './Routes/PlayOn';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>
  },
  {
    path:'play',
    element: <Play></Play>
  },
]);




ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);

