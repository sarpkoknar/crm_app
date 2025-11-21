import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/userService';

const UserForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ad: '',
    email: '',
    sifre: '', // Backend 'sifre' bekliyor, orada hashliyor
    rol: 'operasyon', // Varsayılan rol
    aktif_mi: true
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Backend'e gönder
      await registerUser(formData);
      // Başarılıysa listeye dön
      navigate('/users');
    } catch (err: any) {
      console.error(err);
      setError('Kayıt başarısız. Email kullanılıyor olabilir.');
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-md">
      <h2 className="text-2xl font-bold mb-6">Yeni Kullanıcı Ekle</h2>
      
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Ad Soyad</label>
          <input 
            name="ad"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="text" required 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input 
            name="email"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="email" required 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Şifre</label>
          <input 
            name="sifre"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="password" required 
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Rol</label>
          <select 
            name="rol"
            onChange={handleChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="operasyon">Operasyon</option>
            <option value="goruntuleme">Görüntüleme</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="submit">
            Kaydet
          </button>
          <button 
            type="button"
            onClick={() => navigate('/users')}
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            İptal
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;