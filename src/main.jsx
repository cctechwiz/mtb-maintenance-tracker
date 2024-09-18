import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import axios from "axios";
import { Provider, useDispatch, useSelector } from "react-redux";

import App from "./App.jsx";
import "./index.css";
import Dashboard from "./pages/Dashboard.jsx";
import Builds from "./pages/Builds.jsx";
import Parts from "./pages/Parts.jsx";
import Rides from "./pages/Rides.jsx";
import Maintenance from "./pages/Maintenance.jsx";
import Auth from "./pages/Auth.jsx";
import Settings from "./pages/Settings.jsx";
import store from "./redux/store.js";

const Router = () => {
  const userId = useSelector((state) => state.userId);
  const dispatch = useDispatch();

  const sessionCheck = async () => {
    const res = await axios.get('/api/session-check');

    if (res.data.success) {
      dispatch({
        type: 'USER_AUTH',
        payload: res.data.userId
      });
    };
  };

  useEffect(() => {
    sessionCheck();
  }, [userId]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={ userId ? <Dashboard /> : <Navigate to='/auth' /> } />
        <Route
          path="/builds"
          element={ userId ? <Builds /> : <Navigate to='/auth' /> }
          loader={
            async () => {
              const res = await axios.get('/api/builds');
              // console.log(`main.jsx res.data:`, res.data)
              return { buildsData: res.data.success ? res.data.buildsData : res.data.success  }
            }
          }
        />
        <Route
          path="/parts"
          element={ userId ? <Parts /> : <Navigate to='/auth' /> }
          loader={
            async () => {
              const res = await axios.get('/api/parts');
              return { partsData: res.data.success ? res.data.partsData : res.data.success }
            }
          }
        />
        <Route
          path="/rides"
          element={ userId ? <Rides /> : <Navigate to='/auth' /> }
        />
        <Route
          path="/maintenance"
          element={ userId ? <Maintenance /> : <Navigate to='/auth' /> }
        />
        <Route
          path="/settings"
          element={ userId ? <Settings /> : <Navigate to='/auth' /> }
        />
        <Route
          path="/auth"
          element={<Auth />}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </StrictMode>
);
