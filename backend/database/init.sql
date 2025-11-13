-- init.sql
-- UTF-8 ve Türkçe locale ile veritabanı oluştur
CREATE DATABASE crm_db
  WITH ENCODING 'UTF8'
  LC_COLLATE='tr_TR.UTF-8'
  LC_CTYPE='tr_TR.UTF-8'
  TEMPLATE template0;