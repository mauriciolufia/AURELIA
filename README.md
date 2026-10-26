# Aurelia RPG

Juego autónomo en `index.html` y `play.html`, ambos con todos los recursos incluidos. Puedes abrir el archivo descargado directamente en un navegador o servir la carpeta con:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Juega en https://mauriciolufia.github.io/AURELIA/. Cualquiera de los dos HTML puede descargarse y abrirse por separado.

La [actualización 121](ACTUALIZACION121.md) corrige el inicio de PC: termina la preparación y la recuperación de la partida antes de habilitar «Comenzar», muestra la etapa de carga y evita renderizar la escena completa detrás de la bienvenida. Mantiene la resolución seleccionada y los archivos autónomos.

La [actualización 120](ACTUALIZACION120.md) restaura los viajes de los 48 viajeros: caminos, conversaciones en tríos y posadas de 18:00 a 6:00, sin entrar en Forjabrasa ni en el territorio de la cordillera. Añade relatos sobre los pueblos y las mercancías que llevan. Duplica la velocidad de los proyectiles y las animaciones mágicas del héroe, manteniendo la recarga de 2,5 segundos.

La [actualización 119](ACTUALIZACION119.md) entrega Elementalista al vencer a Ígneo: +50% de poder elemental durante 15 minutos. Añade Sueño, Petrificación, Congelación, Veneno y Confusión con 50% de éxito contra enemigos y élites, y 20% contra jefes. Fija la recarga en 2,5 segundos y el consumo entre 15 y 500 MP; reorganiza las magias elementales, curaciones y aumentos. Consulta el [catálogo con nombres, niveles, poderes y costes](docs/magias119.md).

La [actualización 118](ACTUALIZACION118.md) duplica el alcance enemigo solo en exteriores y conserva el alcance de fortalezas; duplica la velocidad de ataque y la detección en ambos lugares. Limita a tres los enemigos que pueden perseguir y atacar al héroe simultáneamente. Invierte el espadazo hacia afuera y añade una media luna de viento visible al cortar.

La [actualización 117](ACTUALIZACION117.md) ajusta élites, jefes y guardianes a la misión y planta correspondiente; refuerza el espadazo horizontal y su sonido; limita los avisos de cada líder a dos aliados. Las magias apuntan al enemigo que miras, con línea de visión y alcance real, y permiten un 30% de evasión. Los enemigos anticipan mejor tu movimiento; sus golpes fallan al salir del alcance, permiten un 30% de evasión fuera del contacto cercano y conservan dos técnicas hasta nivel 40 y tres desde el 41.

La [actualización 116](ACTUALIZACION116.md) corrige el error **Failed to fetch** de la carga de imágenes. Restaura el archivo único completo en ambos enlaces y carga las imágenes integradas directamente, sin `fetch`, URLs Blob ni archivos vecinos.

La [actualización 115](ACTUALIZACION115.md) coloca a Berta en la tienda de magia de Valdoria, actualiza la ubicación y las rutinas de los NPC al cambiar la hora en Ajustes y aumenta un **30% la carrera a pie**. Su sistema de carga en archivos separados fue sustituido por la reparación de v116.

La [actualización 114](ACTUALIZACION114.md) reduce el consumo de MP de todas las magias al **25%**, permite vender armas y armaduras sin equipar por el **75%** de su precio, con recompra; amplía los catálogos regionales a un mínimo de **15 armas, 15 armaduras y 15 magias** por pueblo y añade los ocho elementos cada cinco niveles. Corrige la presencia y separación de los NPC, rotula los servicios en el mapa y refuerza los colores vivos. `index.html` conserva el juego autónomo completo.

La [actualización 113](ACTUALIZACION113.md) corrige el desplazamiento táctil de diálogos, tiendas y sabios; mejora detección, acercamiento y puntería enemigos; duplica otra vez su frecuencia de ataque y la EXP de **todos** los enemigos respecto a v112. Cada bloque de diez decisiones contiene **tres técnicas y siete ataques normales**, también en los controladores del Emperador y la invasión.

La [actualización 112](ACTUALIZACION112.md) mejora la reacción visual de los enemigos, duplica su frecuencia de ataque y la EXP de los normales, y aumenta su daño ×1,5. El atlas del celular ocupa todo el visor con textos y controles en una columna derecha; PC conserva su mapa. Añade **1080p · 60 FPS · Colores vivos** en Ajustes.

La [actualización 111](ACTUALIZACION111.md) fija al slime de nivel 1 en **35 ATK** y ajusta proporcionalmente el ataque enemigo. El golpe normal del Emperador quita **1.125 HP**, un octavo de los 9.000 HP de un héroe de nivel 60 con sus cuatro mejores armaduras. Los normales y élites tienen un máximo de **125.000 ATK**; los jefes siguen una curva distinta. Consulta la [comparación por nivel](docs/equilibrio111/COMPARACION.md).

La [actualización 110](ACTUALIZACION110.md) añade **G** para alternar la cámara, magias ofensivas de **100–140.000 de ATK elemental**, MP de **100–5.000** según el nivel y orden por **nivel o alfabético** para Equipo y Magia. El ATK base del héroe va de **20 a 100.000** y las armas duplican su ATK. Conserva los porcentajes de MP de las partidas anteriores.

La [actualización 109](ACTUALIZACION109.md) reduce un 40% el desplazamiento y la frecuencia de ataque de todos los enemigos respecto a la versión anterior, conservando las quince decisiones estratégicas de la IA. Revisa las técnicas por especie y nivel y aumenta un 20% el HP, ATK y DEF base del héroe del nivel 1 al 60, con migración de partidas guardadas.

La [actualización 108](ACTUALIZACION108.md) mejora las franjas de trampas, las estalactitas del techo, la destrucción física de árboles y rocas y las flechas de los enigmas. Los hitos reciben texturas de 2048 píxeles y detalles arquitectónicos a escala. Una cordillera cierra el acceso terrestre al territorio infernal y volcánico; puedes cruzar mediante vuelo, aeronave o teletransportación.

La [actualización 107](ACTUALIZACION107.md) corrige enemigos incrustados en muros, fija dos técnicas hasta nivel 40 y tres desde nivel 41, verifica las arenas movedizas y añade 72 árboles de caramelo. Los comerciantes de castillos atienden de 09:00 a 15:00 y los reyes permanecen en el salón real de 06:00 a 18:00.

La [actualización 106](ACTUALIZACION106.md) suaviza la luz en fortalezas y cavernas, mantiene visibles los detalles y equilibra las antorchas con transiciones graduales, sin ray tracing ni luces adicionales.

La [actualización 105](ACTUALIZACION105.md) aplica la fórmula `(ATK / DEF) × 8`, renueva la progresión de niveles, el equipo y la magia, y limita las variaciones entre enemigos del mismo nivel a ÷1,20–×1,20. El Emperador tiene 48.000 HP, 38.000 ATK y 450 DEF.

La [actualización 104](ACTUALIZACION104.md) amplía la lava y los enemigos de la caverna, añade caídas de lava y cinco muros rompibles, mejora las franjas de trampas y el mapa, y reserva las subidas de las dos montañas a sus caminos. Vado del Sol vende la nave de vuelo por 7500 de oro y tiene un sabio con el catálogo completo de equipo. Las naves aparecen únicamente después de comprarlas.

La [actualización 103](ACTUALIZACION103.md) añade el volcán ampliado, su camino sinuoso y una expedición secundaria de cinco plantas: siete salas grandes, seis grutas medianas y 16 circuitos por nivel, con monstruos de nivel 40–45. Consulta [una imagen por planta con todos sus objetos y peligros](docs/volcano103/).

La [actualización 102](ACTUALIZACION102.md) convierte la Pirámide del Sol Eterno en tres plantas con la mitad de enemigos, añade sellos a los enigmas y fija los horarios públicos de los servicios y el descanso nocturno de los 99 habitantes de los castillos. También añade un camino curvo por la montaña del Yeti, renueva King Candy, reduce la frecuencia de ataques enemigos y amplía cámaras, trampas y decoración de las fortalezas. Comparte el dibujo de barriles y acelera consultas de NPC sin reducir sus texturas.

La [actualización 101](ACTUALIZACION101.md) añade la flecha de misión grande arriba al centro y un botón de mapa en celular, reorganiza los textos y vincula las rutinas de los NPC con los muebles fijos de sus viviendas.

PC conserva sus controles. En celular se activa primera persona, cámara táctil de 360°, palanca con carrera automática y cinco botones: atacar, usar magia, escoger magia, usar objeto y saltar. Puedes cambiar la cámara, sensibilidad y carrera en Ajustes. Consulta [las texturas detalladas](ACTUALIZACION98.md), [el equilibrio de niveles 1–40](ACTUALIZACION99.md) y [la actualización 100: quince rutinas diarias, desplazamientos, asientos y comidas dentro de casas y servicios](ACTUALIZACION100.md).

Las fortalezas reconstruidas tienen siete salas principales consecutivas y dos salas secundarias con pasillos opcionales. La fortaleza corsaria tiene seis salas secundarias por planta, pasillos en zigzag, tres tipos de piratas y a Barbanegra como jefe. Los desvíos permiten explorar sin saltarse las salas del recorrido principal. Las escaleras enlazan el final de cada planta con el principio de la siguiente.

Las partidas se guardan localmente en el navegador. El botón de respaldo JSON está en el menú. Una partida abierta desde un archivo local y otra desde GitHub Pages usan almacenamientos distintos.

Descarga la [guía de atributos, equipo y magia en Word](docs/balance105/Aurelia_v105_Atributos_Equipo_y_Magia.docx), actualizada a la escala v105.

## Validación

```sh
npm ci
npm test
npm run test:scale
npm run test:load
npm run test:load:mobile
npm run test:package
npm run test:schedules
npm run test:web
npm run test:web:mobile
npm run test:residents
npm run test:residents:mobile
npm run test:commerce
npm run test:commerce:mobile
npm run test:interaction
npm run test:interaction:mobile
npm run test:experience
npm run test:experience:mobile
npm run test:enemy-balance
npm run test:enemy-balance:mobile
npm run test:player
npm run test:player:mobile
npm run test:techniques
npm run test:techniques:browser
npm run test:techniques:mobile
npm run test:world-update
npm run test:world-update:mobile
npm run test:scale:browser
npm run test:lighting
npm run test:lighting:mobile
npm run test:enemy-collision
npm run test:enemy-collision:mobile
npm run test:volcano-plan
npm run test:update
npm run test:update:mobile
npm run test:volcano
npm run test:volcano:mobile
CHROMIUM_PATH=/usr/bin/chromium npm run test:fortress
CHROMIUM_PATH=/usr/bin/chromium npm run test:browser
CHROMIUM_PATH=/usr/bin/chromium npm run test:mobile
CHROMIUM_PATH=/usr/bin/chromium npm run test:upgrade
CHROMIUM_PATH=/usr/bin/chromium npm run test:ai-quality
CHROMIUM_PATH=/usr/bin/chromium npm run test:balance
CHROMIUM_PATH=/usr/bin/chromium npm run test:daily
```

La aplicación no requiere Node.js ni instalación de paquetes para jugar. Playwright se usa únicamente para las pruebas. `CHROMIUM_PATH` debe apuntar a un Chromium instalado. El informe y la captura de las pruebas se escriben en `/tmp/aurelia-regression`; se puede cambiar esa carpeta con `AURELIA_TEST_OUTPUT`.

La prueba de navegador expone el estado interno solamente en una respuesta HTML interceptada durante la prueba. Esa interfaz no se incluye en el juego publicado.

Consulta [las 20 correcciones](CORRECCIONES.md). Las pruebas cubren las rutas y colisiones de 18 plantas reconstruidas, los pisos de las 28 plantas, escaleras, ocultación del cielo, guardado, controles y recuperación gráfica. No equivalen a completar toda la campaña ni garantizan el mismo rendimiento en todos los dispositivos.
