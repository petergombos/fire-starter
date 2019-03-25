import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const {
  REACT_APP_FIRE_API_KEY,
  REACT_APP_FIRE_AUTH_DOMAIN,
  REACT_APP_FIRE_DATABASE_URL,
  REACT_APP_FIRE_PROJECT_ID,
  REACT_APP_FIRE_STORAGE_BUCKET,
  REACT_APP_FIRE_MESSAGING_SENDER_ID
} = process.env;

const config = {
  apiKey: REACT_APP_FIRE_API_KEY,
  authDomain: REACT_APP_FIRE_AUTH_DOMAIN,
  databaseURL: REACT_APP_FIRE_DATABASE_URL,
  projectId: REACT_APP_FIRE_PROJECT_ID,
  storageBucket: REACT_APP_FIRE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIRE_MESSAGING_SENDER_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }
}

export default new Firebase();
