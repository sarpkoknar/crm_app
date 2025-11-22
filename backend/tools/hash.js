// tools/hash.js
const bcrypt = require('bcryptjs');

(async () => {
  const plain = '123456';
  const hash = await bcrypt.hash(plain, 10);
  console.log('HASH:', hash);
})();
