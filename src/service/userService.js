import FirebaseService from "./firebaseService";

class UserService extends FirebaseService {
    constructor() {
        super();
        const firebase = this.constructor.init();
        this.database = firebase.db.ref('users');
        this.functions = firebase.functions;
    }
    async signUp(data) {
        const createUser = this.functions. httpsCallable('createUser');
        const response = await createUser(data);
        return response;
      }
}
export default new UserService();