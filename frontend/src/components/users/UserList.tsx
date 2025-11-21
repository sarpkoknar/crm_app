import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Yönlendirme için
import { getUsers, deleteUser } from '../../services/userService'; // deleteUser'ı ekledik

// Tip Tanımları
interface User {
  id: string;
  ad: string;
  email: string;
  rol: string;
  aktif_mi: boolean;
}

const UserList: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      setUsers(response.data);
      setLoading(false);
    } catch (err: any) {
      console.error("Kullanıcılar yüklenemedi:", err);
      setError('Veri çekilemedi. Backend bağlantısını kontrol edin.');
      setLoading(false);
    }
  };

  // --- YENİ EKLENEN SİLME FONKSİYONU ---
  const handleDelete = async (id: string, ad: string) => {
    // 1. Kullanıcıya sor (Yanlışlıkla silmesin)
    if (window.confirm(`${ad} kullanıcısını silmek istediğinize emin misiniz?`)) {
      try {
        // 2. Backend'e silme emri gönder
        await deleteUser(id);
        
        // 3. Listeyi ekrandan güncelle (Sayfayı yenilemeden satırı kaldırır)
        setUsers(users.filter(user => user.id !== id));
        
        alert('Kullanıcı silindi!');
      } catch (err) {
        console.error("Silme hatası:", err);
        alert('Silme işlemi başarısız oldu.');
      }
    }
  };

  if (loading) return <div className="p-8 text-center">⏳ Kullanıcılar yükleniyor...</div>;
  if (error) return <div className="p-8 text-red-600 font-bold">❌ {error}</div>;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold leading-tight">Kullanıcı Listesi</h2>
          <button 
            onClick={() => navigate('/users/new')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow">
            + Yeni Kullanıcı
          </button>
        </div>
        
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ad Soyad</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Rol</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Durum</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap font-bold">{user.ad}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <span className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full
                        ${user.rol === 'admin' ? 'text-red-900 bg-red-200' : 'text-blue-900 bg-blue-200'}`}>
                        <span className="relative uppercase text-xs">{user.rol}</span>
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      {user.aktif_mi ? (
                        <span className="text-green-600 font-bold text-xs">Aktif</span>
                      ) : (
                        <span className="text-red-600 font-bold text-xs">Pasif</span>
                      )}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <button className="text-blue-600 hover:text-blue-900 mr-3 text-xs font-bold">DÜZENLE</button>
                      
                      {/* SİL BUTONU ARTIK ÇALIŞIYOR */}
                      <button 
                        onClick={() => handleDelete(user.id, user.ad)}
                        className="text-red-600 hover:text-red-900 text-xs font-bold">
                        SİL
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;