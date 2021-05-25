import { firestore } from "../firebase";

const db = firestore.collection("/wallets");
class WalletsDataService {
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

    getFromUser(uid) {
        return this.getAll().where("uid", "==", uid).get();
    }
}

export default new WalletsDataService();