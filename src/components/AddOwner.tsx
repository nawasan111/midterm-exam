import Modal from "./Modal";
import { useState, useEffect, FormEvent } from "react";
import { db } from "../assets/js/firebase";
import { collection, addDoc } from "firebase/firestore";
import "../assets/css/addForm.css";

export interface AddOwnerProps {
  onClose: Function;
  isOpen: boolean;
}

function AddOwner({ onClose, isOpen }: AddOwnerProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  /* function to add new Owner to firestore */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      addDoc(collection(db, "owners"), {
        name: name,
        description: description,
      });
      onClose();
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {}, []);

  return (
    <Modal modalLable="เพิ่มข้อมูลเจ้าของ" onClose={onClose} isOpen={isOpen}>
      <form onSubmit={handleSubmit} className="addForm" name="addOwner">
        <input
          type="text"
          name="name"
          className="form-control my-2"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="กรอกชื่อเจ้าของ"
          required
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          className="form-control my-2"
          placeholder="รายละเอียด"
          value={description}
          required
        ></textarea>
        <div className="text-end">
          <button className="btn btn-success" type="submit">
            บันทึก
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddOwner;
