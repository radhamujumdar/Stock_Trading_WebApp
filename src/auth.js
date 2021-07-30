import firebase from 'firebase/app';
import "firebase/auth"
// import {auth} from './services/firebase'
  
export const login = async({email, password})=>{
    try {
      const res = await firebase.auth()
      .signInWithEmailAndPassword(email, password);
      console.log(res);
      return res.user;
    }
    catch(error) {
      console.log(error);
    }
    
}