import { useState, useEffect } from "react";
import { db, storage } from "../assets/js/firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  where,
  documentId,
  getDocs,
} from "firebase/firestore";
import imagePaw from "../assets/images/animal_paw.png";
import { TbCirclePlus, TbDogBowl, TbEdit, TbCircleX } from "react-icons/tb";
import { FaDog, FaCat } from "react-icons/fa";
import { GiRabbitHead } from "react-icons/gi";
import { useParams, useNavigate } from "react-router-dom";
import AddTreatment from "../components/AddTreatment";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import EditPet from "../components/EditPet";
import PetInterface from "../interface/pet";
import TreatmentInterface from "../interface/treatment";
import { deleteObject, ref } from "firebase/storage";
import MedicineInterface from "../interface/medicine";

const Pet = () => {
  const [pet, setPet] = useState<PetInterface>();
  const [owner, setOwner] = useState("");
  const [treatments, setTreatments] = useState<TreatmentInterface[]>([]);
  const params = useParams();
  const petId: string = params.id ?? "";
  const [openAddModal, setOpenAddModal] = useState(false);
  const navigate = useNavigate();
  const [medicinesList, setMedicineList] = useState<MedicineInterface[]>([]);
  const [openEditModal, setOpenEditModal] = useState(false);

  const getPetDoc = async (id: string) => {
    const queryPet = query(
      collection(db, "pets"),
      where(documentId(), "==", id)
    );
    onSnapshot(queryPet, (snap) => {
      if (snap.docs.length) {
        console.log(snap.docs[0].data());
        const petData = snap.docs[0].data();
        const ownerId = petData.owner;
        setPet({
          id: snap.docs[0].id,
          name: petData.name,
          description: petData.description,
          gender: petData.gender,
          owner: petData.owner,
          picture: petData.picture,
          type: petData.type,
        });
        getOwnerDoc(ownerId);
        getTreatmentDoc(id);
      }
    });
  };

  const getOwnerDoc = async (id: string) => {
    const ownerSnapshot = await getDoc(doc(db, "owners", id));
    if (ownerSnapshot.exists()) {
      setOwner(ownerSnapshot.data().name);
    } else {
      console.log("Owner doesn't exist");
    }
  };

  const getTreatmentDoc = async (id: string) => {
    const q = query(
      collection(db, "pets", id, "treatment"),
      orderBy("created", "desc")
    );
    onSnapshot(q, (querySnapshot) => {
      setTreatments(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          created: doc.data().created,
          medicine: doc.data().medicine,
          treatment: doc.data().treatment,
        }))
      );
      console.log(treatments);
    });
  };

  const fetchMedicines = async () => {
    let medicines = await getDocs(collection(db, "medicine"));
    setMedicineList(
      medicines.docs.map((med) => ({
        id: med.id,
        name: med.data().name,
        detail: med.data().detail,
      }))
    );
  };

  const deletePet = () => {
    confirmAlert({
      title: "ต้องการลบข้อมูลนี้?",
      message: "Are you sure delete this pet?",
      buttons: [
        {
          label: "ตกลง",
          onClick: async () => {
            console.log(pet?.picture);
            let url = new URL(pet?.picture ?? "").pathname.toString();
            let pathname = url.split("/");
            let pathnameLast = pathname[pathname.length - 1];
            pathnameLast = decodeURIComponent(pathnameLast);
            const desertRef = ref(storage, pathnameLast);
            try {
              deleteObject(desertRef);
            } catch (err) {
              console.log(err);
            }
            await deleteDoc(doc(db, "pets", petId));
            navigate("/pets");
          },
        },
        {
          label: "ยกเลิก",
          onClick: () => {},
        },
      ],
    });
  };

  useEffect(() => {
    getPetDoc(petId);
    fetchMedicines();
  }, []);

  useEffect(() => {
    if (pet?.name) {
      document.title = `${pet.name} | pet clinic`;
    }
  }, [pet]);

  const renderPetTypeIcon = (type: string) => {
    switch (type) {
      case "สุนัข":
        return (
          <FaDog style={{ fontSize: 30, marginRight: 5, paddingBottom: 5 }} />
        );
      case "แมว":
        return (
          <FaCat style={{ fontSize: 30, marginRight: 5, paddingBottom: 5 }} />
        );
      case "กระต่าย":
        return (
          <GiRabbitHead
            style={{ fontSize: 30, marginRight: 5, paddingBottom: 5 }}
          />
        );
      default:
        return (
          <TbDogBowl
            style={{ fontSize: 30, marginRight: 5, paddingBottom: 5 }}
          />
        );
    }
  };

  return (
    <div className="menu-top">
      <div style={{ display: "flex", flexDirection: "column",alignItems: "center", padding: 10 }}>
        <img
          src={pet && pet.picture ? pet.picture : imagePaw}
          onError={(e) => {
            e.currentTarget.src = imagePaw;
          }}
          className="shadow rounded-circle"
          style={{ width: 200, height: 200, objectFit: "cover" }}
          alt={pet ? pet.name : ""}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: 10,
          paddingLeft: 20,
        }}
      >
        <h3>
          {renderPetTypeIcon(pet ? pet.type : "")}
          <b>{pet ? pet.name : "none"}</b>
          <span className="text-sm"> ({`${pet?.gender}`})</span>
        </h3>
        <p className="lead">
          <b>เจ้าของ: </b>
          {owner.length ? owner : "ไม่พบรายชื่อเจ้าของ"}
        </p>
        <p className="lead">{pet ? pet.description : "none"}</p>
        <div className="btn-group" role="group">
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => setOpenAddModal(true)}
          >
            <TbCirclePlus style={{ fontSize: 25, paddingBottom: 3 }} />{" "}
            เพิ่มประวัติการรักษา
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setOpenEditModal(true)}
          >
            <TbEdit style={{ fontSize: 25, paddingBottom: 3 }} /> แก้ไขข้อมูล
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => deletePet()}
          >
            <TbCircleX style={{ fontSize: 25, paddingBottom: 3 }} /> ลบข้อมูล
          </button>
        </div>
        <div className="list-group" style={{ marginTop: 10 }}>
          {treatments?.map((treatment, i) => (
            <a
              href="#"
              className="list-group-item list-group-item-action"
              key={i}
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">
                  {new Date(treatment.created.toMillis()).toLocaleString()}
                </h5>
              </div>
              <p className="mb-1">{treatment.treatment}</p>
              <div>
                ยาที่ใช้:{" "}
                {medicinesList.find((med) => med.id === treatment.medicine)
                  ?.name ?? "ไม่พบยารักษาในรายการ"}
              </div>
            </a>
          ))}
        </div>
      </div>
      {openAddModal && (
        <AddTreatment
          onClose={() => setOpenAddModal(false)}
          isOpen={openAddModal}
          id={petId ?? ""}
        />
      )}
      {openEditModal && pet && (
        <EditPet
          onClose={() => setOpenEditModal(false)}
          isOpen={openEditModal}
          id={petId ?? ""}
          petName={pet.name ?? ""}
          petType={pet.type ?? ""}
          gender_c={pet.gender ?? ""}
          petOwner={pet.owner ?? ""}
          petPicture={pet.picture ?? ""}
          petDescription={pet.description ?? ""}
        />
      )}
    </div>
  );
};

export default Pet;
