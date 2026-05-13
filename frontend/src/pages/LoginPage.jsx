import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevents page reload
    setError("");

    if (username && password) {
      const fakeToken = "jwt-token-demo";
      login(fakeToken);
      navigate("/dashboard");
    } else {
      setError("Please enter valid credentials to access the system.");
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#1a1a1a', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      color: 'white'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '400px', 
        backgroundColor: '#242424', 
        padding: '40px', 
        borderRadius: '16px', 
        border: '1px solid #333',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        textAlign: 'center'
      }}>
        
        {/* Brand Logo / Icon */}
        <div style={{ 
          width: '60px', height: '60px', backgroundColor: '#1B4F8A', 
          borderRadius: '12px', margin: '0 auto 20px', display: 'flex', 
          alignItems: 'center', justifyContent: 'center', fontSize: '24px' 
        }}>
          🛡️
        </div>

        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
          Consent Management
        </h1>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '30px' }}>
          Secure Portal Login
        </p>

        <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
          {error && (
            <div style={{ 
              backgroundColor: 'rgba(239,68,68,0.1)', color: '#f87171', 
              padding: '10px', borderRadius: '6px', fontSize: '12px', 
              marginBottom: '20px', border: '1px solid #991b1b' 
            }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '12px', color: '#888', fontWeight: 'bold', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Username
            </label>
            <input
              type="text"
              placeholder="e.g. admin_user"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ 
                width: '100%', padding: '12px', backgroundColor: '#1a1a1a', 
                border: '1px solid #333', borderRadius: '8px', color: 'white',
                outline: 'none', transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#1B4F8A'}
              onBlur={(e) => e.target.style.borderColor = '#333'}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ fontSize: '12px', color: '#888', fontWeight: 'bold', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ 
                width: '100%', padding: '12px', backgroundColor: '#1a1a1a', 
                border: '1px solid #333', borderRadius: '8px', color: 'white',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#1B4F8A'}
              onBlur={(e) => e.target.style.borderColor = '#333'}
            />
          </div>

          <button
            type="submit"
            style={{ 
              width: '100%', padding: '14px', backgroundColor: '#1B4F8A', 
              color: 'white', border: 'none', borderRadius: '8px', 
              fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s',
              fontSize: '16px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#1B4F8A'}
          >
            Access Dashboard
          </button>
        </form>

        <p style={{ marginTop: '25px', color: '#444', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Authorized Personnel Only
        </p>
      </div>
    </div>
  );
}