# Aurelia 100: vida diaria dentro de casas y servicios

Se sustituye el controlador interior de la versión 99. Preparar un grafo completo antes de mover al personaje podía dejarlo quieto varios segundos al compartir el trabajo entre muchos NPC. Las pruebas anteriores invocaban el controlador directamente y no detectaban esa espera en el ciclo completo del juego.

Ahora los personajes comienzan con un desplazamiento corto y libre dentro de su área, sin esperar ese grafo. Las rutas más largas se calculan bajo demanda y dan prioridad a los personajes cercanos al jugador. Se comprueban paredes, planta, huellas de mesas, camas, cocinas y estanterías, además de otros NPC. Se permiten pasos cortos en rincones estrechos. Se elimina también una recolocación que inmovilizaba al sabio en su atril y se desactiva el empuje del controlador antiguo para los personajes que ya tienen separación propia, evitando que los desplace dentro de un mueble.

Otra causa del bloqueo era consultar el suelo usando la altura del jugador: al subir el observador a otra planta, podía fallar la navegación de un NPC situado abajo. Las consultas interiores ahora usan la planta propia del personaje, sin cambiar la posición final del jugador. Se prueba el movimiento tanto con el observador en su misma planta como por encima de ella.

## Quince rutinas diarias

1. Estirarse al despertar.
2. Lavarse las manos.
3. Comer sentado.
4. Caminar dentro de casa.
5. Trabajar.
6. Atender a los viajeros.
7. Ordenar sus cosas.
8. Barrer.
9. Preparar la comida.
10. Leer.
11. Sentarse a descansar.
12. Conversar.
13. Revisar la casa.
14. Rezar.
15. Prepararse para dormir.

La hora del mundo determina la actividad principal: hay momentos para despertar, comer, trabajar y descansar. Entre ellas se alternan tareas, con variaciones entre personajes. Un NPC llega al destino antes de realizar su actividad; el reloj no cancela constantemente el trayecto. Se recupera de pasos bloqueados y vuelve a buscar un recorrido.

## Asientos y comidas visibles

Se registran los asientos al construir los muebles, antes de agrupar la decoración para renderizarla. Los personajes reservan un asiento libre de su habitación para sentarse, comer o leer. Se corrige la orientación de las sillas para que miren hacia las mesas.

La pose sentada incorpora muslos, rodillas y piernas flexionadas; al levantarse reaparecen las piernas de marcha. Al comer se muestra un cuenco con comida y una cuchara animada, con brazos flexionados y manos que acompañan el movimiento. Estos accesorios se crean al acercarse al personaje y comparten geometrías y materiales. Si un servicio sin vivienda no tiene un asiento utilizable dentro de su área permitida, aparece un taburete portátil durante la actividad. Los NPC no atraviesan la mesa para alcanzar una silla.

Se conservan los identificadores de los personajes, las tiendas, las posadas y los vínculos de misiones. El equilibrio de enemigos de la versión 99 y los controles de PC y celular permanecen activos.

## Verificación

```sh
npm run build
npm test
npm run test:daily
node tests/daily-life.cjs --mobile
npm run test:balance
npm run test:ai-quality
npm run test:upgrade
npm run test:mobile
npm run test:browser
```

La nueva prueba usa el callback real de cada fotograma. No llama directamente al controlador del NPC ni adelanta su reloj de IA. Mide el desplazamiento de personajes de misión, mercaderes y posaderos al entrar en su zona, comprueba sus coordenadas en la escena renderizada, recorre las quince rutinas y verifica comidas y poses sentadas. Comprueba colisiones y servicios, y genera una captura de un NPC comiendo dentro del mundo real del juego. El modo demo existente evita que el jugador de prueba muera mientras observa las zonas hostiles.

Los personajes lejanos continúan usando el ahorro de simulación del juego. Sentarse, comer y descansar incluyen pausas con animación; no significan quedarse bloqueado de pie. Las comprobaciones automáticas no equivalen a completar toda la campaña.
