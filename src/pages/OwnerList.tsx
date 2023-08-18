import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../assets/js/firebase";
import { TbCirclePlus } from "react-icons/tb";

import AddOwner from "../components/AddOwner";
import OwnerInterface from "../interface/owner";
import PopupEvent from "../components/PopupEvent";
import SearchBox from "../components/SearchBox";
import SortBox from "../components/SortBox";

function OwnerList() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [owners, setOwners] = useState<OwnerInterface[]>([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    document.title = "รายชื่อเจ้าของ";
    const q = query(collection(db, "owners"), orderBy("name", "asc"));
    onSnapshot(q, (querySnapshot) => {
      setOwners(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          pet_count: -1,
        }))
      );
    });
  }, []);

  const handleOrderBy = (order: string) => {};

  useEffect(() => {
    if (owners.length && owners[0].pet_count === -1) {
      owners.map((own, idx) => {
        const queryPetCount = query(
          collection(db, "pets"),
          where("owner", "==", own.id)
        );
        onSnapshot(queryPetCount, (snapshot) => {
          owners[idx].pet_count = snapshot.docs.length;
          console.log(owners);
          setOwners([...owners]);
        });
      });
    }
  }, [owners]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SearchBox
          label="ค้นหาเจ้าของ"
          keyword={keyword}
          setKeyword={setKeyword}
        />
        <SortBox
          onAsc={() => handleOrderBy("asc")}
          onDesc={() => handleOrderBy("desc")}
        />
        <PopupEvent
          label="เพิ่มข้อมูลเจ้าของ"
          onClick={() => setOpenAddModal(true)}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <ul className="list-group" style={{ width: 200 }}>
          {owners?.map((own, i) => (
            <li
              key={i}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {own.name}
              <span className="badge bg-primary rounded-pill">
                {own.pet_count === -1 ? 0 : own.pet_count}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {openAddModal && (
        <AddOwner
          onClose={() => setOpenAddModal(false)}
          isOpen={openAddModal}
        />
      )}
    </div>
  );
}

export default OwnerList;
