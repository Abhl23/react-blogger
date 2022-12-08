import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

import "./styles/index.scss";
import App from "./components/App";
import { AuthProvider } from "./providers/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <ToastProvider
        autoDismiss
        autoDismissTimeout={5000}
        placement="top-right"
      >
        <AuthProvider>
          <App />
        </AuthProvider>
      </ToastProvider>
    </Router>
  </React.StrictMode>
);
