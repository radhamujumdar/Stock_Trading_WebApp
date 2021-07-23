// import firebaseConfig from '../config';
import firebase from 'firebase/app';
import "firebase/auth";
  
const firebaseConfig = {
  apiKey: "AIzaSyACHjaFUceqjdygpbg8zJYvHh69Jb-oOR8",
  authDomain: "stock-trading-app-e083f.firebaseapp.com",
  projectId: "stock-trading-app-e083f",
  storageBucket: "stock-trading-app-e083f.appspot.com",
  messagingSenderId: "214687842762",
  appId: "1:214687842762:web:57de79a82b2c84997fcf33"
};
  
firebase.initializeApp(firebaseConfig); 
export const auth = firebase.auth();