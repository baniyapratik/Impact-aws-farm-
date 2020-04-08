import firebase  from "firebase/app"
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCgSaTDHYOaAyPcSFWkTba7XMdf1nx6PN8",
    authDomain: "impact-cloud-firebase.firebaseapp.com",
    databaseURL: "https://impact-cloud-firebase.firebaseio.com",
    projectId: "impact-cloud-firebase",
    storageBucket: "impact-cloud-firebase.appspot.com",
    messagingSenderId: "385713367656",
    appId: "1:385713367656:web:4ade0df6a541bfae3fe9dd",
    measurementId: "G-TTZ91PJ9JC"
  };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();




export {auth}; 