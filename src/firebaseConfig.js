import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDRZJihD2Q1C2pIYBytuAaunw3ir-bjrnM',
  authDomain: 'web-quickstart-134f5.firebaseapp.com',
  databaseURL: 'https://web-quickstart-134f5.firebaseio.com',
  projectId: 'web-quickstart-134f5',
  storageBucket: 'web-quickstart-134f5.appspot.com',
  messagingSenderId: '662153069919',
  appId: '1:662153069919:web:c1688b2a56d238d00ae2ea',
  measurementId: 'G-RWN89SRQSB',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
// google login provider
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
