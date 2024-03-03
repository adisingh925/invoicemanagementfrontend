import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "./Table";
import globalContext from "../../context/GlobalContext";

function Dashboard() {
  let navigate = useNavigate();
  const context = useContext(globalContext);

  const { getTableData, tableData, onPaginationModelChange } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log("Getting table data");
      getTableData(5, 1);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 h-screen">
      <DataTable
        rows={tableData}
        getRowId={(row) => row.invoice_id}
        onPaginationModelChange={onPaginationModelChange}
      />
    </div>
  );
}

export default Dashboard;
