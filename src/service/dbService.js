import Transaction from "./transactionService";

class DbService{ 
    constructor(){
        this.Transaction = Transaction;
    }
}

export default new DbService();