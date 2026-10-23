# Actualización 109

Todos los enemigos se desplazan a un 60% de su velocidad anterior y atacan con un 60% de su frecuencia anterior. Una espera de 5 segundos pasa a 8,33 segundos. La reducción se aplica a enemigos terrestres, marinos, cargas, jefes, emperador y asaltantes de Forjabrasa. Se conservan la potencia de ataque por golpe, la percepción, las decisiones tácticas, los quince comportamientos y las estadísticas de los enemigos. Los civiles, defensores aliados y el jugador conservan su velocidad.

La frecuencia anterior ya estaba reducida; este cambio multiplica esa frecuencia por 0,6. Los relojes de recuperación, preparación y selección de ataque usan el mismo factor. Los efectos de veneno y quemadura causados por enemigos siguen el ritmo de combate; las trampas ambientales conservan sus ciclos. La velocidad de los proyectiles y las animaciones de efectos se conserva.

## Héroe

HP, ATK y DEF base aumentan un 20% en los sesenta niveles, con redondeo al entero más cercano. El equipo, las bendiciones y los efectos temporales se aplican después sobre las nuevas bases. MP y poderes elementales conservan su escala. La fórmula de daño sigue siendo `(ATK / DEF) × 8`.

| Nivel | HP base | ATK base | DEF base |
| --- | ---: | ---: | ---: |
| 1 | 90 | 12 | 14 |
| 60 | 9.000 | 30.000 | 456 |

Las partidas anteriores conservan su proporción de HP al abrirse. La nueva marca de guardado evita acumular el aumento cada vez que se carga una partida.

## Técnicas por especie y nivel

Un catálogo determinista sustituye la asignación de técnicas por orden de aparición y los rellenos con magia genérica. Los niveles 1–40 conservan dos técnicas y los niveles 41–60, tres. Cada repertorio contiene una técnica ofensiva y maniobras acordes al cuerpo, elemento y papel de la criatura. La potencia, el alcance y la preparación progresan con el nivel; los estados fuertes se reservan a niveles apropiados. La técnica ofensiva más poderosa de cada jefe alcanza ×1,5.

Se corrigen, entre otros, jabalíes que envenenaban, cocodrilos que se curaban, leones con sueño mágico, murciélagos de brasa con ataques de roca y criaturas de hielo o caramelo con magia arbitraria. Piratas, artilleros y contramaestres tienen maniobras diferentes; Barbanegra dirige a su tripulación. Los guardias con púas usan ataques físicos aunque su plantilla de origen fuese una gelatina. King Candy usa su piruleta y caramelo; los jefes de hielo, el Yeti y los enemigos de la Caldera tienen repertorios propios.

Los apoyos y curaciones se mantienen en especies apropiadas: comandantes, capitán, faraón y criaturas de malvavisco. El emperador y los asaltantes conservan sus controladores especiales. Los rayos del Ojo Espinoso y el aliento del Devorador Ígneo conservan sus efectos específicos.

Las cargas y proyectiles exteriores respetan ahora su alcance declarado. Los repertorios se conservan al cargar, reaparecer, cambiar de nivel o registrar enemigos nuevos; el ajuste de escala interior se aplica una sola vez.

Consulta el [registro de repertorios](docs/tecnicas109/revision.md) y los [atributos base de los 60 niveles del héroe](docs/tecnicas109/heroe.csv).

## Verificación

- Catálogo: 7.320 combinaciones de familia, nivel y rango.
- Escala: los sesenta niveles del héroe, límites de enemigos, equipo y magia.
- Navegador PC y celular: 5.460 enemigos, 138 técnicas ejecutadas en 59 familias, movimiento real, relojes de ataque, emperador, asaltantes, decisiones estratégicas y guardados.
- Topología: salas principales obligatorias y conexiones de fortalezas.

Pruebas: `npm run test:techniques`, `npm run test:techniques:browser`, `npm run test:techniques:mobile`, `npm run test:scale`, `npm test`.
