# Iprocess_Proyects

Repositorio de proyectos, prototipos y desarrollos internos de iProcess. Incluye pruebas de UI modernas y el proyecto principal Proyecto X con arquitectura full-stack desacoplada.

## Contenido

- Prototipos en 0 IA y 10 IA (Vite + React)
- Proyecto X (backend Laravel + frontend React)
- Recursos compartidos en Imagenes

## Stack tecnologico

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-0F172A?style=for-the-badge&logo=tailwind-css&logoColor=38BDF8)

### Backend
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![Composer](https://img.shields.io/badge/Composer-885630?style=for-the-badge&logo=composer&logoColor=white)

### Control de versiones
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

## Proyecto X: arquitectura

- Backend API REST en Laravel
- Frontend SPA en React + Vite
- Comunicacion via HTTP (JSON)
- Estructura modular y escalable

## Requisitos

| Tecnologia | Version minima |
|------------|---------------|
| Node.js    | 18+ |
| PHP        | 8.2+ |
| Composer   | Ultima estable |
| MySQL      | 8+ (segun entorno) |

## Instalacion y uso

### Prototipos (0 IA y 10 IA)

```bash
cd "0 IA"
npm install
npm run dev
```

Para el prototipo en 10 IA, usa el mismo flujo:

```bash
cd "10 IA"
npm install
npm run dev
```

### Proyecto X: backend

```bash
cd "Proyecto X/proyecto-x-backend"
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Proyecto X: frontend

```bash
cd "Proyecto X/proyecto-x-frontend"
npm install
npm run dev
```

## Notas

- Los prototipos usan Vite y sirven en modo desarrollo.
- Proyecto X usa backend y frontend desacoplados; configura el URL del API segun tu entorno.

