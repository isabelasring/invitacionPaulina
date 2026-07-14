/** Edita estos datos del evento antes de compartir */
window.INVITACION = {
  festejada: "Paulina",
  dia: "8 de agosto",
  hora: "7:00 p.m.",
  lugarLinea1: "Crr 38 n 52 - 05",
  lugarLinea2: "Boston",
  salon: "Playa Real",
  /** Fecha del evento en zona America/Bogota */
  eventoISO: "2026-08-08T19:00:00-05:00",
  /** Link de confirmación por WhatsApp */
  whatsappLink: "https://w.app/6ustfm",
  /** Número (opcional si usas whatsappLink) */
  whatsapp: "573135577440",
  whatsappMensaje:
    "¡Hola! Quiero confirmar mi asistencia a los 15 de Paulina",
  rsvp: "",
  invitadoPorDefecto: "ti",

  /**
   * Línea del tiempo — cambia año / título / texto
   * El último ítem debería ser el de hoy (tus 15).
   */
  historia: [
    {
      anio: "2011",
      titulo: "Mi llegada al mundo",
      texto: "Nací y comencé esta hermosa historia llena de amor.",
    },
    {
      anio: "2015",
      titulo: "Primeros pasos",
      texto: "Descubrí el mundo con curiosidad, risas y mucha aventura.",
    },
    {
      anio: "2017",
      titulo: "El colegio",
      texto: "Llegaron los amigos, los sueños y mis primeros aprendizajes.",
    },
    {
      anio: "2021",
      titulo: "Creciendo con ilusión",
      texto: "Cada etapa me enseñó a soñar más grande y a valorar a mi familia.",
    },
    {
      anio: "Hoy",
      titulo: "Mis 15 años",
      texto:
        "Hoy celebro mis quince años rodeada del amor de mi familia y de mis amigos más queridos.",
      hoy: true,
    },
  ],

  /** Fotos del carrusel — orden: de bebé a más adulta */
  fotos: [
    "/fotos/foto-01.png", /* bebé */
    "/fotos/foto-05.png", /* niña pequeña */
    "/fotos/foto-07.png", /* niña */
    "/fotos/foto-04.png", /* infancia */
    "/fotos/foto-02.png", /* cumpleaños */
    "/fotos/foto-08.png", /* 11 años */
    "/fotos/foto-03.png", /* adolescente */
    "/fotos/foto-06.png", /* más adulta */
  ],

  /** Código de vestimenta */
  vestimenta: {
    mensaje:
      "Con mucho respeto y cariño, te pedimos reservar estos tonos para la quinceañera.",
    nota: "Cualquier otro color lucirá hermoso esta noche. Gracias por ayudarme a brillar en mi día especial.",
    colores: [
      { nombre: "Lila", color: "#C9A9E8" },
      { nombre: "Lavanda", color: "#B39DDB" },
      { nombre: "Morado", color: "#7E57A8" },
      { nombre: "Rosa", color: "#E8A4B8" },
    ],
  },
  /** Recomendaciones */
  recomendaciones: {
    puntualidad:
      "Con mucho cariño te pedimos llegar puntual. Tu presencia a tiempo hará aún más especial el comienzo de esta noche.",
    sobres:
      "Tu compañía es el mejor regalo. Si deseas obsequiarme algo, será con mucho cariño en forma de lluvia de sobres.",
    esperamos: "Te esperamos",
  },
};
