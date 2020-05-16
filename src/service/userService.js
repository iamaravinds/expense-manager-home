import FirebaseService from "./firebaseService";

class UserService extends FirebaseService {
    constructor() {
        super();
        const firebase = this.constructor.init();
        this.auth = firebase.auth;
        this.database = firebase.db.ref('users');
        this.functions = firebase.functions;
    }
    getLoggedUser() {
        return this.auth.currentUser ? this.auth.currentUser.toJSON() : null;
    }

    async getUserData(uid) {
        const userDataRef = this.database.child(uid);
        const userData = await userDataRef.once('value').then(snap => snap.exists()? snap.val(): {});
        delete userData.passwordHash;
        userData.fullName = `${userData.firstName} ${userData.lastName}`
        console.log(userData);
        return userData;
    }
    async signUp(data) {
        const createUser = this.functions. httpsCallable('createUser');
        const response = await createUser(data);
        return response;
    }
    async signIn(uid, passwordHash, password) {
        let response = false;
        // const signInUser = this.functions. httpsCallable('signIn');
        const userDataRef = this.database.child(uid);
        const userData = await userDataRef.once('value').then(snap => snap.exists()? snap.val(): {});
        console.log(userData);
        console.log(passwordHash);
        
        
        if(userData) {
            if (userData.passwordHash === passwordHash) {
                // response = await signInUser(email);
                await this.auth.signInWithEmailAndPassword(userData.email, password)
                .then((userCredentials) => {
                    console.log(userCredentials);
                    response = true;
                })
                .catch(function(error) {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                      console.log('Wrong password.');
                    } else {
                        console.log(errorMessage);
                    }
                    console.log(error);
                });
            }
        } else console.log('No userData');
        

        return response;
    }
    async userSignOut() {
        return this.auth.signOut();
    }
}
export default new UserService();