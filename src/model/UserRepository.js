import { usersDb } from "src/model/firebase";
import { UserData } from "src/model/UserData";
import { useUserStore } from "stores/User";
import firebase from "firebase";

export const UserRepository = (function () {
  let getCurrentUserId = () => {
    return useUserStore().user?.id ?? firebase.auth().currentUser.uid;
  };
  const getCurrentUserData = () => {
    usersDb
      .doc(getCurrentUserId())
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.warn("userdata does not exists.");
          console.log("creating new file");
          UserRepository.addUserData(new UserData());
        } else {
          console.log("userdata retrieved");
          return doc.data();
        }
      });
    return new UserData(getCurrentUserId());
  };
  const addUserData = (userData = new UserData()) => {
    usersDb
      .doc(getCurrentUserId())
      .set(userData)
      .then(() => {
        console.log("Doc added.", userData);
        return userData;
      })
      .catch((error) => {
        console.error("Error adding tacos.", error);
      });
  };
  const updateCurrentUserData = (data = useUserStore().userData) => {
    return usersDb
      .doc(firebase.auth().currentUser.uid)
      .update(data)
      .then(() => {
        //stuff
      })
      .catch((error) => {
        console.warn("Error updating", error);
      });
  };

  const onUserDataSnapshot = (onSnapshot) => {
    const snap = usersDb
      .doc(firebase.auth()?.currentUser?.uid)
      .onSnapshot(onSnapshot);

    return snap;
  };

  // const addTask = (data) => {
  //   let totalData = {
  //     tasks: firebase.firestore.FieldValue.arrayUnion(data)
  //   }
  //
  //   return updateCurrentUserData()
  // }
  return {
    getCurrentUserData,
    addUserData,
    updateCurrentUserData,
    onUserDataSnapshot,
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
          .then(
            function () {
              // Update successful.
            },
            function (error) {
              // An error happened.
            }
          );

        UserRepository.addUserData();
      })
      .catch(function (error) {
        console.error("Error creating .", error);
      });
  };
  this.logOut = function () {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("Logged out"));
    useUserStore().setUser();
  };

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      useUserStore().setUser(
        user,
        UserRepository.getCurrentUserData() ?? new UserData()
      );
      console.log("Signed in as: ", user.displayName);
      //console.log(useUserStore().userData)
    } else {
      useUserStore().setUser(null, null);
      // User is signed out.
      console.log("Not signed in.");
    }
  });
})();
