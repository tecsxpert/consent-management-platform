import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

// Mock Data for 6 Months
const lineData = [
  { month: 'Jan', approved: 45, rejected: 12 },
  { month: 'Feb', approved: 52, rejected: 18 },
  { month: 'Mar', approved: 48, rejected: 15 },
  { month: 'Apr', approved: 70, rejected: 22 },
  { month: 'May', approved: 85, rejected: 20 },
  { month: 'Jun', approved: 92, rejected: 25 },
];

const categoryData = [
  { category: 'Marketing', count: 120 },
  { category: 'Technical', count: 85 },
  { category: 'Essential', count: 210 },
  { category: 'Social', count: 45 },
];

const statusData = [
  { name: 'Approved', value: 400 },
  { name: 'Pending', value: 120 },
  { name: 'Rejected', value: 75 },
];

const COLORS = ['#4ade80', '#facc15', '#f87171'];

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState('6M');

  return (
    <div style={{ backgroundColor: '#1a1a1a', minHeight: '100vh', padding: '40px', color: 'white', fontFamily: 'sans-serif', textAlign: 'left' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header & Period Selector */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <button onClick={() => navigate('/list')} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', padding: 0, marginBottom: '10px', display: 'block' }}>← Back to Audit</button>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>System Analytics</h1>
          </div>
          
          <div style={{ backgroundColor: '#242424', padding: '5px', borderRadius: '8px', border: '1px solid #333' }}>
            {['1M', '3M', '6M', '1Y'].map((p) => (
              <button 
                key={p}
                onClick={() => setPeriod(p)}
                style={{ 
                  padding: '8px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer',
                  backgroundColor: period === p ? '#1B4F8A' : 'transparent',
                  color: period === p ? 'white' : '#666',
                  fontWeight: 'bold', transition: '0.2s'
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '25px' }}>
          
          {/* 1. Line Chart: 6 Months Trend */}
          <div style={{ gridColumn: 'span 2', backgroundColor: '#242424', padding: '30px', borderRadius: '16px', border: '1px solid #333' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Consent Volume (6 Months)</h3>
            <div style={{ width: '100%', height: '350px' }}>
              <ResponsiveContainer>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="month" stroke="#666" tick={{fontSize: 12}} dy={10} />
                  <YAxis stroke="#666" tick={{fontSize: 12}} />
                  <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #444', color: 'white' }} />
                  <Legend verticalAlign="top" height={36}/>
                  <Line type="monotone" dataKey="approved" stroke="#4ade80" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="rejected" stroke="#f87171" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 2. Bar Chart: Category Comparison */}
          <div style={{ backgroundColor: '#242424', padding: '30px', borderRadius: '16px', border: '1px solid #333' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Records by Category</h3>
            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="category" stroke="#666" tick={{fontSize: 11}} />
                  <YAxis stroke="#666" />
                  <Tooltip cursor={{fill: '#2d2d2d'}} contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #444' }} />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 3. Pie Chart: Status Distribution */}
          <div style={{ backgroundColor: '#242424', padding: '30px', borderRadius: '16px', border: '1px solid #333' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Overall Status Distribution</h3>
            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%" cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #444' }} />
                  <Legend verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}