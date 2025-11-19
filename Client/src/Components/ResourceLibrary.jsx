import React, { useEffect, useState } from "react";
import axios from "axios";

function ResourceLibrary() {
  const [resources, setResources] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchResources = async () => {
    try {
      const res = await axios.get("/resources", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResources(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const deleteResource = async (id) => {
    if (!confirm("Delete this resource?")) return;

    try {
      await axios.delete(`/resources/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setResources(resources.filter((r) => r._id !== id));
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const filteredResources =
    filter === "all"
      ? resources
      : resources.filter((r) => r.resourceType === filter);

  useEffect(() => {
    fetchResources();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center p-10">
        <div className="animate-spin border-b-2 border-blue-600 w-16 h-16 rounded-full"></div>
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Learning Resources</h1>

      {/* Filter */}
      <div className="flex gap-3 mb-6">
        {["all", "file", "link", "note"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px=4 py-2 rounded ${
              filter === type
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Resource Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredResources.map((res) => (
          <div key={res._id} className="p-4 bg-white shadow rounded">
            <h3 className="font-bold text-xl">{res.title}</h3>
            <p className="text-gray-600 text-sm mb-3">
              {res.description || "No description"}
            </p>

            {/* Resource type */}
            <span className="text-xs px-2 py-1 bg-indigo-100 rounded">
              {res.resourceType.toUpperCase()}
            </span>

            {/* Links */}
            <div className="mt-3">
              {res.resourceType === "file" && (
                <a
                  href={res.fileUrl}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Download File
                </a>
              )}

              {res.resourceType === "link" && (
                <a
                  href={res.fileUrl}
                  target="_blank"
                  className="text-green-600 underline"
                >
                  Open Link
                </a>
              )}

              {res.resourceType === "note" && (
                <p className="text-gray-700 mt-2">{res.fileUrl}</p>
              )}
            </div>

            {/* Delete button */}
            <button
              onClick={() => deleteResource(res._id)}
              className="mt-4 px-3 py-1 bg-red-600 text-white rounded text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <p className="text-center mt-10 text-gray-600">
          No resources available
        </p>
      )}
    </div>
  );
}

export default ResourceLibrary;
