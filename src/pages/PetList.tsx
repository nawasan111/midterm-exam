import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../assets/js/firebase";
import { Link } from "react-router-dom";
import imagePaw from "../assets/images/animal_paw.png";
import {
  TbCirclePlus,
  TbDogBowl,
  TbSortAscendingLetters,
  TbSortDescendingLetters,
  TbSearch,
} from "react-icons/tb";
import { FaDog, FaCat } from "react-icons/fa";
import { GiRabbitHead } from "react-icons/gi";
import AddPet from "../components/AddPet";
import PetInterface from "../interface/pet";
import SearchBox from "../components/SearchBox";
import SortBox from "../components/SortBox";
import PopupEvent from "../components/PopupEvent";

const PetList = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [pets, setPets] = useState<PetInterface[]>([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    document.title = "รายชื่อสัตว์";
  }, []);
  useEffect(() => {
    const q = query(collection(db, "pets"), orderBy("name", "asc"));
    onSnapshot(q, (querySnapshot) => {
      setPets(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          description: doc.data().description,
          name: doc.data().name,
          gender: doc.data().gender,
          owner: doc.data().owner,
          picture: doc.data().picture,
          type: doc.data().type,
        }))
      );
    });
  }, []);

  const handleOrderBy = (order: string) => {
    const q = query(
      collection(db, "pets"),
      orderBy("name", order == "asc" ? "asc" : "desc")
    );
    onSnapshot(q, (querySnapshot) => {
      setPets(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          description: doc.data().description,
          name: doc.data().name,
          gender: doc.data().gender,
          owner: doc.data().owner,
          picture: doc.data().picture,
          type: doc.data().type,
        }))
      );
    });
  };

  const handleSearch = (keyword: string) => {
    if (keyword) {
      const q = query(
        collection(db, "pets"),
        where("name", ">=", keyword),
        where("name", "<=", keyword + "\uf8ff")
      );
      onSnapshot(q, (querySnapshot) => {
        setPets(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            description: doc.data().description,
            name: doc.data().name,
            gender: doc.data().gender,
            owner: doc.data().owner,
            picture: doc.data().picture,
            type: doc.data().type,
          }))
        );
      });
    } else {
      const q = query(collection(db, "pets"), orderBy("name", "asc"));
      onSnapshot(q, (querySnapshot) => {
        setPets(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            description: doc.data().description,
            name: doc.data().name,
            gender: doc.data().gender,
            owner: doc.data().owner,
            picture: doc.data().picture,
            type: doc.data().type,
          }))
        );
      });
    }
  };

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
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SearchBox label="ค้นหาสัตว์เลี้ยง" keyword={keyword} setKeyword={setKeyword} />
        <SortBox
          onAsc={() => handleOrderBy("asc")}
          onDesc={() => handleOrderBy("desc")}
        />
        <PopupEvent
          label="เพิ่มข้อมูลสัตว์เลี้ยง"
          onClick={() => setOpenAddModal(true)}
        />
      </div>
      <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
        {pets?.map((pet, i) => (
          <div className="col" key={i}>
            <div style={{ width: "300px" }} className="card shadow-sm">
              <img
                src={pet.picture ? pet.picture : imagePaw}
                style={{ objectFit: "cover" }}
                width={300}
                height={170}
                className="card-img-top"
                alt={pet.name}
              />
              <div className="card-body">
                <h3 className="card-text">
                  {renderPetTypeIcon(pet.type)}
                  <b>{pet.name}</b>
                </h3>
                <p className="card-text">{pet.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <Link
                      to={`/pet/view/${pet.id}`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      ดูรายละเอียด
                    </Link>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      แก้ไขข้อมูล
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {openAddModal && (
        <AddPet onClose={() => setOpenAddModal(false)} isOpen={openAddModal} />
      )}
    </div>
  );
};

export default PetList;
