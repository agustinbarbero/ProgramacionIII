# pgadmin/Dockerfile
FROM dpage/pgadmin4:8.9

# Crear directorio temporal para nuestros archivos
USER root

# Crear archivo pgpass
RUN mkdir -p /var/lib/pgadmin && \
    echo "database:5432:*:app_user:app_password" > /var/lib/pgadmin/pgpass && \
    chmod 600 /var/lib/pgadmin/pgpass

# Copiar configuración de servidores
COPY servers.json /pgadmin4/servers.json

# Cambiar de vuelta al usuario pgAdmin
USER pgadmin
