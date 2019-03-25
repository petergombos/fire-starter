import {useState, useEffect} from "react";

function snapshotToData(snapshot) {
  const data = [];
  snapshot.forEach(d => {
    data.push({
      id: d.id,
      ...d.data(),
      _doc: d
    });
  });
  return data;
}

function useCollection(ref) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const unsubscribe = ref.onSnapshot(snapshot => {
      setData(snapshotToData(snapshot));
    });
    return unsubscribe;
  }, []);

  return data;
}

export default useCollection;
