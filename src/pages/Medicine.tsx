import { useEffect, useState } from "react";
import SearchBox from "../components/SearchBox";
import SortBox from "../components/SortBox";
import PopupEvent from "../components/PopupEvent";
import AddMedicine from "../components/AddMedicine";
import { confirmAlert } from "react-confirm-alert";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../assets/js/firebase";
import EditMedicine from "../components/EditMedicine";
import MedicineInterface from "../interface/medicine";
import { useSearchParams } from "react-router-dom";

export default function Medicine() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [medicineList, setMedicineList] = useState<MedicineInterface[]>([]);
  const [editing, setEditing] = useState<{
    isEdit: boolean;
    data: MedicineInterface;
  }>({ isEdit: false, data: { detail: "", id: "", name: "" } });

  const medicineFilter = medicineList.filter(
    (med) => med.name.includes(keyword) || med.detail.includes(keyword)
  );

  const fetchMedicine = () => {
    let sort = searchParams.get("sort") ?? "asc";
    const queryMedicine = query(
      collection(db, "medicine"),
      orderBy("name", sort === "asc" ? "asc" : "desc")
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
  };

  const deleteMedicine = (medicine: MedicineInterface) => {
    confirmAlert({
      title: `ต้องการลบ${medicine.name}หรือไม่?`,
      message: `Are you sure delete this ${medicine.name}?`,
      buttons: [
        {
          label: "ตกลง",
          onClick: async () => {
            await deleteDoc(doc(db, "medicine", medicine.id));
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
    document.title = "รายชื่อยารักษา";
    fetchMedicine();
  }, [searchParams]);
  return (
    <main>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SearchBox
          label="ค้นหายารักษา"
          keyword={keyword}
          setKeyword={setKeyword}
        />
        <SortBox
          onAsc={() => setSearchParams({ sort: "asc" })}
          onDesc={() => setSearchParams({ sort: "desc" })}
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
      <div style={{ overflowX: "scroll" }}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>ชื่อ</th>
              <th>รายละเอียด</th>
              <th>แก้ไข</th>
              <th>ลบ</th>
            </tr>
          </thead>
          <tbody>
            {medicineFilter.map((medicine, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{medicine.name}</td>
                <td>{medicine.detail}</td>
                <td>
                  <button
                    className="btn btn-outline-dark"
                    onClick={() =>
                      setEditing({
                        isEdit: true,
                        data: medicine,
                      })
                    }
                  >
                    แก้ไข
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteMedicine(medicine)}
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editing.isEdit && (
        <EditMedicine
          isOpen={editing.isEdit}
          medicineData={editing.data}
          onClose={() => setEditing({ ...editing, isEdit: false })}
        />
      )}
    </main>
  );
}
