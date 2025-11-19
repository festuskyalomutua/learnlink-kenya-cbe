client/src/components/Learners.jsx
import React, { useState } from "react";

function Learners() {
  const [learners, setLearners] = useState([
    { name: "Aisha Mutheu", grade: 7 },
    { name: "Samuel Kiptoo", grade: 8 },
    { name: "Joy Wanjiru", grade: 6 }
  ]);

  const [newLearner, setNewLearner] = useState({ name: "", grade: "" });

  const addLearner = () => {
    if (!newLearner.name || !newLearner.grade) return;

    setLearners([...learners, newLearner]);
    setNewLearner({ name: "", grade: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Learner Management</h1>

      {/* Add learner */}
      <div className="bg-white p-4 shadow rounded mb-6">
        <h2 className="font-semibold mb-2">Enroll Learner</h2>
        <div className="flex gap-3">
          <input
            className="border p-2 rounded w-1/3"
            placeholder="Full Name"
            value={newLearner.name}
            onChange={(e) =>
              setNewLearner({ ...newLearner, name: e.target.value })
            }
          />
          <input
            className="border p-2 rounded w-1/3"
            placeholder="Grade"
            type="number"
            value={newLearner.grade}
            onChange={(e) =>
              setNewLearner({ ...newLearner, grade: e.target.value })
            }
          />
          <button
            onClick={addLearner}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded"
          >
            Add
          </button>
        </div>
      </div>

      {/* Learner list */}
      <div className="space-y-3">
        {learners.map((l, i) => (
          <div key={i} className="bg-white p-4 shadow rounded flex justify-between">
            <span className="font-medium">{l.name}</span>
            <span className="text-gray-600">Grade {l.grade}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Learners;
