import StorageLocal from "../../assets/js/localStorage";

export default function Footer() {
  const prefs = new StorageLocal();
  if (prefs.prefs.hideFooter) return <></>;
  return (
    <footer
      style={{ backgroundColor: prefs.prefs.color.theme }}
      className="navbar fixed-bottom navbar-expand-sm navbar-dark "
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Footer
        </a>
      </div>
    </footer>
  );
}
