import { getFirestore, getDocs as firebaseGetDocs, collection } from "firebase/firestore";
import app from "@/firebaseConfig"

const db = getFirestore(app)
const getDocs = async (docName) => {
    const items = await firebaseGetDocs(collection(db, `database/dev/restaurants/sakli@gmail.com/menu/${docName}`));
    const docData = items.docs.map((item) => { return item.data() })
    return docData
}
const getDoc = async (documnetId) => {
    console.log(documnetId)
    const item = await firebaseGetDocs(collection(db, `database/dev/restaurants/sakli@gmail.com/menu`, `${documnetId}`));
    console.log(item);
}
export default db;
export { getDocs, getDoc }