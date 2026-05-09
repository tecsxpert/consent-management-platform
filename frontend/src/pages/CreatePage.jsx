import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreatePage() {

  // State for form inputs
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  // State for field-wise errors
  const [errors, setErrors] = useState({});

  // Navigation hook
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async () => {

    const newErrors = {};

    // Field-wise validation
    if (!name) newErrors.name = "Name is required";
    if (!status) newErrors.status = "Status is required";

    // If errors exist → stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear previous errors
    setErrors({});

    try {
      // API POST call
      await api.post("/create", {
        name,
        status,
      });

      // Redirect on success
      navigate("/list");

    } catch (err) {
      console.error("POST Error:", err);

      // API error
      setErrors({ api: "Failed to create record" });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Create Record</h1>

      {/* API error */}
      {errors.api && (
        <p className="text-red-500 mb-2">{errors.api}</p>
      )}

      {/* Name input */}
      <input
        name="name"
        className="border p-2 mb-1 w-full"
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Name error */}
      {errors.name && (
        <p className="text-red-500 text-sm mb-2">{errors.name}</p>
      )}

      {/* Status input */}
      <input
        name="status"
        className="border p-2 mb-1 w-full"
        type="text"
        placeholder="Enter status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />

      {/* Status error */}
      {errors.status && (
        <p className="text-red-500 text-sm mb-2">{errors.status}</p>
      )}

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Submit
      </button>
    </div>
  );
}