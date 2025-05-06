import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from '../styles/AuthForm.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // جلب المستخدمين من localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // تحقق من وجود المستخدم وكلمة المرور
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
      alert('Invalid username or password.');
      return;
    }
    dispatch(login({ username }));
    navigate('/');
  };

  return (
    <div className={styles.authContainer}>
      <form onSubmit={handleSubmit} className={styles.authForm}>
        <h2 className={styles.title}>Login</h2>
        <input
          type="text"
          placeholder="Username or Email"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.submitBtn}>
          Login
        </button>
        <div style={{ textAlign: "center", marginTop: 10 }}>
          <span style={{ color: "#fff" }}>Don't have an account? </span>
          <Link to="/signup" style={{ color: "#bfa14a", fontWeight: "bold", textDecoration: "underline" }}>
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;