# Aurelia RPG

Juego autónomo en `index.html`, con los recursos incluidos. Puedes abrir el archivo descargado directamente en un navegador o servir la carpeta con:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Juega en https://mauriciolufia.github.io/AURELIA/.

La [actualización 103](ACTUALIZACION103.md) añade el volcán ampliado, su camino sinuoso y una expedición secundaria de cinco plantas: siete salas grandes, seis grutas medianas y 16 circuitos por nivel, con monstruos de nivel 40–45. Consulta [una imagen por planta con todos sus objetos y peligros](docs/volcano103/).

La [actualización 102](ACTUALIZACION102.md) convierte la Pirámide del Sol Eterno en tres plantas con la mitad de enemigos, añade sellos a los enigmas y fija los horarios públicos de los servicios y el descanso nocturno de los 99 habitantes de los castillos. También añade un camino curvo por la montaña del Yeti, renueva King Candy, reduce la frecuencia de ataques enemigos y amplía cámaras, trampas y decoración de las fortalezas. Comparte el dibujo de barriles y acelera consultas de NPC sin reducir sus texturas.

La [actualización 101](ACTUALIZACION101.md) añade la flecha de misión grande arriba al centro y un botón de mapa en celular, reorganiza los textos y vincula las rutinas de los NPC con los muebles fijos de sus viviendas.

PC conserva sus controles. En celular se activa primera persona, cámara táctil de 360°, palanca con carrera automática y cinco botones: atacar, usar magia, escoger magia, usar objeto y saltar. Puedes cambiar la cámara, sensibilidad y carrera en Ajustes. Consulta [las texturas detalladas](ACTUALIZACION98.md), [el equilibrio de niveles 1–40](ACTUALIZACION99.md) y [la actualización 100: quince rutinas diarias, desplazamientos, asientos y comidas dentro de casas y servicios](ACTUALIZACION100.md).

Las fortalezas reconstruidas tienen siete salas principales consecutivas y dos salas secundarias con pasillos opcionales. La fortaleza corsaria tiene seis salas secundarias por planta, pasillos en zigzag, tres tipos de piratas y a Barbanegra como jefe. Los desvíos permiten explorar sin saltarse las salas del recorrido principal. Las escaleras enlazan el final de cada planta con el principio de la siguiente.

Las partidas se guardan localmente en el navegador. El botón de respaldo JSON está en el menú. Una partida abierta desde un archivo local y otra desde GitHub Pages usan almacenamientos distintos.

## Validación

```sh
npm ci
npm test
npm run test:volcano-plan
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
