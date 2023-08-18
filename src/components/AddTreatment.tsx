import Modal from "./Modal";
import { useState, useEffect, FC, FormEvent } from "react";
import { db } from "../assets/js/firebase";
import { collection, addDoc, Timestamp, getDocs } from "firebase/firestore";
import "../assets/css/addPet.css";
import MedicineInterface from "../interface/medicine";

export interface AddTreatmentProps {
  onClose: Function;
  isOpen: boolean;
  id: string;
}
const AddTreatment: FC<AddTreatmentProps> = ({ onClose, isOpen, id }) => {
  const [treatment, setTreatment] = useState("");
  const [medicineId, setMedicineId] = useState("");
  const [medicines, setMedicines] = useState<MedicineInterface[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (medicineId && treatment) {
        addDoc(collection(db, "pets", id, "treatment"), {
          treatment: treatment,
          medicine: medicineId,
          created: Timestamp.now(),
        });
        onClose();
      }
    } catch (err) {
      alert(err);
    }
  };

  const fetchMedicines = async () => {
    let medicines_res = await getDocs(collection(db, "medicine"));
    setMedicines(
      medicines_res.docs.map((med) => ({
        id: med.id,
        detail: med.data().detail,
        name: med.data().name,
      }))
    );
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  return (
    <Modal modalLable="เพิ่มประวัติการรักษา" onClose={onClose} isOpen={isOpen}>
      <form onSubmit={handleSubmit} className="addPet" name="addPet">
        <textarea
          onChange={(e) => setTreatment(e.target.value)}
          placeholder="รายละเอียด"
          className="form-control"
          value={treatment}
          required
        ></textarea>
        <select className="form-select my-2" value={medicineId} onChange={(e) => setMedicineId(e.target.value)} required>
          <option value="" selected>
            เลือกยารักษา
          </option>
          {medicines.map((med, idx) => (
            <option key={idx} value={med.id}>
              {med.name}
            </option>
          ))}
        </select>
        <button className="btn btn-success" type="submit">
          บันทึก
        </button>
      </form>
    </Modal>
  );
};

export default AddTreatment;
