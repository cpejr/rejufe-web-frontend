/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import './SubMenu.css';

function SubMenu({ item }) {
  const [open, setOpen] = useState(false);
  const [className, setClassName] = useState('responsive-header-dropdown-menu');
  const handleClassName = () => {
    setClassName('responsive-header-dropdown-menu-onclick');
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
      <button type="button" className="responsive-header-dropdown-button">
        <span>{item.icon}</span>
        {' '}
        {item.text}
      </button>
      <div className={className}>
        {open
          && item?.links?.map((listItem4) => (
            <a href={listItem4.pathName}>
              {listItem4.text}
              <br />
            </a>
          ))}
      </div>
    </div>
  );
}

export default SubMenu;
