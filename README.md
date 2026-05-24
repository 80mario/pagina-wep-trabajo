# Mario Sanchez Web

Aplicacion web para Mario Sanchez: fibra optica, telecomunicaciones y electricidad.

## Ejecutar en local

```bash
npm start
```

Abre:

```text
http://127.0.0.1:4173/
```

## Configurar WhatsApp

El sitio usa un unico archivo de configuracion:

```text
public/assets/js/config.js
```

Antes de publicar, cambia `whatsappPhone`, `phoneDisplay`, `phoneHref`, `email` y `serviceArea`.
El telefono de WhatsApp debe ir con prefijo de pais y solo numeros.

## Estructura

- `server.js`: servidor Node listo para Railway.
- `public/`: paginas HTML, CSS, JavaScript, sitemap y robots.
- `public/assets/js/config.js`: telefono, email, zona y mensaje base de WhatsApp.
- `public/assets/css/styles.css`: diseno global.
- `public/assets/js/app.js`: navegacion movil, WhatsApp y formulario.
- `data/leads.json`: se crea automaticamente al recibir formularios en local.

## Decision de stack

Este proyecto activo es una web Node estatica servida desde `server.js`.
Convex queda fuera de alcance para este repositorio y no debe mezclarse con esta version salvo que se abra una tarea especifica de migracion.

## Persistencia de leads

En local, el formulario guarda solicitudes en `data/leads.json`.
En Railway, el sistema de archivos puede no ser persistente entre despliegues. Antes de produccion, elige una de estas opciones:

- conectar email,
- conectar webhook,
- conectar base de datos,
- o aceptar por escrito que los leads pueden perderse tras redeploy.

## Publicar en Railway

1. Sube el proyecto a GitHub.
2. En Railway, crea un nuevo proyecto desde ese repositorio.
3. Railway detectara Node y ejecutara `npm start`.
4. El servidor usa `process.env.PORT`, asi que Railway asignara el puerto automaticamente.

## Checklist antes de publicar

- Cambiar telefono, email, zona y horario reales.
- Confirmar persistencia real de leads en Railway.
- Sustituir imagenes/espacios visuales por fotos reales cuando existan.
- Probar Inicio, Servicios, Trabajos, Contacto y formulario.
- Ejecutar Lighthouse movil y guardar resultados de LCP, INP y CLS.
- Comprobar que `data/` y `*.zip` no se suben al repositorio.
