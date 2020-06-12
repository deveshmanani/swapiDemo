import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyCMKjueAjqvrH7-Cj8dlU1-jCJqChQpLpo",
    authDomain: "react-auth-demo18.firebaseapp.com",
    databaseURL: "https://react-auth-demo18.firebaseio.com",
    projectId: "react-auth-demo18",
    storageBucket: "react-auth-demo18.appspot.com",
    messagingSenderId: "609625554572",
    appId: "1:609625554572:web:4f8f99d64ba89ec2a5c5a9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;