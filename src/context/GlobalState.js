import { useState } from "react";
import GlobalContext from "./GlobalContext";
import MakeRequest from "../axios/MakeRequest";
import { tab } from "@testing-library/user-event/dist/tab";

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
        returnValue = 1;
      } else {
        setSeverity("error");
        returnValue = -1;
      }

      setSnackbarText(response.data.msg);
      setSnackbarState(true);

      setProgress(100);

      return returnValue;
    } catch (error) {
      setProgress(100);
      setSeverity("error");
      setSnackbarText(error);
      setSnackbarState(true);

      return -1;
    }
  };

  const getTableData = async (limit, page) => {
    try {
      let returnValue = -1;
      setProgress(10);

      let response = await MakeRequest(
        localStorage.getItem("token"),
        "get",
        "/getData?limit=" + limit + "&page=" + page,
        null
      );

      setProgress(50);

      if (response.data.code === 1) {
        setSeverity("success");
        const newTableData = response.data.data.filter(
          (newItem) =>
            !tableData.some(
              (existingItem) => existingItem.invoice_id === newItem.invoice_id
            )
        );

        setTableData((prevData) => [...prevData, ...newTableData]);
        returnValue = 1;
      } else {
        setSeverity("error");
        returnValue = -1;
      }

      setSnackbarText(response.data.msg);
      setSnackbarState(true);

      setProgress(100);

      return returnValue;
    } catch (error) {
      setProgress(100);
      setSeverity("error");
      setSnackbarText(error);
      setSnackbarState(true);

      return -1;
    }
  };

  const onPaginationModelChange = (newModel) => {
    let pageNumber = newModel.page;
    let pageSize = newModel.pageSize;

    if (tableData.length >= (pageNumber + 1) * pageSize) {
      return;
    } else {
      let pageNumber = Math.floor(tableData.length / pageSize);
      getTableData(pageSize, pageNumber + 1);
    }
  };

  const getConfigsForClient = async () => {
    try {
      let returnValue = -1;
      setProgress(10);

      let response = await MakeRequest(
        localStorage.getItem("token"),
        "get",
        "/getconfigs",
        null
      );

      setProgress(50);

      if (response.data.code === 1) {
        setSeverity("success");
        const newConfigData = response.data.data.filter(
          (newItem) =>
            !config.some(
              (existingItem) => existingItem.customer_id === newItem.customer_id
            )
        );

        setConfig((prevData) => [...prevData, ...newConfigData]);
        returnValue = 1;
      } else {
        setSeverity("error");
        returnValue = -1;
      }

      setSnackbarText(response.data.msg);
      setSnackbarState(true);

      setProgress(100);

      return returnValue;
    } catch (error) {
      setProgress(100);
      setSeverity("error");
      setSnackbarText(error);
      setSnackbarState(true);

      return -1;
    }
  };

  const updateConfigForCustomer = async (id, value) => {
    try {
      let returnValue = -1;
      setProgress(10);

      let response = await MakeRequest(
        localStorage.getItem("token"),
        "post",
        `/updateconfig/${id}`,
        { parsing_data: value }
      );

      setProgress(50);

      if (response.data.code === 1) {
        setSeverity("success");
        returnValue = 1;
      } else {
        setSeverity("error");
        returnValue = -1;
      }

      setSnackbarText(response.data.msg);
      setSnackbarState(true);

      setProgress(100);

      return returnValue;
    } catch (error) {
      setProgress(100);
      setSeverity("error");
      setSnackbarText(error);
      setSnackbarState(true);

      return -1;
    }
  };

  const handleSnackBarClose = () => {
    setSnackbarState(false);
  };

  const [tableData, setTableData] = useState([]);
  const [config, setConfig] = useState([]);

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
        getTableData,
        tableData,
        onPaginationModelChange,
        config,
        getConfigsForClient,
        updateConfigForCustomer
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default State;
