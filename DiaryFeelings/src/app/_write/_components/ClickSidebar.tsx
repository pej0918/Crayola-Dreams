import React from "react";

interface SidebarProps {
  isOpen: boolean;
  onCloseClick: () => void;
}

const ClickSidebar: React.FC<SidebarProps> = ({ isOpen, onCloseClick }) => {
  const clickCloseBtn = () => {
    onCloseClick();
    console.log(isOpen);
  };

  return (
    <div className="click-sidebar">
      <div className="sidebar-close" onClick={clickCloseBtn}>
        <img src="./close.svg" />
      </div>
      <div className="side-cont-name">사진 추가하기</div>
      <div className="sidebar-content">
        <img src="./rain.png" />
        <img src="./rain.png" />
        <img src="./rain.png" />
        <img src="./rain.png" />
      </div>
    </div>
  );
};

export default ClickSidebar;
