import React from "react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <a href="/" className="navbar__brand">
          <img
            src="/images/homescreen48.svg"
            alt="Kawrae logo"
            className="navbar__logo"
          />
          <h2 className="navbar__title">Todo List</h2>
        </a>

        <a
          href="https://github.com/kawrae"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar__link"
        >
          GitHub
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
