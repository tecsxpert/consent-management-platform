import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  // AI Panel States
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [aiError, setAiError] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`/details/${id}`)
      .catch(() => {
        setRecord({
          id: id,
          name: "Global Marketing Consent",
          status: "Approved",
          category: "Marketing",
          createdAt: "2026-05-10",
          description: "This consent covers the processing of user email and behavioral data for cross-platform marketing campaigns."
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAskAI = () => {
    setAiLoading(true);
    setAiError(false);
    setAiResponse(null);

    // Simulate AI Processing Delay
    setTimeout(() => {
      // Randomly simulate an error (1 in 5 chance) for testing the Retry button
      if (Math.random() < 0.2) {
        setAiError(true);
        setAiLoading(false);
      } else {
        setAiResponse({
          score: "Low Risk",
          summary: "This document is 98% compliant with GDPR standards. The data retention period matches industry norms.",
          suggestions: ["Ensure data is encrypted at rest.", "Verify third-party sub-processors."]
        });
        setAiLoading(false);
      }
    }, 2000);
  };

  if (loading) return <div style={{ color: 'white', padding: '50px', backgroundColor: '#1a1a1a' }}>Loading Record...</div>;

  return (
    <div style={{ backgroundColor: '#1a1a1a', minHeight: '100vh', padding: '40px', color: 'white', fontFamily: 'sans-serif', textAlign: 'left' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', marginBottom: '20px' }}>
          ← Back to System Audit
        </button>

        <div style={{ backgroundColor: '#242424', borderRadius: '16px', border: '1px solid #333', padding: '40px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
            <h1 style={{ fontSize: '32px', margin: 0 }}>{record.name}</h1>
            <span style={{ padding: '6px 16px', borderRadius: '20px', border: '1px solid #166534', color: '#4ade80', fontSize: '12px' }}>{record.status}</span>
          </div>

          {/* --- AI PANEL START --- */}
          <div style={{ 
            backgroundColor: '#1e1e1e', 
            borderRadius: '12px', 
            border: '1px solid #3b82f633', 
            padding: '24px',
            marginBottom: '30px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, color: '#60a5fa', fontSize: '14px', letterSpacing: '1px' }}>✨ AI COMPLIANCE ENGINE</h3>
              {!aiResponse && !aiLoading && !aiError && (
                <button onClick={handleAskAI} style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Ask AI
                </button>
              )}
            </div>

            {/* Loading Spinner */}
            {aiLoading && (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ width: '30px', height: '30px', border: '3px solid #3b82f6', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
                <p style={{ color: '#888', marginTop: '10px', fontSize: '13px' }}>Analyzing consent documentation...</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            )}

            {/* Error & Retry */}
            {aiError && (
              <div style={{ color: '#f87171', fontSize: '14px', textAlign: 'center' }}>
                <p>AI Service is temporarily unavailable.</p>
                <button onClick={handleAskAI} style={{ background: 'none', border: '1px solid #f87171', color: '#f87171', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>
                  Retry Analysis
                </button>
              </div>
            )}

            {/* Formatted AI Response Card */}
            {aiResponse && (
              <div style={{ borderLeft: '3px solid #4ade80', paddingLeft: '20px', animation: 'fadeIn 0.5s ease' }}>
                <div style={{ marginBottom: '15px' }}>
                  <span style={{ fontSize: '11px', color: '#4ade80', fontWeight: 'bold', textTransform: 'uppercase' }}>Risk Level</span>
                  <p style={{ margin: '5px 0', fontSize: '18px', fontWeight: 'bold' }}>{aiResponse.score}</p>
                </div>
                <p style={{ fontSize: '14px', color: '#ccc', lineHeight: '1.6' }}>{aiResponse.summary}</p>
                <ul style={{ paddingLeft: '18px', fontSize: '13px', color: '#60a5fa', marginTop: '15px' }}>
                  {aiResponse.suggestions.map((s, i) => <li key={i} style={{ marginBottom: '5px' }}>{s}</li>)}
                </ul>
                <button onClick={() => setAiResponse(null)} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '11px', marginTop: '10px' }}>Clear Analysis</button>
              </div>
            )}
            <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
          </div>
          {/* --- AI PANEL END --- */}

          <h4 style={{ color: '#666', fontSize: '12px', textTransform: 'uppercase', marginBottom: '10px' }}>Description</h4>
          <p style={{ lineHeight: '1.8', color: '#aaa' }}>{record.description}</p>
        </div>
      </div>
    </div>
  );
}