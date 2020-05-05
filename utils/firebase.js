import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBqHCIdH2X2Jr_eedTZmo96v23siBUw7DY',
  authDomain: 'mee-van-de-winkel.firebaseapp.com',
  databaseURL: 'https://mee-van-de-winkel.firebaseio.com',
  projectId: 'mee-van-de-winkel',
  storageBucket: 'mee-van-de-winkel.appspot.com',
  messagingSenderId: '936895228371',
  appId: '1:936895228371:web:99242da605344aec8be726',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export const auth = firebase.auth();
export const db = firebase.firestore();

export const streamBoodschappen = (observer) => {
  return db
    .collection('root')
    .doc('lijstje')
    .collection('boodschappen')
    .onSnapshot(observer);
};

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const addToArray = firebase.firestore.FieldValue.arrayUnion;
