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
const setOrder = async (orderData, restaurantNo, tableNo, waiter) => {
  try {
    const orderRef = doc(db, `database/dev/restaurants/${restaurantNo}/waiters/${waiter.mail}/orders/${orderData.id}`);
    await setDoc(orderRef, {
      id: orderData.id,
      orders: orderData,
      tableNo: tableNo,
      timestamp: new Date(),
      status: "preparing",
      waiter: {
        id: waiter.id,
        name: waiter.name,
        mail: waiter.mail
      }
    });
    return true;
  } catch (error) {
    console.error("Error adding order: ", error);
    return false;
  }
};
const getOrder = async (restaurantNo, tableNo) => {
    try {
        // Önce garsonları kontrol et
        const waiters = await firebaseGetDocs(collection(db, `database/dev/restaurants/${restaurantNo}/waiters`));
        
        // Her garsonun orders koleksiyonunu kontrol et
        for (const waiterDoc of waiters.docs) {
            const orderRef = collection(db, `database/dev/restaurants/${restaurantNo}/waiters/${waiterDoc.id}/orders`);
            const orders = await firebaseGetDocs(orderRef);
            
            // Bu masaya ait siparişi bul
            const tableOrder = orders.docs.find(order => {
                const data = order.data();
                return data.tableNo === tableNo;
            });

            if (tableOrder) {
                return tableOrder.data();
            }
        }
        
        return null;
    } catch (error) {
        console.error("Error getting order:", error);
        return null;
    }
};
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
const assignWaiter = async (restaurantNo, tableNo) => {
    try {
        // Önce mevcut siparişi kontrol et
        const existingOrder = await getOrder(restaurantNo, tableNo);
        if (existingOrder?.waiter) {
            // Mevcut garsonun bilgilerini al
            const existingWaiterDoc = await firebaseGetDoc(
                doc(db, `database/dev/restaurants/${restaurantNo}/waiters/${existingOrder.waiter.mail}`)
            );
            
            if (existingWaiterDoc.exists()) {
                const existingWaiter = existingWaiterDoc.data();
                console.log('Mevcut garsonlar:', existingWaiter);
                console.log('Seçilen garson:', existingWaiter);
                return {
                    id: existingOrder.waiter.id,
                    name: existingOrder.waiter.name,
                    mail: existingOrder.waiter.mail,
                    fcmToken: existingWaiter.fcmToken,
                    isAvailable: existingWaiter.isAvailable
                };
            }
        }

        // Mevcut sipariş yoksa yeni garson ata
        const waiters = await getWaiterList(restaurantNo);
        if (!waiters.length) {
            return null;
        }

        // Garson atama mantığı...
        const restaurantRef = doc(db, `database/dev/restaurants/${restaurantNo}`);
        const restaurantDoc = await firebaseGetDoc(restaurantRef);
        let lastAssignedIndex = restaurantDoc.data()?.lastAssignedWaiterIndex ?? -1;

        let nextIndex = lastAssignedIndex;
        let assignedWaiter = null;

        for (let i = 0; i < waiters.length; i++) {
            nextIndex = (nextIndex + 1) % waiters.length;
            const waiter = waiters[nextIndex];

            if (waiter.isAvailable && waiter.fcmToken) {
                assignedWaiter = waiter;
                break;
            }
        }

        if (assignedWaiter) {
            await setDoc(restaurantRef, {
                lastAssignedWaiterIndex: nextIndex
            }, { merge: true });

            console.log('Mevcut garsonlar:', waiters);
            console.log('Seçilen garson:', assignedWaiter);
            return assignedWaiter;
        }

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