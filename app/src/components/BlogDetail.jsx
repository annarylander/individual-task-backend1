import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";

export default function BlogDetail() {
  const { _id } = useParams();
  const [data, setData] = useState("");

  useEffect(() => {
    const url = `http://localhost:8000/blog/${_id}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="card-post">
      <div className="card-image">
        <p>{data.postedByName}</p>
        <img src={data.image} alt="profilbild" height="50px" />
      </div>

      <div className="card-text">
        <p>{data.body}</p>
        <p className="timestamp"> {moment(data.published).fromNow()}</p>
      </div>
    </div>
  );
}
