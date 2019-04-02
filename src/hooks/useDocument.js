import {useState, useEffect} from "react";
import db from "../lib/db";

function snapshotToData(snapshot) {
  return {
    id: snapshot.id,
    ...snapshot.data()
  };
}

function useDocument(ref) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const doc = typeof ref === "string" ? db.doc(ref) : ref;
    const unsubscribe = doc.onSnapshot(snapshot => {
      setData(snapshotToData(snapshot));
    });
    return unsubscribe;
  }, []);

  return data;
}

export default useDocument;
