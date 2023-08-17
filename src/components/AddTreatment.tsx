import Modal from "./Modal"
import { useState, useEffect } from 'react'
import { db } from '../assets/js/firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import "../assets/css/addPet.css"

function AddTreatment({onClose, open, id}) {
  const [treatment, setTreatment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        addDoc(collection(db, "pets", id, "treatment"), {
            treatment: treatment,
            created: Timestamp.now()
        })
        onClose()
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
  }, [])

  return (
    <Modal modalLable='เพิ่มประวัติการรักษา' onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className='addPet' name='addPet'>
        <textarea 
          onChange={(e) => setTreatment(e.target.value)}
          placeholder='รายละเอียด'
          value={treatment}></textarea>
        <button className="btn btn-success" type='submit'>บันทึก</button>
      </form> 
    </Modal>
  )
}

export default AddTreatment