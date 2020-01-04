import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import RegisterPage from "./pages/RegisterPage";
import api from "./api";
import { setProfile } from "./actions";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

const PublicRoute = ({ profile, ...props }) => {
  if (!profile) {
    return <Route {...props} />;
  }
  toast.success("You are already logged in!");
  return <Redirect to="/dashboard" />;
};

const PrivateRoute = ({ profile, ...props }) => {
  if (profile) {
    return <Route {...props} />;
  }
  toast.error("Unauthorized");
  return <Redirect to="/login" />;
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const profile = useSelector(state => state.auth.profile);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/profile");
        if (res.data.success) {
          dispatch(setProfile(res.data.profile));
        }
      } catch (err) {
        toast.error("Internal server error");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path="/signin" component={LoginPage} profile={profile} />
        <PublicRoute
          path="/signup"
          component={RegisterPage}
          profile={profile}
        />
        <PublicRoute path="/" exact component={LoginPage} profile={profile} />

        <PrivateRoute
          path="/dashboard"
          component={Dashboard}
          profile={profile}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
