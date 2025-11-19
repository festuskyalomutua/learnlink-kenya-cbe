import React, { useState } from "react";
import axios from "axios";

const AssessmentUpload = () => {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState({
    title: "",
    subject: "",
    competency: "",
    keywords: "",
  });
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("file", file);
    formData.append("title", metadata.title);
    formData.append("subject", metadata.subject);
    formData.append("competency", metadata.competency);
    formData.append("keywords", metadata.keywords);

    try {
      const res = await axios.post("/api/assessments/upload", formData);
      setMessage("Assessment uploaded & auto-grading enabled!");
    } catch (err) {
      console.error(err);
      setMessage("Upload failed");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upload Assessment</h1>

      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="text"
          placeholder="Assessment Title"
          className="w-full p-2 border rounded"
          onChange={(e) =>
            setMetadata({ ...metadata, title: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="Subject"
          className="w-full p-2 border rounded"
          onChange={(e) =>
            setMetadata({ ...metadata, subject: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="CBC Competency (e.g. Communication, Critical Thinking)"
          className="w-full p-2 border rounded"
          onChange={(e) =>
            setMetadata({ ...metadata, competency: e.target.value })
          }
          required
        />

        <textarea
          placeholder="Auto-grading keywords (comma separated)"
          className="w-full p-2 border rounded"
          onChange={(e) =>
            setMetadata({ ...metadata, keywords: e.target.value })
          }
        ></textarea>

        <input
          type="file"
          className="w-full"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Upload Assessment
        </button>

        {message && <p className="text-center mt-3">{message}</p>}
      </form>
    </div>
  );
};

export default AssessmentUpload;
