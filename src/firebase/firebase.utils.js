import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var config = {
  apiKey: "AIzaSyCErWE-ZKe44ln5ag0Ibm8cxzcUmFW9pT4",
  authDomain: "crwn-db-02.firebaseapp.com",
  databaseURL: "https://crwn-db-02.firebaseio.com",
  projectId: "crwn-db-02",
  storageBucket: "crwn-db-02.appspot.com",
  messagingSenderId: "206580718199",
  appId: "1:206580718199:web:a32325f75f407b43c44472",
  measurementId: "G-H0QK4F7R3D",
};

// const config = {
//   apiKey: "AIzaSyCdHT-AYHXjF7wOrfAchX4PIm3cSj5tn14",
//   authDomain: "crwn-db.firebaseapp.com",
//   databaseURL: "https://crwn-db.firebaseio.com",
//   projectId: "crwn-db",
//   storageBucket: "crwn-db.appspot.com",
//   messagingSenderId: "850995411664",
//   appId: "1:850995411664:web:7ddc01d597846f65",
// };

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
