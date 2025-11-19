import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentProgress = () => {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get("/api/progress/student/12345"); // studentId
        setProgress(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, []);

  if (loading) return <p>Loading progress...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">CBC Progress Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {progress.map((item) => (
          <div key={item._id} className="p-4 border rounded-lg bg-white shadow">
            <h2 className="text-lg font-semibold">{item.subject}</h2>
            <p className="text-gray-600">Competency: {item.competency}</p>
            <p className="mt-2">
              Score:{" "}
              <span className="font-bold text-blue-600">{item.score}%</span>
            </p>

            <div className="mt-3 bg-gray-200 w-full h-2 rounded">
              <div
                className="bg-green-500 h-2 rounded"
                style={{ width: `${item.score}%` }}
              ></div>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Level: <strong>{item.level}</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentProgress;
