# Mario Sanchez Web

Aplicacion web para Mario Sanchez: telecomunicaciones, fibra optica y electricidad.

## Ejecutar en local

```bash
npm start
```

Abre:

```text
http://127.0.0.1:4173/
```

## Estructura

- `server.js`: servidor Node listo para Railway.
- `public/`: paginas HTML, CSS y JavaScript del sitio.
- `data/leads.json`: se crea automaticamente al recibir formularios en local.

## Publicar

1. Sube el proyecto a GitHub.
2. En Railway, crea un nuevo proyecto desde ese repositorio.
3. Railway detectara Node y ejecutara `npm start`.
