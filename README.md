# Iprocess_Proyects
Repositorio de proyectos y pruebas para iProcess. Incluye prototipos de UI con Vite/React y el proyecto "Proyecto X" con backend en Laravel y frontend en Vite/React.

![Logo iProcess](0%20IA/src/assets/img/LOGO-IPROCESS-NARANJA-300x53.png)

## Vista rapida

![Hero Servicios](0%20IA/src/assets/img/recurso-servicios.png)
![Hero Industria](0%20IA/src/assets/img/recurso-industria.png)
![Hero Contacto](0%20IA/src/assets/img/recurso-contacto.jpg)

## Contenido

- `0 IA/` y `10 IA/`: prototipos de sitio web (Vite + React + TypeScript + Tailwind).
- `Proyecto X/`: proyecto principal con backend (`proyecto-x-backend`) y frontend (`proyecto-x-frontend`).

## Requisitos

- Node.js 18+ (para los proyectos Vite)
- PHP 8.2+ y Composer (para el backend de Laravel)

## Uso rapido

### Prototipos (0 IA / 10 IA)

```bash
cd "0 IA"
npm install
npm run dev
```

### Proyecto X

Backend (Laravel):

```bash
cd "Proyecto X/proyecto-x-backend"
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

Frontend (Vite):

```bash
cd "Proyecto X/proyecto-x-frontend"
npm install
npm run dev
```

## Scripts utiles (Vite)

- `npm run dev`: entorno de desarrollo
- `npm run build`: build de produccion
- `npm run preview`: previsualizacion del build

## Estructura base de Vite

- `src/app/components/`: componentes UI
- `src/pages/`: paginas
- `src/styles/`: estilos globales y tema

## Autores

- [@ZoharGarcia](https://github.com/ZoharGarcia)
- [@bismaracevedo003-del](https://github.com/bismaracevedo003)

