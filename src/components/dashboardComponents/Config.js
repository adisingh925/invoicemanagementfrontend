import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import globalContext from "../../context/GlobalContext";

function Config() {
  let navigate = useNavigate();
  const context = useContext(globalContext);
  const { config, getConfigsForClient, updateConfigForCustomer } = context;

  const [updatedConfigs, setUpdatedConfigs] = useState({});

  const handleTextAreaChange = (id, value) => {
    setUpdatedConfigs((prevConfigs) => ({
      ...prevConfigs,
      [id]: value,
    }));
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getConfigsForClient();
    } else {
      navigate("/login");
    }
  }, []);

  const handleButtonClick = (id) => {
    updateConfigForCustomer(id, updatedConfigs[id]);
  };

  return (
    <div className="flex flex-wrap h-screen">
      {config.map((config) => (
        <div
          key={config.customer_id}
          className="container mx-auto px-10 mt-5 w-full md:w-1/2"
        >
          <div className="bg-white dark:bg-gray-900">
            <label className="block mt-5 mb-5 ml-2 text-sm text-gray-900 dark:text-white">
              {config.customer_name}
            </label>
            <textarea
              id={`message-${config.customer_id}`}
              rows="10"
              onChange={(e) =>
                handleTextAreaChange(config.customer_id, e.target.value)
              }
              value={updatedConfigs[config.customer_id] || config.parsing_data}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your configs here.."
            ></textarea>
            <button
              className="block mt-5 mb-5 mx-auto p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-700"
              onClick={() => handleButtonClick(config.customer_id)}
            >
              Submit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Config;
