import ReactDOM from 'react-dom/client'
import './index.css'
import {Suspense, StrictMode} from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Routes/HomePage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  // {
  //   path:'play',
  //   element: <Play></Play>
  // },
  // {
  //   path:"sign-up",
  //   element:<SignUp></SignUp>
  // },
  // {
  //   path:"login",
  //   element: <Login></Login>
  // }
]);





ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
)
