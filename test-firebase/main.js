// Initialize Firebase
var config = {
  apiKey: "AIzaSyDEE3NbHZL-dMYCljjNbM7GKTuP17f2dAE",
  authDomain: "test-firebase-d8b37.firebaseapp.com",
  databaseURL: "https://test-firebase-d8b37.firebaseio.com",
  projectId: "test-firebase-d8b37",
  storageBucket: "test-firebase-d8b37.appspot.com",
  messagingSenderId: "802341786058"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    // var displayName = user.displayName;
    // var email = user.email;
    // var emailVerified = user.emailVerified;
    // var photoURL = user.photoURL;
    // var isAnonymous = user.isAnonymous;
    // var uid = user.uid;
    // var providerData = user.providerData;
    console.log(user);
    // reactRender({userName: user.email})
    store && store.dispatch({ type: 'LOGGED_IN', data: { userName: user.email, user } })
  } else {
    // User is signed out.
    console.log('not logged in!!');
    store && store.dispatch({ type: 'LOG_OUT', data: { } })
  }
});

// var provider = new firebase.auth.GoogleAuthProvider();
// firebase.auth().signInWithRedirect(provider);
// firebase.auth().getRedirectResult().then(function(result) {
//   if (result.credential) {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     var token = result.credential.accessToken;
//     // ...
//   }
//   // The signed-in user info.
//   var user = result.user;
//   // reactRender({userName: email})
//   store && store.dispatch({ type: 'LOGGED_IN', data: { userName: user.email, user } })
// }).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;
//   // ...
// });

// firebase.auth().signInWithPopup(provider).then(function(result) {
//   // This gives you a Google Access Token. You can use it to access the Google API.
//   var token = result.credential.accessToken;
//   // The signed-in user info.
//   var user = result.user;
//   reactRender({userName: user.email})
//   // ...
// }).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;
//   // ...
// });

function singInUser(event) {
  event.preventDefault();
  console.log(event);
  const form = document.querySelector('form[name="singInForm"]');
  const email = form.querySelector('input[name=email]').value;
  const password = form.querySelector('input[name=password]').value;
  console.log(email, password);
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}
function singUpUser(event) {
  event.preventDefault();
  console.log(event);
  const form = document.querySelector('form[name="singUpForm"]');
  const email = form.querySelector('input[name=email]').value;
  const password = form.querySelector('input[name=password]').value;
  console.log(email, password);
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

document.addEventListener('click', (e) => {
  if (e.target.id === 'btn-signout') {
    firebase.auth().signOut()
      .then(function(res) {
        console.log('logged out!!', res);
        store && store.dispatch({ type: 'LOG_OUT', data: { } })
      })
      .catch(function(error) {
        console.log(error);
      });
  }
});

// function signOutUser(event) {
//   firebase.auth().signOut()
//     .then(function(res) {
//       console.log('logged out!!', res);
//     })
//     .catch(function(error) {
//       console.log(error);
//     });
// }

console.log('Redux----', Redux);
const initialState = {
  userName: null,
  user: {}
};
const reducer = (state=initialState, action) => {
  switch (action.type) {
    case 'LOGGED_IN': {
      return {...state, userName: action.data.userName, user: action.data.user };
    }
    case 'LOG_OUT': {
      return {...state, userName: null, user: {}};
    }
    default: {
      return state;
    }
  }
}
const store = Redux.createStore(reducer);
store.subscribe(() => {
  const state = store.getState();
  console.log('state changed', state);
  // re-render react
  reactRender && reactRender({userName: state.userName})
  // const domContainer = document.querySelector('#react-container');
  // ReactDOM.render(<TestPureComponent userName={state.userName} />, domContainer);
});
