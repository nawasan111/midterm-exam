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
