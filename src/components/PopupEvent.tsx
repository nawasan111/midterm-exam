import { TbCirclePlus } from "react-icons/tb";
export interface PopupEventProps {
  label: string;
  onClick: Function;
}

export default function PopupEvent({ onClick, label }: PopupEventProps) {
  return (
    <div
      className="row"
      style={{ paddingLeft: 10, paddingRight: 10, marginBottom: 15 }}
    >
      <a
        href="#"
        className="btn btn-primary"
        style={{}}
        onClick={() => onClick()}
      >
        <TbCirclePlus style={{ fontSize: 20 }} /> <b>{label}</b>
      </a>
    </div>
  );
}
