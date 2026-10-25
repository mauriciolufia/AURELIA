# Actualización 116 · Reparación del archivo del juego

La nueva edición `play.html` de v115 dependía de imágenes situadas en una carpeta vecina y de `fetch` para leerlas. Guardar únicamente ese HTML, moverlo o abrirlo en un visor que restringe esas peticiones podía impedir el inicio con errores como **Failed to fetch**. Se reprodujo el fallo con el archivo separado de sus imágenes: el botón de inicio permanecía deshabilitado y aparecía un error de carga.

Se restaura el formato autónomo completo en **ambos enlaces**, `index.html` y `play.html`. Son copias idénticas con las 17 imágenes integradas y todas las texturas originales, incluidos los datos de reserva. Se elimina la redirección automática y la dependencia de carpetas de imágenes para jugar. Los archivos externos de v115 permanecen publicados para que las páginas antiguas todavía abiertas puedan utilizarlos.

Los atlas vuelven a leerse mediante `Image` y sus datos integrados. El inicio no necesita `fetch`, URLs Blob ni conexión para las imágenes. Se mantiene el procesamiento de dos láminas a la vez y se comunica el nombre del atlas si el contenido integrado estuviera dañado.

Se conservan la tienda de Berta en Valdoria, el cambio de rutinas al ajustar la hora, la carrera un 30% más rápida, la venta al 75% y el consumo de MP al 25% anterior. Esta reparación prioriza la apertura correcta del archivo completo; ya no se aplica la reducción de descarga de la edición dividida de v115.

## Validación

- Ambos archivos son idénticos, sin redirecciones ni imágenes de inicio externas.
- Arranque desde un nombre de archivo distinto, bloqueando `fetch` con el mismo error que notificó el usuario.
- Arranque y acciones con la red desconectada después de recibir el HTML.
- Interacción con Berta, horarios, camas, continuidad de rutinas y velocidad de carrera.
- Comparación exacta de las texturas con la carga original y dibujo real del mundo mediante WebGL.

```sh
npm run build
npm run test:package
npm run test:load
npm run test:load:mobile
```
