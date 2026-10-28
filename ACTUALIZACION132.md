# Aurelia RPG · actualización 132

Incluye las nuevas [texturas infernales de las plantas 4, 5 y 6](ACTUALIZACION131.md) y corrige la inmovilidad del Emperador Supremo al combatir en el salón final.

Antes, el jefe detenía toda su lógica de movimiento si no recibía un turno de ataque. Su radio de detección de 48 metros también podía dejarlo inmóvil con el jugador dentro del mismo salón, pero en el extremo opuesto. Ahora la presencia del jugador en la sala activa al jefe y le da prioridad para obtener uno de los tres turnos de ataque existentes; puede desplazarse aunque tenga que esperar ese turno. La línea de visión sigue siendo necesaria para lanzar ataques.

El jefe sigue moviéndose durante la preparación de sus cuatro técnicas y busca al jugador cuando pierde la visión. La dirección de evasión incluye el retroceso. Si no logra avanzar hacia su objetivo, calcula una ruta alrededor de los obstáculos en pequeñas porciones, con un máximo de 16 nodos por fotograma y un presupuesto de tiempo de 1,2 ms en PC o 0,7 ms en móvil. El movimiento conserva las colisiones y no teletransporta al jefe. Los aturdimientos y otros estados incapacitantes siguen deteniéndolo; salir de la sala limpia el combate.

Validación: `node tests/emperor132.cjs` prueba persecución desde el extremo opuesto de la sala, técnicas, daño, límite de atacantes, movimiento sin turno de ataque, aturdimiento y recuperación frente a una barrera física en U.
