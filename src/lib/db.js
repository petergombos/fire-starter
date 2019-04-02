import firebase from "./firebase";

class Database {
  get timestamp() {
    return new Date().toString();
  }

  get owner() {
    return firebase.auth.currentUser.uid;
  }

  set(documentPath, data, options = {}) {
    return firebase.db.doc(documentPath).set(
      {
        ...data,
        createdAt: this.timestamp,
        updatedAt: this.timestamp,
        owner: this.owner
      },
      options
    );
  }

  update(documentPath, data) {
    return firebase.db.doc(documentPath).set({
      ...data,
      updatedAt: this.timestamp,
      owner: this.owner
    });
  }

  delete(documentPath) {
    return firebase.db.doc(documentPath).delete();
  }

  add(collectionPath, data) {
    return firebase.db.collection(collectionPath).add({
      ...data,
      createdAt: this.timestamp,
      updatedAt: this.timestamp,
      owner: this.owner
    });
  }

  col(collectionPath) {
    const ref = firebase.db.collection(collectionPath);
    ref.add = (...args) => this.add(collectionPath, ...args);
    return ref;
  }

  doc(documentPath) {
    const doc = firebase.db.doc(documentPath);
    doc.set = (...args) => this.set(documentPath, ...args);
    doc.update = (...args) => this.update(documentPath, ...args);
    doc.delete = (...args) => this.delete(documentPath, ...args);
    return doc;
  }
}

export default new Database();
