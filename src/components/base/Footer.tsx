import StorageLocal from "../../assets/js/localStorage";

export default function Footer() {
  const prefs = new StorageLocal();
  return (
    <nav
      style={{ backgroundColor: prefs.prefs.color.theme }}
      className="navbar fixed-bottom navbar-expand-sm navbar-dark "
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Footer
        </a>
      </div>
    </nav>
  );
}
