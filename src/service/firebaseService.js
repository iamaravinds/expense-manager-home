import firebase from 'firebase';
import '@firebase/functions';
import config from '../config';

class FirebaseService {
    static instance = null;

    static init() {
        if (!this.constructor.instance) {
            this.firebase = firebase.initializeApp(config.firebase);
            this.db = firebase.database();
            this.auth = firebase.auth();
            this.functions = firebase.functions();
            this.storage = firebase.storage().ref();
            this.constructor.instance = this;
        }
        return this.constructor.instance;
    }
}
export default FirebaseService