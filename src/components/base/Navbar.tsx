import { TbDogBowl } from "react-icons/tb";
export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <TbDogBowl
            style={{
              color: "#FFFFFF",
              fontSize: 30,
              marginRight: 5,
              paddingBottom: 5,
            }}
          />
          <b>Pet Clinic</b>
        </a>
      </div>
    </nav>
  );
}
