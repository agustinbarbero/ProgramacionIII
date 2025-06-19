# 🔧 Guía de Testing API con cURL

Comandos para probar la API REST del backend usando cURL desde la terminal.

---

## 🚀 Configuración Inicial

### Variables de Entorno para Testing
```bash
# Configurar URL base del API
export API_URL="http://localhost:3001/api"
export BASE_URL="http://localhost:3001"

# Verificar que las variables estén configuradas
echo "API URL: $API_URL"
echo "Base URL: $BASE_URL"
```

---

## 🔍 Health Checks y Verificación

### Verificar que el backend esté funcionando
```bash
# Health check básico
curl -X GET $BASE_URL/health

# Health check del API
curl -X GET $API_URL/health

# Respuesta esperada:
# {
#   "status": "OK",
#   "message": "API funcionando correctamente",
#   "timestamp": "2024-XX-XXTXX:XX:XX.XXXZ",
#   "environment": "development"
# }
```

### Verificar conectividad con la base de datos
```bash
# Test de conexión a base de datos (si existe endpoint)
curl -X GET $API_URL/test

# Respuesta esperada:
# {
#   "message": "Endpoint de prueba",
#   "data": {
#     "backend": "Express",
#     "database": "PostgreSQL",
#     "orm": "Sequelize"
#   }
# }
```

---

## 👤 Testing de Autenticación

### Registro de Usuario
```bash
# Registrar nuevo usuario
curl -X POST $API_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Usuario Test",
    "email": "test@example.com",
    "password": "password123"
  }'

# Respuesta esperada:
# {
#   "success": true,
#   "message": "Usuario registrado exitosamente",
#   "user": {
#     "id": 1,
#     "name": "Usuario Test",
#     "email": "test@example.com"
#   },
#   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
# }
```

### Login de Usuario
```bash
# Iniciar sesión
curl -X POST $API_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Guardar token para próximas peticiones
export TOKEN="tu_token_jwt_aqui"
```

### Verificar Token
```bash
# Verificar que el token es válido
curl -X GET $API_URL/auth/me \
  -H "Authorization: Bearer $TOKEN"

# Respuesta esperada:
# {
#   "user": {
#     "id": 1,
#     "name": "Usuario Test",
#     "email": "test@example.com"
#   }
# }
```

---

## 📝 CRUD Operations - Ejemplo con Usuarios

### Obtener Todos los Usuarios
```bash
# GET - Listar usuarios
curl -X GET $API_URL/users \
  -H "Authorization: Bearer $TOKEN"

# Con parámetros de paginación
curl -X GET "$API_URL/users?page=1&limit=10" \
  -H "Authorization: Bearer $TOKEN"
```

### Obtener Usuario por ID
```bash
# GET - Usuario específico
curl -X GET $API_URL/users/1 \
  -H "Authorization: Bearer $TOKEN"
```

### Crear Usuario
```bash
# POST - Crear nuevo usuario
curl -X POST $API_URL/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Nuevo Usuario",
    "email": "nuevo@example.com",
    "password": "password123"
  }'
```

### Actualizar Usuario
```bash
# PUT - Actualizar usuario completo
curl -X PUT $API_URL/users/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Usuario Actualizado",
    "email": "actualizado@example.com"
  }'

# PATCH - Actualización parcial
curl -X PATCH $API_URL/users/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Solo Nombre Cambiado"
  }'
```

### Eliminar Usuario
```bash
# DELETE - Eliminar usuario
curl -X DELETE $API_URL/users/1 \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📊 Testing con Datos de Ejemplo

### Crear Múltiples Registros de Prueba
```bash
# Crear varios usuarios de prueba
for i in {1..5}; do
  curl -X POST $API_URL/users \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d "{
      \"name\": \"Usuario $i\",
      \"email\": \"user$i@example.com\",
      \"password\": \"password123\"
    }"
  echo "\n--- Usuario $i creado ---"
done
```

### Testing de Búsqueda y Filtros
```bash
# Búsqueda por nombre
curl -X GET "$API_URL/users?search=Usuario" \
  -H "Authorization: Bearer $TOKEN"

# Filtros múltiples
curl -X GET "$API_URL/users?status=active&role=user&sort=name" \
  -H "Authorization: Bearer $TOKEN"

# Ordenamiento
curl -X GET "$API_URL/users?sort=name&order=desc" \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📁 Testing de Upload de Archivos

### Subir Archivo
```bash
# Subir imagen
curl -X POST $API_URL/upload \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@/path/to/image.jpg" \
  -F "type=avatar"

# Subir múltiples archivos
curl -X POST $API_URL/upload/multiple \
  -H "Authorization: Bearer $TOKEN" \
  -F "files=@/path/to/file1.jpg" \
  -F "files=@/path/to/file2.png"
```

---

## ❌ Testing de Errores

### Probar Validaciones
```bash
# Email inválido
curl -X POST $API_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "email-invalido",
    "password": "123"
  }'

# Campos requeridos faltantes
curl -X POST $API_URL/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": ""
  }'
```

### Probar Autenticación
```bash
# Sin token
curl -X GET $API_URL/users

# Token inválido
curl -X GET $API_URL/users \
  -H "Authorization: Bearer token_invalido"

# Token expirado
curl -X GET $API_URL/users \
  -H "Authorization: Bearer $EXPIRED_TOKEN"
```

### Probar Recursos No Encontrados
```bash
# Usuario que no existe
curl -X GET $API_URL/users/99999 \
  -H "Authorization: Bearer $TOKEN"

# Endpoint que no existe
curl -X GET $API_URL/endpoint-inexistente \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🔒 Testing de Seguridad

### Rate Limiting
```bash
# Hacer muchas peticiones rápidas para probar rate limiting
for i in {1..20}; do
  curl -X GET $API_URL/users \
    -H "Authorization: Bearer $TOKEN"
  echo "Request $i completed"
done
```

### CORS Testing
```bash
# Probar CORS desde diferente origen
curl -X GET $API_URL/users \
  -H "Origin: http://malicious-site.com" \
  -H "Authorization: Bearer $TOKEN" \
  -v
```

---

## 📈 Testing de Performance

### Benchmark Básico
```bash
# Medir tiempo de respuesta
time curl -X GET $API_URL/users \
  -H "Authorization: Bearer $TOKEN"

# Múltiples peticiones concurrentes
curl -X GET $API_URL/users \
  -H "Authorization: Bearer $TOKEN" &
curl -X GET $API_URL/users \
  -H "Authorization: Bearer $TOKEN" &
curl -X GET $API_URL/users \
  -H "Authorization: Bearer $TOKEN" &
wait
```

---

## 🛠️ Scripts Útiles

### Script para Setup Completo
```bash
#!/bin/bash
# setup-test.sh

export API_URL="http://localhost:3001/api"

echo "🚀 Iniciando tests del API..."

# 1. Health check
echo "📋 Verificando health..."
curl -s $API_URL/health | jq

# 2. Registrar usuario de prueba
echo "👤 Registrando usuario de prueba..."
RESPONSE=$(curl -s -X POST $API_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }')

# 3. Extraer token
TOKEN=$(echo $RESPONSE | jq -r '.token')
export TOKEN

echo "🔑 Token obtenido: ${TOKEN:0:20}..."

# 4. Verificar autenticación
echo "✅ Verificando autenticación..."
curl -s -X GET $API_URL/auth/me \
  -H "Authorization: Bearer $TOKEN" | jq

echo "🎉 Setup completado!"
```

### Script para Limpiar Datos de Prueba
```bash
#!/bin/bash
# cleanup-test.sh

export API_URL="http://localhost:3001/api"

echo "🧹 Limpiando datos de prueba..."

# Eliminar usuarios de prueba
for email in "test@example.com" "user1@example.com" "user2@example.com"; do
  echo "🗑️ Eliminando usuario: $email"
  curl -s -X DELETE "$API_URL/users?email=$email" \
    -H "Authorization: Bearer $TOKEN"
done

echo "✅ Limpieza completada"
```

---

## 📋 Comandos de Referencia Rápida

```bash
# Health checks
curl -X GET $BASE_URL/health
curl -X GET $API_URL/health

# Autenticación
curl -X POST $API_URL/auth/register -H "Content-Type: application/json" -d '{"name":"Test","email":"test@example.com","password":"123456"}'
curl -X POST $API_URL/auth/login -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"123456"}'

# CRUD básico
curl -X GET $API_URL/users -H "Authorization: Bearer $TOKEN"
curl -X POST $API_URL/users -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" -d '{"name":"New User"}'
curl -X PUT $API_URL/users/1 -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" -d '{"name":"Updated"}'
curl -X DELETE $API_URL/users/1 -H "Authorization: Bearer $TOKEN"

# Con formato JSON legible
curl -X GET $API_URL/users -H "Authorization: Bearer $TOKEN" | jq

# Guardar respuesta en archivo
curl -X GET $API_URL/users -H "Authorization: Bearer $TOKEN" > response.json
```

---

## 🔍 Tips y Mejores Prácticas

### Usar jq para Formato JSON
```bash
# Instalar jq si no lo tienes
sudo apt-get install jq  # Ubuntu/Debian
brew install jq          # macOS

# Usar con curl
curl -X GET $API_URL/users -H "Authorization: Bearer $TOKEN" | jq
```

### Guardar Respuestas
```bash
# Guardar respuesta completa
curl -X GET $API_URL/users -H "Authorization: Bearer $TOKEN" -o users.json

# Guardar solo headers
curl -X GET $API_URL/users -H "Authorization: Bearer $TOKEN" -D headers.txt

# Verbose output para debugging
curl -X GET $API_URL/users -H "Authorization: Bearer $TOKEN" -v
```

### Variables para Reutilización
```bash
# Crear archivo .env para tests
echo 'export API_URL="http://localhost:3001/api"' > test.env
echo 'export TOKEN="your_jwt_token_here"' >> test.env

# Cargar variables
source test.env
```

---

## 🎯 Casos de Uso Comunes

### Desarrollo de Nueva Feature
1. **Health check** - Verificar que el API funciona
2. **Autenticación** - Obtener token válido
3. **CRUD básico** - Probar endpoints nuevos
4. **Validaciones** - Probar casos de error
5. **Performance** - Verificar tiempo de respuesta

### Debugging de Problemas
1. **Verbose mode** - `curl -v` para ver detalles
2. **Status codes** - Verificar códigos HTTP
3. **Headers** - Revisar headers de respuesta
4. **Payload** - Verificar formato de datos

### Testing de Integración
1. **Flujo completo** - Registro → Login → Operaciones
2. **Edge cases** - Límites y casos extremos
3. **Seguridad** - Autenticación y autorización
4. **Performance** - Carga y concurrencia
