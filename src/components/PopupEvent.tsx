import { TbCirclePlus } from "react-icons/tb";
import StorageLocal from "../assets/js/localStorage";
export interface PopupEventProps {
  label: string;
  onClick: Function;
}

export default function PopupEvent({ onClick, label }: PopupEventProps) {
  const prefs = new StorageLocal();
  return (
    <div
      className="row"
      style={{ paddingLeft: 10, paddingRight: 10, marginBottom: 15 }}
    >
      <a
        href="#"
        className="btn btn-primary"
        style={{
          backgroundColor: prefs.prefs.color.primary,
          borderColor: prefs.prefs.color.primary,
        }}
        onClick={() => onClick()}
      >
        <TbCirclePlus style={{ fontSize: 20 }} /> <b>{label}</b>
      </a>
    </div>
  );
}
