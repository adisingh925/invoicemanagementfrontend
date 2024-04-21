import React, { useContext, useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import NavBar from "./NavBar";
import globalContext from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

function Notes() {
  let navigate = useNavigate();
  const context = useContext(globalContext);
  const { insertGymData, readGymData, gymData } = context;

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const [gymDetails, setGymDetails] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await insertGymData(gymDetails);
    if (response === -2) {
      localStorage.removeItem("token");
      navigate("/login");
    }else if(response === 1){
      toggleModal();
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      readGymData();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (event) => {
    setGymDetails({ ...gymDetails, [event.target.name]: event.target.value });
  };

  return (
    <>
      <NavBar />
      <button
        type="submit"
        onClick={toggleModal}
        className="m-5 w-100 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add Gym
      </button>

      {isOpen && (
        <div className="fixed m-5 top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg dark:bg-gray-700">
            {/* Modal content */}
            <div className="p-4 md:p-5">
              {/* Modal header */}
              <div className="flex items-center justify-between border-b">
                <h3 className="text-lg mb-3 font-semibold text-gray-900 dark:text-white">
                  Add Gym Details
                </h3>
                <button
                  onClick={toggleModal}
                  className="mb-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="gymName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Gym's Name
                    </label>
                    <input
                      type="text"
                      onChange={onChange}
                      id="gymName"
                      name="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter gym name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Gym's Address
                    </label>
                    <input
                      type="text"
                      onChange={onChange}
                      id="address"
                      name="address"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter address"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Gym's Phone Number
                    </label>
                    <input
                      type="tel"
                      onChange={onChange}
                      id="phone"
                      name="phone"
                      pattern="[0-9]{10}"
                      title="Please enter a 10-digit phone number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter phone number (10 digits)"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Gym's Email
                    </label>
                    <input
                      type="email"
                      onChange={onChange}
                      id="email"
                      name="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-3 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Add Gym Details
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <NoteCard cardData={gymData} />
    </>
  );
}

export default Notes;
