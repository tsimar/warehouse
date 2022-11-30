import React from "react";

// import MenuBurger from "./menu/menuType/burger/MenuBurger";
import MenuPc from "./menu/MenuPc";
import "./styleNavbar/navbar.css";
// import LogoImg from "../img&icon/logo.png";

function Navbar() {
  //   const [windowSize, setWindowSize] = useState({ width: undefined });
  //   //useEffect - reading size windows
  //   useEffect(() => {
  //     function handleResize() {
  //       setWindowSize(window.innerWidth);
  //     }
  //     window.addEventListener("resize", handleResize);
  //     handleResize();
  //     return () => window.removeEventListener("resize", handleResize);
  //   }, []);

  return (
    <header className="main-header">
      <nav className="main__header--nav">
        <div className="logo--div">
          {/* <img className="logo__div--img" src={LogoImg} alt="logo" /> */}
        </div>
        <MenuPc />
      </nav>
    </header>
  );
}

export default Navbar;
