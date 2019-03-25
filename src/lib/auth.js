import firebase from "./firebase";

class Auth {
  login({email, password}) {
    return firebase.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return firebase.auth.signOut();
  }

  async register({email, password, firstName, lastName}) {
    await firebase.auth.createUserWithEmailAndPassword(email, password);
    const profile = {
      displayName: `${firstName} ${lastName}`
    };
    this.triggerProfileUpdateEvent(profile);
    await firebase.auth.currentUser.updateProfile(profile);
  }

  profileUpdateListenerLastID = 0;
  profileUpdateListeners = {};
  onProfileUpdate(callback) {
    const listenerID = ++this.profileUpdateListenerLastID;
    this.profileUpdateListeners[listenerID] = callback;
    return this.profileUpdateListenerUnsubscriber(listenerID);
  }
  profileUpdateListenerUnsubscriber = listenerID => () => {
    delete this.profileUpdateListeners[listenerID];
  };
  triggerProfileUpdateEvent(profile) {
    Object.keys(this.profileUpdateListeners).forEach(listenerID => {
      this.profileUpdateListeners[listenerID](profile);
    });
  }

  onAuthStateChanged(callback) {
    return firebase.auth.onAuthStateChanged(callback);
  }
}

export default new Auth();
