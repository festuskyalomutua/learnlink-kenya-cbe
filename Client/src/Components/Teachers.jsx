client/src/components/Teachers.jsx
import React, { useState } from "react";

function Teachers() {
  const [teachers, setTeachers] = useState([
    { name: "Mr. Otieno", subject: "Mathematics" },
    { name: "Mrs. Mwikali", subject: "Science" },
    { name: "Mr. Wanjala", subject: "Digital Literacy" }
  ]);

  const [newTeacher, setNewTeacher] = useState({ name: "", subject: "" });

  const addTeacher = () => {
    if (!newTeacher.name || !newTeacher.subject) return;

    setTeachers([...teachers, newTeacher]);
    setNewTeacher({ name: "", subject: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Teacher Management</h1>

      {/* Add teacher form */}
      <div className="bg-white p-4 shadow rounded mb-6">
        <h2 className="font-semibold mb-2">Add New Teacher</h2>
        <div className="flex gap-3">
          <input
            className="border p-2 rounded w-1/3"
            placeholder="Full Name"
            value={newTeacher.name}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, name: e.target.value })
            }
          />
          <input
            className="border p-2 rounded w-1/3"
            placeholder="Subject"
            value={newTeacher.subject}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, subject: e.target.value })
            }
          />
          <button
            onClick={addTeacher}
            className="bg-green-600 hover:bg-green-700 text-white px-4 rounded"
          >
            Add
          </button>
        </div>
      </div>

      {/* Teacher list */}
      <div className="space-y-3">
        {teachers.map((t, i) => (
          <div key={i} className="bg-white p-4 shadow rounded flex justify-between">
            <span className="font-medium">{t.name}</span>
            <span className="text-gray-600">{t.subject}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teachers;
