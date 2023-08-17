import firestore from "../assets/js/firebase";
import { collection } from "firebase/firestore";

const db = collection(firestore, "pets");

const getAll = () => {
    return db;
};
  
const create = (data) => {
    return db.add(data);
};

const update = (id, value) => {
    return db.doc(id).update(value);
};
  
const remove = (id) => {
    return db.doc(id).delete();
};
  
const TutorialService = {
    getAll, create, update, remove
};
  
export default TutorialService;