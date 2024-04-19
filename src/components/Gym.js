import React, { useState } from "react";
import GymCard from "./GymCard";

const cardData = [
  {
    title: "Noteworthy technology acquisitions 2021",
    description:
      "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    link: "#",
  },
  {
    title: "Another Title",
    description: "Here's another description for another card.",
    link: "#",
  },
  {
    title: "Noteworthy technology acquisitions 2021",
    description:
      "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    link: "#",
  },
  {
    title: "Another Title",
    description: "Here's another description for another card.",
    link: "#",
  },
  {
    title: "Noteworthy technology acquisitions 2021",
    description:
      "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    link: "#",
  },
  {
    title: "Another Title",
    description: "Here's another description for another card.",
    link: "#",
  },
];

function Gym() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        type="submit"
        className="m-5 w-100 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add Gym
      </button>
      <GymCard cardData={cardData} />
    </>
  );
}

export default Gym;
