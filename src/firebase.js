
  import firebase from "firebase"

  const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyD2RssEJyhH-bToZ81NNyPfWJLR2IEC3i0",
    authDomain: "instagram-clone-7a982.firebaseapp.com",
    databaseURL: "https://instagram-clone-7a982.firebaseio.com",
    projectId: "instagram-clone-7a982",
    storageBucket: "instagram-clone-7a982.appspot.com",
    messagingSenderId: "344195647338",
    appId: "1:344195647338:web:e4a9e5a0812497d21e8713",
    measurementId: "G-6D9WMVN0PF"

  })

  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const storage=firebase.storage()

  export {db, auth, storage}
  //export default db