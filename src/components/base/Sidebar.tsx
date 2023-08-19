import { TbDogBowl, TbHome, TbIdBadge2, TbUser } from "react-icons/tb";
import { GiMedicines } from "react-icons/gi";
import { Link, NavLink } from "react-router-dom";
import { TbFileSettings } from "react-icons/tb";

export default function Sidebar() {
  const active = "shadow-sm bg-white";
  return (
    <div
      className="offcanvas-md offcanvas-start d-flex flex-column flex-shrink-0 p-3 bg-light"
      data-bs-scroll="true"
      tabIndex={-1}
      id="offcanvasWithBothOptions"
      aria-labelledby="offcanvasWithBothOptionsLabel"
      data-bs-toggle={screen.width < 768 && "offcanvas"}
      data-bs-target="#offcanvasWithBothOptions"
      aria-controls="offcanvasWithBothOptions"
      style={{ width: 230 }}
    >
      <Link
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
      >
        <span className="fs-4">
          <TbDogBowl
            style={{
              color: "#000000",
              fontSize: 30,
              marginRight: 5,
              paddingBottom: 5,
            }}
          />
          <b>Pet Clinic</b>
        </span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item" style={{ marginBottom: 5 }}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link link-dark ${isActive ? active : ""}`
            }
          >
            <TbHome
              style={{ fontSize: 30, marginRight: 5, paddingBottom: 5 }}
            />
            <b>หน้าแรก</b>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/pets"
            className={({ isActive }) =>
              `nav-link link-dark ${isActive ? active : ""}`
            }
          >
            <TbIdBadge2
              style={{ fontSize: 30, marginRight: 5, paddingBottom: 5 }}
            />
            <b>รายชื่อสัตว์</b>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/owners"
            className={({ isActive }) =>
              `nav-link link-dark ${isActive ? active : ""}`
            }
            aria-current="page"
          >
            <TbUser
              style={{ fontSize: 30, marginRight: 5, paddingBottom: 5 }}
            />
            <b>รายชื่อเจ้าของ</b>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/medicine"
            className={({ isActive }) =>
              `nav-link link-dark ${isActive ? active : ""}`
            }
            aria-current="page"
          >
            <GiMedicines
              style={{ fontSize: 30, marginRight: 5, paddingBottom: 5 }}
            />
            <b>รายชื่อยารักษา</b>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/prefs"
            className={({ isActive }) =>
              `nav-link link-dark ${isActive ? active : ""}`
            }
            aria-current="page"
          >
            <TbFileSettings
              style={{ fontSize: 30, marginRight: 5, paddingBottom: 5 }}
            />
            <b>settings</b>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
