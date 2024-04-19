import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      
    </div>
  );
}

export default Dashboard;
