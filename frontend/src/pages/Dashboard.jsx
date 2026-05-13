import { useEffect, useState } from "react";
import api from "../services/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import KpiCard from "../components/KpiCard";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 128,
    active: 92,
    pending: 24,
    expired: 12,
    chartData: [
      { name: "Marketing", count: 42 },
      { name: "Technical", count: 35 },
      { name: "Essential", count: 28 },
      { name: "Social", count: 18 }
    ]
  });
  const [loading, setLoading] = useState(false); // Set to false to see chart immediately

  return (
    <div style={{ padding: '2rem', backgroundColor: '#1a1a1a', minHeight: '100vh', color: 'white' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4a90e2', marginBottom: '2rem', textAlign: 'left' }}>
        Consent Analytics
      </h1>

      {/* KPI Cards wrapper */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
         <KpiCard title="Total Consents" value={stats.total} />
         <KpiCard title="Active" value={stats.active} />
         <KpiCard title="Pending" value={stats.pending} />
         <KpiCard title="Expired" value={stats.expired} />
      </div>

      <div style={{ backgroundColor: '#2d2d2d', padding: '1.5rem', borderRadius: '12px', border: '1px solid #444' }}>
        <h2 style={{ color: '#eee', marginBottom: '1.5rem', textAlign: 'left' }}>Consents by Category</h2>
        
        {/* THE FIX: Forced height and width wrapper */}
        <div style={{ width: '100%', height: '400px', position: 'relative' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#555" />
              <XAxis 
                dataKey="name" 
                stroke="#9ca3af" 
                tick={{ fill: '#9ca3af' }} 
                axisLine={{ stroke: '#555' }}
              />
              <YAxis 
                stroke="#9ca3af" 
                tick={{ fill: '#9ca3af' }} 
                axisLine={{ stroke: '#555' }}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.1)' }}
                contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '8px' }}
              />
              {/* THE BAR COMPONENT: Ensure this is inside BarChart */}
              <Bar 
                dataKey="count" 
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]} 
                barSize={60} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}