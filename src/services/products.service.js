import { firestore } from "../firebase";

const db = firestore.collection("/products");
class ProductsDataService {
    getAll() {
        return db;
    }

    create(products) {
        return db.add(products);
    }

    update(id, value) {
        return db.doc(id).update(value);
    }

    delete(id) {
        return db.doc(id).delete();
    }
}

export default new ProductsDataService();