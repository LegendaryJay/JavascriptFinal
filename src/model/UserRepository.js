import { usersDb } from "src/model/firebase";
import { UserData } from "src/model/UserData";
import firebase from "firebase";

export const UserRepository = (function () {
  let getCurrentUserId = () => {
    return firebase.auth().currentUser.uid;
  };
  const getCurrentUserData = () => {
    usersDb
      .doc(getCurrentUserId())
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.warn("userdata does not exists.");
          console.log("creating new file");
          UserRepository.addUserData(new UserData(getCurrentUserId));
        } else {
          console.log("userdata retrieved");
          return doc.data();
        }
      });
    return null;
  };
  const updateCurrentUserData = (path, data) => {
    return usersDb
      .doc(firebase.auth().currentUser.uid)
      .update({ [path]: data })
      .then(() => {
        //stuff
      })
      .catch((error) => {
        console.warn("Error updating", error);
      });
  };
  const deleteFieldInUserData = (path) => {
    console.log(path);
    UserRepository.updateCurrentUserData(
      path,
      firebase.firestore.FieldValue.delete()
    ).then((x) => console.log("Successful Delete!", x));
  };

  const addUserData = (userData) => {
    usersDb
      .doc(getCurrentUserId())
      .set(userData)
      .then(() => {
        console.log("Doc added.", userData);
        return userData;
      })
      .catch((error) => {
        //this is on purpose
        console.error("Error adding tacos.", error);
      });
  };

  const onUserDataSnapshot = (onSnapshot) => {
    return usersDb
      .doc(firebase.auth()?.currentUser?.uid)
      .onSnapshot(onSnapshot);
  };
  return {
    getCurrentUserData,
    addUserData,
    onUserDataSnapshot,
    updateCurrentUserData,
    deleteFieldInUserData,
  };
})();

export const userLogging = new (function () {
  this.login = function (email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        console.error("Error logging in.", error);
      });
  };
  this.createUser = function (email, password, displayName) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (user) {
        user.user
          .updateProfile({
            displayName: displayName,
          })
          .then();

        UserRepository.addUserData();
      })
      .catch(function (error) {
        console.error("Error creating .", error);
      });
  };
  this.logOut = function () {
    firebase.auth().signOut().then();
  };

  this.onUpdate = function (func) {
    return firebase.auth().onAuthStateChanged((user) => {
      func(user ?? null, UserRepository.getCurrentUserData() ?? null);
    });
  };
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("Signed in as: ", user.displayName);
    } else {
      console.log("Signed out");
    }
  });
})();
