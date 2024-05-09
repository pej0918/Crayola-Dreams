"use client";

import React, { useRef, useState } from "react";
import "../../write/write.css";
import ClickSidebar from "./ClickSidebar";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleBtn = (e: any) => {
    setIsOpen(true);
    console.log(e.target.className, isOpen);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="write-sidebar">
        <img
          onClick={handleBtn}
          className="side-img side-image"
          src="./image.svg"
        />
        <img
          onClick={handleBtn}
          className="side-img side-sticker"
          src="./sticker.svg"
        />
        <img
          onClick={handleBtn}
          className="side-img side-cal"
          src="./calendar.svg"
        />
        <img
          onClick={handleBtn}
          className="side-img side-ai"
          src="./yuumi.jpg"
        />
      </div>
      {isOpen ? (
        <ClickSidebar isOpen={isOpen} onCloseClick={handleCloseClick} />
      ) : null}
    </>
  );
};

export default SideBar;
