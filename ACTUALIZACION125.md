# Aurelia RPG · actualización 125

El Castillo del Eclipse tiene seis plantas. Las plantas 4, 5 y 6 conservan las seis salas y el recorrido de la tercera, con variaciones discretas de color sobre sus materiales. Tres escaleras físicas adicionales conectan los pisos a intervalos de 18 metros, con huecos en los suelos y techos. Las nuevas plantas tienen guarniciones limitadas para contener el coste de simulación. La tercera conserva su reducción de enemigos.

El Emperador Supremo ocupa el salón de la sexta planta. Su controlador camina también durante las preparaciones, busca posiciones laterales, se aproxima para los ataques cortos y prueba direcciones alternativas ante obstáculos. Alterna cuatro técnicas: Tríada de energía imperial, Onda de oscuridad, Pulso sísmico imperial y Tajo del Emperador Supremo. Las colisiones del salón y los estados incapacitantes siguen vigentes. El encuentro conserva el límite de tres atacantes y reserva al jefe una plaza cuando es posible.

Las trampas de daño y efectos negativos pierden los antiguos colisionadores de barrera de los cruces E. Mantienen sus ciclos, daño, estados, comprobaciones al atravesarlas y protección mágica. Los muros, puertas y sellos conservan sus colisiones.

Los monstruos alternan ataques que pueden alcanzar al héroe, conservando la prioridad de curación y habilidades de apoyo. La selección se actualiza antes de la comprobación de alcance del controlador de técnicas. Un control de duración libera acciones atascadas o con temporizadores inválidos, sin eliminar aturdimientos ni estados legítimos.

Las estatuas reutilizan dos modelos compartidos y sus lotes de instancias: 17 lotes por planta en la prueba de navegador. El combate reutiliza la lista local de actores durante cada llamada síncrona. Estos cambios reducen trabajo de CPU y renderizado; no se promete una tasa de fotogramas fija para todos los dispositivos.

Ambas entradas, index.html y play.html, siguen siendo juegos HTML autónomos. Al cargar partidas antiguas se conserva la salud y el estado de derrota del Emperador y se corrige su antigua posición si procede.

Pruebas: `npm run test:eclipse`, `npm run test:eclipse:mobile`, `npm run test:update:124`, `npm test`, `npm run test:scale`, `npm run test:techniques` y `npm run test:package`.
