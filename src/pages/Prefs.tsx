import { useEffect, useState } from "react";
import StorageLocal, { prefsTypeSome } from "../assets/js/localStorage";

export default function Prefs() {
  const prefs = new StorageLocal();
  const [prefsState, setPrefsState] = useState<prefsTypeSome>(prefs.getAll());

  const getSave = () => {
    prefs.set(prefsState);
    location.reload();
  };
  useEffect(() => {
    document.title = "settings";
    console.log(prefsState.color);
  }, []);
  return (
    <main>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getSave();
        }}
        style={{ maxWidth: 600 }}
      >
        <div className="input-group mb-3">
          <label
            className={
              "input-group-text" +
              ` ${prefsState?.fontFamily?.replace(" ", "-")}`
            }
            htmlFor="inputGroupSelect01"
          >
            เปลี่ยนฟ้อนต์ของเว็บไซต์ที่นี่
          </label>
          <select
            className="form-select my-2"
            value={prefsState.fontFamily}
            onChange={(e) => {
              setPrefsState({ ...prefsState, fontFamily: e.target.value });
            }}
            required
          >
            <option value="Kanit">Kanit</option>
            <option value="Prompt">Prompt</option>
            <option value="Chakra Petch">Chakra Petch</option>
            <option value="Itim">Itim</option>
          </select>
        </div>
        <div>
          <div className="input-group my-2">
            <label className="input-group-text">ธีม</label>
            <input
              className="form-control my-auto"
              type="color"
              value={prefsState.color?.theme}
              onChange={(e) =>
                setPrefsState({
                  ...prefsState,
                  color: { ...prefsState.color, theme: e.target.value },
                })
              }
            />
          </div>
        </div>

        <div>
          <div className="input-group my-2">
            <label className="input-group-text">สีหลัก</label>
            <input
              className="form-control my-auto"
              type="color"
              value={prefsState.color?.primary}
              onChange={(e) =>
                setPrefsState({
                  ...prefsState,
                  color: { ...prefsState.color, primary: e.target.value },
                })
              }
            />
          </div>
        </div>
        <div>
          <div className="input-group my-2">
            <label className="input-group-text">สีรอง</label>
            <input
              className="form-control my-auto"
              type="color"
              value={prefsState.color?.second}
              onChange={(e) =>
                setPrefsState({
                  ...prefsState,
                  color: { ...prefsState.color, second: e.target.value },
                })
              }
            />
          </div>
        </div>
        <div>
          <div className="input-group my-2">
            <label className="input-group-text">warning</label>
            <input
              className="form-control my-auto"
              type="color"
              value={prefsState.color?.warning}
              onChange={(e) =>
                setPrefsState({
                  ...prefsState,
                  color: { ...prefsState.color, warning: e.target.value },
                })
              }
            />
          </div>
        </div>

        <div>
          <div className="input-group my-2">
            <label className="input-group-text">danger</label>
            <input
              className="form-control my-auto"
              type="color"
              value={prefsState.color?.danger}
              onChange={(e) =>
                setPrefsState({
                  ...prefsState,
                  color: { ...prefsState.color, danger: e.target.value },
                })
              }
            />
          </div>
        </div>

        <div className="my-2 text-end">
          <button
            style={{ backgroundColor: prefs.getAll().color.primary }}
            className="btn btn-primary"
          >
            บันทึก
          </button>
          <div
            style={{ backgroundColor: prefs.getAll().color.danger }}
            className="btn btn-danger mx-3"
            onClick={() => {
              if (confirm("confirm reset?")) {
                localStorage.setItem("prefs", "{}");
                location.reload();
              }
            }}
          >
            รีเซ็ต
          </div>
        </div>
      </form>
    </main>
  );
}
