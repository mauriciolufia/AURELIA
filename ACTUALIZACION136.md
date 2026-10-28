# Aurelia RPG · actualización 136

La progresión de ATK conserva sus valores iniciales (14 ATK para el slime de nivel 1). Los enemigos y jefes distintos del Emperador llegan a **350 000 ATK**; el **Emperador Supremo tiene 700 000 ATK**. Son los valores finales usados por los actores de combate, después de la reducción histórica de ataque. Cargar una partida o recalibrar el equipo no vuelve a reducirlos ni acumula aumentos.

El daño de los golpes normales se calibra alrededor del **12,5 % del HP de referencia**, con una variación aproximada del **10–15 %** según el tipo de enemigo. La referencia usa la defensa base y las seis piezas de armadura más fuertes obtenibles a ese nivel, incluidos sus bonus de HP. El redondeo a HP enteros puede producir pequeñas diferencias en los primeros niveles.

El Emperador conserva sus 700 000 ATK y tiene su propia calibración de daño. Las técnicas más potentes y las mejoras ofensivas pueden superar el daño de un golpe normal. La calibración incluye una sola vez el multiplicador general de daño enemigo de ×1,5.

La referencia depende del nivel del enemigo y del catálogo de equipo: no se adapta al HP actual ni al equipo que lleva el jugador. Equipar mejor armadura o usar una técnica de defensa sigue reduciendo el daño; ir sin armadura o enfrentarse a enemigos de mayor nivel sigue siendo más peligroso. El daño no se convierte en una resta fija del HP máximo del jugador.

La comparación de combate y la auditoría muestran el daño calibrado, incluida la diferencia entre ir equipado y sin armadura. Se comprueban los 60 niveles, los actores reales del mundo, el golpe del Emperador, técnicas, mejoras de defensa, guardados y nuevas apariciones.

Pruebas: `npm run test:enemy-attack`, `npm run test:enemy-attack:mobile` y `npm run test:package`.
