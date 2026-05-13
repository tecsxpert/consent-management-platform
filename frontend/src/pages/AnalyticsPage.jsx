import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

// Mock Data
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
  const [width, setWidth] = useState(window.innerWidth);

  // Responsive logic
  const isMobile = width < 768;
  const isDesktop = width >= 1024;

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ 
      backgroundColor: '#1a1a1a', 
      minHeight: '100vh', 
      padding: isMobile ? '20px' : '40px', 
      color: 'white', 
      fontFamily: 'sans-serif' 
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header & Period Selector */}
        <div style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between', 
          alignItems: isMobile ? 'flex-start' : 'center', 
          gap: '20px',
          marginBottom: '40px' 
        }}>
          <div>
            <button 
              onClick={() => navigate('/list')} 
              style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', padding: 0, marginBottom: '10px', display: 'block' }}
            >
              ← Back to Audit
            </button>
            <h1 style={{ fontSize: isMobile ? '26px' : '32px', fontWeight: 'bold', margin: 0 }}>System Analytics</h1>
          </div>
          
          <div style={{ 
            backgroundColor: '#242424', 
            padding: '5px', 
            borderRadius: '8px', 
            border: '1px solid #333',
            width: isMobile ? '100%' : 'auto',
            display: 'flex',
            justifyContent: 'space-around'
          }}>
            {['1M', '3M', '6M', '1Y'].map((p) => (
              <button 
                key={p}
                onClick={() => setPeriod(p)}
                style={{ 
                  flex: isMobile ? 1 : 'none',
                  padding: isMobile ? '10px 5px' : '8px 16px', 
                  border: 'none', 
                  borderRadius: '6px', 
                  cursor: 'pointer',
                  backgroundColor: period === p ? '#1B4F8A' : 'transparent',
                  color: period === p ? 'white' : '#666',
                  fontWeight: 'bold', 
                  fontSize: isMobile ? '12px' : '14px',
                  transition: '0.2s'
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isDesktop ? 'repeat(2, 1fr)' : '1fr', 
          gap: isMobile ? '15px' : '25px' 
        }}>
          
          {/* 1. Line Chart - Always full width or adaptive */}
          <div style={{ 
            gridColumn: isDesktop ? 'span 2' : 'span 1', 
            backgroundColor: '#242424', 
            padding: isMobile ? '15px' : '30px', 
            borderRadius: '16px', 
            border: '1px solid #333' 
          }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Consent Volume Trend</h3>
            <div style={{ width: '100%', height: isMobile ? '250px' : '350px' }}>
              <ResponsiveContainer>
                <LineChart data={lineData} margin={{ left: -20, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="month" stroke="#666" tick={{fontSize: 10}} dy={10} />
                  <YAxis stroke="#666" tick={{fontSize: 10}} />
                  <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #444', color: 'white' }} />
                  <Legend verticalAlign="top" height={36} iconSize={10} wrapperStyle={{ fontSize: '12px' }}/>
                  <Line type="monotone" dataKey="approved" stroke="#4ade80" strokeWidth={isMobile ? 2 : 3} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="rejected" stroke="#f87171" strokeWidth={isMobile ? 2 : 3} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 2. Bar Chart */}
          <div style={{ backgroundColor: '#242424', padding: isMobile ? '15px' : '30px', borderRadius: '16px', border: '1px solid #333' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>By Category</h3>
            <div style={{ width: '100%', height: isMobile ? '250px' : '300px' }}>
              <ResponsiveContainer>
                <BarChart data={categoryData} margin={{ left: -20, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="category" stroke="#666" tick={{fontSize: 9}} />
                  <YAxis stroke="#666" tick={{fontSize: 10}} />
                  <Tooltip cursor={{fill: '#2d2d2d'}} contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #444' }} />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 3. Pie Chart */}
          <div style={{ backgroundColor: '#242424', padding: isMobile ? '15px' : '30px', borderRadius: '16px', border: '1px solid #333' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Status Distribution</h3>
            <div style={{ width: '100%', height: isMobile ? '250px' : '300px' }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%" cy="50%"
                    innerRadius={isMobile ? 50 : 70}
                    outerRadius={isMobile ? 80 : 100}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #444' }} />
                  <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}