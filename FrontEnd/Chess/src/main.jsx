
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



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
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
    path:"login",
    element:<div></div>
  }
]);




ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);

