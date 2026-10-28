# Aurelia RPG · actualización 133

Distribución final de las texturas del Trono del Eclipse:

- Planta 4: basalto y obsidiana con magma brillante, sellos rituales y relieves de cráneos.
- Planta 5: metal infernal quemado, remaches, rejillas, brasas y grabados demoníacos.
- Planta 6: piedra violeta y ornamentación imperial dorada con motivos de eclipse. Conserva su salón un 30 % más alto.

Se comparten nueve materiales y texturas de 512 px en PC o 256 px en móvil. Se mantienen las agrupaciones de la arquitectura y la carga por plantas. No se añaden luces, partículas ni animaciones a las superficies.

El Emperador Supremo se activa desde cualquier punto del salón, se desplaza mientras espera un turno de ataque y sigue moviéndose durante sus cuatro técnicas. Cuando pierde la visión, busca al jugador. Un control de progreso calcula rutas alrededor de obstáculos de forma incremental, con un máximo de 16 nodos por fotograma. Se conservan las colisiones, los aturdimientos y el límite de tres atacantes simultáneos. [Detalles del controlador](ACTUALIZACION132.md).

La población hostil del exterior del último bioma se reduce a la mitad. La selección es determinista para conservar la identidad de los enemigos de las partidas guardadas. Se protegen enemigos de misiones, llaves, élites y jefes, y se conservan los interiores y los demás biomas. La población retirada sale también de los registros de dibujo, simulación y reaparición, sin conceder muertes ni recompensas. En la partida de prueba se pasa de 496 a 248 enemigos exteriores, incluidos los 16 protegidos.

Validación conjunta: `npm run test:eclipse:133` y `npm run test:eclipse:133:mobile`. Se comprueban la asignación real de materiales, el dibujo de las tres plantas sin errores de WebGL, persecución desde más de 80 metros, las cuatro técnicas y su daño, movimiento sin turno de ataque, aturdimiento, salida de una barrera física en U sin teletransporte ni colisiones atravesadas, y persistencia de la población reducida al guardar, cargar y volver al bioma.
