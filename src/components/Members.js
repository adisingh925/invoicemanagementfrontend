import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import Datagrid from "./Datagrid";
import globalContext from "../context/GlobalContext";

function Members() {
  let { gymId } = useParams();
  let navigate = useNavigate();
  const context = useContext(globalContext);

  const {
    readMembershipData,
    membershipData,
    insertMemberData,
    updateMemberData,
    memberData,
    deleteMemberData,
    readMemberData,
  } = context;

  // This function formats the timestamp to display only the date part
  const formatDate = (timestamp) => {
    const insertDate = new Date(timestamp);
    const dueDate = new Date(insertDate.getTime());
    dueDate.setMonth(dueDate.getMonth() + 3);
    return {
      insertDate: insertDate.toLocaleDateString(),
      dueDate: dueDate.toLocaleDateString(),
    };
  };

  const columns = [
    { field: "member_id", headerName: "ID", width: 90 },
    {
      field: "member_name",
      headerName: "Member Name",
      width: 150,
      editable: true,
    },
    {
      field: "member_email",
      headerName: "Member Email",
      width: 150,
      editable: true,
    },
    {
      field: "member_phone_number",
      headerName: "Phone Number",
      type: "number",
      width: 150,
      editable: true,
    },
    {
      field: "member_membership_type",
      headerName: "Membership Type",
      width: 150,
      editable: true,
    },
    {
      field: "insert_time",
      headerName: "Joining Date",
      width: 150,
      valueGetter: (params) => formatDate(params.row.insert_time).insertDate,
    },
    {
      field: "due_date",
      headerName: "Next Payment Date",
      width: 150,
      valueGetter: (params) => formatDate(params.row.insert_time).dueDate,
    },
  ];

  const [member_ids, setMemberIds] = useState([]);

  const [isItemSelected, isItemSelectedChanged] = useState(false);

  const handleSelectionModelChange = (selectionModel) => {
    isItemSelectedChanged(selectionModel.length > 0);
    setMemberIds(selectionModel);
  };

  const handleRowUpdate = async (updatedRow) => {
    let response = await updateMemberData(updatedRow, gymId);
    if (response === -2) {
      localStorage.removeItem("token");
      navigate("/login");
    }
    return updatedRow;
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await insertMemberData(memberDetails, gymId);
    if (response === -2) {
      localStorage.removeItem("token");
      navigate("/login");
    } else if (response === 1) {
      toggleModal();
    }
  };

  const [memberDetails, setMemberDetails] = useState({
    member_name: "",
    member_email: "",
    member_phone_number: "",
    member_membership_type: "",
  });

  const onChange = (event) => {
    setMemberDetails({
      ...memberDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleDeleteClicked = async () => {
    let response = await deleteMemberData(member_ids, gymId);
    if (response === -2) {
      localStorage.removeItem("token");
      navigate("/login");
    } else if (response === 1) {
      setMemberIds([]);
    }
  };

  const onRefreshClicked = async () => {
    readMemberData(gymId);
    readMembershipData(gymId);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      readMembershipData(gymId);
      readMemberData(gymId);
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-[#111827] dark:bg-[#111827]">
        <NavBar />
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-60 h-screen pt-20 transition-transform -translate-x-full bg-blue sm:translate-x-0 dark:bg-blue"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-blue border-r border-gray-500 dark:bg-blue">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to={`/gym/${gymId}/members`}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                  />
                </svg>

                <span className="ms-3">Members</span>
              </Link>
            </li>
            <li>
              <Link
                to={`/gym/${gymId}/managers`}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">Managers</span>
                {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  Pro
                </span> */}
              </Link>
            </li>
            <li>
              <Link
                to={`/gym/${gymId}/earnings`}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">Earnings</span>
                {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  Pro
                </span> */}
              </Link>
            </li>
            <li>
              <Link
                to={`/gym/${gymId}/memberships`}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">
                  Memberships
                </span>
                {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  Pro
                </span> */}
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div className="sm:ml-64">
        <button
          type="button"
          onClick={toggleModal}
          className="ms-5 mt-20 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-5 me-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
            />
          </svg>
          Add Member
        </button>

        <button
          type="button"
          onClick={onRefreshClicked}
          className="ms-5 mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-5 me-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          Refresh
        </button>

        {isItemSelected && (
          <button
            type="button"
            onClick={handleDeleteClicked}
            className="ms-5 mt-5 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-5 me-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            </svg>
            Delete Members
          </button>
        )}

        {/* Main modal */}
        {isOpen && (
          <div className="fixed m-5 top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg dark:bg-gray-700">
              {/* Modal content */}
              <div className="p-4 md:p-5">
                {/* Modal header */}
                <div className="flex items-center justify-between border-b">
                  <h3 className="text-lg mb-3 font-semibold text-gray-900 dark:text-white">
                    Add New Member
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
                        htmlFor="fullName"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="member_name"
                        onChange={onChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter full name"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        onChange={onChange}
                        name="member_email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter email address"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        onChange={onChange}
                        name="member_phone_number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter phone number"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="membership"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Membership Type
                      </label>
                      <select
                        id="membership"
                        name="membership"
                        onChange={onChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required
                      >
                        <option defaultValue="" disabled selected>
                          Select membership type
                        </option>
                        {membershipData.map((membershipData) => (
                          <option
                            key={membershipData.membership_id}
                            value={membershipData.membership_id}
                          >
                            {membershipData.membership_name}
                          </option>
                        ))}
                      </select>
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
                    Add new member
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        <Datagrid
          columnVisibilityModel={{
            member_id: false,
          }}
          columns={columns}
          rows={memberData}
          handleSelectionModelChange={handleSelectionModelChange}
          handleRowUpdate={handleRowUpdate}
        />
      </div>
    </>
  );
}

export default Members;
