import { getFirestore, getDocs as firebaseGetDocs, collection, getDoc as firebaseGetDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import app from "@/firebaseConfig"

const db = getFirestore(app)
const getDocs = async (docName,restaurantNo) => {
    const items = await firebaseGetDocs(collection(db, `database/dev/restaurants/${restaurantNo}/menu/${docName}`));
    const docData = items.docs.map((item) => { return item.data() })
    return docData
}
const getTableList = async (restaurantNo) => {
    const items = await firebaseGetDocs(collection(db, `database/dev/restaurants/${restaurantNo}/tableList`));
    const docData = items.docs.map((item) => { return item.data() })
    return docData
}
const getDoc = async (documentId,restaurantNo) => {
    const docRef = doc(db, `database/dev/restaurants/${restaurantNo}/menu`, `${documentId}`)
    const item = await firebaseGetDoc(docRef);
    if (item.exists) {
        return item.data()
    }
    else {
        console.log("döküman yok")
    }
}
const getFood = async (documentId, foodId,restaurantNo) => {
    const docRef2 = doc(db, `database/dev/restaurants/${restaurantNo}/menu/${documentId}/foodList`, `${foodId}`)
    const item2 = await firebaseGetDoc(docRef2);
    console.log(item2)
    if (item2.exists) {
        return item2.data()
    }
    else {
        console.log("döküman yok")
    }

}
const getRestaurantList = async () => {
    const items = await firebaseGetDocs(collection(db, `database/dev/restaurants`));
    const docData = items.docs.map((item) => { return item.data() })
    return docData
}
const setFood = async (food,restaurantNo) => {
    setDoc(doc(db, `database/dev/restaurants/${restaurantNo}/orders`, `${food}`))
}
const getRestaurantName = async (restaurantName) => {
    const item = await firebaseGetDoc(doc(db, `database/dev/restaurants/${restaurantName}`))
    console.log(item.data())
    return item.data()
}
const setOrder = async (orderData, restaurantNo, tableNo) => {
  try {
    const orderRef = doc(db, `database/dev/restaurants/${restaurantNo}/orders/${tableNo}`)
    await setDoc(orderRef, {
      orders: orderData,
      tableNo: tableNo,
      timestamp: new Date(),
      status: "pending"
    })
    return true
  } catch (error) {
    console.error("Error adding order: ", error)
    return false
  }
}
export const setWaiterCall = async (restaurantNo, tableNo, isBillRequest = false) => {
    try {
        const callRef = doc(db, 'restaurants', restaurantNo, 'tables', tableNo, 'calls', new Date().getTime().toString());
        await setDoc(callRef, {
            timestamp: serverTimestamp(),
            type: isBillRequest ? 'bill' : 'waiter',
            status: 'pending'
        });
    } catch (error) {
        console.error("Error setting waiter call: ", error);
        throw error;
    }
};
export default db;
export { getDocs, getDoc, getFood, setFood, getTableList, getRestaurantList,getRestaurantName, setOrder }