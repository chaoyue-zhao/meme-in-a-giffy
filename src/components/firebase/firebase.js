import firebase from 'firebase'

const config = {
      apiKey: "AIzaSyDlGGvO14FSw7i9qILxiwObA1kZyIXlxBA",
      authDomain: "meme-in-a-giffy.firebaseapp.com",
      databaseURL: "https://meme-in-a-giffy.firebaseio.com",
      projectId: "meme-in-a-giffy",
      storageBucket: "meme-in-a-giffy.appspot.com",
      messagingSenderId: "260056318306"
  };
  firebase.initializeApp(config);

//defining the variable database her so we are not constantly writing firebase.database()
const database = firebase.database();

export default database;