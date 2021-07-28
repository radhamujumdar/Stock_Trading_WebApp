import firebase from 'firebase/app';
import "firebase/auth"
import {auth} from './firebase'
  
export const login = async({email, password})=>{
    const res = await firebase.auth()
      .signInWithEmailAndPassword(email, password);
    return res.user;
}