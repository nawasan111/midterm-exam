import { GrClearOption } from "react-icons/gr";

export interface SearchBoxProps {
  label: string;
  keyword: string;
  setKeyword: Function;
}
export default function SearchBox({
  keyword,
  label,
  setKeyword,
}: SearchBoxProps) {
  return (
    <div className="row" style={{ marginRight: 5 }}>
      <div className="btn-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder={label}
          aria-describedby="button-addon2"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          onClick={() => setKeyword("")}
        >
          <GrClearOption style={{ fontSize: 20 }} />
        </button>
      </div>
    </div>
  );
}
