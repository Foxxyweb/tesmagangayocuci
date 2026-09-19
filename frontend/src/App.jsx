import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(e) { return { error: e }; }
  render() {
    if (this.state.error) return (
      <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#fff1f0', fontFamily:'sans-serif' }}>
        <div style={{ background:'#fff', borderRadius:16, padding:40, maxWidth:600, boxShadow:'0 4px 24px rgba(0,0,0,0.08)' }}>
          <h1 style={{ color:'#e53e3e', fontSize:22, fontWeight:800, marginBottom:16 }}>Terjadi Error</h1>
          <pre style={{ background:'#fef2f2', padding:16, borderRadius:8, color:'#c53030', fontSize:13, overflowX:'auto', whiteSpace:'pre-wrap' }}>
            {this.state.error?.toString()}
          </pre>
          <button onClick={() => window.location.reload()} style={{ marginTop:20, background:'#f97316', color:'#fff', border:'none', borderRadius:10, padding:'12px 24px', fontWeight:700, cursor:'pointer' }}>
            Muat Ulang
          </button>
        </div>
      </div>
    );
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/admin/*" element={<ErrorBoundary><Dashboard /></ErrorBoundary>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
              <>
                <Navbar />
                <main><Home /></main>
                <Footer />
              </>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}
