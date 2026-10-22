# Aurelia v105: nueva escala de combate

El daño físico es `redondear((ATK atacante / DEF defensor) × 8)`, con mínimo 1 HP para un ataque positivo. La magia ofensiva usa su poder elemental en lugar del ATK; conserva afinidades, debilidades y resistencias elementales. Las técnicas y los estados temporales modifican la potencia o defensa efectiva. Las barreras absorben el daño calculado. Se eliminan la normalización anterior, el multiplicador oculto por diferencia de nivel y el bono de daño del tercer golpe del combo.

## Valores y progresión

- Héroe sin equipo, bendiciones ni estados: nivel 1, HP 75 / ATK 10 / DEF 12; nivel 60, HP 7.500 / ATK 25.000 / DEF 380.
- Referencia de enemigo normal: nivel 1, HP 20 / ATK 6 / DEF 10; nivel 60, HP 12.000 / ATK 65.000 / DEF 650. La gelatina verde normal de nivel 1 coincide exactamente con la referencia.
- Jefes: referencia de HP ×2 y DEF ×1,5 respecto al normal del nivel. ATK base según la referencia; su técnica ofensiva más fuerte usa potencia ×1,5 y las demás quedan por debajo. Conservan su comportamiento, técnicas, estados y efectos.
- Excepción exacta: Emperador Supremo, nivel 60, HP **48.000**, ATK **38.000**, DEF **450**.
- Variaciones de especie y rango: entre referencia ÷1,20 y referencia ×1,20, por atributo. Los jefes varían respecto a la referencia de jefe. La gelatina inicial y el Emperador conservan sus valores exactos. Los élites y NPC hostiles también reciben la nueva escala.
- Defensores aliados de Forjabrasa: niveles 45–48. Sus espadas, las garras enemigas y los proyectiles usan la misma fórmula de daño; se eliminan los golpes de daño fijo y porcentual antiguos de esta batalla.

Entre los extremos se usa interpolación geométrica: `redondear(inicial × (final / inicial)^((nivel − 1) / 59))`. La progresión, las armas y cada categoría defensiva son crecientes entre los niveles 1 y 60.

## Equipo y magia

El nivel de cada objeto es el requisito real de su tienda o recompensa. El equipo suma valores fijos de ese nivel; sus estadísticas no aumentan automáticamente con el nivel del portador.

| Categoría | Nivel 1 | Nivel 60 |
|---|---:|---:|
| Arma | +5 ATK | +60.000 ATK |
| Casco | +3 DEF | +350 DEF |
| Armadura | +5 DEF | +500 DEF |
| Botas | +2 DEF | +250 DEF |
| Escudo | +4 DEF | +450 DEF |

Se permiten cuatro piezas defensivas simultáneas. Los guanteletes antiguos se conservan como alternativa para la ranura de armadura y no otorgan una quinta bonificación. Al cargar partidas, se conserva su propiedad; si no había armadura corporal, se trasladan a esa ranura.

El poder elemental va de 8 (nivel de poder 1) a 70.000 (nivel de poder 60). Cada hechizo utiliza su propio nivel, independientemente del arma equipada. Las siete técnicas supremas conservan su aprendizaje en nivel 55 y utilizan poder de nivel 60. La curación y los hechizos de apoyo conservan sus efectos específicos.

## Guardado y comprobaciones

Se conserva la proporción de HP al migrar partidas de la escala anterior, además de objetos, misiones y descubrimientos. Las nuevas partidas guardan la versión de equilibrio para evitar repetir la conversión. Las apariciones posteriores también reciben los nuevos valores, sin recorrer todos los enemigos cada fotograma.

`npm run test:scale` verifica los extremos, los 60 niveles, la variación acotada, el equipo y la fórmula. `npm run test:scale:browser` comprueba los actores reales, daño, barreras, magias, defensores de Forjabrasa y carga de partidas. Las pruebas de topología y regresión siguen cubriendo las fortalezas y los controles.
