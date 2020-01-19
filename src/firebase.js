import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

let firebaseConfig = {
    apiKey: "AIzaSyBCuw18Tt2U4Us3fSszRtqmfjNkDqgYcXg",
    authDomain: "react-blog-e8b05.firebaseapp.com",
    databaseURL: "https://react-blog-e8b05.firebaseio.com",
    projectId: "react-blog-e8b05",
    storageBucket: "react-blog-e8b05.appspot.com",
    messagingSenderId: "984283019221",
    appId: "1:984283019221:web:dfe4798b47a93172076f5c"
  };

class Firebase{
  constructor(){
    app.initializeApp(firebaseConfig);

    this.app      = app.database();

    this.storage  = app.storage();
  }

  login(email, password){
    return app.auth().signInWithEmailAndPassword(email,password)
  }
  logout(){
    return app.auth().signOut();
  }

  async register(name, email, password){
    await app.auth().createUserWithEmailAndPassword(email, password)

    const uid = app.auth().currentUser.uid;

    return app.database().ref('users').child(uid).set({
      name: name
    })

  }

  isInitialized(){
      return new Promise(resolve =>{
          app.auth().onAuthStateChanged(resolve);
      })
  }

  getCurrent(){
    return app.auth().currentUser && app.auth().currentUser.email
  }

  getCurrentUid(){
    return app.auth().currentUser && app.auth().currentUser.uid
  }

  async getUserName(callback){
    if(!app.auth().currentUser){
      return null;
    }
    const uid = app.auth().currentUser.uid;
    await app.database().ref('users').child(uid).once('value').then(callback);
  }


} export default new Firebase();
