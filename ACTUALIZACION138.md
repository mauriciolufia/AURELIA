# Actualización 138 · Escaleras y recorridos completos

La subida queda al final del recorrido de cada planta. En las plantas intermedias, la escalera por la que llegas y la siguiente subida ocupan extremos distintos del recorrido. En la última planta se llega lejos del jefe y es necesario atravesar las salas principales antes de alcanzarlo.

## Trono del Eclipse

- Las plantas 1 y 2 conservan sus recorridos de nueve salas principales en sentidos alternos. La llegada de la segunda planta se registra en su descansillo real, también para el modo demo.
- Desde la planta 3, la escalera de subida se coloca en la sexta y última sala, en lugar de permitir salir desde la quinta.
- Las plantas 4 y 6 invierten la distribución completa: paredes, pasillos, puertas, trampas, suministros, secretos, posiciones de guardias, trono y salida. Se conserva la identidad de las salas y del jefe.
- La llegada del sexto nivel queda en la primera sala, aproximadamente a 180 metros en línea recta del Emperador. El recorrido obliga a cruzar las seis salas principales; el Emperador permanece en la sala del trono.
- Los huecos del suelo coinciden con las escaleras de llegada. El techo solo se abre para la subida correspondiente y la última planta queda cubierta.
- Los muros decorativos, cofres y otros añadidos respetan el espacio de las escaleras y sus descansillos.

## Resto de fortalezas

Se centran y alinean las escaleras físicas y sus huecos en las fortalezas de hielo, Dulcecorona, la fortaleza corsaria, las pirámides maya y solar y el Palacio de Cristal Polar. Las entradas de las plantas superiores señalan el descansillo de llegada, no un punto genérico.

| Fortaleza | Plantas revisadas |
| --- | ---: |
| Hielo | 3 |
| Dulcecorona | 5 |
| Corsaria | 3 |
| Pirámide Maya | 2 |
| Pirámide del Sol Eterno | 3 |
| Palacio de Cristal Polar | 2 |

Se comprueban las **18 plantas con laberinto**: llegar desde la planta anterior y subir de nuevo, o alcanzar al jefe final, requiere atravesar las siete salas principales. Los desvíos y cámaras secundarias conservan su carácter opcional. Las cinco plantas de la Caldera de Obsidiana mantienen sus accesos y descensos en extremos separados del laberinto.

## Validación

- `npm run test:routes` y `npm run test:routes:mobile`: conectividad, salas obligatorias, extremos de cada planta, huecos y altura de las 17 escaleras físicas, subida y bajada del Eclipse con el controlador real y restauración de partidas.
- `npm run test:eclipse:133`: renderizado de las plantas superiores, texturas, combate y desplazamiento del Emperador en su nuevo salón orientado y población del bioma.
- `npm test` y `npm run test:package`: topología de los laberintos y conservación de ambos archivos HTML autónomos.

Los informes de ruta se generan en `/tmp/aurelia-routes138-pc.json` y `/tmp/aurelia-routes138-mobile.json`. Estas comprobaciones no equivalen a completar toda la campaña.
