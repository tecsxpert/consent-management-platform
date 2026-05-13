import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

// Day 14 Design Tokens
const BRAND_BLUE = "#1B4F8A";
const SPACING = (factor) => `${factor * 8}px`; 

export default function ListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width < 640;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    try {
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
      toast.success("Audit report exported");
    } catch (err) {
      toast.error("Export failed");
    }
  };

  const startStreaming = () => {
    if (isStreaming) return;
    setIsStreaming(true);
    toast.loading("Connecting...", { id: 'stream-toast' });
    
    setTimeout(() => {
      setIsStreaming(false);
      toast.success("Synchronized", { id: 'stream-toast' });
    }, 3000);
  };

  useEffect(() => {
    setLoading(true);
    api.get(`/all`).catch(() => {
      const mock = [
        { id: "CMP-1024", name: "Marketing Consent A", status: "Approved", category: "Marketing", date: "2026-05-10" },
        { id: "CMP-1025", name: "System Log Access", status: "Pending", category: "Technical", date: "2026-05-12" },
        { id: "CMP-1026", name: "Privacy Policy v4", status: "Rejected", category: "Legal", date: "2026-05-08" },
      ];
      setTimeout(() => {
        setData(mock.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())));
        setLoading(false);
      }, 800);
    });
  }, [searchTerm]);

  return (
    <div style={{ 
      backgroundColor: '#1a1a1a', 
      minHeight: '100vh', 
      padding: isMobile ? SPACING(3) : SPACING(5), 
      color: 'white' 
    }}>
      <style>{`
        @keyframes shimmer { 0% { background-position: -468px 0; } 100% { background-position: 468px 0; } }
        .skeleton { background: #242424; background-image: linear-gradient(to right, #242424 0%, #333 20%, #242424 40%, #242424 100%); background-repeat: no-repeat; background-size: 800px 100%; animation: shimmer 1.5s infinite linear; }
        .hide-on-mobile { display: ${isMobile ? 'none' : 'table-cell'}; }
        
        /* Brand Focus States */
        input:focus {
          border-color: ${BRAND_BLUE} !important;
          background-color: #1a1a1a !important;
          box-shadow: 0 0 0 2px rgba(27, 79, 138, 0.2);
        }
        
        tr:hover { background-color: #2a2a2a; transition: 0.2s; }
      `}</style>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Header - Fixed Alignment */}
        <div style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row', 
          justifyContent: 'space-between', 
          alignItems: isMobile ? 'flex-start' : 'center', 
          gap: SPACING(3), 
          marginBottom: SPACING(4) 
        }}>
          <div>
            <h1 style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: 'bold', margin: '0', color: BRAND_BLUE }}>System Audit</h1>
            <p style={{ color: '#666', fontSize: '14px', marginTop: SPACING(0.5) }}>Compliance monitoring and export.</p>
          </div>
          <div style={{ display: 'flex', gap: SPACING(1.5), width: isMobile ? '100%' : 'auto' }}>
            <button onClick={() => navigate('/analytics')} style={{ flex: 1, height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1e293b', color: '#60a5fa', border: '1px solid #334155', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>
              📊 Analytics
            </button>
            <button onClick={() => navigate('/create')} style={{ flex: 1, height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: BRAND_BLUE, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>
              + New Entry
            </button>
          </div>
        </div>

        {/* Action Bar - Touch Targets */}
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: SPACING(1.5), marginBottom: SPACING(3) }}>
          <button onClick={downloadCSV} style={{ height: '44px', padding: `0 ${SPACING(2)}`, backgroundColor: '#2d2d2d', color: '#ccc', border: '1px solid #444', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
            📥 Export CSV
          </button>
          <button onClick={startStreaming} disabled={isStreaming} style={{ height: '44px', padding: `0 ${SPACING(2)}`, backgroundColor: isStreaming ? '#1b4f8a22' : '#2d2d2d', color: isStreaming ? '#60a5fa' : '#ccc', border: isStreaming ? `1px solid ${BRAND_BLUE}` : '1px solid #444', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
            {isStreaming ? "📡 Streaming..." : "📡 Start Live Stream"}
          </button>
        </div>

        {/* Search Bar - Normalized Height */}
        <div style={{ backgroundColor: '#242424', padding: SPACING(2.5), borderRadius: '12px', border: '1px solid #333', marginBottom: SPACING(3) }}>
          <input 
            type="text" 
            placeholder="Search reference..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', height: '44px', padding: `0 ${SPACING(2)}`, backgroundColor: '#1a1a1a', border: '1px solid #444', borderRadius: '8px', color: 'white', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {/* Table - Increased Row Height */}
        <div style={{ backgroundColor: '#242424', borderRadius: '12px', border: '1px solid #333', overflowX: 'auto' }}>
          {loading ? (
            <div style={{ padding: SPACING(3) }}>
              {[1, 2, 3].map(i => <div key={i} className="skeleton" style={{ height: '50px', marginBottom: SPACING(1.5), borderRadius: '6px' }}></div>)}
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '450px' : 'auto' }}>
              <thead>
                <tr style={{ backgroundColor: '#2d2d2d', borderBottom: '1px solid #444', textAlign: 'left' }}>
                  <th style={{ padding: `${SPACING(2)} ${SPACING(2.5)}`, fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>ID</th>
                  <th style={{ padding: `${SPACING(2)} ${SPACING(2.5)}`, fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Name</th>
                  <th style={{ padding: `${SPACING(2)} ${SPACING(2.5)}`, fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Status</th>
                  <th className="hide-on-mobile" style={{ padding: `${SPACING(2)} ${SPACING(2.5)}`, fontSize: '11px', color: '#888', textAlign: 'right', textTransform: 'uppercase', letterSpacing: '1px' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} onClick={() => navigate(`/details/${item.id}`)} style={{ borderBottom: '1px solid #333', cursor: 'pointer', height: '64px' }}>
                    <td style={{ padding: `0 ${SPACING(2.5)}`, color: '#3b82f6', fontSize: '13px', fontFamily: 'monospace' }}>{item.id}</td>
                    <td style={{ padding: `0 ${SPACING(2.5)}`, fontSize: '14px', fontWeight: 'bold' }}>{item.name}</td>
                    <td style={{ padding: `0 ${SPACING(2.5)}` }}>
                      <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: 'bold', backgroundColor: item.status === 'Approved' ? 'rgba(34,197,94,0.1)' : 'rgba(248,113,113,0.1)', color: item.status === 'Approved' ? '#4ade80' : '#f87171' }}>
                        {item.status}
                      </span>
                    </td>
                    <td className="hide-on-mobile" style={{ padding: `0 ${SPACING(2.5)}`, fontSize: '13px', color: '#666', textAlign: 'right' }}>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}