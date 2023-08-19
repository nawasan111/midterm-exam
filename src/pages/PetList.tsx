import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../assets/js/firebase";
import { Link, useSearchParams } from "react-router-dom";
import imagePaw from "../assets/images/animal_paw.png";
import { TbDogBowl } from "react-icons/tb";
import { FaDog, FaCat } from "react-icons/fa";
import { GiRabbitHead } from "react-icons/gi";
import AddPet from "../components/AddPet";
import PetInterface from "../interface/pet";
import SearchBox from "../components/SearchBox";
import SortBox from "../components/SortBox";
import PopupEvent from "../components/PopupEvent";
import StorageLocal from "../assets/js/localStorage";

const PetList = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pets, setPets] = useState<PetInterface[]>([]);
  const [keyword, setKeyword] = useState(searchParams.get("q") ?? "");
  const prefs = new StorageLocal();

  const petsFilter = pets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(keyword.toLowerCase()) ||
      pet.description.toLowerCase().includes(keyword.toLocaleLowerCase()) ||
      (pet.type && pet?.type?.includes(keyword.toLowerCase())) ||
      (pet.gender && pet.gender.includes(keyword.toLocaleLowerCase()))
  );

  useEffect(() => {
    document.title = "รายชื่อสัตว์";
  }, []);
  useEffect(() => {
    let sort = searchParams.get("sort") ?? "";
    const q = query(
      collection(db, "pets"),
      orderBy("name", sort === "asc" ? "asc" : "desc")
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
  }, [searchParams]);

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

  const setAllSearchParams = ({ sort, q }: { sort?: string; q?: string }) => {
    let params: { [key: string]: string } = {};
    if (q) params["q"] = q;
    else {
      q = searchParams.get("q") ?? "";
      if (q) params["q"] = q;
    }
    if (sort) params["sort"] = sort;
    else {
      sort = searchParams.get("sort") ?? "";
      if (sort) params["sort"] = sort;
    }
    setSearchParams(params);
  };

  useEffect(() => {
    setAllSearchParams({ q: keyword });
  }, [keyword]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="menu-top">
        <SearchBox
          label="ค้นหาสัตว์เลี้ยง"
          keyword={keyword}
          setKeyword={setKeyword}
        />
        <SortBox
          onAsc={() => setAllSearchParams({ sort: "asc" })}
          onDesc={() => setAllSearchParams({ sort: "desc" })}
        />
        <PopupEvent
          label="เพิ่มข้อมูลสัตว์เลี้ยง"
          onClick={() => setOpenAddModal(true)}
        />
      </div>
      <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3">
        {petsFilter?.map((pet, i) => (
          <div style={{display: "flex", justifyContent: "center"}} className="col" key={i}>
            <div
              style={{ width: "250px", height: "350px" }}
              className="card shadow-sm"
            >
              <img
                src={pet.picture ? pet.picture : imagePaw}
                onError={(e) => {
                  e.currentTarget.src = imagePaw;
                }}
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
                <div
                  style={{ position: "absolute", bottom: "10px", width: "85%" }}
                  className="text-end"
                >
                  <div>
                    <Link
                      to={`/pet/view/${pet.id}`}
                      style={{
                        backgroundColor: prefs.prefs.color.second,
                      }}
                      className="btn btn-sm btn-secondary"
                    >
                      ดูรายละเอียด
                    </Link>
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
