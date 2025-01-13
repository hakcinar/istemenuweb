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
      status: "preparing"
    })
    return true
  } catch (error) {
    console.error("Error adding order: ", error)
    return false
  }
}
const getOrder = async (restaurantNo, tableNo) => {
    const order = await firebaseGetDoc(doc(db, `database/dev/restaurants/${restaurantNo}/orders/${tableNo}`))
    return order.data()
}
export const getWaiterList = async (restaurantNo) => {
    try {
        const waiters = await firebaseGetDocs(collection(db, `database/dev/restaurants/${restaurantNo}/waiters`));
        const waiterList = waiters.docs.map(doc => {
            const data = doc.data();
            console.log('Waiter data:', data);
            return { 
                id: doc.id, 
                ...data,
                fcmToken: data.fcmToken || null
            };
        });
        console.log('Full waiter list:', waiterList);
        return waiterList;
    } catch (error) {
        console.error("Error getting waiter list:", error);
        return [];
    }
};
 const assignWaiter = async (restaurantNo) => {
    try {
        // Son atanan garson indexini al
        const restaurantRef = doc(db, `database/dev/restaurants/${restaurantNo}`);
        const restaurantDoc = await firebaseGetDoc(restaurantRef);
        let lastAssignedIndex = restaurantDoc.data()?.lastAssignedWaiterIndex ?? -1;
        console.log('Last assigned index:', lastAssignedIndex);

        // Garson listesini al
        const waiters = await getWaiterList(restaurantNo);
        console.log('Retrieved waiters:', waiters);

        if (!waiters.length) {
            console.log('No waiters found');
            return null;
        }

        const totalWaiters = waiters.length;
        let nextIndex = lastAssignedIndex;
        let assignedWaiter = null;

        // Round-robin dağıtım
        for (let i = 0; i < totalWaiters; i++) {
            nextIndex = (nextIndex + 1) % totalWaiters;
            const waiter = waiters[nextIndex];
            console.log('Checking waiter:', waiter);

            if (waiter.isAvailable && waiter.fcmToken) {
                assignedWaiter = waiter;
                break;
            }
        }

        if (assignedWaiter) {
            // Son atanan garson indexini güncelle
            await setDoc(restaurantRef, {
                lastAssignedWaiterIndex: nextIndex
            }, { merge: true });

            console.log('Assigned waiter:', assignedWaiter);
            return assignedWaiter;
        }

        console.log('No available waiter found');
        return null;
    } catch (error) {
        console.error("Error assigning waiter:", error);
        return null;
    }
};
export { 
  getDocs, 
  getDoc, 
  getFood, 
  setFood, 
  getTableList, 
  getRestaurantList, 
  getRestaurantName, 
  setOrder, 
  getOrder, 
  assignWaiter 
};