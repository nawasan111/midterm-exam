import { FormEvent, useState } from "react";
import Modal from "./Modal";
import MedicineInterface from "../interface/medicine";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../assets/js/firebase";
import StorageLocal from "../assets/js/localStorage";

export interface AddMedicineProps {
  isOpen: boolean;
  onClose: Function;
}

export default function AddMedicine({ isOpen, onClose }: AddMedicineProps) {
  const [medicine, setMedicine] = useState<MedicineInterface>({
    id: "",
    detail: "",
    name: "",
  });
  const prefs = new StorageLocal();
  const onSumitForm = async (e: FormEvent) => {
    e.preventDefault();
    if (medicine.detail && medicine.name) {
      addDoc(collection(db, "medicine"), {
        name: medicine.name,
        detail: medicine.detail,
      });
      onClose();
    }
  };
  return (
    <Modal modalLable="เพิ่มข้อมูลยารักษา" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={onSumitForm}>
        <input
          type="text"
          placeholder="กรอกชื่อยา"
          className="form-control my-2"
          value={medicine.name}
          onChange={(e) => setMedicine({ ...medicine, name: e.target.value })}
          required
        />
        <textarea
          className="form-control my-2"
          value={medicine.detail}
          onChange={(e) => setMedicine({ ...medicine, detail: e.target.value })}
          placeholder="รายละเอียด"
          required
        ></textarea>
        <div className="text-end">
          <button
            style={{
              backgroundColor: prefs.prefs.color.primary,
              borderColor: prefs.prefs.color.primary,
            }}
            className="btn btn-primary"
          >
            บันทึก
          </button>
        </div>
      </form>
    </Modal>
  );
}
