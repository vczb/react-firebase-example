import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
  apiKey: "AIzaSyAagJrsus4-HljWI3Q3fb5N2vxQpk9aUUQ",
  authDomain: "teste-83dbe.firebaseapp.com",
  databaseURL: "https://teste-83dbe.firebaseio.com",
  projectId: "teste-83dbe",
  storageBucket: "teste-83dbe.appspot.com",
  messagingSenderId: "65272547762",
  appId: "1:65272547762:web:5a84cc74062dd4fd337cab"
};

class Firebase{
  constructor(){
    app.initializeApp(firebaseConfig);

    this.app = app.database();
  }

  login(email, password){
    return app.auth().signInWithEmailAndPassword(email,password)
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

  async getUserName(callback){
    if(!app.auth().currentUser){
      return null;
    }
    const uid = app.auth().currentUser.uid;
    await app.database().ref('users').child(uid).once('value').then(callback);
  }


} export default new Firebase();
