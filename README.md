# Mis 15 años · Paulina

Invitación digital tipo libro, lista para compartir por link y publicar en Vercel.

## Vista previa local

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Personalizar el invitado

Cada persona recibe su propio link:

```
https://tu-proyecto.vercel.app/?para=María
https://tu-proyecto.vercel.app/?para=Familia%20García
```

En la página aparecerá: **Invitación para María**.

## Datos del evento y la historia

Edita `config.js` (día, hora, lugar, mapa, RSVP y línea del tiempo):

```js
window.INVITACION = {
  dia: "8 de agosto",
  hora: "7:00 p.m.",
  lugarLinea1: "Crr 38 n 52 - 05",
  lugarLinea2: "Boston",
  lat: 6.2449087,
  lng: -75.5587566,
  rsvp: "https://wa.me/57XXXXXXXXXX?text=Confirmo%20asistencia",
  historia: [
    { anio: "2011", titulo: "Mi llegada al mundo", texto: "..." },
    { anio: "Hoy", titulo: "Mis 15 años", texto: "...", hoy: true },
  ],
};
```

## Subir a Vercel

1. Entra a [vercel.com](https://vercel.com) e inicia sesión con GitHub.
2. Sube esta carpeta (Import Project) o usa la CLI:

```bash
npx vercel
```

3. Copia el link que te den y compártelo con `?para=Nombre`.
