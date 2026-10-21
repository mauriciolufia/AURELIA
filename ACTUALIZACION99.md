# Aurelia 99: equilibrio y NPC activos

## Combate

Los enemigos de nivel **1 a 40, incluidos**, disponen de un máximo de **dos técnicas mágicas**, además de su ataque básico. Cuando su repertorio anterior era más amplio se conserva un ataque y una técnica complementaria de apoyo o defensa, cuando existe. Se mantienen las escalas de alcance de los interiores y los límites de curación.

Su intervalo entre ataques aumenta un **20 %** y su radio de detección baja un **15 %**. Conservan sus decisiones tácticas, salud y daño. Los enemigos de **nivel 41 en adelante** conservan sus técnicas, detección y ritmo agresivo de la versión 98.

El límite se aplica al construir/restaurar el mundo y al preparar o seleccionar técnicas, para cubrir apariciones posteriores.

## Habitantes, comerciantes y personajes de misión

Todos los NPC civiles reciben un cerebro de actividades. El mundo inicial de la partida de prueba contiene **477 NPC**, de los que **318** utilizan un área de movimiento interior o próxima a su servicio. Los personajes controlados por eventos de batalla conservan las acciones propias de esos eventos.

Las quince actividades disponibles son trabajar, comerciar, leer, barrer, cocinar, pasear, conversar, jugar, saludar, descansar, rezar, dormir, refugiarse del clima, huir y alertar. Las decisiones consideran hora, clima, energía, compañía, curiosidad, presencia del jugador y peligro. Las actividades se alternan; los descansos y la atención tienen respiración, gestos y movimiento de brazos. No todos hacen las quince cosas al mismo tiempo ni caminan continuamente mientras leen o duermen.

Se eliminan las recolocaciones por fotograma que inmovilizaban a vendedores de Puerto del Sur y Nocteverde y a varios personajes de misión. Abrir un servicio del castillo sigue validando su inventario, sin devolver al vendedor a su posición inicial. Se conservan identificadores y vínculos de misiones y tiendas.

Los NPC de casas caminan dentro de sus límites; los servicios y personajes de misión sin casa se mantienen cerca de su punto de atención. Las rutas usan un grafo local con comprobaciones de suelo, planta, muebles y paredes a intervalos de hasta 22 cm. El movimiento vuelve a comprobar colisiones y separación entre personajes. Tres reyes que aparecían dentro de la colisión del trono se colocan en un punto libre cercano al cargar.

Los grafos se construyen gradualmente al acercarse el jugador, con un presupuesto compartido consultado entre operaciones de 1,2 ms en PC y 0,6 ms en celular. Las decisiones nuevas se reparten entre fotogramas y rotan su orden para atender también a los últimos NPC de la lista cuando baja la velocidad del juego. Los NPC lejanos mantienen el ahorro de simulación existente; las rutinas y animaciones se ejecutan al estar cerca. PC y celular conservan sus controles y su calidad gráfica.

## Comprobaciones

```sh
npm run build
npm test
npm run test:balance
npm run test:ai-quality
npm run test:upgrade
npm run test:mobile
npm run test:browser
```

La prueba nueva contrasta los repertorios de los 1302 enemigos de nivel superior con sus valores anteriores al ajuste y comprueba el límite en los 4057 de niveles iniciales de la partida generada. También verifica los niveles frontera 1, 40, 41 y 60, animación de todos los civiles, movimiento con colisiones de diez personajes representativos, acceso a las quince actividades interiores, disponibilidad de tiendas y vínculos de misiones.

Estas pruebas no equivalen a completar toda la campaña ni garantizan el rendimiento de todos los teléfonos.
