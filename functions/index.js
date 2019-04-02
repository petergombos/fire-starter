const functions = require("firebase-functions");

exports.writeEntries = functions
  .region("europe-west1")
  .firestore.document("entries/{entryId}")
  .onWrite((snap, context) => {
    if (!snap.after.data()) {
      return false;
    }

    const update = {};
    if (!snap.before.data()) {
      update.createdAt = context.timestamp;
      update.updatedAt = context.timestamp;
    } else if (snap.before.data().updatedAt === snap.after.data().updatedAt) {
      update.updatedAt = context.timestamp;
    }

    return snap.after.ref.set(update, {merge: true});
  });
