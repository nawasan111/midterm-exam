import { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { useSearchParams } from "react-router-dom";
import { db } from "../assets/js/firebase";

import AddOwner from "../components/AddOwner";
import OwnerInterface from "../interface/owner";
import PopupEvent from "../components/PopupEvent";
import SearchBox from "../components/SearchBox";
import SortBox from "../components/SortBox";

function OwnerList() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [owners, setOwners] = useState<OwnerInterface[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("q") ?? "");

  const ownersFilter = owners.filter(
    (own) => own.name.includes(keyword) || own.description.includes(keyword)
  );

  useEffect(() => {
    document.title = "รายชื่อเจ้าของ";
    let sort = searchParams.get("sort") ?? "";
    const q = query(
      collection(db, "owners"),
      orderBy("name", sort === "asc" ? "asc" : "desc")
    );
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
  }, [searchParams]);

  useEffect(() => {
    setAllSearchParams({ q: keyword });
  }, [keyword]);

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

  const deleteOwner = (owner: OwnerInterface) => {
    confirmAlert({
      title: `ต้องการลบ ${owner.name} ?`,
      message: `Are you sure delete ${owner.name}?`,
      buttons: [
        {
          label: "ตกลง",
          onClick: async () => {
            deleteDoc(doc(db, "owners", owner.id));
          },
        },
        {
          label: "ยกเลิก",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SearchBox
          label="ค้นหาเจ้าของ"
          keyword={keyword}
          setKeyword={setKeyword}
        />
        <SortBox
          onAsc={() => setAllSearchParams({ sort: "asc" })}
          onDesc={() => setAllSearchParams({ sort: "desc" })}
        />
        <PopupEvent
          label="เพิ่มข้อมูลเจ้าของ"
          onClick={() => setOpenAddModal(true)}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <ul className="list-group" style={{ width: 200 }}>
          {ownersFilter?.map((own, i) => (
            <li
              key={i}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {own.name}
              <span className="badge bg-primary rounded-pill">
                {own.pet_count === -1 ? 0 : own.pet_count}
              </span>
              <span>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteOwner(own)}
                >
                  ลบ
                </button>
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
