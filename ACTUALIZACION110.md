# Actualización 110

La tecla **G** alterna entre primera y tercera persona durante el juego. Se conserva el controlador de cámara, la vista del personaje y el ajuste del menú. **I** sigue abriendo Equipo. Mantener G pulsada no cambia repetidamente la cámara; escribir en campos, usar atajos del navegador o estar en un menú o en pausa no cambia la vista. En celular también funciona con teclado físico y recuerda la elección de cámara.

Las magias ofensivas tienen **100–140.000 de ATK elemental**, con progresión según el nivel de la técnica. Las técnicas supremas alcanzan 140.000 y conservan su requisito de aprendizaje. Ese valor entra directamente en la misma fórmula del ataque físico: `(ATK elemental / DEF) × 8`, respetando afinidades, resistencias, guardias y barreras. El equipo no multiplica ese poder. Las curaciones y las magias de utilidad conservan su funcionamiento.

**Escala final del héroe:** el ATK base progresa de **20 en nivel 1 a 100.000 en nivel 60**. Las armas dan exactamente el doble de su ATK anterior en todos los niveles: **+10 a +120.000**. El equipo sigue siendo aditivo: en nivel 60, 100.000 base más 120.000 del arma suman **220.000 ATK**, antes de bendiciones o efectos temporales. HP y DEF conservan la actualización anterior.

El máximo de MP progresa desde **100 en nivel 1 hasta 5.000 en nivel 60**. Una aventura nueva empieza con el MP completo. Subir de nivel, descansar, resucitar y usar pociones consultan el nuevo máximo. Las partidas anteriores conservan su porcentaje de MP y las nuevas guardan una marca que evita repetir la conversión.

En Equipo y Magia, **Ordenar por** permite elegir **nivel de menor a mayor** o **nombre alfabético**. El orden inicial es por nivel; los empates se resuelven por nombre en español. La preferencia se conserva en el navegador. Funciona con armas, armaduras, libro de magias, opciones de las ranuras 1–7, tiendas y selector táctil de magias. Reordena la presentación y conserva las acciones de equipar, comprar, seleccionar y asignar.

Pruebas: `npm run test:scale`, `npm run test:player` y `npm run test:player:mobile`. Cubren los sesenta niveles, potencias, daño real, lanzamiento desde el botón, consumo y recuperación de MP, guardados anteriores y nuevos, eventos reales de teclado, orden de los catálogos y acciones después de reordenarlos.
