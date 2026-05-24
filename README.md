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

En cada pagina HTML, cambia estos valores del `body`:

```html
data-whatsapp-phone="34000000000"
data-whatsapp-message="Hola Mario, quiero pedir presupuesto para una instalacion."
```

El telefono debe ir con prefijo de pais y solo numeros.

## Estructura

- `server.js`: servidor Node listo para Railway.
- `public/`: paginas HTML, CSS, JavaScript, sitemap y robots.
- `public/assets/css/styles.css`: diseno global.
- `public/assets/js/app.js`: navegacion movil, WhatsApp y formulario.
- `data/leads.json`: se crea automaticamente al recibir formularios en local.

## Publicar en Railway

1. Sube el proyecto a GitHub.
2. En Railway, crea un nuevo proyecto desde ese repositorio.
3. Railway detectara Node y ejecutara `npm start`.
4. El servidor usa `process.env.PORT`, asi que Railway asignara el puerto automaticamente.

## Checklist antes de publicar

- Cambiar telefono, email, zona y horario reales.
- Sustituir imagenes/espacios visuales por fotos reales cuando existan.
- Probar Inicio, Servicios, Trabajos, Contacto y formulario.
- Comprobar que `data/` y `*.zip` no se suben al repositorio.
