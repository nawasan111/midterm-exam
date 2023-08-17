import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import { db } from "../assets/js/firebase";
import { TbCirclePlus } from "react-icons/tb";

import AddOwner from './AddOwner';

function OwnerList() {
    const [openAddModal, setOpenAddModal] = useState(false)
    const [owners, setOwners] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'owners'), orderBy('name', 'asc'))
        onSnapshot(q, (querySnapshot) => {
            setOwners(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    },[])

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row'}}>
                <div className="row" style={{ paddingLeft:10, paddingRight: 10, marginBottom: 10 }}>
                    <a href="#" className="btn btn-success" style={{  }} onClick={() => setOpenAddModal(true)}>
                        <TbCirclePlus style={{ fontSize: 20 }} /> <b>เพิ่มข้อมูลเจ้าของ</b>
                    </a>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row'}}>
                <ul class="list-group" style={{ width: 200 }}>
                {
                    owners?.map((owner, i) => (
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                        {owner.data.name}
                        <span class="badge bg-primary rounded-pill">1</span>
                    </li>
                    ))
                }
                </ul>
            </div>
            {openAddModal &&
                <AddOwner onClose={() => setOpenAddModal(false)} open={openAddModal}/>
            }
        </div>
    )
}

export default OwnerList;