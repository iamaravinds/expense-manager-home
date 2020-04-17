import FirebaseService from "./firebaseService";

class TransactionService extends FirebaseService {
    constructor() {
        super();
        const firebase = this.constructor.init();
        this.database = firebase.db.ref('transactions');
    }
    async addTransaction(data) {
         return this.database.push(data).key;
    }
    
    async updateTransaction(data) {
        return this.database.child(data.id).update(data);
    }
    getAllTransaction(callback) {
        return this.database.on('value',callback);
    }
}
export default new TransactionService();