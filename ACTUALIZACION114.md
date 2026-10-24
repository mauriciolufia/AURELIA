# Actualización 114 · Habitantes, comercio y carga móvil

Todas las magias consumen ahora **una cuarta parte del MP anterior** (reducción del 75%), incluidas curación, apoyo, exploración y teletransportación. Las fracciones de MP conservan el descuento exacto: 14 → 3,5 MP, 24 → 6 MP y 65 → 16,25 MP. Los costes mostrados y las comprobaciones de maná usan el mismo dato; cargar o recalibrar el mundo no acumula el descuento.

Las tiendas de equipo tienen una pestaña **Vender**. Las armas, cascos, armaduras, botas y escudos que posees y no llevas equipados devuelven el **75% de su precio**, redondeado hacia abajo al oro entero. No puedes vender dos veces el mismo objeto ni vender equipo puesto. La misma tienda permite recomprarlo a su precio original; el registro de recompra se conserva en la partida guardada.

Los nueve pueblos amistosos disponen de al menos **15 armas, 15 piezas de armadura y 15 magias distintas**, además del equipo anterior. Las nuevas piezas tienen nombres e identificadores estables y estadísticas acordes al intervalo de nivel del bioma. Hay **279 piezas regionales** nuevas. Nocteverde conserva su población hostil.

Cada uno de los ocho elementos —Fuego, Hielo, Rayo, Viento, Tierra, Naturaleza, Luz y Sombra— tiene una técnica inicial y otra en los niveles **5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55 y 60**: **104 técnicas ofensivas nuevas**. Conservan la curva de poder elemental de 100 a 140.000. Cada escuela ofrece los grados de su región y siete técnicas de apoyo; Forjabrasa también ofrece los grados superiores como escuela maestra. Las compras respetan el nivel requerido, el precio y el MP.

Los comerciantes, magos, posaderos, sacerdotes, sabios y personajes de misión de los pueblos permanecen en sus propias casas de **10:00 a 12:00** y de **16:00 a 10:00 del día siguiente**. Entre las 12:00 y las 16:00 realizan actividades exteriores; empiezan a regresar a las 15:30. Se reconcilian las rutinas de lugares lejanos antes de visitarlos y se repara la carga de los modelos cercanos, sin duplicar NPC ni resucitar personajes muertos. Los personajes cercanos recorren las puertas. Los horarios anteriores de los castillos siguen vigentes.

Se corrigieron posiciones de aparición repetidas y se añadió separación entre habitantes al caminar y al elegir destinos. Las comidas y el descanso conservan sus mesas, sillas y camas asignadas. El sabio Oriel utiliza la vivienda que corresponde a su letrero.

El mapa de cada pueblo muestra **Tienda, Posada, Magia, Misiones, Iglesia y Sabio**, según los servicios presentes. Los nombres tienen contorno, se distribuyen para evitar superposición y permiten marcar la casa como destino. En celular conservan el mapa a toda la altura y la columna derecha; los controles de PC se mantienen.

El modo **1080p · 60 FPS · Colores vivos** aumenta su saturación de 1,30 a 1,55 y añade un contraste suave. Mantiene el mismo tamaño de imagen, modelos, texturas y filtro independiente de oscuridad de las fortalezas.

## Carga y rendimiento

GitHub Pages ya sirve el juego con compresión HTTP gzip. Se conserva la carga directa y el HTML autónomo completo.

Una partida nueva evita aplicar una restauración vacía que repetía la preparación del mundo. En celular, el seguimiento de actores consulta celdas cercanas y conserva los actores cargados para descargarlos correctamente; también rastrea desplazamientos y apariciones tardías. Los pisos y escaleras usan índices espaciales y las comprobaciones de polígonos consultan solo las aristas relevantes. Las consultas idénticas de suelo y paso se reutilizan dentro del mismo fotograma. La búsqueda de enemigos con diálogo consulta una lista conservando el orden original y las apariciones nuevas. La revisión periódica de salud de actores se reparte entre fotogramas y se evita dibujar el minimapa mientras su elemento está oculto. No se rebajan resolución, texturas, geometría ni población.

Consulta el [perfil comparativo de lógica móvil](docs/performance114/README.md).

El objetivo sigue siendo 60 FPS; el resultado real depende del equipo. El perfil automatizado mide lógica con el renderizado desactivado y no constituye una medición de FPS de una GPU de teléfono.

## Validación

Las pruebas de residentes comprueban los 469 habitantes, la presencia de todos los emisores de misiones, 48 servicios, horarios a ambos lados de medianoche, selección de cada servicio, separación y movimiento real por las puertas. Comparan los índices de pisos, escaleras y polígonos contra las funciones originales, incluidas fronteras y huecos.

Las pruebas de comercio comprueban los catálogos de todos los pueblos, lanzamiento real y gasto de MP de las 104 técnicas nuevas, compras, aprendizaje, venta, protección de equipo puesto, recompra y restauración de partidas. Los botones de venta y recompra se ejercitan mediante clic o toque real. También verifican los títulos del mapa en vertical y horizontal y la resolución de colores vivos.

```sh
npm run build
npm test
npm run test:scale
npm run test:techniques
npm run test:residents
npm run test:residents:mobile
npm run test:commerce
npm run test:commerce:mobile
npm run test:interaction:mobile
npm run test:experience
npm run test:experience:mobile
npm run test:enemy-balance:mobile
npm run profile:mobile
```
