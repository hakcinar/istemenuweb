import {
  getFirestore,
  getDocs as firebaseGetDocs,
  collection,
  getDoc as firebaseGetDoc,
  doc,
  setDoc,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import app from "@/firebaseConfig";

const db = getFirestore(app);
const getDocs = async (docName, restaurantNo) => {
  const items = await firebaseGetDocs(
    collection(db, `database/dev/restaurants/${restaurantNo}/menu/${docName}`)
  );
  const docData = items.docs.map((item) => {
    return item.data();
  });
  return docData;
};
const getRestaurantLocation = async (restaurantNo) => {
  const docRef = doc(db, `database/dev/restaurants/${restaurantNo}`);
  const item = await firebaseGetDoc(docRef);
  if (item.exists) {
    return [item.data().latitude, item.data().longitude];
  } else {
    console.log("döküman yok");
  }
};
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};
const getTableList = async (restaurantNo) => {
  const items = await firebaseGetDocs(
    collection(db, `database/dev/restaurants/${restaurantNo}/tableList`)
  );
  const docData = items.docs.map((item) => {
    return item.data();
  });
  return docData;
};
const getDoc = async (documentId, restaurantNo) => {
  const docRef = doc(
    db,
    `database/dev/restaurants/${restaurantNo}/menu`,
    `${documentId}`
  );
  const item = await firebaseGetDoc(docRef);
  if (item.exists) {
    return item.data();
  } else {
    console.log("döküman yok");
  }
};
const getFood = async (documentId, foodId, restaurantNo) => {
  const docRef2 = doc(
    db,
    `database/dev/restaurants/${restaurantNo}/menu/${documentId}/foodList`,
    `${foodId}`
  );
  const item2 = await firebaseGetDoc(docRef2);
  if (item2.exists) {
    return item2.data();
  } else {
    console.log("döküman yok");
  }
};
const getRestaurantList = async () => {
  const items = await firebaseGetDocs(
    collection(db, `database/dev/restaurants`)
  );
  const docData = items.docs.map((item) => {
    return item.data();
  });
  return docData;
};
const setFood = async (food, restaurantNo) => {
  setDoc(doc(db, `database/dev/restaurants/${restaurantNo}/orders`, `${food}`));
};
const getRestaurantName = async (restaurantName) => {
  const item = await firebaseGetDoc(
    doc(db, `database/dev/restaurants/${restaurantName}`)
  );
  return item.data();
};
const setOrder = async (orderData, restaurantNo, tableNo, waiter) => {
  try {
    const orderRef = doc(
      db,
      `database/dev/restaurants/${restaurantNo}/waiters/${waiter.mail}/orders/${orderData.id}`
    );
    await setDoc(orderRef, {
      id: orderData.id,
      orders: orderData,
      tableNo: tableNo,
      timestamp: new Date(),
      status: "preparing",
      waiter: {
        id: waiter.id,
        name: waiter.name,
        mail: waiter.mail,
      },
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
    const waiters = await firebaseGetDocs(
      collection(db, `database/dev/restaurants/${restaurantNo}/waiters`)
    );

    // Her garsonun orders koleksiyonunu kontrol et
    for (const waiterDoc of waiters.docs) {
      const orderRef = collection(
        db,
        `database/dev/restaurants/${restaurantNo}/waiters/${waiterDoc.id}/orders`
      );
      const orders = await firebaseGetDocs(orderRef);
      // Bu masaya ait siparişi bul
      const tableOrder = orders.docs.find((order) => {
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
    const waiters = await firebaseGetDocs(
      collection(db, `database/dev/restaurants/${restaurantNo}/waiters`)
    );
    const waiterList = waiters.docs.map((doc) => {
      const data = doc.data();
      console.log("Waiter data:", data);
      return {
        id: doc.id,
        ...data,
        fcmToken: data.fcmToken || null,
      };
    });
    console.log("Full waiter list:", waiterList);
    return waiterList;
  } catch (error) {
    console.error("Error getting waiter list:", error);
    return [];
  }
};
const addNotification = async (restaurantNo, tableNo, type) => {
  try {
    // notifications koleksiyonuna yeni bir belge ekle
    await addDoc(
      collection(db, `database/dev/restaurants/${restaurantNo}/notifications`),
      {
        tableNo,
        restaurantNo,
        type,
        timestamp: serverTimestamp(),
      }
    );
    return true;
  } catch (error) {
    console.error("Error setting notification: ", error);
    return false;
  }
};
const assignWaiter = async (restaurantNo, tableNo) => {
  try {
    // Önce mevcut siparişi kontrol et
    const existingOrder = await getOrder(restaurantNo, tableNo);
    if (existingOrder?.waiter) {
      // Mevcut garsonun bilgilerini al
      const existingWaiterDoc = await firebaseGetDoc(
        doc(
          db,
          `database/dev/restaurants/${restaurantNo}/waiters/${existingOrder.waiter.mail}`
        )
      );
      console.log(
        "Existing waiter document:",
        existingWaiterDoc.data().selectedTables
      );
      if (existingWaiterDoc.exists() && existingWaiterDoc.data().isAvailable) {
        const existingWaiter = existingWaiterDoc.data();
        if (existingWaiter.isAvailable && existingWaiter.fcmToken) {
          // Mevcut garsonu döndür
          return {
            id: existingOrder.waiter.id,
            name: existingOrder.waiter.name,
            mail: existingOrder.waiter.mail,
            fcmToken: existingWaiter.fcmToken,
            isAvailable: existingWaiter.isAvailable,
          };
        }
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
      try {
        await setDoc(
          restaurantRef,
          {
            lastAssignedWaiterIndex: nextIndex,
          },
          { merge: true }
        );
        console.log(`Updated lastAssignedWaiterIndex to: ${nextIndex}`);
      } catch (error) {
        console.error("Error updating lastAssignedWaiterIndex:", error);
      }

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
  getRestaurantLocation,
  getFood,
  setFood,
  getTableList,
  getRestaurantList,
  getRestaurantName,
  setOrder,
  getOrder,
  assignWaiter,
  calculateDistance,
  addNotification,
};
