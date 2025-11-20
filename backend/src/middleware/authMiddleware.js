const jwt = require('jsonwebtoken');

// 1. Token Kontrolü (Kimlik Doğrulama)
const authenticateToken = (req, res, next) => {
  // Header'dan token'ı al: "Bearer eyJhbGci..."
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Erişim reddedildi: Token yok' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Erişim reddedildi: Geçersiz Token' });
    }
    // Token geçerliyse, içindeki kullanıcı bilgisini request'e ekle
    req.user = user;
    next();
  });
};

// 2. Rol Kontrolü (Yetkilendirme)
const authorizeRole = (roles) => {
  return (req, res, next) => {
    // Kullanıcının rolü, izin verilen roller listesinde var mı?
    if (!req.user || !roles.includes(req.user.rol)) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }
    next();
  };
};

module.exports = { authenticateToken, authorizeRole };