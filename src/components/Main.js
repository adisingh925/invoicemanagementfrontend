import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./login";
import NotFound from "./NotFound";
import ForgetPassword from "./ForgetPassword";
import Signup from "./Signup";
import LoadingBar from "react-top-loading-bar";
import { useContext } from "react";
import globalContext from "../context/GlobalContext";
import SnackBar from "./SnackBar";
import Dashboard from "./Dashboard";
import ContactUs from "./ContactUs";
import ResetPassword from "./ResetPassword";
import Notes from "./Notes";
import Members from "./Members";
import Managers from "./Managers";
import Memberships from "./Memberships";

function Main() {
  const context = useContext(globalContext);

  const {
    snackbarState,
    snackbarText,
    severity,
    handleSnackBarClose,
    progress,
  } = context;

  return (
    <>
      <LoadingBar color="#1565c0" height={3} progress={progress} />

      <SnackBar
        message={snackbarText}
        handleClose={handleSnackBarClose}
        state={snackbarState}
        sx={{ width: "100%" }}
        severity={severity}
      />

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/forgetpassword" element={<ForgetPassword />}></Route>
          <Route path="/contactus" element={<ContactUs />}></Route>
          <Route path="/gym" element={<Notes />}></Route>
          <Route path="/resetpassword/:token" element={<ResetPassword />}></Route>
          <Route path="/gym/:gymId/members" element={<Members />}></Route>
          <Route path="/gym/:gymId/managers" element={<Managers />}></Route>
          <Route path="/gym/:gymId/memberships" element={<Memberships />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Main;
