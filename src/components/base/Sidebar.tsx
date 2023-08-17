import { TbDogBowl, TbHome, TbIdBadge2, TbUser } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light"
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
          <Link to="/" className="nav-link link-dark" aria-current="page">
            <TbHome
              style={{ fontSize: 30, marginRight: 5, paddingBottom: 5 }}
            />
            <b>หน้าแรก</b>
          </Link>
        </li>
        <li>
          <Link to="/pets" className="nav-link link-dark" aria-current="page">
            <TbIdBadge2
              style={{ fontSize: 30, marginRight: 5, paddingBottom: 5 }}
            />
            <b>รายชื่อสัตว์</b>
          </Link>
        </li>
        <li>
          <Link to="/owners" className="nav-link link-dark" aria-current="page">
            <TbUser
              style={{ fontSize: 30, marginRight: 5, paddingBottom: 5 }}
            />
            <b>รายชื่อเจ้าของ</b>
          </Link>
        </li>
      </ul>
    </div>
  );
}