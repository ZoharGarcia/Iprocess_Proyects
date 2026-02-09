# 🚀 Iprocess_Proyects

Repositorio de proyectos, prototipos y desarrollos internos de **iProcess**.  
Incluye pruebas de UI modernas y el proyecto principal **Proyecto X** con arquitectura full-stack desacoplada.

---

## 🧠 Stack Tecnológico

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-0F172A?style=for-the-badge&logo=tailwind-css&logoColor=38BDF8)

### Backend
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![Composer](https://img.shields.io/badge/Composer-885630?style=for-the-badge&logo=composer&logoColor=white)

### Control de Versiones
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

---

## 📂 Estructura del Repositorio

Iprocess_Proyects
│
├── 0 IA
│ ├── src
│ ├── public
│ ├── package.json
│ └── vite.config.ts
│
├── 10 IA
│ ├── src
│ ├── public
│ ├── package.json
│ └── vite.config.ts
│
├── Proyecto X
│ ├── proyecto-x-backend
│ │ ├── app
│ │ ├── routes
│ │ ├── database
│ │ └── composer.json
│ │
│ └── proyecto-x-frontend
│ ├── src
│ │ ├── components
│ │ ├── pages
│ │ ├── services
│ │ └── styles
│ ├── public
│ └── package.json
│
├── Imagenes
└── README.md

---

# 🧩 Proyecto X – Arquitectura

Arquitectura desacoplada basada en:

- Backend API REST en Laravel
- Frontend SPA en React + Vite
- Comunicación vía HTTP (JSON)
- Estructura modular y escalable

---

# ⚙️ Requisitos

| Tecnología | Versión mínima |
|------------|---------------|
| Node.js    | 18+ |
| PHP        | 8.2+ |
| Composer   | Última estable |
| MySQL      | 8+ (según entorno) |

---

# 🚀 Instalación y Uso

---

## 🖥 Prototipos 

```bash
cd "0 IA"
npm install
npm run dev

---

Proyecto X

cd "Proyecto X/proyecto-x-backend"

composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve

