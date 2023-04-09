import { useState } from "react";
const Navbar = (props) => {
  return (
    <div id='navbar' className={props.theme + "Other"}>
      <p>Where in the world?</p>
      <div id='theme-switch' onClick={props.handleTheme}>
        <span>
          <i className='fa-solid fa-moon'></i>
        </span>
        <p>Dark Mode</p>
      </div>
    </div>
  );
};

export default Navbar;
