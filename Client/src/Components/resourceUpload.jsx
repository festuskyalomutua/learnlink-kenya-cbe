import React, { useState } from "react";
import axios from "axios";

function ResourceUpload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [resourceType, setResourceType] = useState("file");
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  const handleFileUpload = async () => {
    if (!file) return "";

    setIsUploading(true);

    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;

    const res = await axios.post(uploadUrl, form);

    setIsUploading(false);
    return res.data.secure_url; // Cloudinary file URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let fileUrl = "";

    if (resourceType === "file") {
      fileUrl = await handleFileUpload();
    }

    if (resourceType === "link") {
      fileUrl = link;
    }

    const payload = {
      title,
      description,
      fileUrl,
      resourceType,
    };

    try {
      await axios.post("/resources", payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      alert("Resource uploaded successfully!");

      setTitle("");
      setDescription("");
      setFile(null);
      setLink("");
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto my-10">
      <h2 className="text-2xl font-bold mb-4">Upload Learning Resource</h2>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <label className="block font-medium">Title</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Description */}
        <label className="block font-medium">Description</label>
        <textarea
          className="w-full p-2 border rounded mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {/* Resource Type */}
        <label className="block font-medium">Resource Type</label>
        <select
          className="w-full p-2 border rounded mb-4"
          value={resourceType}
          onChange={(e) => setResourceType(e.target.value)}
        >
          <option value="file">File</option>
          <option value="link">External Link</option>
          <option value="note">Text Note</option>
        </select>

        {/* Conditional Inputs */}
        {resourceType === "file" && (
          <>
            <label className="block font-medium">Upload File</label>
            <input
              type="file"
              className="w-full mb-4"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </>
        )}

        {resourceType === "link" && (
          <>
            <label className="block font-medium">Link URL</label>
            <input
              type="url"
              className="w-full p-2 border rounded mb-4"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded w-full hover:bg-blue-700"
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Submit Resource"}
        </button>
      </form>
    </div>
  );
}

export default ResourceUpload;
