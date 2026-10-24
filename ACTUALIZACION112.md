# Actualización 112

Los enemigos reconocen antes al héroe cuando existe una línea de visión real. Su detección aumenta un 20%, la primera reacción es más rápida y el alcance de detección exterior coincide con el utilizado por la IA. Las paredes y los pisos siguen bloqueando la visión y los ataques. Los enemigos a distancia y de apoyo se acercan hasta tener alcance útil, conservando los quince comportamientos estratégicos, el flanqueo, la intercepción, las evasiones, las curaciones y el apoyo a aliados.

La **frecuencia de ataque es el doble de la versión 111**. Los relojes de preparación, recuperación y selección de ataque usan el mismo factor, incluidos jefes, Emperador y asaltantes. La velocidad de desplazamiento conserva el ajuste anterior. El daño estándar contra el héroe es **×1,5**, con redondeo a HP enteros; las técnicas mantienen sus multiplicadores. El ataque base de los enemigos y las curvas de nivel mantienen sus límites anteriores. Por ejemplo, el golpe normal del Emperador contra el equipo de referencia de nivel 60 pasa de 1.125 a **1.688 HP**. Las trampas ambientales conservan sus ciclos y daño.

Los **enemigos normales dan el doble de EXP**. Se aplica a enemigos ordinarios exteriores, marinos y de fortalezas. Las recompensas de élites, jefes, encuentros especiales y misiones conservan su funcionamiento. El mensaje de victoria muestra la recompensa real. Recalcular la economía, regenerar el mundo o cargar una partida no acumula el multiplicador ni lo normaliza de nuevo a la baja.

## Mapa en celular

El atlas ocupa todo el visor en horizontal y vertical. El dibujo utiliza el espacio izquierdo y una columna derecha separada contiene el título, zoom, lugares, destino, leyenda, coordenadas y anotaciones. No hay paneles flotando sobre el mapa ni controles del minimapa superpuestos. En vertical se abre ampliado para aprovechar la altura; **Ver todo** permite volver a la vista completa del mundo.

Se conservan arrastre, selección de destino, pellizco, zoom y seguimiento del personaje. Los planos interiores usan la misma distribución, conservan las flechas y números de navegación y muestran las anotaciones en la columna. La caverna indica la planta y la sala del jugador con sus coordenadas locales correctas. La distribución, DOM y manejadores del mapa de PC se conservan.

## Colores vivos

En **Ajustes → Gráficos → 1080p · 60 FPS · Colores vivos**, el mundo recibe un 30% más de saturación y un ligero aumento de brillo. Utiliza el presupuesto de Full HD: 1920×1080 en horizontal y 1080×1920 en vertical en celular, con objetivo de 60 FPS. El nuevo modo también está disponible en PC y la selección se recuerda en el navegador.

La gradación afecta al mundo y deja intactos los textos de la interfaz. Conserva texturas, geometría y los filtros de oscuridad de las fortalezas, sin añadir luces ni ray tracing. Las otras opciones gráficas continúan disponibles.

## Verificación

- Pruebas en navegador PC y celular: reconocimiento visual real, inicio de ataques, paredes, pisos, selección ofensiva, aproximación al alcance, autocuración y ayuda a aliados.
- Relojes de ataque ×2, daño real ×1,5, ATK conservado, EXP normal ×2 y una muerte real que concede la recompensa una sola vez.
- Atlas móvil horizontal, vertical y caverna: viewport completo, textos fuera del dibujo, coordenadas locales y controles de navegación.
- Mapa de PC: conservación de funciones y distribución nativas.
- Modo vivo: buffer Full HD, objetivo de 60 FPS móvil, filtros independientes de oscuridad, tamaños de textura y captura del color renderizado.
- Regresión de 138 técnicas en 59 familias y conservación de los quince comportamientos.

Comandos: `npm run test:experience`, `npm run test:experience:mobile`, `npm run test:techniques:browser`, `npm run test:scale` y `npm run test:techniques`.
