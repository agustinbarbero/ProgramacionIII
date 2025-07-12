
# 🏪 Sistema de Inventario Básico

## Descripción
Aplicación web full-stack para pequeños negocios que necesiten controlar su inventario, desarrollada con React, Express, Sequelize y PostgreSQL, y orquestada con Docker Compose.

## Funcionalidades Principales
- Gestión de productos y categorías
- Control de stock básico
- Registro de movimientos de inventario (entradas/salidas)
- Búsqueda simple de productos
- Panel de administración (pgAdmin)
- Hot reload para desarrollo rápido

## Arquitectura General

```
┌────────────┐    ┌────────────┐    ┌────────────┐
│   Nginx    │    │   React    │    │  Express   │
│  (Proxy)   │<──>│ (Frontend) │<──>│ (Backend)  │
└────────────┘    └────────────┘    └────────────┘
                                  │
                ┌────────────┐    ┌────────────┐
                │   Redis    │    │ PostgreSQL │
                │  (Cache)   │    │   (DB)     │
                └────────────┘    └────────────┘
```

## Servicios y Tecnologías

| Servicio    | Tecnología           | Puerto | Función                    |
|-------------|---------------------|--------|----------------------------|
| Frontend    | React 18            | 3000   | Interfaz de usuario        |
| Backend     | Express + Sequelize | 3001   | API REST                   |
| Database    | PostgreSQL 15       | 5432   | Base de datos principal    |
| Cache       | Redis 7             | 6379   | Cache y sesiones           |
| Proxy       | Nginx               | 80     | Reverse proxy              |
| pgAdmin     | pgAdmin 4           | 5050   | Admin. de base de datos    |

## Instalación y Puesta en Marcha

### 1. Clona el repositorio y navega al proyecto

```bash
git clone <url-del-repo>
cd Proyecto-Final-Prog3
```

### 2. Configura las variables de entorno

Copia el archivo `.env.example` a `.env` y edítalo con tus valores personalizados.

```bash
cp .env.example .env
# Edita .env según tus necesidades
```

### 3. Construye e inicia los servicios

```bash
docker-compose build
docker-compose up -d
```

### 4. Accede a la aplicación

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001/api
- **Nginx Proxy:** http://localhost
- **pgAdmin 4:** http://localhost:5050 (admin@example.com / admin123)
- **Base de datos:** localhost:5432

## Desarrollo y Hot Reload

- Cambios en `frontend/src/` (React) recargan automáticamente el navegador.
- Cambios en `backend/` (Express) reinician el servidor con nodemon.
- Persistencia de datos gracias a volúmenes Docker.

## Comandos Útiles

```bash
# Iniciar todos los servicios
docker-compose up

# Detener servicios
docker-compose down

# Ver logs en tiempo real
docker-compose logs -f

# Ejecutar migraciones y seeders
docker-compose exec backend npm run migrate
docker-compose exec backend npm run seed

# Acceder a la base de datos
docker-compose exec database psql -U app_user -d app_database
```

## Estructura de Carpetas

```
proyecto/
├── docker-compose.yml
├── .env
├── frontend/      # React
├── backend/       # Express + Sequelize
├── database/      # Scripts SQL
├── nginx/         # Configuración proxy
├── pgadmin/       # Configuración pgAdmin
└── scripts/       # Scripts de inicialización
```

## Problemas Comunes

- **Puertos ocupados:** Cambia los puertos en `docker-compose.yml`.
- **Hot reload no funciona:** Verifica variables `CHOKIDAR_USEPOLLING` y reinicia el servicio.
- **Errores de permisos:** Usa `sudo chown -R $USER:$USER .` y `chmod -R 755 .`.

## Recursos y Soporte

- [Documentación Docker Compose](https://docs.docker.com/compose/)
- [React](https://react.dev/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [pgAdmin](https://www.pgadmin.org/docs/)

---

¿Necesitas ayuda? Consulta los logs con `docker-compose logs -f` o abre un issue en el repositorio.