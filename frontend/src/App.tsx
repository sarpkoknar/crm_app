import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Router'ı buradan alıyoruz
import Login from './components/auth/Login';
import UserList from './components/users/UserList'; 
import UserForm from './components/users/UserForm';

function App() {
  // Token kontrolü
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    // DÜZELTME: Tüm uygulamayı <Router> etiketiyle sarmaladık. Hata buydu.
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          {/* 1. Giriş Sayfası */}
          <Route path="/login" element={<Login />} />

          {/* 2. Ana Sayfa Yönlendirmesi */}
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/users" /> : <Navigate to="/login" />} 
          />

          {/* 3. Kullanıcı Listesi */}
          <Route 
            path="/users" 
            element={isAuthenticated ? <UserList /> : <Navigate to="/login" />} 
          />

          {/* Yeni Kullanıcı Ekleme Sayfası */}
          <Route 
            path="/users/new" 
            element={isAuthenticated ? <UserForm /> : <Navigate to="/login" />} 
          />
          {/* :id kısmı, düzenlenecek kullanıcının kimliğini taşıyacak */}
          <Route 
            path="/users/edit/:id" 
            element={isAuthenticated ? <UserForm /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;