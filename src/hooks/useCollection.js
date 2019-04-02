import {useState, useEffect} from "react";
import db from "../lib/db";

function snapshotToData(snapshot) {
  const data = [];
  snapshot.forEach(d => {
    data.push({
      id: d.id,
      ...d.data()
    });
  });
  return data;
}

function useCollection(
  ref,
  filter = ref =>
    ref.where("owner", "==", db.owner).orderBy("createdAt", "desc")
) {
  const [data, setData] = useState(null);
  const collection = typeof ref === "string" ? db.col(ref) : ref;
  useEffect(() => {
    const unsubscribe = filter(collection).onSnapshot(snapshot => {
      setData(snapshotToData(snapshot));
    });
    return unsubscribe;
  }, []);

  return data;
}

export default useCollection;
