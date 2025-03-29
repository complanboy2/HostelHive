// web/js/App.js
import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

function App() {
  const [view, setView] = useState('login'); // 'login' or 'signup'
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    console.log('Login with:', userData);
    // In a real app, we would call an API here
    setUser({ email: userData.email, name: 'Demo User' });
  };

  const handleSignup = (userData) => {
    console.log('Signup with:', userData);
    // In a real app, we would call an API here
    setUser({ email: userData.email, name: userData.name });
  };

  const handleSocialLogin = (provider) => {
    console.log(`Social login with ${provider}`);
    // In a real app, we would redirect to OAuth provider
    setUser({ email: 'demo@example.com', name: 'Social User' });
  };

  const logout = () => {
    setUser(null);
  };

  if (user) {
    return (
      <div className="dashboard">
        <header>
          <h1>Hostel Manager Dashboard</h1>
          <div className="user-info">
            <span>Welcome, {user.name}</span>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        </header>
        <div className="dashboard-content">
          <h2>Your Dashboard</h2>
          <p>This is where hostel management features will be implemented.</p>
          <div className="feature-cards">
            <div className="card">
              <h3>Room Management</h3>
              <p>Add, edit and manage hostel rooms</p>
            </div>
            <div className="card">
              <h3>Booking System</h3>
              <p>Handle reservations and check-ins</p>
            </div>
            <div className="card">
              <h3>Staff Management</h3>
              <p>Manage staff schedules and permissions</p>
            </div>
            <div className="card">
              <h3>Analytics</h3>
              <p>View occupancy rates and financial reports</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      {view === 'login' ? (
        <Login 
          onLogin={handleLogin} 
          onSocialLogin={handleSocialLogin}
          onSwitchView={() => setView('signup')}
        />
      ) : (
        <Signup 
          onSignup={handleSignup}
          onSocialLogin={handleSocialLogin}
          onSwitchView={() => setView('login')}
        />
      )}
    </div>
  );
}

export default App;