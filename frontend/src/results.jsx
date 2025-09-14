import React, { useEffect, useState } from "react";
import axios from "axios";

function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/results");
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">📊 Results</h2>
      <div className="space-y-3">
        {results.map((r) => (
          <div
            key={r._id}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <p className="text-lg font-medium">
              {r.name} ({r.party}) —{" "}
              <span className="font-bold text-blue-700">{r.votes} votes</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Results;
