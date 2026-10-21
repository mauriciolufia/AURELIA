# Aurelia 97

Los cambios de controles y cámara automática se aplican exclusivamente a dispositivos móviles. PC conserva WASD, mouse, atajos, pausa y tercera persona inicial.

## Celular

- Detección de Android, iPhone, iPad y dispositivos táctiles compatibles.
- Primera persona inicial. La selección de cámara del menú se conserva como preferencia móvil independiente de la partida.
- Arrastre con el dedo derecho para mirar, sin límite de rotación horizontal. Respuesta inmediata parcial y suavizado exponencial entre fotogramas; límite vertical para evitar invertir la vista.
- El modo equilibrado solicita hasta 60 FPS durante el giro de cámara y conserva 30 FPS cuando termina el gesto; el modo ligero mantiene el presupuesto de 30. La tasa efectiva depende del dispositivo.
- Palanca izquierda independiente del dedo de la cámara. Carrera automática mientras se mueve la palanca; se puede desactivar en Ajustes.
- Cinco botones principales: **Atacar**, **Usar magia**, **Escoger magia**, **Usar objeto** y **Saltar**. Se conservan los manejadores de ataque mantenido y salto del juego.
- Selección de técnicas aprendidas y objetos existentes. Lanzar magia usa el maná y tiempo de recuperación originales; consumir objetos descuenta el inventario real.
- Sensibilidad táctil ajustable. Distribución para horizontal y vertical con botones de al menos 48 píxeles; la interacción con puertas, cofres y NPC continúa en su botón contextual.

## Mundo, arte y rendimiento

- Murallas visibles y colisionables en todo el perímetro de las 16 plantas reconstruidas, incluidas las dos del Palacio de Cristal Polar y las tres de Corona Boreal. Solo la planta baja tiene abertura exterior, en su entrada principal.
- Los espacios exteriores sobrantes dejan de contar como salas. La cadena de siete salas principales y las dos ramas opcionales conserva su recorrido y sus escaleras.
- Una partida antigua guardada en un espacio exterior sobrante se recupera en el vestíbulo de esa planta, evitando quedar atrapado detrás de las nuevas murallas.
- Detalles caricaturescos con bordes redondeados y cinco bandas de iluminación. Barriles con tablillas, aros y remaches; fuentes con pilas y chorros; estatuas con pedestal y rostro; bibliotecas, bancos y mesas diferenciados. Cada modelo agrupa sus detalles en una sola malla.
- Materiales de arquitectura con iluminación de caricatura; bloques de hielo pintados con juntas y biseles amplios para dar una lectura más limpia al palacio y castillo polares.
- Marcos y remaches para trampas; se conservan las placas de aviso, alturas, daño y ciclos originales.
- Texturas de personajes compartidas de 256 píxeles en PC y 128 en móvil. El almacenamiento RGBA de esas texturas baja un 75%; esto no representa la memoria total del juego.
- Impactos y efectos de apoyo usan una sola malla de partículas reutilizable: hasta 384 partículas y 16 efectos en PC, 192 y 10 en móvil. El fuego asciende, el hielo se fragmenta en cristales, la naturaleza produce hojas y la tormenta pulsa. Las partículas respetan la profundidad de paredes y objetos.
- Los enemigos validan sus desplazamientos tácticos contra paredes y la superficie transitable. Los habitantes priorizan la amenaza visible más próxima usando una cuadrícula espacial; los caminos pendientes toleran pequeñas variaciones de destino para evitar reiniciar búsquedas constantemente.

## Verificación

`npm run build` integra los fuentes de `src/` en `index.html`, que sigue siendo autónomo. Las pruebas requieren Chromium y las dependencias de desarrollo.

```sh
npm test
npm run test:browser
npm run test:mobile
npm run test:upgrade
npm run profile
```

La prueba nueva recorre los perímetros físicos, comprueba la entrada principal, IA, límites del sistema de efectos y controles móviles. Las pruebas anteriores verifican también recorridos interiores, escaleras, suelo sin parpadeos, oclusión del sol/luna, guardado y recuperación gráfica. Las mediciones con Chromium mediante renderizado por software sirven para comparar geometría y llamadas de dibujo; no garantizan una tasa de fotogramas en todos los teléfonos.

Comparación con `741f094`, semilla 2847, vista de 800 × 450, escala interna 0,6 y sombras desactivadas:

| Medición | Antes | Aurelia 97 |
| --- | ---: | ---: |
| Texturas de personajes, RGBA sin mipmaps | 30 MiB | 7,5 MiB |
| Llamadas de dibujo, vista inicial | 5521 | 5323 |
| Llamadas de dibujo, palacio polar | 180 | 166 |
| Llamadas de dibujo, Corona Boreal | 192 | 178 |
| Triángulos, palacio polar | 37 980 | 39 928 |

El detalle nuevo aumenta la geometría: aproximadamente un 5 % en esa vista polar y un 12 % en la vista inicial. Las mejoras medidas están en memoria de texturas, llamadas de dibujo y límite de asignaciones de los impactos mágicos. Para repetir la referencia anterior: `node tests/profile.cjs --baseline`; se puede elegir otra revisión con `AURELIA_BASELINE_REF`.
