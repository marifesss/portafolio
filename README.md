# Mariana Fes — Portafolio

Portafolio personal con temática de reproductor de música (Spotify): cada
sección es una "playlist" y cada proyecto, una "pista". Bilingüe (ES/EN) y
pensado para mostrar mis proyectos como developer con foco en arquitectura
de software.

🔗 **Live:** [marianafes.vercel.app](https://marianafes.vercel.app)

## Stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19 · Tailwind CSS v4 |
| Animación | Framer Motion |
| Lenguaje | TypeScript (modo `strict`) |

Sitio estático: las 14 rutas se prerenderizan en build, incluidas las de
proyecto (`/proyectos/[slug]`) vía `generateStaticParams`.

## Arquitectura

Arquitectura por capas deliberada — el propio código es parte de lo que el
portafolio muestra:

```
src/
├── app/         Routing. Páginas finas: cada una renderiza una sección
├── content/     Datos tipados y bilingües — única fuente de verdad del copy
├── features/    Un slice interactivo por sección del sidebar
├── components/  layout/ (chrome persistente) · ui/ (design system)
├── i18n/        LanguageProvider (ES/EN persistido) + diccionario de labels
└── lib/         Tipos de dominio compartidos
```

Tres decisiones que atraviesan todo:

- **Contenido como dato.** Ningún texto vive en el JSX. Agregar un proyecto es
  agregar un objeto a `src/content/projects.ts`.
- **Bilingüe por tipo.** Todo texto que depende del idioma es
  `Localized<T> = { es, en }`, así el compilador reclama si falta una traducción.
- **Server Components por defecto.** Solo los componentes interactivos son
  `"use client"`; el layout y las páginas se renderizan en el servidor.

Detalle completo en **[ARCHITECTURE.md](./ARCHITECTURE.md)**.

## Correr localmente

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run typecheck` | Chequeo de tipos (`tsc --noEmit`) |
| `npm run lint` | ESLint |
| `npm test` | Tests (Vitest + Testing Library) |

CI corre los cuatro últimos en cada push y PR a `main`
(`.github/workflows/ci.yml`).

Los tests cubren lo que los tipos no pueden: que el diccionario esté completo
en ambos idiomas, que el contenido no tenga textos vacíos ni apunte a imágenes
inexistentes, que el cambio de idioma persista, y que la galería agrupe por
plataforma sin descargar los videos antes de tiempo.

## Deploy

En Vercel, vía la integración con GitHub: cada push a `main` publica a
producción y cada pull request recibe su propia URL de preview. Cero
configuración y cero variables de entorno — la app no lee `process.env` en
ningún punto.

Si el host cambia, `domain` en `src/content/site.ts` es el único sitio a
tocar: de ahí sale el `metadataBase` que resuelve las URLs absolutas de los
metadatos, y también el dominio que se muestra en el pie de la sidebar.

## Contacto

- LinkedIn: [linkedin.com/in/fesmariana](https://www.linkedin.com/in/fesmariana)
- Email: marianafes15@gmail.com
