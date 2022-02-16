import React, { useState } from "react";
import "./SubMenu.css";

function SubMenu({ item }) {
  const [open, setOpen] = useState(false);
  const [className, setClassName] = useState("responsive-header-dropdown-menu");
  const handleClassName = () => {
    setClassName("responsive-header-dropdown-menu-onclick");
  };
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div
      className="responsive-header-dropdown"
      onClick={() => {
        handleClassName();
        handleOpen();
      }}
    >
      <button class="responsive-header-dropdown-button">
        <span>{item.icon}</span> {item.text}
      </button>
      <div className={className}>
        {open &&
          item.links.map((listItem4) => {
            return (
              <a href={listItem4.pathName}>
                {listItem4.text}
                <br></br>
              </a>
            );
          })}
      </div>
    </div>
  );
}

export default SubMenu;
