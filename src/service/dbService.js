import Transaction from "./transactionService";
import UserService from "./userService";

class DbService{ 
    constructor(){
        this.Transaction = Transaction;
        this.User = UserService;
    }
}

export default new DbService();