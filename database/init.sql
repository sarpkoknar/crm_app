-- init.sql

-- Eğer veritabanı yoksa oluştur
CREATE DATABASE crm_db;

-- Bu komut doğrudan psql ile çalıştırıldığında etkili olur.
-- Eğer bu dosya birden fazla komutla zincirleniyorsa, aşağıdaki USE komutu yerine
-- psql -d crm_db -f schema.sql gibi ayrı çağrılar tercih edilmelidir.

-- PostgreSQL'de USE komutu yoktur, bağlantı sırasında veritabanı seçilir.
-- Bu nedenle init.sql sadece veritabanını oluşturur.

-- UUID üretimi için gerekli uzantıyı aktif et
\c crm_db
CREATE EXTENSION IF NOT EXISTS "pgcrypto";