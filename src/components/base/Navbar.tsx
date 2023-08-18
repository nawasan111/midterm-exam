import { TbDogBowl } from "react-icons/tb";
import { Link } from "react-router-dom";
import StorageLocal from "../../assets/js/localStorage";
export default function Navbar() {
  const prefs = new StorageLocal();
  return (
    <nav
      style={{ backgroundColor: prefs.prefs.color.theme }}
      className="navbar navbar-expand-md navbar-dark fixed-top"
    >
      <div className="container-fluid">
        <button
          style={{ backgroundColor: prefs.prefs.color.second }}
          className="btn btn-second btn-menu"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasWithBothOptions"
          aria-controls="offcanvasWithBothOptions"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to="/">
          <TbDogBowl
            style={{
              color: "#FFFFFF",
              fontSize: 30,
              marginRight: 5,
              paddingBottom: 5,
            }}
          />
          <b>Pet Clinic</b>
        </Link>
      </div>
    </nav>
  );
}
