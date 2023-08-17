import Modal from "./Modal"
import { useState, useEffect } from 'react'
import { db, storage } from '../assets/js/firebase'
import { collection, addDoc, query, orderBy, onSnapshot, updateDoc, doc } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "../assets/css/addForm.css"

function EditPet({onClose, open, id, petName, petType, petOwner, petPicture, petDescription}) {
  const [name, setName] = useState(petName);
  const [type, setType] = useState(petType);
  const [owner, setOwner] = useState(petOwner);
  const [picture, setPicture] = useState('');
  const [description, setDescription] = useState(petDescription);
  const [owners, setOwners] = useState([])

  /* function to edit pet to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if(picture) {
        const storageRef = ref(storage, `/files/${picture.name}`)
        const uploadTask = uploadBytesResumable(storageRef, picture);
        uploadTask.on(
          "state_changed",
          (snapshot) => { }, // ขณะกำลัง upload
          (err) => console.log(err), // ถ้า error ให้ทำอะไร
          () => { // ถ้า upload สำเร็จ ให้ทำอะไร
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                updateDoc(doc(db, 'pets', id), {
                    name: name,
                    type: type,
                    owner: owner,
                    picture: url,
                    description: description
                });
              onClose()
            });
          }
        );
      } else {
        updateDoc(doc(db, 'pets', id), {
            name: name,
            type: type,
            owner: owner,
            description: description
        });
        onClose()
      }
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
      const q = query(collection(db, 'owners'), orderBy('name', 'asc'))
      onSnapshot(q, (querySnapshot) => {
          setOwners(querySnapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data()
          })))
      })
  }, [])

  return (
    <Modal modalLable='แก้ไขข้อมูลสัตว์เลี้ยง' onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className='addForm' name='editPet'>
        <input 
          type='text' 
          name='name' 
          onChange={(e) => setName(e.target.value)} 
          value={name}
          placeholder='กรอกชื่อ'/>
        <select value={type} class="form-select" onChange={(e) => setType(e.target.value)}>
          <option value="0" selected>เลือกประเภทสัตว์เลี้ยง</option>
          <option value="สุนัข">สุนัข</option>
          <option value="แมว">แมว</option>
          <option value="กระต่าย">กระต่าย</option>
          <option value="อื่นๆ">อื่นๆ</option>
        </select>
        <select value={owner} class="form-select" onChange={(e) => setOwner(e.target.value)}>
          <option value="0" selected>เลือกเจ้าของ</option>
          {
            owners?.map((owner, i) => (
              <option value={owner.id}>{owner.data.name}</option>
            ))
          }
        </select>
        <input class="form-control file" type="file" accept="image/*" onChange={(e) => setPicture(e.target.files[0])} />
        <textarea 
          onChange={(e) => setDescription(e.target.value)}
          placeholder='รายละเอียด'
          value={description}></textarea>
        <button className="btn btn-success" type='submit'>บันทึก</button>
      </form> 
    </Modal>
  )
}

export default EditPet