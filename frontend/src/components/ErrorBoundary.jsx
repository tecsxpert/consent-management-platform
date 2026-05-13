import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("System Fault:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ backgroundColor: '#1a1a1a', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textAlign: 'center', padding: '20px' }}>
          <div>
            <h1 style={{ fontSize: '48px' }}>⚠️</h1>
            <h2>System Interruption</h2>
            <p style={{ color: '#666' }}>A component failed to load securely. Please refresh the encrypted session.</p>
            <button 
              onClick={() => window.location.reload()}
              style={{ backgroundColor: '#1B4F8A', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', marginTop: '20px' }}
            >
              Restart Session
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;