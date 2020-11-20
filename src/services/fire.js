import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCXvAjxww4diSLg9D-ZecEbOnC9NXHtNRg",
    authDomain: "silent-vim-277711.firebaseapp.com",
    databaseURL: "https://silent-vim-277711.firebaseio.com",
    projectId: "silent-vim-277711",
    storageBucket: "silent-vim-277711.appspot.com",
    messagingSenderId: "631204947575",
    appId: "1:631204947575:web:07f104c0f2600644280872"
  };
  var fire = firebase.initializeApp(firebaseConfig);
  export default fire;