import React, { useState } from "react";
import "./SubMenu.css";

function SubMenu({ item }) {
  const [open, setOpen] = useState(false);
  const [className, setClassName] = useState("responsive-dropdown-menu");
  const handleClassName = () => {
    setClassName("responsive-dropdown-menu-onclick");
  };
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div
      className="responsive-dropdown"
      onClick={() => {
        handleClassName();
        handleOpen();
      }}
    >
      <button className="responsive-dropdown-button">{item.text}</button>
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
