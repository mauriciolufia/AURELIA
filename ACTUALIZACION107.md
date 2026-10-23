# Aurelia v107: fortalezas y biomas

## Enemigos y muros

Se corrige la recolocación de enemigos en las plantas aisladas de la Pirámide del Sol Eterno. La comprobación anterior exigía estar dentro del mapa exterior y dejaba cuatro escorpiones superpuestos con los muros laberínticos. Ahora las apariciones y los pasos se validan contra la planta del propio enemigo, incluso fuera de las coordenadas del exterior.

- El radio completo del enemigo cuenta al pasar por puertas, esquinas y bordes del suelo.
- Los recorridos se comprueban de extremo a extremo; los movimientos de guion también se revisan antes de dibujar el fotograma.
- Los enemigos permanecen en su planta. Se respetan las puertas cerradas, los enigmas pendientes y los muros secretos que todavía no se han roto.
- La revisión final de apariciones se ejecuta después de añadir todos los muros, muebles y árboles, y se repite al cargar una partida. Durante el juego se revisan los actores cercanos, sin recorrer todos los enemigos cada fotograma.

## Técnicas

Los enemigos de niveles **1–40 inclusive tienen exactamente dos técnicas distintas**; los de **41–60 tienen exactamente tres**. Se eliminan duplicados de efecto y se añaden técnicas propias de la especie cuando faltan. La agresividad y los tiempos de ataque siguen con el ajuste anterior. Se mantienen la fórmula de daño y los atributos de la versión 105.

El Emperador dispone de su energía imperial, su onda de oscuridad y un pulso sísmico. Los demonios del asalto a Forjabrasa alternan garras, fuego y una onda de garras; las apariciones posteriores reciben también su repertorio correcto.

## Desierto y Caramelo

- Se generan doce zonas de arenas movedizas en el desierto, apartadas de caminos y edificios. Su superficie sigue el relieve para evitar que quede enterrada o flotando.
- Se conserva el hundimiento, el daño y la posibilidad de saltar para escapar, comprobados con el controlador real en PC y celular.
- Se añaden 72 árboles de caramelo con dos formas: copas de algodón de azúcar y piruletas. Los troncos tienen textura de bastón de caramelo de 1024 píxeles en PC y 512 en celular.
- Los árboles evitan los caminos, las poblaciones y los enemigos. Sus modelos se dibujan en diez grupos compartidos y se ocultan a distancia.

## Horarios de castillos

| Habitante | Franja principal | Duración |
|---|---|---:|
| Armeros y vendedores de magia | 09:00–15:00, junto a su puesto | 6 horas |
| Reyes | 06:00–18:00, junto al trono y en el salón real | 12 horas |

Durante el horario realizan actividades e interacciones cerca de su lugar. Fuera de esas franjas conservan sus rutinas personales. El descanso nocturno sigue siendo de 23:00 a 06:00, en su cama; las comidas siguen vinculadas a mesas y sillas fijas.

## Verificación

`npm run test:enemy-collision` y su variante `:mobile` revisan los 5.460 enemigos, sus técnicas, los pasos bloqueados por muros, la recolocación en la pirámide, el movimiento en cada planta, las arenas movedizas, los árboles, las apariciones del asalto y los horarios de castillos.
