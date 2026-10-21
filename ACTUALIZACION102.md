# Actualización 102

La Cumbre del Yeti tiene un camino de montaña continuo, de siete metros de ancho, con tres vueltas y media alrededor de la ladera. Une el pie de la montaña con la cumbre mediante curvas y una pendiente gradual. La calzada, los taludes y el suelo físico comparten la misma función de altura; el ascenso usa los controles normales de caminar, también con la palanca táctil. Se conservan el Yeti de nivel 48 y su tesoro. Los hitos del sendero anterior se redistribuyen junto al camino.

Los enemigos atacan al 40% de la frecuencia anterior: los intervalos entre ataques se multiplican por 2,5. Se conservan el daño de cada golpe, la velocidad de desplazamiento, las trayectorias y el límite de dos técnicas para niveles 1–40. Se incluyen los relojes de ataques normales, técnicas, enemigos marinos, emperador y demonio de asedio. El veneno causado por enemigos pulsa cada cinco segundos; el veneno de trampas conserva su ciclo anterior.

Cada fortaleza tiene de cuatro a seis cámaras con muros rompibles, distribuidas con una semilla y alejadas de la entrada. Dos cámaras contienen guardias de púas de nivel 15–50 según la fortaleza. Los muros tienen una resistencia que permite romperlos también con el equipo inicial. Sus aperturas eliminan la colisión y se guardan en la partida. Los tesoros anteriores permanecen disponibles.

Se añaden barriles interactivos, estandartes, restos de piedra, desvíos de laberinto y trampas. Hay lanzadores de flechas desde los muros, con aviso previo, y vapor tóxico que resta HP. Los desvíos conservan el recorrido obligatorio por las salas principales y el acceso a los pasillos opcionales. Las trampas de oscuridad aparecen en seis de las catorce fortalezas: es el entero más próximo al 40%. La maldición deja una tenue visibilidad en lugar de negro absoluto; Luz Divina restaura la iluminación.

King Candy tiene un cuerpo humano articulado: señor mayor parcialmente calvo, pelo blanco a los lados y atrás, traje real, corona y una piruleta en la mano. Conserva su identidad, nivel, estadísticas y técnicas de jefe. La piruleta usa una textura nueva de 1024 píxeles.

El rendimiento se mejora compartiendo el dibujo de los barriles con la misma geometría, materiales y texturas originales, consultando habitaciones y actores de puertas por cercanía, y actualizando la oscuridad solo cuando cambia su estado. El vapor comparte geometría y anima su volumen en la GPU. No se reduce la resolución de las texturas ni se eliminan objetos interactivos. La superficie de la montaña aumenta de 64 a 128 divisiones para representar mejor los bordes de la carretera.

Se retiran los NPC humanos amistosos de Nocteverde, incluidos los dos comerciantes que reaparecían mediante la generación de servicios. Sus equipos y magias se ofrecen en Forjabrasa para conservar el acceso al catálogo avanzado. Los enemigos de Nocteverde permanecen.

La isla corsaria conserva sus tres plantas y su misión. Cada planta tiene siete salas principales y seis secundarias, con pasillos en zigzag y cámaras de bodega, cocina, navegación, pólvora y reliquias. Los enemigos incluyen saqueadores, pistoleros y contramaestres piratas; el jefe es Barbanegra, con barba negra, sombrero, sable y pistolas. La isla recibe palmeras curvas, arena detallada en el exterior, banderas de calavera, cañones, cajas y restos navales. La decoración y las palmeras comparten el dibujo cuando es posible.

La retirada de los humanos de Nocteverde deja 468 NPC amistosos en el resto del mundo, con sus viviendas y rutinas. Si una posición inicial queda bloqueada sin salida cercana, el NPC usa un punto libre junto a un mueble de su propia casa.

La Pirámide del Sol Eterno tiene tres plantas conectadas por dos escaleras y 27 salas en total. La guarnición pasa de 64 enemigos a 32, contando los dos guardias de cámaras secretas; el faraón se conserva aparte. Los supervivientes se reparten entre las tres plantas. El jefe y el tesoro están en la última planta, con salida de vuelta al desierto.

Las catorce estatuas de enigma tienen un sello invisible de altura completa en el paso correspondiente. La respuesta incorrecta lo conserva; la correcta elimina su colisión y actualiza las rutas. El sello también impide atravesarlo con magia. Una partida anterior situada después de un sello nuevo sin resolver vuelve al lado accesible de esa estatua; los enigmas ya resueltos conservan su posición y progreso.

Los doce personajes de servicio de los castillos —armeros, maestros de magia, sacerdotes y reyes— trabajan y se mueven cerca de sus puestos o del trono entre las 06:00 y las 23:00. Tienen quince interacciones propias de su función y pueden conversar en zonas públicas. Solo usan sus camas propias para dormir de 23:00 a 06:00. Las armerías se atienden en el salón público, junto a expositores de armadura; no invaden los dormitorios. Se añaden mesas y sillas fijas junto a los puestos públicos, manteniendo libre el pasillo de las habitaciones. Las comidas requieren mesa y asiento fijos cerca del puesto; no regresan a los dormitorios para comer durante el horario público. Los 99 habitantes de los tres castillos, incluidos los personajes de servicio, duermen de 23:00 a 06:00 en sus camas asignadas y después retoman sus actividades; no solo el rey. Las rutinas lejanas de todos ellos se actualizan al cambiar entre día y noche, también si dejan el rango visible mientras caminan. Las rutas públicas compartidas conectan la puerta principal, los pasillos y las escaleras; las compuertas se levantan para no atrapar a un NPC al girar. Las rutas se preparan antes de comenzar a jugar.

## Comprobación

```sh
npm run build
npm test
CHROMIUM_PATH=/usr/bin/chromium npm run test:fortress
CHROMIUM_PATH=/usr/bin/chromium node tests/fortress102.cjs --pc-only --court-live
CHROMIUM_PATH=/usr/bin/chromium node tests/fortress102.cjs --pc-only --castle-only --castle-all-live
CHROMIUM_PATH=/usr/bin/chromium npm run test:browser
CHROMIUM_PATH=/usr/bin/chromium npm run test:upgrade
CHROMIUM_PATH=/usr/bin/chromium npm run test:balance
```

En una escena de prueba con dieciséis barriles, el dibujo compartido reduce las llamadas de dibujo de 16 a 1 y mantiene los mismos 15.808 triángulos y la textura de 2048 píxeles. En el mundo se agrupan 396 mallas detalladas de barriles en 28 llamadas de dibujo, manteniendo cada objeto interactivo. Estas cifras describen los barriles, no el coste total de renderizar el mundo.

La prueba de fortalezas abre cada muro con la espada, comprueba la colisión antes y después, recorre el camino completo del Yeti mediante el controlador real de caminar en PC y celular, valida trampas, salas obligatorias, aspecto de King Candy, guardias y equivalencia de las consultas espaciales. Las capturas se escriben en `/tmp/aurelia-102`.

Las pruebas de navegador usan Chromium con renderizado por software en este entorno. Verifican funcionamiento y recursos, pero no garantizan una cifra de FPS para todos los teléfonos o computadoras.
