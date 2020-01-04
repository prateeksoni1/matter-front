import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin" component={LoginPage} />
        <Route path="/signup" component={RegisterPage} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
