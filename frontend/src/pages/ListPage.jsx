import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";

export default function ListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  const [streamLogs, setStreamLogs] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);
      if (searchTerm) newParams.set("q", searchTerm);
      else newParams.delete("q");
      setSearchParams(newParams);
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const downloadCSV = () => {
    const headers = "ID,Name,Category,Status,Date\n";
    const rows = data.map(item => `${item.id},"${item.name}","${item.category}",${item.status},${item.date}`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Audit_Report_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const startStreaming = () => {
    if (isStreaming) return;
    setIsStreaming(true);
    setStreamLogs(["[INFO] Initializing connection to audit server..."]);
    
    const messages = [
      "[AUTH] Handshake successful.",
      "[SYNC] Fetching latest encrypted packets...",
      "[DATA] Record CMP-1024 updated by admin.",
      "[DATA] Record CMP-1029 created successfully.",
      "[INFO] Local cache synchronized with cloud."
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length) {
        setStreamLogs(prev => [...prev, messages[i]]);
        i++;
      } else {
        clearInterval(interval);
        setIsStreaming(false);
      }
    }, 1000);
  };

  useEffect(() => {
    setLoading(true);
    api.get(`/all`)
      .catch(() => {
        const mock = [
          { id: "CMP-1024", name: "Marketing Consent A", status: "Approved", category: "Marketing", date: "2026-05-10" },
          { id: "CMP-1025", name: "System Log Access", status: "Pending", category: "Technical", date: "2026-05-12" },
          { id: "CMP-1026", name: "Privacy Policy v4", status: "Rejected", category: "Legal", date: "2026-05-08" },
        ];
        setData(mock.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())));
      })
      .finally(() => setLoading(false));
  }, [searchTerm]);

  return (
    <div style={{ backgroundColor: '#1a1a1a', minHeight: '100vh', padding: '40px', color: 'white', fontFamily: 'sans-serif', textAlign: 'left' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Cleaned Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0', letterSpacing: '-0.5px' }}>System Audit</h1>
            <p style={{ color: '#666', marginTop: '4px', fontSize: '14px' }}>Real-time compliance monitoring and data export.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => navigate('/analytics')} style={{ backgroundColor: '#1e293b', color: '#60a5fa', border: '1px solid #334155', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>
              📊 Analytics
            </button>
            <button onClick={() => navigate('/create')} style={{ backgroundColor: '#1B4F8A', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>
              + New Entry
            </button>
          </div>
        </div>

        {/* Action Bar */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button onClick={downloadCSV} style={{ backgroundColor: '#2d2d2d', color: '#ccc', border: '1px solid #444', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>
            📥 Export CSV
          </button>
          <button onClick={startStreaming} disabled={isStreaming} style={{ backgroundColor: isStreaming ? '#3b82f622' : '#2d2d2d', color: isStreaming ? '#60a5fa' : '#ccc', border: isStreaming ? '1px solid #3b82f6' : '1px solid #444', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', cursor: isStreaming ? 'default' : 'pointer' }}>
            {isStreaming ? "📡 Streaming Active..." : "📡 Start Live Stream"}
          </button>
        </div>

        {/* Terminal Logs */}
        {streamLogs.length > 0 && (
          <div style={{ backgroundColor: '#000', padding: '15px', borderRadius: '8px', border: '1px solid #222', marginBottom: '20px', fontFamily: 'monospace', fontSize: '12px', color: '#4ade80', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)' }}>
            {streamLogs.map((log, index) => <div key={index} style={{ marginBottom: '4px' }}>{`> ${log}`}</div>)}
          </div>
        )}

        {/* Search Bar */}
        <div style={{ backgroundColor: '#242424', padding: '20px', borderRadius: '12px', border: '1px solid #333', marginBottom: '20px' }}>
          <input 
            type="text" 
            placeholder="Search by name or reference ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '12px', backgroundColor: '#1a1a1a', border: '1px solid #444', borderRadius: '8px', color: 'white', outline: 'none' }}
          />
        </div>

        {/* Table */}
        <div style={{ backgroundColor: '#242424', borderRadius: '12px', border: '1px solid #333', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#2d2d2d', borderBottom: '1px solid #444', textAlign: 'left' }}>
                <th style={{ padding: '15px 20px', fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Reference ID</th>
                <th style={{ padding: '15px 20px', fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Name</th>
                <th style={{ padding: '15px 20px', fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Status</th>
                <th style={{ padding: '15px 20px', fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'right' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} onClick={() => navigate(`/details/${item.id}`)} style={{ borderBottom: '1px solid #333', cursor: 'pointer' }}>
                  <td style={{ padding: '15px 20px', color: '#3b82f6', fontSize: '13px', fontFamily: 'monospace' }}>{item.id}</td>
                  <td style={{ padding: '15px 20px', fontSize: '14px', fontWeight: 'bold' }}>{item.name}</td>
                  <td style={{ padding: '15px 20px' }}>
                    <span style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', backgroundColor: 'rgba(34,197,94,0.1)', color: '#4ade80' }}>
                      {item.status}
                    </span>
                  </td>
                  <td style={{ padding: '15px 20px', fontSize: '13px', color: '#666', textAlign: 'right' }}>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}