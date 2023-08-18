import "./App.css";
import Home from "./pages/Home";
import PetList from "./pages/PetList";
import Pet from "./pages/Pet";
import OwnerList from "./pages/OwnerList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/base/Footer";
import Navbar from "./components/base/Navbar";
import Sidebar from "./components/base/Sidebar";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Medicine from "./pages/Medicine";

function App() {
  return (
    <Router>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          minHeight: "75rem",
          paddingTop: "4.5rem",
        }}
      >
        <Sidebar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pets" element={<PetList />} />
            <Route path="/pet/view/:id" element={<Pet />} />
            <Route path="/owners" element={<OwnerList />} />
            <Route path="/medicine" element={<Medicine />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
