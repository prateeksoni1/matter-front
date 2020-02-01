import { setProfile } from "./profileActions";
import { setRegisterForm } from "./authActions";
import { setCurrentProject, setPermissions } from "./projectActions";

const logoutUser = () => {
  return {
    type: "LOGOUT_USER"
  };
};

export {
  setProfile,
  setCurrentProject,
  logoutUser,
  setPermissions,
  setRegisterForm
};
