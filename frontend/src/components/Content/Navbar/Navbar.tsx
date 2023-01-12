import { Link } from "react-router-dom";

import logo from "@Assets/Navbar/logo.webp";

import dashboard from "@Assets/Navbar/dashboard.png";
import folder from "@Assets/Navbar/folder.png";
import star from "@Assets/Navbar/star.png";
import trash from "@Assets/Navbar/trash.png";
import settings from "@Assets/Navbar/settings.png";

import "@Style/Navbar/Navbar.scss";

function Navbar() {
  function handleHover(e: React.MouseEvent<HTMLUListElement, MouseEvent>) {
    let hoverEffect = document.getElementsByClassName(
      "hover-effect"
    )[0] as HTMLElement;
    let nav = document
      .getElementsByClassName("navbar")[0]
      .getElementsByTagName("nav")[0] as HTMLElement;
    let items = nav.getElementsByTagName("li");
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove("hover");
    }
    if ((e.target as HTMLElement).tagName === "UL") return;
    (e.target as HTMLElement).parentElement!.parentElement!.classList.add(
      "hover"
    );
    hoverEffect.style.top = `${
      (e.target as HTMLElement).getBoundingClientRect().top -
      nav.getBoundingClientRect().top
    }px`;
  }
  function handleMouseBack() {
    let hoverEffect = document.getElementsByClassName(
      "hover-effect"
    )[0] as HTMLElement;
    let nav = document
      .getElementsByClassName("navbar")[0]
      .getElementsByTagName("nav")[0] as HTMLElement;
    let currentIcon = document
      .getElementsByClassName("navbar")[0]
      .getElementsByClassName("active")[0] as HTMLElement;
    currentIcon.classList.add("hover");
    hoverEffect.style.top = `${
      currentIcon.getBoundingClientRect().top - nav.getBoundingClientRect().top
    }px`;
  }
  return (
    <aside className="navbar">
      <h1>
        <img src={logo} alt="" id="logo" />
      </h1>
      <nav>
        <ul onMouseMove={handleHover} onMouseLeave={handleMouseBack}>
          <li className="dashboard">
            <Link to="/">
              <img src={dashboard} alt="" />
            </Link>
          </li>
          <li className="files">
            <Link to="/files">
              <img src={folder} alt="" />
            </Link>
          </li>
          <li className="favourite">
            <Link to="/favourite">
              <img src={star} alt="" />
            </Link>
          </li>
          <li className="trash">
            <Link to="/trash">
              <img src={trash} alt="" />
            </Link>
          </li>
          <li className="settings">
            <Link to="/settings">
              <img src={settings} alt="" />
            </Link>
          </li>
        </ul>
        <div className="hover-effect"></div>
      </nav>
    </aside>
  );
}

export default Navbar;
