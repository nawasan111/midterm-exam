import {
  TbSortAscendingLetters,
  TbSortDescendingLetters,
} from "react-icons/tb";
export interface SortBoxProps {
  onDesc: Function;
  onAsc: Function;
}
export default function SortBox({ onAsc, onDesc }: SortBoxProps) {
  return (
    <div className="row" style={{ marginBottom: 15, marginRight: 5 }}>
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => onAsc()}
        >
          <TbSortAscendingLetters style={{ fontSize: 20 }} />
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => onDesc()}
        >
          <TbSortDescendingLetters style={{ fontSize: 20 }} />
        </button>
      </div>
    </div>
  );
}
