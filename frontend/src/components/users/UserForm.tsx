import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { registerUser, getUser, updateUser } from '../../services/userService';

const UserForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    ad: '',
    email: '',
    sifre: '',
    rol: 'operasyon',
    aktif_mi: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // DÜZELTME BURADA: loadUserData fonksiyonunu useEffect'in içine aldık.
  // Artık React "bunu dependency'e ekle" diye kızmayacak.
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const response = await getUser(id as string);
        const user = response.data;
        setFormData({
          ad: user.ad,
          email: user.email,
          sifre: '', 
          rol: user.rol,
          aktif_mi: user.aktif_mi
        });
      } catch (err) {
        console.error("Kullanıcı bilgisi çekilemedi", err);
        setError('Kullanıcı bilgileri yüklenemedi.');
      }
    };

    if (isEditMode) {
      loadUserData();
    }
  }, [id, isEditMode]); // Artık eksiksiz

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : e.target.value;

    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditMode) {
        const dataToSend = { ...formData };
        if (!dataToSend.sifre) delete (dataToSend as any).sifre;
        
        await updateUser(id as string, dataToSend);
        alert('Kullanıcı güncellendi!');
      } else {
        await registerUser(formData);
        alert('Yeni kullanıcı oluşturuldu!');
      }
      navigate('/users');
    } catch (err: any) {
      console.error(err);
      setError('İşlem başarısız. Bilgileri kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-md">
      <h2 className="text-2xl font-bold mb-6">
        {isEditMode ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı Ekle'}
      </h2>
      
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Ad Soyad</label>
          <input 
            name="ad"
            value={formData.ad}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="text" required 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input 
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="email" required 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Şifre {isEditMode && <span className="text-xs text-gray-500 font-normal">(Değiştirmek istemiyorsanız boş bırakın)</span>}
          </label>
          <input 
            name="sifre"
            value={formData.sifre}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="password" 
            required={!isEditMode} 
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Rol</label>
          <select 
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="operasyon">Operasyon</option>
            <option value="goruntuleme">Görüntüleme</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {isEditMode && (
          <div className="mb-6">
             <label className="flex items-center">
              <input
                name="aktif_mi"
                type="checkbox"
                checked={formData.aktif_mi}
                onChange={(e) => setFormData({...formData, aktif_mi: e.target.checked})}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700 font-bold">Kullanıcı Aktif</span>
            </label>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="submit"
            disabled={loading}>
            {loading ? 'İşleniyor...' : (isEditMode ? 'Güncelle' : 'Kaydet')}
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