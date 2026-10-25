# Actualización 115 · Valdoria, horarios, arranque y carrera

La carga en archivos separados descrita aquí fue sustituida por la [reparación v116](ACTUALIZACION116.md). Los cambios de Valdoria, horarios y carrera siguen vigentes.

Berta, la vendedora de magia de **Valdoria**, estaba vinculada a la casa de misiones, aunque su trabajo era el de maga. La casa quedaba a unos 190 metros de la tienda señalada en el mapa. Ahora comerciantes, magos y posaderos reciben la vivienda correspondiente a su servicio **antes** de asignar las camas y las mesas. Berta tiene su cama y mesa en la tienda de magia y se puede hablar con ella y abrir su catálogo allí.

Al cambiar la hora en Ajustes, todos los habitantes disponibles se colocan según su rutina actual, incluso mientras el juego está pausado por el menú. Se eliminan las rutas pendientes de la hora anterior y se mantienen las reservas de sus muebles fijos. Durante la noche buscan su cama; durante el día respetan el hogar, las salidas y los puestos del castillo. Los personajes muertos o controlados por una escena o invasión conservan su estado.

Los servicios de pueblos siguen en casa de **10:00 a 12:00** y de **16:00 a 10:00 del día siguiente**. Entre las 12:00 y las 16:00 pueden salir. Los horarios anteriores de los castillos se conservan. Al cerrar Ajustes continúan sus actividades y sus recorridos; el cambio manual de hora no los deja inmóviles.

La carrera a pie pasa de **27 a 35,1 unidades por segundo**, un aumento del **30%**. Se aplica al botón de correr, Shift y la carrera automática del celular. Caminar, volar, montar y los multiplicadores de estados conservan sus reglas anteriores. Los subpasos de colisión siguen funcionando con la nueva velocidad.

## Carga del navegador

`play.html` contiene el mismo juego con las imágenes en archivos independientes con nombres derivados de su contenido. El navegador puede descargar esos archivos en paralelo y reutilizarlos al volver a abrir el juego o cuando cambia el código. Los planos de la caverna se descargan al consultarlos. Las imágenes conservan sus dimensiones; el Sol y la Luna usan WebP sin pérdida, con comparación de sus píxeles RGBA contra los PNG originales.

La edición web omite del HTML los datos antiguos de texturas que el sistema de atlas actual ya había sustituido. Conserva los murales que todavía se utilizan. El HTML completo `index.html` mantiene todos los datos originales y funciona como archivo autónomo; desde la web se puede abrir con `?completo=1`. La entrada principal de GitHub Pages redirige a la edición web conservando los parámetros y el fragmento de la URL. Ambas comparten el origen y las partidas guardadas.

La primera descarga pasa de aproximadamente **17,68 MB** del HTML comprimido a **9,92 MB**, contando el HTML web comprimido y todas las texturas necesarias al inicio: alrededor de **44% menos**. Los valores exactos y las identidades de los archivos están en [el manifiesto generado](assets/game115/manifest.json).

Los diez atlas se procesan con dos cargas simultáneas. Cada imagen se carga desde una URL temporal que se revoca después de copiar sus diez texturas, antes de construir el mundo. Las láminas completas suman unos 60 MiB de píxeles RGBA; las dos mayores suman unos 12 MiB. Estos datos describen las imágenes temporales, no el consumo total del navegador. La prueba compara los píxeles de las texturas resultantes con el método anterior de carga.

La construcción del mundo también usa índices incrementales de pisos y escaleras, invalidados al reconstruir las colisiones, y un índice de los muros que pueden cortar cada franja de trampa. Se conserva la geometría de las trampas, las colisiones, los modelos, los habitantes y la resolución. La duración final depende del dispositivo y de la conexión; no se promete un tiempo fijo de apertura.

## Comprobaciones

- Ubicación de Berta en la casa señalada como magia, mobiliario propio, modelo visible e interacción real con el catálogo.
- Cambio de hora mediante los eventos reales del control de Ajustes a las 10:30, 13:30, 18:00, 23:30 y 05:30; ubicación de 48 servicios, puestos públicos y camas de los habitantes disponibles.
- Continuación de los recorridos después del cambio de hora; velocidad física de caminar, correr, Shift, vuelo y carrera automática táctil.
- Actualización e invalidación del índice de pisos; comparación de 56 franjas de trampas con el barrido completo anterior.
- Conservación de 469 NPC, 6.261 registros de actores, los diez atlas y la imagen de 1920 × 1080 en Colores vivos.
- Comparación de 30 texturas recortadas con los píxeles originales y comprobación del límite de dos imágenes temporales y de la liberación de las diez láminas.

```sh
npm run build
node tests/web-package115.cjs
npm run test:web
npm run test:web:mobile
node tests/update115.cjs --offline
npm run test:residents:mobile
npm test
npm run test:scale
npm run test:techniques
```
