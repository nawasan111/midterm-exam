import { FormEvent, useState } from "react";
import Modal from "./Modal";
import MedicineInterface from "../interface/medicine";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../assets/js/firebase";

export interface EditMedicineProps {
  isOpen: boolean;
  onClose: Function;
  medicineData: MedicineInterface;
}

export default function EditMedicine({
  isOpen,
  onClose,
  medicineData,
}: EditMedicineProps) {
  const [medicine, setMedicine] = useState<MedicineInterface>({
    id: medicineData.id,
    detail: medicineData.detail,
    name: medicineData.name,
  });
  const onSumitForm = async (e: FormEvent) => {
    e.preventDefault();
    if (medicine.detail && medicine.name) {
      updateDoc(doc(db, "medicine", medicine.id), {
        name: medicine.name,
        detail: medicine.detail,
      });
      onClose();
    }
  };
  return (
    <Modal
      modalLable={`แก้ไขข้อมูลยารักษา ${medicineData.name}`}
      isOpen={isOpen}
      onClose={onClose}
    >
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
          <button className="btn btn-primary">บันทึก</button>
        </div>
      </form>
    </Modal>
  );
}
