import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { RotateProvider } from "./context/RotateContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RotateProvider>
      <RouterProvider router={router} />
    </RotateProvider>
  </React.StrictMode>
);
