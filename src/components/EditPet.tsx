import Modal from "./Modal";
import { useState, useEffect, FormEvent } from "react";
import { db, storage } from "../assets/js/firebase";
import { FC } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import "../assets/css/addForm.css";
import OwnerInterface from "../interface/owner";

export interface EditPetProps {
  onClose: Function;
  isOpen: boolean;
  id: string;
  petName: string;
  petType: string;
  gender_c: string;
  petOwner: string;
  petPicture: string;
  petDescription: string;
}
const EditPet: FC<EditPetProps> = ({
  onClose,
  isOpen,
  id,
  petName,
  petType,
  gender_c,
  petOwner,
  petPicture,
  petDescription,
}) => {
  const [name, setName] = useState(petName);
  const [type, setType] = useState(petType);
  const [owner, setOwner] = useState(petOwner);
  const [gender, setGender] = useState(gender_c);
  const [picture, setPicture] = useState<File>();
  const [description, setDescription] = useState(petDescription);
  const [owners, setOwners] = useState<OwnerInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /* function to edit pet to firestore */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (picture) {
        const storageRef = ref(storage, `/files/${picture.name}`);
        const uploadTask = uploadBytesResumable(storageRef, picture);
        uploadTask.on(
          "state_changed",
          (snapshot) => {}, // ขณะกำลัง upload
          (err) => console.log(err), // ถ้า error ให้ทำอะไร
          () => {
            // ถ้า upload สำเร็จ ให้ทำอะไร
            let url = new URL(petPicture ?? "").pathname.toString();
            let pathname = url.split("/");
            let pathnameLast = pathname[pathname.length - 1];
            pathnameLast = decodeURIComponent(pathnameLast);
            const desertRef = ref(storage, pathnameLast);
            try {
              deleteObject(desertRef);
            } catch (err) {
              console.log(err);
            }

            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              updateDoc(doc(db, "pets", id), {
                name: name,
                type: type,
                gender: gender,
                owner: owner,
                picture: url,
                description: description,
              });
              onClose();
              setIsLoading(false);
            });
          }
        );
      } else {
        updateDoc(doc(db, "pets", id), {
          name: name,
          type: type,
          gender: gender,
          owner: owner,
          description: description,
        });
        onClose();
        setIsLoading(false);
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "owners"), orderBy("name", "asc"));
    onSnapshot(q, (querySnapshot) => {
      setOwners(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
        }))
      );
    });
  }, []);

  return (
    <Modal
      modalLable="แก้ไขข้อมูลสัตว์เลี้ยง"
      onClose={onClose}
      isOpen={isOpen}
    >
      <form onSubmit={handleSubmit} className="addForm" name="editPet">
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
          className="form-select"
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="">เลือกประเภทสัตว์เลี้ยง</option>
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
          className="form-select"
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
        />
        <textarea
          className="form-control my-2"
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
};

export default EditPet;
