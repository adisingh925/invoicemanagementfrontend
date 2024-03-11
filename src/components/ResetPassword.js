import React, { useContext, useState } from "react";
import globalContext from "../context/GlobalContext";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const context = useContext(globalContext);
  const { resetPassword } = context;
  const [password, setPassword] = useState({
    password: "",
    retype_password: "",
  });

  const { token } = useParams();

  const handleSubmitClicked = async (e) => {
    e.preventDefault();
    if (password.password !== password.retype_password) {
      alert("Passwords don't match");
      return;
    }
    resetPassword(password, token);
  };

  const onChange = (event) => {
    setPassword({ ...password, [event.target.name]: event.target.value });
  };

  return (
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <form
            class="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            action="#"
            onSubmit={handleSubmitClicked}
          >
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={onChange}
                placeholder="••••••••"
                minLength="6"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                for="confirm-password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                onChange={onChange}
                minLength="6"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Reset passwod
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
