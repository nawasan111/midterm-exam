import Modal from "./Modal";
import { useState, useEffect, FormEvent } from "react";
import { db, storage } from "../assets/js/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "../assets/css/addForm.css";
import OwnerInterface from "../interface/owner";

export interface AddPetProps {
  onClose: Function;
  isOpen: boolean;
}
function AddPet({ onClose, isOpen }: AddPetProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [gender, setGender] = useState("");
  const [owner, setOwner] = useState<string>("");
  const [picture, setPicture] = useState<File>();
  const [description, setDescription] = useState("");
  const [owners, setOwners] = useState<OwnerInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /* function to add new pet to firestore */
  const handleSubmit = async (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      if (picture) {
        const storageRef = ref(storage, `/files/${picture.name}`);
        const uploadTask = uploadBytesResumable(storageRef, picture);
        uploadTask.on(
          "state_changed",
          () => {}, // ขณะกำลัง upload
          (err) => console.log(err), // ถ้า error ให้ทำอะไร
          () => {
            // ถ้า upload สำเร็จ ให้ทำอะไร
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              addDoc(collection(db, "pets"), {
                name: name,
                owner: owner,
                gender: gender,
                type: type,
                picture: url,
                description: description,
              });
              onClose();
              setIsLoading(false);
            });
          }
        );
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "owners"), orderBy("name", "asc"));
    onSnapshot(q, (querySnapshot) => {
      let owner_all: OwnerInterface[] = [];
      querySnapshot.docs.map((doc) => {
        owner_all.push({
          id: doc.id,
          name: doc.data().name ?? "none",
          description: doc.data().description,
        });
      });
      setOwners(owner_all);
    });
  }, []);

  return (
    <Modal
      modalLable="เพิ่มข้อมูลสัตว์เลี้ยง"
      onClose={onClose}
      isOpen={isOpen}
    >
      <form onSubmit={handleSubmit} className="addForm" name="addPet">
        <input
          type="text"
          name="name"
          className="form-control my-2"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="กรอกชื่อ"
          required
        />
        <select
          value={type}
          className="form-select my-2"
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="" selected>
            เลือกประเภทสัตว์เลี้ยง
          </option>
          <option value="สุนัข">สุนัข</option>
          <option value="แมว">แมว</option>
          <option value="กระต่าย">กระต่าย</option>
          <option value="อื่นๆ">อื่นๆ</option>
        </select>
        <select
          value={gender}
          className="form-select my-2"
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">เลือกเพศ</option>
          <option value="ชาย">ชาย</option>
          <option value="หญิง">หญิง</option>
          <option value="อื่นๆ">อื่นๆ</option>
        </select>
        <select
          value={owner}
          className="form-select my-2"
          onChange={(e) => setOwner(e.target.value)}
          required
        >
          <option value="" selected>
            เลือกเจ้าของ
          </option>
          {owners?.map((own, i) => (
            <option key={i} value={own.id}>
              {own.name}
            </option>
          ))}
        </select>
        <input
          className="form-control file my-2"
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setPicture(e.target.files[0]);
            }
          }}
          required
        />
        <textarea
          className="form-control my-2"
          style={{ height: "70px" }}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="รายละเอียด"
          value={description}
          required
        ></textarea>
        <div className="text-end">
          <button
            disabled={isLoading}
            className="btn btn-primary"
            type="submit"
          >
            {isLoading ? (
              <div
                className="spinner-border"
                style={{ width: "20px", height: "20px", display: "flex" }}
                role="status"
              ></div>
            ) : (
              "บันทึก"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddPet;
