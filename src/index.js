import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
// App.js is where we will render our application

// Connect this file to the antd CSS styling
import "antd/dist/reset.css";
// import "./index.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/login.js";
import Resident_Dashboard from "./components/dashboard/resident_dashboard";
import SignUp from "./components/signup_component";
import Admin_Dashboard from "./components/dashboard/admin_dashboard";

export const history = createBrowserHistory({ forceRefresh: true });

function App() {
  const isLoggedIn = "false";
  return (
    <>
      <Router history={history}>
        <div className="App">
          {/* <div className="auth-wrapper"> */}
          {/* <div className="auth-inner"> */}
          <Routes>
            <Route
              exact
              path="/"
              element={
                isLoggedIn == "true" ? <Resident_Dashboard /> : <Login />
              }
            />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route
              path="/resident_dashboard"
              element={<Resident_Dashboard />}
            />
            <Route path="/admin_dashboard" element={<Admin_Dashboard />} />
          </Routes>
          {/* </div> */}
          {/* </div> */}
        </div>
      </Router>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
