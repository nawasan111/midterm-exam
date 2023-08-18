import { TbDogBowl } from "react-icons/tb";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
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
