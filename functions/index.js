const admin = require('firebase-admin');
const functions = require('firebase-functions');
const serviceAccount = require('./service-account.json');
const { config } = functions.config();
const { databaseURL, storageBucket } = config.firebase;
const crypto = require('crypto');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket,
    databaseURL
});
const database = admin.database();

const generateHash = password => {
    return crypto.createHash('RSA-SHA1')
        .update(password)
        .digest('hex');

};
const emailAlreadyPresent = async uid => {
    const existingVal = await database.ref('users')
        .child(uid)
        .once("value")
        .then((snap) => { return (snap.exists() ? snap.val() : null) });
    if (existingVal) return true;
    return false;
};

exports.createUser = functions.https.onCall((data, context) => {
    try {
        return new Promise(async (resolve, reject) => {
            const { firstName, lastName, email, password, uid } = data;
            let existingUser = await emailAlreadyPresent(uid);
            if (existingUser) {
                resolve("User Already Present");
                return null;
            } else {
                admin
                    .auth()
                    .createUser({ email, password, uid })
                    .then(() => {
                        const setObject = {
                            firstName,
                            lastName,
                            email,
                            createdAt: Date.now(),
                            passwordHash: generateHash(password)
                        };
                        database.ref('users').child(uid).set(setObject);
                        return null;
                    })
                    .catch((error) => {
                        console.log(error);
                        resolve('error');

                    });
                resolve("User Created");
                return null;
            }
        });
    } catch (error) {
        console.log(error);
    }
    return null;
});