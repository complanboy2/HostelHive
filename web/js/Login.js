// web/js/Login.js
import React, { useState } from 'react';

function Login({ onLogin, onSocialLogin, onSwitchView }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onLogin({ email, password });
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login to Hostel Manager</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        <button type="submit" className="submit-btn">Login</button>
      </form>
      
      <div className="social-login">
        <p>Or login with</p>
        <div className="social-buttons">
          <button 
            onClick={() => onSocialLogin('google')}
            className="social-btn google"
          >
            Google
          </button>
          <button 
            onClick={() => onSocialLogin('facebook')}
            className="social-btn facebook"
          >
            Facebook
          </button>
        </div>
      </div>
      
      <div className="auth-switch">
        <p>Don't have an account? <button onClick={onSwitchView}>Sign up</button></p>
      </div>
    </div>
  );
}

export default Login;