import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function Dashboard() {
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("token")) {
      } else {
        navigate("/login");
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="bg-blue dark:bg-gray-900">
      <NavBar />
    </div>
  );
}

export default Dashboard;
