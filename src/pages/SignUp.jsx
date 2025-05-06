import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/AuthForm.module.css'; // Add this import

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // جلب المستخدمين الحاليين من localStorage أو مصفوفة فارغة
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // تحقق إذا كان الإيميل أو اسم المستخدم موجود مسبقاً
    if (users.find(u => u.username === username)) {
      alert('This username is already registered.');
      return;
    }
    // أضف المستخدم الجديد
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    dispatch(register({ username }));
    navigate('/');
  };

  return (
    <div className={styles.authContainer}>
      <form onSubmit={handleSubmit} className={styles.authForm}>
        <h2 className={styles.title}>Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
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
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignUp;