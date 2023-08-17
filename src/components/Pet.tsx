import React, { useState, useEffect } from 'react';
import { doc, getDoc, collection, query, orderBy, onSnapshot, deleteDoc } from "firebase/firestore"
import { db } from "../assets/js/firebase";
import imagePaw from "../assets/images/animal_paw.png";
import { TbCirclePlus, TbDogBowl, TbEdit, TbCircleX } from "react-icons/tb";
import { FaDog, FaCat } from "react-icons/fa";
import { GiRabbitHead } from "react-icons/gi";
import { useParams, useNavigate, Link } from "react-router-dom";
import AddTreatment from './AddTreatment'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import EditPet from './EditPet'

const Pet = () => {
    const [pet, setPet] = useState([]);
    const [owner, setOwner] = useState("");
    const [treatments, setTreatments] = useState([]);
    const params = useParams();
    const petId = params.id;
    const [openAddModal, setOpenAddModal] = useState(false)
    const navigate = useNavigate();

    const [openEditModal, setOpenEditModal] = useState(false)

    const getPetDoc = async(id) => {
        const petSnapshot = await getDoc(doc(db, 'pets', id));
        if (petSnapshot.exists()) {
            const ownerId = petSnapshot.data().owner
            setPet(petSnapshot.data());
            getOwnerDoc(ownerId)
            getTreatmentDoc(id)
        } else {
            console.log("Pet doesn't exist");
        }
    }

    const getOwnerDoc = async(id) => {
        const ownerSnapshot = await getDoc(doc(db, 'owners', id));
        if (ownerSnapshot.exists()) {
            setOwner(ownerSnapshot.data().name);
        } else {
            console.log("Owner doesn't exist");
        }
    }

    const getTreatmentDoc = async(id) => {
        const q = query(collection(db, 'pets', id, "treatment"), orderBy('created', 'desc'))
        onSnapshot(q, (querySnapshot) => {
            setTreatments(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
            console.log(treatments);
        })
    }

    const deletePet = () => {
        confirmAlert({
            title: 'ต้องการลบข้อมูลนี้?',
            message: 'Are you sure delete this pet?',
            buttons: [
                {
                    label: 'ตกลง',
                    onClick: async() => {
                        await deleteDoc(doc(db, 'pets', petId));
                        navigate("/pets");
                    }
                },
                {
                    label: 'ยกเลิก',
                    onClick: () => { }
                }
            ]
        });
    };

    useEffect(() => {
        getPetDoc(petId);
    }, [])

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
        <div style={{ display: 'flex', flexDirection: 'row' }} >
            <div style={{ display: 'flex', flexDirection: 'column', padding: 10 }} >
                <img src={pet.picture?pet.picture:imagePaw} className="shadow rounded-circle" style={{ width: 200 }} alt={pet.name} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 10, paddingLeft: 20 }} >
                <h3>
                    {renderPetTypeIcon(pet.type)}
                    <b>{pet.name}</b>
                </h3>
                <p className="lead"><b>เจ้าของ: </b>{owner}</p>
                <p className="lead">{pet.description}</p>
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-outline-success" onClick={() => setOpenAddModal(true)}><TbCirclePlus style={{ fontSize: 25, paddingBottom: 3 }} /> เพิ่มประวัติการรักษา</button>
                    <button type="button" className="btn btn-outline-secondary" onClick={() => setOpenEditModal(true)}><TbEdit style={{ fontSize: 25, paddingBottom: 3 }} /> แก้ไขข้อมูล</button>
                    <button type="button" className="btn btn-outline-danger" onClick={() => deletePet(petId)}><TbCircleX style={{ fontSize: 25, paddingBottom: 3 }} /> ลบข้อมูล</button>
                </div>
                <div className="list-group" style={{ marginTop: 10 }}>
                {
                    treatments?.map((treatment, i) => (
                    <a href="#" className="list-group-item list-group-item-action" key={i}>
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{treatment.data.created.toDate().toString()}</h5>
                        </div>
                        <p className="mb-1">{treatment.data.treatment}</p>
                    </a>
                    ))
                }
                </div>
            </div>
            { openAddModal &&
                <AddTreatment onClose={() => setOpenAddModal(false)} open={openAddModal} id={petId} />
            }
            { openEditModal &&
                <EditPet 
                    onClose={() => setOpenEditModal(false)} 
                    open={openEditModal} 
                    id={petId} 
                    petName={pet.name}
                    petType={pet.type}
                    petOwner={pet.owner}
                    petPicture={pet.picture}
                    petDescription={pet.description} />
            }
        </div>
    )
}

export default Pet