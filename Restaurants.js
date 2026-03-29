import { useEffect, useState } from "react";
import API from "./api";

export default function Restaurants() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/restaurants").then(res => setData(res.data));
  }, []);

  return (
    <ul>
      {data.map(r => <li key={r._id}>{r.name}</li>)}
    </ul>
  );
}
