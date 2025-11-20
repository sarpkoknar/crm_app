import http from "./http";

// Backend'de rotayı "app.use('/api/users', ...)" diye kurduğumuz için adres bu:
const apiEndpoint = "/api/users";

// Tüm Kullanıcıları Getir
export const getUsers = () => {
  return http.get(apiEndpoint);
};

// Tek Kullanıcı Getir
export const getUser = (id: string) => {
  return http.get(`${apiEndpoint}/${id}`);
};

// Yeni Kullanıcı Ekle
export const registerUser = (user: any) => {
  return http.post(apiEndpoint, user);
};

// Kullanıcı Güncelle
export const updateUser = (id: string, user: any) => {
  // id'yi veri paketinden ayırıyoruz
  const body = { ...user };
  delete body.id;
  return http.put(`${apiEndpoint}/${id}`, body);
};

// Kullanıcı Sil
export const deleteUser = (id: string) => {
  return http.delete(`${apiEndpoint}/${id}`);
};