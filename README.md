# Aurelia RPG

Juego autónomo en `index.html`, con los recursos incluidos. Puedes abrir el archivo descargado directamente en un navegador o servir la carpeta con:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Juega en https://mauriciolufia.github.io/AURELIA/.

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
