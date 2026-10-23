# Aurelia v108 · Trampas, hitos y frontera volcánica

Las franjas de picos, veneno, oscuridad y fuego se ajustan al suelo transitable y a los muros reales. Las trampas adicionales de salas reconstruidas se sitúan en pasillos principales; el cruce se comprueba también entre fotogramas y durante un salto. Se añade una franja extra por planta reconstruida y fuego en la Fortaleza de las Dunas y la fortaleza corsaria. Las quince cascadas de lava de la caverna se extienden hasta las paredes; conservan su aviso y su pausa. La caverna sigue sin gas.

Los picos de hielo del techo conservan una estalactita fija y desprenden picos independientes cada tres segundos, sin placas ni anillos en el suelo y sin ascenso de regreso. También hay estalactitas de piedra. Cada caída puede dañar una sola vez al jugador.

Los ataques físicos pueden destruir árboles, palmeras, cactus y rocas del exterior. Cada árbol conserva la propiedad de su tronco, ramas y copa, incluso cuando comparte un dibujo con otros árboles o se combina en sectores. Destruirlo retira sus piezas y desactiva sus colisiones; el estado se guarda y se aplica al volver a cargar los sectores o la partida. Las construcciones y los monumentos se conservan.

Resolver una estatua revela flechas turquesas sobre el suelo que apuntan al paso abierto. Funcionan en las fortalezas, las tres plantas de la Pirámide del Sol Eterno y los cinco niveles de la caverna. La visibilidad depende del enigma guardado y de la planta actual; las respuestas incorrectas mantienen el sello cerrado.

La mejora gráfica se concentra en los hitos. Las nuevas texturas de piedra, madera y tejado se dibujan a 2048 × 2048 píxeles, frente a los 256 × 256 anteriores: 64 veces más píxeles, con vetas, juntas, desgaste y relieves finos. Se comparten entre edificios para contener el uso de memoria. Las juntas y las vetas mantienen su escala por metros incluso en paredes curvas y sectores combinados. Puertas y ventanas incorporan marcos, paneles, herrajes, molduras y alféizares a escala humana. Las ventanas de los molinos se colocan sobre su pared cónica, en vez de quedar enterradas. Los hitos reciben detalles propios: carpintería de molinos, arcos del caravasar, costillas navales, dovelas del acueducto, marcas astronómicas y cubiertas adaptadas al clima de los refugios. Se conserva el estilo caricaturesco y no se utiliza ray tracing.

Una cordillera continua de picos de roca volcánica cierra la frontera exterior de la unión de los biomas infernal y volcánico, incluidos sus límites con selva y nieve. Los dos biomas permanecen conectados entre sí. El paso terrestre y los saltos quedan bloqueados; se puede acceder con teletransportación, aeronave o vuelo normal. La geometría se dibuja por sectores con instancias compartidas. Los enemigos se vuelven a verificar después de construir la frontera.

Comprobaciones reproducibles:

```sh
npm run build
npm test
npm run test:scale
npm run test:world-update
npm run test:world-update:mobile
```

La prueba de actualización comprueba franjas contra sus paredes, daño en los bordes y en altura, ciclos del techo, destrucción mediante ataques reales, guardado y carga, piezas de árboles compartidos, respuestas correctas e incorrectas, flechas de suelo, dimensiones de texturas y huecos, continuidad de la cordillera, vuelo normal, aeronave y teletransportación. También revisa que enemigos y habitantes no queden dentro de la nueva frontera.

Validado en Chromium para PC y con pantalla, agente y controles táctiles de celular: 498 franjas, ocho grupos de estalactitas, 24 estatuas, 220 tramos de frontera y 5460 enemigos libres de paredes. También pasan la topología de salas, la escala de combate y la regresión de nave, caverna, muros rompibles, mapa y Teletransportación 2.
