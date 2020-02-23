import FirebaseService from "./firebaseService";

class TransactionService extends FirebaseService {
    constructor() {
        super();
        const firebase = this.constructor.init();
        this.database = firebase.db.ref('Transactions');
    }
    async addTransaction(data) {
         return this.database.push(data).key;
    }
    getAllTransaction(callback) {
        return this.database.on('value',callback);
    }
}
export default new TransactionService();