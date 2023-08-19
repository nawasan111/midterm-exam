import "./App.css";
import Home from "./pages/Home";
import PetList from "./pages/PetList";
import Pet from "./pages/Pet";
import OwnerList from "./pages/OwnerList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "./components/base/Footer";
import Navbar from "./components/base/Navbar";
import Sidebar from "./components/base/Sidebar";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Medicine from "./pages/Medicine";
import StorageLocal from "./assets/js/localStorage";
import Prefs from "./pages/Prefs";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [uid, setUid] = useState("");
  const [uname, setUname] = useState("");
  const prefs = new StorageLocal();
  useEffect(() => {
    document.title = "pet clinic";
    const auth = getAuth();
    onAuthStateChanged(auth, (data) => {
      setUid(data?.uid ?? "");
      setUname(data?.displayName ?? "");
    });
  }, []);

  return (
    <Router>
      <Navbar />
      <div
        style={{
          fontFamily: prefs.getAll().fontFamily,
          display: "flex",
          flexDirection: "row",
          minHeight: "75rem",
          paddingTop: "4.5rem",
        }}
      >
        <Sidebar />
        <main className="container">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  uname={{ set: setUname, value: uname }}
                  setUid={setUid}
                  uid={uid}
                />
              }
            />
            {uid.length && (
              <>
                <Route path="/pets" element={<PetList />} />
                <Route path="/pet/view/:id" element={<Pet />} />
                <Route path="/owners" element={<OwnerList />} />
                <Route path="/medicine" element={<Medicine />} />
                <Route path="/prefs" element={<Prefs />} />
              </>
            )}
            <Route
              path="*"
              element={
                <Home
                  uname={{ set: setUname, value: uname }}
                  setUid={setUid}
                  uid={uid}
                />
              }
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
