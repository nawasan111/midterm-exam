import { useEffect, useState } from "react";
import StorageLocal from "../assets/js/localStorage";

export default function Prefs() {
  const prefs = new StorageLocal();
  const [font, setFont] = useState(prefs.getAll().fontFamily);
  useEffect(() => {
    document.title = "settings";
  }, []);
  return (
    <main>
      <div className="input-group mb-3" style={{ maxWidth: "600px" }}>
        <label
          className={"input-group-text" + ` ${font.replace(" ", "-")}`}
          htmlFor="inputGroupSelect01"
        >
          เปลี่ยนฟ้อนต์ของเว็บไซต์ที่นี่
        </label>
        <select
          className="form-select"
          value={font}
          onChange={(e) => {
            setFont(e.target.value);
          }}
          required
        >
          <option value="Kanit">Kanit</option>
          <option value="Prompt">Prompt</option>
          <option value="Chakra Petch">Chakra Petch</option>
          <option value="Itim">Itim</option>
        </select>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            prefs.set({ fontFamily: font });
            location.reload();
          }}
        >
          บันทึก
        </button>
      </div>
    </main>
  );
}
