import {useState, useEffect} from "react";

function snapshotToData(snapshot) {
  return {
    id: snapshot.id,
    ...snapshot.data()
  };
}

function useDocument(ref) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const unsubscribe = ref.onSnapshot(snapshot => {
      setData(snapshotToData(snapshot));
    });
    return unsubscribe;
  }, []);

  return data;
}

export default useDocument;
