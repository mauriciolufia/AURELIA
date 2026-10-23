# Actualización 111

El slime normal de nivel 1 conserva 20 HP y 10 DEF y pasa a **35 ATK**. Los enemigos normales y de élite tienen una progresión de **35 a 125.000 ATK**; sus variaciones por especie de ÷1,20 a ×1,20 respetan el máximo de **125.000**. Los jefes usan una curva independiente, con el Emperador como referencia y un máximo de **233.156 ATK**. Se conservan el HP y la DEF de los enemigos, las diferencias entre normales, élites y jefes y los repertorios de técnicas por nivel.

El **Emperador del Eclipse** tiene **233.156 ATK**, 48.000 HP y 450 DEF. Su golpe normal causa **1.125 HP** a un héroe de nivel 60 con 9.000 HP máximos y las cuatro mejores armaduras disponibles, sin bendiciones ni mejoras temporales. Es exactamente **1/8 de su HP máximo**.

| Pieza | Nivel | DEF |
| --- | ---: | ---: |
| Yelmo del Eclipse Recuperado | 55 | 234 |
| Huryl, armadura definitiva | 60 | 500 |
| Grebas del Eclipse Recuperado | 55 | 166 |
| Escudo del Eclipse Recuperado | 55 | 302 |
| Defensa base del héroe | 60 | 456 |
| **Total** | | **1.658** |

El cálculo sigue siendo `(ATK atacante / DEF defensor) × 8`, con redondeo a HP enteros. La referencia se verifica contra el equipo real del catálogo al crear o cargar el mundo. Los golpes no restan un porcentaje fijo de vida: una defensa menor recibe más daño y las mejoras defensivas reducen el daño. Las técnicas especiales conservan sus multiplicadores; la más potente del Emperador causa 1.687 HP contra esa misma referencia.

La curva intermedia compara el daño con el HP y el equipo que puede llevar un héroe de ese mismo nivel. Suaviza el pico de dificultad de los jefes de niveles intermedios y limita el crecimiento del ATK estándar a un 22% entre niveles, conservando los extremos solicitados. Se aplica también a enemigos de fortalezas, enemigos hostiles especiales, jefes, guardias con púas y enemigos creados después de iniciar la partida. Los defensores aliados de Forjabrasa conservan sus estadísticas anteriores. Se mantienen la velocidad y frecuencia de ataque reducidas de la actualización 109, la IA estratégica y las escalas del héroe, armas, magia y MP de la actualización 110.

Consulta la [comparación de daño de los 60 niveles y de todos los enemigos](docs/equilibrio111/COMPARACION.md).

Pruebas: `npm run test:scale`, `npm run test:enemy-balance` y `npm run test:enemy-balance:mobile`. Comprueban la progresión, todos los enemigos generados, impactos reales contra el jugador, equipo, efectos defensivos, enemigos nuevos y guardados.
