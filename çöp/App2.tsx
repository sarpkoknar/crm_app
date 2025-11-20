// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import UserLogins from './components/admin/UserLogins';
import UserEdit from './components/admin/UserEdit';
import UserList from './components/users/UserList';

// Basit guard: token yoksa login'e yönlendir
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Giriş ekranı */}
        <Route path="/" element={<Login />} />

        {/* Admin panelinde başarılı girişleri listeleme */}
        <Route
          path="/admin/users"
          element={
            <RequireAuth>
              <UserLogins />
            </RequireAuth>
          }
        />

        {/* Kullanıcı güncelleme formu */}
        <Route
          path="/admin/users/:id/edit"
          element={
            <RequireAuth>
              <UserEdit />
            </RequireAuth>
          }
        />

        {/* Kullanıcı listesi */}
        <Route
          path="/users"
          element={
            <RequireAuth>
              <UserList />
            </RequireAuth>
          }
        />

        {/* Tanımsız path'ler için fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
