import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "./Table";
import globalContext from "../../context/GlobalContext";

function Dashboard() {
  let navigate = useNavigate();
  const context = useContext(globalContext);

  const { getTableData, tableData, onPaginationModelChange, refreshTable } = context;

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("token")) {
        let response = await getTableData(5, 1);
        if (response === -2) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 h-screen">
      <DataTable
        rows={tableData}
        getRowId={(row) => row.invoice_id}
        onPaginationModelChange={onPaginationModelChange}
        refreshTable={refreshTable}
      />
    </div>
  );
}

export default Dashboard;
