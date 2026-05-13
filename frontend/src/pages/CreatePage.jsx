import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreatePage() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Pending");
  const [category, setCategory] = useState("Marketing");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name) newErrors.name = "Record name is required";
    if (!description) newErrors.description = "A brief description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await api.post("/create", { name, status, category, description });
      navigate("/list");
    } catch (err) {
      console.error("POST Error:", err);
      setErrors({ api: "System error: Failed to sync new record to audit trail." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#1a1a1a', minHeight: '100vh', padding: '40px', color: 'white', fontFamily: 'sans-serif', textAlign: 'left' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', marginBottom: '20px' }}>
          ← Cancel and Return
        </button>

        <div style={{ backgroundColor: '#242424', borderRadius: '16px', border: '1px solid #333', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>New Consent Record</h1>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '30px' }}>Register a new data processing agreement in the audit system.</p>

          <form onSubmit={handleSubmit}>
            {errors.api && (
              <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', color: '#f87171', padding: '12px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px', border: '1px solid #991b1b' }}>
                {errors.api}
              </div>
            )}

            {/* Name Input */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Consent Name</label>
              <input
                type="text"
                placeholder="e.g. Analytics Tracking v2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '12px', backgroundColor: '#1a1a1a', border: errors.name ? '1px solid #991b1b' : '1px solid #333', borderRadius: '8px', color: 'white', outline: 'none' }}
              />
              {errors.name && <p style={{ color: '#f87171', fontSize: '12px', marginTop: '5px' }}>{errors.name}</p>}
            </div>

            {/* Row for Status and Category */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>Initial Status</label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                  style={{ width: '100%', padding: '12px', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: 'white', outline: 'none' }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>Category</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: '100%', padding: '12px', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: 'white', outline: 'none' }}
                >
                  <option value="Marketing">Marketing</option>
                  <option value="Technical">Technical</option>
                  <option value="Essential">Essential</option>
                  <option value="Social">Social</option>
                </select>
              </div>
            </div>

            {/* Description Textarea */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>Detailed Description</label>
              <textarea
                placeholder="What data is being collected? For how long?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                style={{ width: '100%', padding: '12px', backgroundColor: '#1a1a1a', border: errors.description ? '1px solid #991b1b' : '1px solid #333', borderRadius: '8px', color: 'white', outline: 'none', resize: 'none' }}
              />
              {errors.description && <p style={{ color: '#f87171', fontSize: '12px', marginTop: '5px' }}>{errors.description}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{ 
                width: '100%', padding: '14px', backgroundColor: '#1B4F8A', 
                color: 'white', border: 'none', borderRadius: '8px', 
                fontWeight: 'bold', cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.6 : 1, transition: 'background 0.2s'
              }}
            >
              {isSubmitting ? "Processing..." : "Create Audit Record"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}