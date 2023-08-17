import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore"
import { db } from "../assets/js/firebase";
import { Link } from "react-router-dom";
import imagePaw from "../assets/images/animal_paw.png";
import { TbCirclePlus, TbDogBowl, TbSortAscendingLetters, TbSortDescendingLetters, TbSearch } from "react-icons/tb";
import { FaDog, FaCat } from "react-icons/fa";
import { GiRabbitHead } from "react-icons/gi";
import AddPet from './AddPet'

const PetList = () => {
    const [openAddModal, setOpenAddModal] = useState(false)
    const [pets, setPets] = useState([])
    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        const q = query(collection(db, 'pets'), orderBy('name', 'asc'))
        onSnapshot(q, (querySnapshot) => {
            setPets(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    },[])

    const handleOrderBy = (order) => {
        const q = query(collection(db, 'pets'), orderBy('name', order))
        onSnapshot(q, (querySnapshot) => {
            setPets(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }

    const handleSearch = (keyword) => {
        if(keyword) {
            const q = query(collection(db, 'pets'), 
            where('name', '>=', keyword),
            where('name', '<=', keyword +  '\uf8ff'))
            onSnapshot(q, (querySnapshot) => {
                setPets(querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
        } else {
            const q = query(collection(db, 'pets'), orderBy('name', 'asc'))
            onSnapshot(q, (querySnapshot) => {
                setPets(querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })

        }
    }

    const renderPetTypeIcon = (type) => {
        switch(type) {
            case 'สุนัข':
                return <FaDog style={{ fontSize: 30, marginRight: 5, paddingBottom: 5 }} />;
            case 'แมว':
                return <FaCat style={{ fontSize: 30, marginRight: 5, paddingBottom: 5 }} />;
            case 'กระต่าย':
                return <GiRabbitHead style={{ fontSize: 30, marginRight: 5, paddingBottom: 5 }} />;
            default:
                return <TbDogBowl style={{ fontSize: 30, marginRight: 5, paddingBottom: 5 }} />;
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row'}}>
                <div className="row" style={{ marginRight: 5 }}>
                    <div className="btn-group mb-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Pet's name" 
                            aria-describedby="button-addon2"
                            onChange={(e) => setKeyword(e.target.value)} 
                            value={keyword} />
                        <button 
                            className="btn btn-outline-secondary" 
                            type="button" 
                            id="button-addon2"
                            onClick={() => handleSearch(keyword)}><TbSearch style={{ fontSize: 20 }} /></button>
                    </div>
                </div>
                <div className="row" style={{ marginBottom: 15, marginRight: 5 }}>
                    <div className="btn-group">
                        <button type="button" className="btn btn-outline-secondary" onClick={() => handleOrderBy("desc")}><TbSortAscendingLetters style={{ fontSize: 20 }} /></button>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => handleOrderBy("asc")}><TbSortDescendingLetters style={{ fontSize: 20 }} /></button>
                    </div>
                </div>
                <div className="row" style={{ paddingLeft:10, paddingRight: 10, marginBottom: 15 }}>
                    <a href="#" className="btn btn-success" style={{  }} onClick={() => setOpenAddModal(true)}>
                        <TbCirclePlus style={{ fontSize: 20 }} /> <b>เพิ่มข้อมูลสัตว์เลี้ยง</b>
                    </a>
                </div>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
            {
                pets?.map((pet, i) => (
                    <div className="col" key={i}>
                        <div className="card shadow-sm">
                            <img src={pet.data.picture?pet.data.picture:imagePaw} className="card-img-top" alt={pet.data.name} />
                            <div className="card-body">
                                <h3 className="card-text">
                                    {renderPetTypeIcon(pet.data.type)}
                                    <b>{pet.data.name}</b>
                                </h3>
                                <p className="card-text">{pet.data.description}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <Link to={`/pet/view/${pet.id}`} className="btn btn-sm btn-outline-secondary">ดูรายละเอียด</Link>
                                        <button type="button" className="btn btn-sm btn-outline-secondary">แก้ไขข้อมูล</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
            </div>
            {openAddModal &&
                <AddPet onClose={() => setOpenAddModal(false)} open={openAddModal}/>
            }
        </div>
    )
}

export default PetList;