import { Timestamp } from "firebase/firestore";
export default interface TreatmentInterface {
  id: string;
  treatment: string;
  created: Timestamp;
}
