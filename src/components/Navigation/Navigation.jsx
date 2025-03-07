import css from "./Navigation.module.css";
import { NavLink, Outlet } from "react-router-dom";

function Navigation() {

  const setActive = ({ isActive }) =>
    isActive ? css.activeLink : css.noActiveLink;

  return (
    <>
    <header className={css.header}>
      <nav className="container">
        <ul className={css.navList}>
          <li> <NavLink to={"/"} className={setActive}>
                  Home
                </NavLink></li>
          <li><NavLink to={"/movies"} className={setActive}>Movies</NavLink></li>
      </ul>
      </nav>
    </header>
      <main className="container"><Outlet /></main>
      <footer></footer>
      </>
  )
}

export default Navigation
