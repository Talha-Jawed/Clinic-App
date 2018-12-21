import actionTypes from '../Constant/Constant'
import firebase from '../../src/Config/Firebase'
import { StackActions, NavigationActions } from 'react-navigation';

// sign up
export function userAction(FirstName, LastName, Mobile, Email, Password) {
    return dispatch => {
        firebase.auth().createUserWithEmailAndPassword(Email, Password)
            .then((success) => {


                console.log('Success*****', success.user)
                console.log('token*****', success.user.accessToken)

                var currentUserUid = success.user.uid;
                dispatch(
                    { type: actionTypes.USERNAME, payload: FirstName + ' ' + LastName },
                    { type: actionTypes.UID, payload: success.user.uid }
                )
                let obj = {
                    Name: FirstName + ' ' + LastName,
                    UID: success.user.uid,
                    Mobile: Mobile,
                    Token: 'token'
                }
                console.log('signup successfully', obj);
                firebase.database().ref('/UserData/' + currentUserUid).push(obj);
            })
            .catch((error) => {
                alert(error)
                console.log('something went wrong', error);

            })
    }
}

// LogIn
export function Action(Email, Password) {
    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(Email, Password)
            .then((success) => {
                alert('Success')
                console.log(success);

                dispatch(
                    { type: actionTypes.USERNAME, payload: success.user.displayName },
                    { type: actionTypes.UID, payload: success.user.uid }
                )
            })
            .catch((error) => {
                alert('Invalid Email & Password')
                console.log('something went wrong', error)
            })
    }
}

// Fb LogIn
export function fb_Action(type, token) {
    return dispatch => {
        if (type === 'success') {
            const credential = firebase.auth.FacebookAuthProvider.credential(token)

            firebase.auth().signInAndRetrieveDataWithCredential(credential).then((success) => {
                console.log(success.additionalUserInfo.profile.name, 'success******');
                var currentUID = success.user.uid
                var obj = {
                    Name: success.additionalUserInfo.profile.name,
                    UID: success.user.uid,
                    Photo: success.user.photoURL,
                    Token: token
                }
                firebase.database().ref('/UserData/' + currentUID).update(obj);
                dispatch(
                    { type: actionTypes.USERNAME, payload: success.additionalUserInfo.profile.name },
                    { type: actionTypes.UID, payload: success.user.uid }
                )
            })
                .catch((error) => {
                    console.log(error, '********');
                    alert(error)
                })
            console.log("fb login");
            
        } else {
            type === 'cancel'
        }

    }
}
