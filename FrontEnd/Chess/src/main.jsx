
import './Web.css'
import * as ReactDOM from "react-dom/client";
import Home from './Routes/HomePage'
import Play from './Routes/PlayOn';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ErrorPage } from './Components/NotFoundPage';
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
    element: <RecoilRoot>
        <React.Suspense>
          <Play></Play>
          </React.Suspense>
      </RecoilRoot>
  },
  {
    path:"sign-up",
    element:
    <RecoilRoot>
        <React.Suspense>
          <SignUp></SignUp>
        </React.Suspense>
        </RecoilRoot>
  },
  {
    path:"login",
    element:
    <RecoilRoot>
        <React.Suspense>
          <Login></Login>
        </React.Suspense>
        </RecoilRoot>
  }
]);




ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);

