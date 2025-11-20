// src/components/auth/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../../services/http';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await http.post('/api/auth/login', { email, password });

      // Backend yanıtı: { token, role, user }
      const { token, role, user } = res.data;

      if (!token) {
        alert('Token alınamadı, backend yanıtını kontrol et.');
        return;
      }

      // Token ve kullanıcı bilgilerini kaydet
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('user', JSON.stringify(user));

      // Başarılı giriş sonrası admin sayfasına yönlendir
      navigate('/admin');
    } catch (err) {
      console.error('Login failed:', err);
      alert('Giriş başarısız! Email veya şifre hatalı.');
    }
  };

  return (
    <div>
      <h2>Triocare CRM Kullanıcı Giriş</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Şifre:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
};

export default Login;
