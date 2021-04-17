import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';


const Login = () => {

    const [loggedIn, setLoggedIn] = useContext(UserContext);

    const history = useHistory();
    const location= useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
   
const handleGoogleSign = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    var credential = result.credential;
    var token = credential.accessToken;
    var user = result.user;
    const {displayName, email} = result.user;
    const signInUser = {name: displayName, email};
    setLoggedIn(signInUser);
    history.replace(from);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(errorCode, errorMessage, email, credential);

  });
    }

    return (
        <div>
            <button style={{
              margin:'50px 600px',
              backgroundColor:'blue',
              color:'white',
              padding:'5px',
              width:'200px',
              height:'40px',
              fontSize:'18px',
              borderRadius:'5px',
              border:'1px solid gray',
            }} onClick={handleGoogleSign} >Google Sign In</button>
        </div>
    );
};

export default Login;