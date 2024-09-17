import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import axios from "axios";
import { Provider } from "react-redux";

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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Dashboard />} />
      <Route
        path="/builds"
        element={<Builds />}
        loader={
          async () => {
            const res = await axios.get('/api/builds');
            // console.log(`main.jsx res.data:`, res.data)
            return { buildsData: res.data.buildsData }
          }
        }
      />
      <Route
        path="/parts"
        element={<Parts />}
      />
      <Route
        path="/rides"
        element={<Rides />}
      />
      <Route
        path="/maintenance"
        element={<Maintenance />}
      />
      <Route
        path="/settings"
        element={<Settings />}
      />
      <Route
        path="/auth"
        element={<Auth />}
      />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
