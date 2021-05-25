import { firestore } from "../firebase";

const db = firestore.collection("/orders");
class OrdersDataService {
    getAll() {
        return db;
    }

    create(item) {
        return db.add(item);
    }

    update(id, value) {
        return db.doc(id).update(value);
    }

    delete(id) {
        return db.doc(id).delete();
    }
}

export default new OrdersDataService();