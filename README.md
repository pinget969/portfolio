# Portfolio — Nelson Javier Pinget

Portfolio personal desarrollado con **Angular 21**, **Tailwind CSS v4**, **Font Awesome** y **EmailJS**.

## Requisitos

- Node.js 20+
- npm 10+

## Instalación

```bash
npm install
npm start
```

La app estará disponible en `http://localhost:4200`.

## Configuración de EmailJS

1. Creá una cuenta en [EmailJS](https://www.emailjs.com).
2. Configurá un servicio de email y una plantilla con los campos:
   - `from_name`
   - `from_email`
   - `subject`
   - `message`
3. Copiá `src/environments/environment.example.ts` y completá tus credenciales en:
   - `src/environments/environment.ts` (desarrollo)
   - `src/environments/environment.prod.ts` (producción)

## Build de producción

```bash
npm run build
```

El output queda en `dist/portfolio/browser`.

## CI/CD

| Workflow | Cuándo corre | Qué hace |
|----------|--------------|----------|
| [`.github/workflows/ci.yml`](.github/workflows/ci.yml) | Push y PR a `main` | `npm test` (sin watch) + build de producción |
| [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) | Tras CI exitoso en `main` | Publica en GitHub Pages |

Flujo: los tests deben pasar en CI; solo entonces se dispara el deploy.

Activá GitHub Pages con source **GitHub Actions** en **Settings → Pages** del repo.

Para ejecutar los tests como en CI (local):

```bash
npm test -- --watch=false
```

## Deploy a GitHub Pages

### Opción A — Automático (recomendado)

Push a `main` → CI → deploy a Pages.

### Opción B — Manual

```bash
npm run deploy
```

> **Nota:** El `baseHref` está configurado como `/portfolio/` en [`angular.json`](angular.json). Debe coincidir con el nombre del repo en GitHub (p. ej. `https://pinget969.github.io/portfolio/`).

## Estructura del proyecto

```
src/app/
├── components/     # Secciones del portfolio (navbar, hero, projects, etc.)
├── data/           # Contenido estático (proyectos, experiencia, skills)
├── models/         # Interfaces TypeScript
└── services/       # ScrumAnalysisService (mock) y ContactService (EmailJS)
```

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run deploy` | Build + deploy a GitHub Pages |
| `npm test` | Tests unitarios (en CI: `npm test -- --watch=false`) |
