import { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../assets/js/firebase";
import imagePaw from "../assets/images/animal_paw.png";
import { TbCirclePlus, TbDogBowl, TbEdit, TbCircleX } from "react-icons/tb";
import { FaDog, FaCat } from "react-icons/fa";
import { GiRabbitHead } from "react-icons/gi";
import { useParams, useNavigate } from "react-router-dom";
import AddTreatment from "./AddTreatment";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import EditPet from "./EditPet";
import PetInterface from "../interface/pet";
import TreatmentInterface from "../interface/treatment";

const Pet = () => {
  const [pet, setPet] = useState<PetInterface>();
  const [owner, setOwner] = useState("");
  const [treatments, setTreatments] = useState<TreatmentInterface[]>([]);
  const params = useParams();
  const petId: string = params.id ?? "";
  const [openAddModal, setOpenAddModal] = useState(false);
  const navigate = useNavigate();

  const [openEditModal, setOpenEditModal] = useState(false);

  const getPetDoc = async (id: string) => {
    const petSnapshot = await getDoc(doc(db, "pets", id));
    if (petSnapshot.exists()) {
      const petData = petSnapshot.data();
      const ownerId = petSnapshot.data().owner;
      setPet({
        id: petSnapshot.id,
        name: petSnapshot.data().name,
        description: petSnapshot.data().description,
        gender: petSnapshot.data().gender,
        owner: petData.owner,
        picture: petData.picture,
        type: petData.type,
      });
      getOwnerDoc(ownerId);
      getTreatmentDoc(id);
    } else {
      console.log("Pet doesn't exist");
    }
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
          treatment: doc.data().treatment,
        }))
      );
      console.log(treatments);
    });
  };

  const deletePet = (petid: string) => {
    confirmAlert({
      title: "ต้องการลบข้อมูลนี้?",
      message: "Are you sure delete this pet?",
      buttons: [
        {
          label: "ตกลง",
          onClick: async () => {
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
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ display: "flex", flexDirection: "column", padding: 10 }}>
        <img
          src={pet && pet.picture ? pet.picture : imagePaw}
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
          {owner}
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
            onClick={() => deletePet(petId)}
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
                  {treatment.created.toDate().toString()}
                </h5>
              </div>
              <p className="mb-1">{treatment.treatment}</p>
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
