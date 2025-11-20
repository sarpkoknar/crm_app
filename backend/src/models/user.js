const pool = require('../config/db');

const User = {
  // 1. Yeni Kullanıcı Oluştur
  create: async (userData) => {
    const { ad, email, sifre_hash, rol, aktif_mi } = userData;
    const query = `
      INSERT INTO users (ad, email, sifre_hash, rol, aktif_mi)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, ad, email, rol, aktif_mi, kayit_tarihi
    `;
    const { rows } = await pool.query(query, [ad, email, sifre_hash, rol, aktif_mi]);
    return rows[0];
  },

  // 2. Tüm Kullanıcıları Listele (Şifreleri getirme!)
  findAll: async () => {
    const query = `
      SELECT id, ad, email, rol, aktif_mi, kayit_tarihi, son_giris 
      FROM users 
      ORDER BY kayit_tarihi DESC
    `;
    const { rows } = await pool.query(query);
    return rows;
  },

  // 3. Email ile Kullanıcı Bul (Login için)
  // Controller genelde { where: { email: ... } } şeklinde gönderir, onu karşılıyoruz.
  findOne: async (options) => {
    const email = options?.where?.email;
    if (!email) throw new Error("Email parametresi gerekli");

    const query = `SELECT * FROM users WHERE email = $1`;
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  },

  // 4. ID ile Kullanıcı Bul (Detay/Güncelleme için)
  findByPk: async (id) => {
    const query = `SELECT * FROM users WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  // 5. Kullanıcı Güncelle
  update: async (data, options) => {
    const id = options?.where?.id;
    if (!id) throw new Error("ID parametresi gerekli");

    // Dinamik güncelleme sorgusu (Sadece değişenleri güncelle)
    const fields = [];
    const values = [];
    let index = 1;

    if (data.ad) { fields.push(`ad = $${index++}`); values.push(data.ad); }
    if (data.email) { fields.push(`email = $${index++}`); values.push(data.email); }
    if (data.rol) { fields.push(`rol = $${index++}`); values.push(data.rol); }
    if (data.sifre_hash) { fields.push(`sifre_hash = $${index++}`); values.push(data.sifre_hash); }
    if (data.aktif_mi !== undefined) { fields.push(`aktif_mi = $${index++}`); values.push(data.aktif_mi); }

    values.push(id); // ID en son parametre

    const query = `
      UPDATE users 
      SET ${fields.join(', ')} 
      WHERE id = $${index}
      RETURNING id, ad, email, rol, aktif_mi
    `;
    
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // 6. Kullanıcı Sil
  destroy: async (options) => {
    const id = options?.where?.id;
    if (!id) throw new Error("ID parametresi gerekli");

    const query = `DELETE FROM users WHERE id = $1 RETURNING id`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
};

module.exports = User;