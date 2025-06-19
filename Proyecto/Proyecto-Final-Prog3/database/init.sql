-- Archivo de inicialización de la base de datos
-- Este archivo se ejecuta automáticamente cuando se crea el contenedor de PostgreSQL

-- Crear extensiones útiles
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Crear esquemas adicionales si es necesario
-- CREATE SCHEMA IF NOT EXISTS analytics;

-- Insertar datos iniciales si es necesario
-- INSERT INTO users (name, email) VALUES ('Admin', 'admin@example.com');

-- Mensaje de confirmación
SELECT 'Base de datos inicializada correctamente' AS status;
