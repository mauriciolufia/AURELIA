# Aurelia RPG · actualización 126

Las 46 cámaras principales del Trono del Eclipse tienen tres o cuatro enemigos asignados cada una: 160 en total, incluido el Emperador Supremo. Las dos primeras plantas pasan de 84 y 85 a 38 enemigos cada una; las otras cuatro tienen 21. Se conservan los actores de misión y las bajas al cargar partidas. Los actores retirados no conceden experiencia ni botín y no reaparecen.

El renderizado del interior evita actualizar matrices de plantas y objetos ocultos. Las decoraciones estáticas tardías se agrupan y sus transformaciones constantes se calculan una vez. Lejos de la entrada, el exterior y terreno ocultos por el castillo se omiten solo durante el dibujo; al salir vuelven inmediatamente. Se mantienen la resolución, texturas, trampas, interacciones, escaleras y las cuatro técnicas del jefe.

El objetivo es reducir la carga para acercarse a 60 FPS (16,7 ms por fotograma). No se garantiza esa tasa en todos los equipos: la medición automática usa Chromium y renderizado por software, que no representa una GPU de juego. `npm run profile:eclipse` registra tiempos de CPU, llamadas de dibujo y triángulos por planta; `--before` usa la versión 125 para comparación. Los tiempos de CPU excluyen el trabajo de GPU y no equivalen a FPS completos.

Verificación: `npm run test:eclipse:126`, `npm run test:eclipse:126:mobile`, `npm run test:package`, `npm test`, `npm run test:scale` y `npm run test:techniques`.

En la prueba móvil del salón final, con la misma cámara y las cuatro técnicas, las llamadas de dibujo pasan de 534 (v125) a 167 y los triángulos de 129.125 a 14.593. Es una reducción de aproximadamente el 69% de llamadas y el 89% de triángulos; no equivale por sí sola a una medida de FPS.
