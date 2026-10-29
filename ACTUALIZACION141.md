# Actualización 141 · Mapamundi y circuito cerrado de la torre Carmesí

Al abrir el mapa dentro de la torre de la isla Carmesí, el dibujado se detenía con `d.furniture is not iterable`. El siguiente fotograma podía capturar el mismo error y detener la partida con «No se pudo entrar · actualización del mundo».

Los diez planos de la torre ahora incluyen las listas de mobiliario y trampas adicionales, vacías en este edificio, que exige el dibujante compartido. Esto también evita el error posterior de `addedTraps85`. No es necesario borrar la partida: estos planos se reconstruyen al cargar el mundo.

Las nueve plantas de cuatro salas tienen tres pasillos independientes en U, cerrados a ambos lados con mampostería de suelo a techo. El suelo se construye únicamente en las salas y sus tres conexiones: se elimina el antiguo cruce central. La entrada o llegada queda en la sala 1 y la subida en la sala 4, con recorrido invertido en plantas alternas. Los balcones superiores siguen separados. El décimo piso conserva el salón completo del dragón.

El mapa utiliza esos mismos polígonos y muros, numera las salas según su orden de recorrido y muestra flechas y escaleras. Una partida guardada en el antiguo cruce central se recupera en una sala válida de la misma planta.

La prueba `tests/map141.cjs` reproduce el error en la versión anterior. Comprueba los diez pisos con mapa local, mapamundi, minimapa y marcadores, dibuja los planos de todas las fortalezas y cavernas, y abre y cierra el mapa durante la actualización del juego. El modo `--live` utiliza la entrada gráfica y los fotogramas reales, tras guardar y recargar una partida dentro de la torre.

`tests/circuit141-cases.cjs` comprueba rutas sobre el suelo dibujado y colisiones reales, recorre los pasillos con los controles del héroe en ambos sentidos y trata de atravesar los laterales hacia el centro. Esta última prueba falla con el diseño anterior.

```sh
npm run build
npm run test:map
npm run test:map:mobile
npm run test:map:live
npm run test:circuit
npm run test:circuit:mobile
npm run test:tower
npm run test:tower:mobile
npm run test:package
```

`index.html` y `play.html` contienen la misma corrección y todos los recursos integrados.
