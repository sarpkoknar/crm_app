import http from './http';

export async function getUsers() {
  const res = await http.get('/api/users');
  return res.data;
}

export async function getUser(id: string) {
  const res = await http.get(`/api/users/${id}`);
  return res.data;
}
