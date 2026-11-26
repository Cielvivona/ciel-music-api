# Ciel Music API

API REST para la gestión de artistas y álbumes musicales,
con integración de la API externa MusicBrainz.

Proyecto desarrollado por Ciel Vivona para el curso
Full Stack JavaScript de BIOS - Entregable 2.

## Objetivo

Desarrollar una API que permita gestionar información musical,
almacenar artistas y sus discografías en una base de datos
relacional y consultar información de artistas mediante
MusicBrainz.

## Tecnologías utilizadas

- Node.js
- JavaScript (ES Modules)
- Express
- PostgreSQL
- Supabase
- Prisma ORM
- Zod
- JSON Web Token (JWT)
- bcryptjs
- MusicBrainz API
- Node Test Runner
- Git y GitHub

## Arquitectura

El proyecto utiliza una arquitectura por capas para separar
responsabilidades y facilitar el mantenimiento del código.

- routes: definición de endpoints.
- controllers: gestión de solicitudes y respuestas HTTP.
- services: lógica de negocio y acceso a datos.
- middlewares: autenticación mediante JWT.
- validators: validación de datos mediante Zod.
- lib: configuración del cliente Prisma.
- prisma: modelos y migraciones de la base de datos.
- tests: pruebas automatizadas.

## Modelo de datos

### Artista

- id
- nombre
- pais
- genero
- createdAt

### Album

- id
- titulo
- anio
- descripcion
- artistaId
- createdAt

### Usuario

- id
- nombre
- email
- password
- createdAt

### Relación

Existe una relación uno a muchos (1:N) entre Artista y Album.

Un artista puede tener varios álbumes, mientras que cada
álbum pertenece a un único artista.

## Instalación

Requisitos:

- Node.js 24
- npm
- Base de datos PostgreSQL

Instalar las dependencias:

    npm ci

Crear el archivo de variables de entorno:

    cp .env.example .env

Configurar DIRECT_URL con las credenciales de PostgreSQL.

Configurar JWT_SECRET con una clave secreta propia.

Generar el cliente Prisma:

    npx prisma generate --config prisma7.config.ts

Aplicar las migraciones:

    npx prisma migrate deploy --config prisma7.config.ts


Iniciar el servidor:

    node server.js

URL local:

    http://127.0.0.1:3000

## Endpoints

### General

| Método | Ruta | Acceso |
|---|---|---|
| GET | / | Público |

### Autenticación

| Método | Ruta | Acceso |
|---|---|---|
| POST | /api/auth/register | Público |
| POST | /api/auth/login | Público |

### Artistas

| Método | Ruta | Acceso |
|---|---|---|
| GET | /api/db/artistas | Público |
| POST | /api/db/artistas | Privado |
| PUT | /api/db/artistas/:id | Privado |
| DELETE | /api/db/artistas/:id | Privado |

### Álbumes

| Método | Ruta | Acceso |
|---|---|---|
| GET | /api/db/albums | Público |
| POST | /api/db/albums | Privado |
| PUT | /api/db/albums/:id | Privado |
| DELETE | /api/db/albums/:id | Privado |

### MusicBrainz

| Método | Ruta | Acceso |
|---|---|---|
| GET | /api/artistas?nombre=Prince | Público |

La búsqueda en MusicBrainz consulta información externa
sin almacenarla automáticamente en PostgreSQL.

## Paginación y filtros

El endpoint de artistas admite los siguientes parámetros:

- page: número de página.
- limit: cantidad de resultados por página.
- nombre: filtro por nombre.
- pais: filtro por país.
- genero: filtro por género musical.

Ejemplos:

    GET /api/db/artistas?page=1&limit=2

    GET /api/db/artistas?genero=Rock

    GET /api/db/artistas?pais=Uruguay

## Autenticación y seguridad

Los usuarios pueden registrarse e iniciar sesión.

Las contraseñas se almacenan mediante hashing con bcryptjs.

Al iniciar sesión correctamente, el servidor genera un JWT.

Para acceder a las rutas privadas se debe enviar el token
mediante el encabezado HTTP:

    Authorization: Bearer TOKEN

Las credenciales de PostgreSQL y la clave JWT se mantienen
en variables de entorno excluidas del repositorio.

## Validación de datos

Se utiliza Zod para validar los datos recibidos al registrar
usuarios, crear artistas y gestionar álbumes.

Las solicitudes con datos inválidos reciben una respuesta
HTTP 400 Bad Request.

## Códigos de respuesta HTTP

| Código | Significado |
|---|---|
| 200 | Solicitud exitosa |
| 201 | Recurso creado |
| 204 | Recurso eliminado |
| 400 | Datos inválidos |
| 401 | Autenticación requerida o inválida |
| 404 | Recurso no encontrado |
| 409 | Conflicto |
| 500 | Error interno del servidor |
| 502 | Error al consultar MusicBrainz |

## Tests automatizados

Las pruebas utilizan el módulo nativo node:test.

Con el servidor iniciado y PostgreSQL disponible, ejecutar:

    npm test

Pruebas implementadas:

1. Funcionamiento de la página principal.
2. Listado de artistas.
3. Validación de paginación.
4. Protección de rutas mediante JWT.
5. Validación de búsqueda en MusicBrainz.

Resultado verificado durante el desarrollo:

    Tests: 5
    Passed: 5
    Failed: 0

Las pruebas no modifican los registros existentes.

## Autor

Ciel Vivona

Productor musical y estudiante de desarrollo Full Stack.

Proyecto académico - BIOS 2026.
