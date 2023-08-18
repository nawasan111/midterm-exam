import { useEffect, useState } from "react";
import SearchBox from "../components/SearchBox";
import SortBox from "../components/SortBox";
import PopupEvent from "../components/PopupEvent";
import AddMedicine from "../components/AddMedicine";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../assets/js/firebase";
import MedicineInterface from "../interface/medicine";

export default function Medicine() {
  const [keyword, setKeyword] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [medicineList, setMedicineList] = useState<MedicineInterface[]>([]);

  const handleOrderBy = (mode: string) => {};

  useEffect(() => {
    document.title = "รายชื่อยารักษา";
    const queryMedicine = query(
      collection(db, "medicine"),
      orderBy("name", "asc")
    );
    onSnapshot(queryMedicine, (snapshot) => {
      setMedicineList(
        snapshot.docs.map((medic) => ({
          id: medic.id,
          name: medic.data().name,
          detail: medic.data().detail,
        }))
      );
    });
  }, []);
  return (
    <main>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SearchBox
          label="ค้นหายารักษา"
          keyword={keyword}
          setKeyword={setKeyword}
        />
        <SortBox
          onAsc={() => handleOrderBy("asc")}
          onDesc={() => handleOrderBy("desc")}
        />
        <PopupEvent
          label="เพิ่มข้อมูลยารักษา"
          onClick={() => setIsPopupOpen(true)}
        />
      </div>
      {isPopupOpen && (
        <AddMedicine
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
      {medicineList.map((medicine) => (
        <div>{medicine.name}</div>
      ))}
    </main>
  );
}
