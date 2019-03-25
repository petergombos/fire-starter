import firebase from "./firebase";

export const Entries = () => firebase.db.collection("entries");

export const CurrentUserEntries = () =>
  firebase.db
    .collection("entries")
    .where("owner", "==", firebase.auth.currentUser.uid);

export const EntryByID = entryID =>
  firebase.db.collection(`entries`).doc(entryID);
