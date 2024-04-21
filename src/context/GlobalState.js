import { useState } from "react";
import GlobalContext from "./GlobalContext";
import MakeRequest from "../axios/MakeRequest";

const State = (props) => {
  const login = async (credentials) => {
    try {
      let returnValue = -1;
      setProgress(10);

      let response = await MakeRequest("", "post", "auth/login", credentials);

      setProgress(50);

      if (response.data.code === 1) {
        localStorage.setItem("token", response.data.token);
        setSeverity("success");
        returnValue = response.data.code;
      } else {
        setSeverity("error");
        returnValue = response.data.code;
      }

      setSnackbarText(response.data.msg);
      setSnackbarState(true);

      setProgress(100);

      return returnValue;
    } catch (error) {
      setProgress(100);
      setSeverity("error");
      setSnackbarText("Some error occurred. Please try again later.");
      setSnackbarState(true);

      return -1;
    }
  };

  const signup = async (credentials) => {
    try {
      let returnValue = -1;
      setProgress(10);

      let response = await MakeRequest("", "post", "auth/signup", credentials);

      setProgress(50);

      if (response.data.code === 1) {
        localStorage.setItem("token", response.data.token);
        setSeverity("success");
        returnValue = response.data.code;
      } else {
        setSeverity("error");
        returnValue = response.data.code;
      }

      setSnackbarText(response.data.msg);
      setSnackbarState(true);

      setProgress(100);

      return returnValue;
    } catch (error) {
      setProgress(100);
      setSeverity("error");
      setSnackbarText("Some error occurred. Please try again later.");
      setSnackbarState(true);

      return -1;
    }
  };

  const sendResetLink = async (email, token) => {
    try {
      let returnValue = -1;
      setProgress(10);

      let response = await MakeRequest(
        token,
        "get",
        `auth/sendResetLink/${email}`,
        null
      );

      setProgress(50);

      if (response.data.code === 1) {
        setSeverity("success");
        returnValue = response.data.code;
      } else {
        setSeverity("error");
        returnValue = response.data.code;
      }

      setSnackbarText(response.data.msg);
      setSnackbarState(true);

      setProgress(100);

      return returnValue;
    } catch (error) {
      setProgress(100);
      setSeverity("error");
      setSnackbarText("Some error occurred. Please try again later.");
      setSnackbarState(true);

      return -1;
    }
  };

  const resetPassword = async (password, token) => {
    try {
      let returnValue = -1;
      setProgress(10);

      let response = await MakeRequest(
        token,
        "post",
        `auth/resetPassword/${token}`,
        password
      );

      setProgress(50);

      if (response.data.code === 1) {
        setSeverity("success");
        returnValue = response.data.code;
      } else {
        setSeverity("error");
        returnValue = response.data.code;
      }

      setSnackbarText(response.data.msg);
      setSnackbarState(true);

      setProgress(100);

      return returnValue;
    } catch (error) {
      setProgress(100);
      setSeverity("error");
      setSnackbarText("Some error occurred. Please try again later.");
      setSnackbarState(true);

      return -1;
    }
  };

  const insertGymData = async (gymData) => {
    try {
      let returnValue = -1;
      setProgress(10);

      let response = await MakeRequest(
        localStorage.getItem("token"),
        "post",
        `/insert/gym`,
        gymData
      );

      setProgress(50);

      if (response.data.code === 1) {
        setSeverity("success");
        returnValue = response.data.code;
        readGymData();
      } else {
        setSeverity("error");
        returnValue = response.data.code;
      }

      setSnackbarText(response.data.msg);
      setSnackbarState(true);
      setProgress(100);

      return returnValue;
    } catch (error) {
      setProgress(100);
      setSeverity("error");
      setSnackbarText("Some error occurred. Please try again later.");
      setSnackbarState(true);

      return -1;
    }
  };

  const [gymData, setGymData] = useState([]);

  const readGymData = async () => {
    try {
      let returnValue = -1;
      setProgress(10);

      let response = await MakeRequest(
        localStorage.getItem("token"),
        "get",
        `/read/gym`
      );

      setGymData(response.data.data);

      setProgress(50);

      if (response.data.code === 1) {
        setSeverity("success");
        returnValue = response.data.code;
      } else {
        setSeverity("error");
        returnValue = response.data.code;
      }

      setSnackbarText(response.data.msg);
      setSnackbarState(true);
      setProgress(100);

      return returnValue;
    } catch (error) {
      setProgress(100);
      setSeverity("error");
      setSnackbarText("Some error occurred. Please try again later.");
      setSnackbarState(true);

      return -1;
    }
  };

  const insertMembershipData = async (membershipData, gymId) => {
    try {
      let returnValue = -1;
      setProgress(10);

      let response = await MakeRequest(
        localStorage.getItem("token"),
        "post",
        `/insert/membership/${gymId}`,
        membershipData
      );

      setProgress(50);

      if (response.data.code === 1) {
        setSeverity("success");
        returnValue = response.data.code;
        readMembershipData(gymId);
      } else {
        setSeverity("error");
        returnValue = response.data.code;
      }

      setSnackbarText(response.data.msg);
      setSnackbarState(true);
      setProgress(100);

      return returnValue;
    } catch (error) {
      setProgress(100);
      setSeverity("error");
      setSnackbarText("Some error occurred. Please try again later.");
      setSnackbarState(true);

      return -1;
    }
  };

  const updateMembershipData = async (membershipData, gymId) => {
    try {
      let returnValue = -1;
      setProgress(10);

      let response = await MakeRequest(
        localStorage.getItem("token"),
        "post",
        `/update/membership/${gymId}`,
        membershipData
      );

      setProgress(50);

      if (response.data.code === 1) {
        setSeverity("success");
        returnValue = response.data.code;
        readMembershipData(gymId);
      } else {
        setSeverity("error");
        returnValue = response.data.code;
      }

      setSnackbarText(response.data.msg);
      setSnackbarState(true);
      setProgress(100);

      return returnValue;
    } catch (error) {
      setProgress(100);
      setSeverity("error");
      setSnackbarText("Some error occurred. Please try again later.");
      setSnackbarState(true);

      return -1;
    }
  };

  const [membershipData, setMembershipData] = useState([]);

  const readMembershipData = async (gymId) => {
    try {
      let returnValue = -1;
      setProgress(10);

      let response = await MakeRequest(
        localStorage.getItem("token"),
        "get",
        `/read/membership/${gymId}`
      );

      setMembershipData(response.data.data);

      setProgress(50);

      if (response.data.code === 1) {
        setSeverity("success");
        returnValue = response.data.code;
      } else {
        setSeverity("error");
        returnValue = response.data.code;
      }

      setSnackbarText(response.data.msg);
      setSnackbarState(true);
      setProgress(100);

      return returnValue;
    } catch (error) {
      setProgress(100);
      setSeverity("error");
      setSnackbarText("Some error occurred. Please try again later.");
      setSnackbarState(true);

      return -1;
    }
  };

  const deleteMembershipData = async (membership_ids, gymId) => {
    try {
      let returnValue = -1;
      setProgress(10);

      let response = await MakeRequest(
        localStorage.getItem("token"),
        "post",
        `/delete/membership/${gymId}`,
        { membership_ids: membership_ids }
      );

      setProgress(50);

      if (response.data.code === 1) {
        setSeverity("success");
        returnValue = response.data.code;
        readMembershipData(gymId);
      } else {
        setSeverity("error");
        returnValue = response.data.code;
      }

      setSnackbarText(response.data.msg);
      setSnackbarState(true);
      setProgress(100);

      return returnValue;
    } catch (error) {
      setProgress(100);
      setSeverity("error");
      setSnackbarText("Some error occurred. Please try again later.");
      setSnackbarState(true);

      return -1;
    }
  };

  /**
   * manager functions
   */

  const insertManagerData = async (managerData, gymId) => {
    try {
      let returnValue = -1;
      setProgress(10);

      let response = await MakeRequest(
        localStorage.getItem("token"),
        "post",
        `/insert/manager/${gymId}`,
        managerData
      );

      setProgress(50);

      if (response.data.code === 1) {
        setSeverity("success");
        returnValue = response.data.code;
        readManagerData(gymId);
      } else {
        setSeverity("error");
        returnValue = response.data.code;
      }

      setSnackbarText(response.data.msg);
      setSnackbarState(true);
      setProgress(100);

      return returnValue;
    } catch (error) {
      setProgress(100);
      setSeverity("error");
      setSnackbarText("Some error occurred. Please try again later.");
      setSnackbarState(true);

      return -1;
    }
  };

  const updateManagerData = async (managerData, gymId) => {
    try {
      let returnValue = -1;
      setProgress(10);

      let response = await MakeRequest(
        localStorage.getItem("token"),
        "post",
        `/update/manager/${gymId}`,
        managerData
      );

      setProgress(50);

      if (response.data.code === 1) {
        setSeverity("success");
        returnValue = response.data.code;
        readManagerData(gymId);
      } else {
        setSeverity("error");
        returnValue = response.data.code;
      }

      setSnackbarText(response.data.msg);
      setSnackbarState(true);
      setProgress(100);

      return returnValue;
    } catch (error) {
      setProgress(100);
      setSeverity("error");
      setSnackbarText("Some error occurred. Please try again later.");
      setSnackbarState(true);

      return -1;
    }
  };

  const [managerData, setManagerData] = useState([]);

  const readManagerData = async (gymId) => {
    try {
      let returnValue = -1;
      setProgress(10);

      let response = await MakeRequest(
        localStorage.getItem("token"),
        "get",
        `/read/manager/${gymId}`
      );

      setManagerData(response.data.data);

      setProgress(50);

      if (response.data.code === 1) {
        setSeverity("success");
        returnValue = response.data.code;
      } else {
        setSeverity("error");
        returnValue = response.data.code;
      }

      setSnackbarText(response.data.msg);
      setSnackbarState(true);
      setProgress(100);

      return returnValue;
    } catch (error) {
      setProgress(100);
      setSeverity("error");
      setSnackbarText("Some error occurred. Please try again later.");
      setSnackbarState(true);

      return -1;
    }
  };

  const deleteManagerData = async (managerIds, gymId) => {
    try {
      let returnValue = -1;
      setProgress(10);

      let response = await MakeRequest(
        localStorage.getItem("token"),
        "post",
        `/delete/manager/${gymId}`,
        { manager_ids: managerIds }
      );

      setProgress(50);

      if (response.data.code === 1) {
        setSeverity("success");
        returnValue = response.data.code;
        readManagerData(gymId);
      } else {
        setSeverity("error");
        returnValue = response.data.code;
      }

      setSnackbarText(response.data.msg);
      setSnackbarState(true);
      setProgress(100);

      return returnValue;
    } catch (error) {
      setProgress(100);
      setSeverity("error");
      setSnackbarText("Some error occurred. Please try again later.");
      setSnackbarState(true);

      return -1;
    }
  };

  /**
   * member functions
   */

  const insertMemberData = async (memberData, gymId) => {
    try {
      let returnValue = -1;
      setProgress(10);

      let response = await MakeRequest(
        localStorage.getItem("token"),
        "post",
        `/insert/member/${gymId}`,
        memberData
      );

      setProgress(50);

      if (response.data.code === 1) {
        setSeverity("success");
        returnValue = response.data.code;
        readMemberData(gymId);
      } else {
        setSeverity("error");
        returnValue = response.data.code;
      }

      setSnackbarText(response.data.msg);
      setSnackbarState(true);
      setProgress(100);

      return returnValue;
    } catch (error) {
      setProgress(100);
      setSeverity("error");
      setSnackbarText("Some error occurred. Please try again later.");
      setSnackbarState(true);

      return -1;
    }
  };

  const updateMemberData = async (memberData, gymId) => {
    try {
      let returnValue = -1;
      setProgress(10);

      let response = await MakeRequest(
        localStorage.getItem("token"),
        "post",
        `/update/member/${gymId}`,
        memberData
      );

      setProgress(50);

      if (response.data.code === 1) {
        setSeverity("success");
        returnValue = response.data.code;
        readMemberData(gymId);
      } else {
        setSeverity("error");
        returnValue = response.data.code;
      }

      setSnackbarText(response.data.msg);
      setSnackbarState(true);
      setProgress(100);

      return returnValue;
    } catch (error) {
      setProgress(100);
      setSeverity("error");
      setSnackbarText("Some error occurred. Please try again later.");
      setSnackbarState(true);

      return -1;
    }
  };

  const [memberData, setMemberData] = useState([]);

  const readMemberData = async (gymId) => {
    try {
      let returnValue = -1;
      setProgress(10);

      let response = await MakeRequest(
        localStorage.getItem("token"),
        "get",
        `/read/member/${gymId}`
      );

      setMemberData(response.data.data);

      setProgress(50);

      if (response.data.code === 1) {
        setSeverity("success");
        returnValue = response.data.code;
      } else {
        setSeverity("error");
        returnValue = response.data.code;
      }

      setSnackbarText(response.data.msg);
      setSnackbarState(true);
      setProgress(100);

      return returnValue;
    } catch (error) {
      setProgress(100);
      setSeverity("error");
      setSnackbarText("Some error occurred. Please try again later.");
      setSnackbarState(true);

      return -1;
    }
  };

  const deleteMemberData = async (memberIds, gymId) => {
    try {
      let returnValue = -1;
      setProgress(10);

      let response = await MakeRequest(
        localStorage.getItem("token"),
        "post",
        `/delete/member/${gymId}`,
        { member_ids: memberIds }
      );

      setProgress(50);

      if (response.data.code === 1) {
        setSeverity("success");
        returnValue = response.data.code;
        readMemberData(gymId);
      } else {
        setSeverity("error");
        returnValue = response.data.code;
      }

      setSnackbarText(response.data.msg);
      setSnackbarState(true);
      setProgress(100);

      return returnValue;
    } catch (error) {
      setProgress(100);
      setSeverity("error");
      setSnackbarText("Some error occurred. Please try again later.");
      setSnackbarState(true);

      return -1;
    }
  };

  /**
   * ***********************************************
   */

  const handleSnackBarClose = () => {
    setSnackbarState(false);
  };

  const [snackbarState, setSnackbarState] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");
  const [severity, setSeverity] = useState("success");
  const [progress, setProgress] = useState(0);

  return (
    <GlobalContext.Provider
      value={{
        login,
        snackbarState,
        setSnackbarState,
        snackbarText,
        setSnackbarText,
        severity,
        setSeverity,
        progress,
        setProgress,
        handleSnackBarClose,
        resetPassword,
        signup,
        sendResetLink,
        insertGymData,
        readGymData,
        gymData,
        insertMembershipData,
        membershipData,
        readMembershipData,
        updateMembershipData,
        deleteMembershipData,
        insertManagerData,
        updateManagerData,
        managerData,
        readManagerData,
        deleteManagerData,
        insertMemberData,
        updateMemberData,
        memberData,
        deleteMemberData,
        readMemberData
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default State;
