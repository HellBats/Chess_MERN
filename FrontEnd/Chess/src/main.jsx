
import './Web.css'
import * as ReactDOM from "react-dom/client";
import Home from './Routes/HomePage'
import Play from './Routes/PlayOn';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ErrorPage } from './Routes/NotFoundPage';
import { RecoilRoot } from 'recoil';
import React from 'react';
import SignUp from './Routes/SignUp';
import Login from './Routes/Login';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <ErrorPage></ErrorPage>
  },
  {
    path:'play',
    element: <Play></Play>
  },
  {
    path:"sign-up",
    element:<SignUp></SignUp>
  },
  {
    path:"login",
    element: <Login></Login>
  }
]);




ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <React.Suspense>
      <RouterProvider router={router} />
    </React.Suspense>
  </RecoilRoot>
);

