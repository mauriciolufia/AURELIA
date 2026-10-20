# Revisión de rendimiento, gráficos y estabilidad

| # | Fallo observado en el código original | Corrección y comprobación |
|---|---|---|
| 1 | Los pisos de fortalezas estaban a 0–0,005 m del terreno o de otras superficies, con riesgo de parpadeo por profundidad. | Separación de 0,08 m y sesgo de profundidad en el material del piso. Comprobación de las 26 plantas. |
| 2 | El corredor exterior del plano de nueve salas permitía alcanzar la meta sin atravesar las siete salas principales. | Cadena de siete salas y dos ramales opcionales. Pruebas de conectividad y de bloqueo al quitar cada sala intermedia en 16 plantas. |
| 3 | Toda la caja rectangular se consideraba transitable, incluidos espacios vacíos ajenos a salas y corredores. | La navegación usa la unión de salas y pasillos. Los mismos límites generan paredes y colisiones; se comprueban espacios excluidos. |
| 4 | Las caras y halos del sol y la luna tenían `depthTest:false` y se dibujaban sobre árboles, paredes y techos. | Prueba de profundidad activada y orden anterior a otras transparencias. Pruebas con cobertura completa, parcial y follaje transparente para ambos astros. |
| 5 | Los astros estaban a unos cientos de metros, por delante de objetos más lejanos. | Posición a 2.400 m de la cámara conservando el tamaño angular. Comprobación de distancia de día y noche. |
| 6 | El optimizador estático congelaba las matrices del cielo móvil, incluidas las posiciones del sol y la luna. | El árbol del cielo queda protegido de la congelación. Comprobación de matrices dinámicas después de construir el mundo. |
| 7 | `__v6Texture` llamaba a `ae`, un identificador inexistente en el juego. | Se usa la función de límites `_18`. Se genera una textura real y se comprueba su búfer. |
| 8 | La pausa manual y los controles de guardar/respaldo sólo se instalaban en móvil. El predicado de pausa también excluía PC. | Los controles se instalan en ambas plataformas y P detiene la simulación en PC. El presupuesto gráfico móvil sigue limitado a móvil. |
| 9 | Una partida JSON válida con `owned`, `known` u otras listas de tipo incorrecto llegaba a llamadas `.filter` que podían detener la carga. | Normalización de las listas principales y del equipo antes de cargar. Se prueba la restauración de campos dañados. |
| 10 | Valores numéricos no finitos en partidas podían propagarse a oro, EXP o MP. | Valores finitos de respaldo antes de aplicar el estado. Prueba con `Infinity`, `NaN` y `-Infinity`. |
| 11 | Un JSON roto en el guardado reciente impedía buscar un guardado antiguo válido. | Se valida cada versión en orden y se continúa tras errores de lectura o análisis. Prueba de recuperación desde v14. |
| 12 | Al salir del modo demo se detenía el juego antes de restaurar el almacenamiento. Si esa escritura fallaba, el juego quedaba detenido. | La restauración se intenta antes de cambiar el estado de ejecución. Una denegación del almacenamiento conserva la demo activa y permite reintentar. |
| 13 | El rechazo de la promesa de `AudioContext.resume()` quedaba sin manejar. | El rechazo se maneja y el juego continúa. Se simula un navegador que bloquea el audio. |
| 14 | Una pérdida del contexto WebGL dejaba avanzar la simulación mientras el jugador no podía ver la escena. | La simulación se suspende durante la pérdida y se restablece el reloj al recuperar el contexto. Prueba de los eventos de pérdida y recuperación. |
| 15 | El renderizador Canvas podía dibujar un hijo cuyo padre se había ocultado. | Recorrido visible y comprobación de los antecesores también entre actualizaciones de la caché. Prueba de ocultación del padre. |
| 16 | Canvas descartaba mallas después de las primeras 9.000 y limitaba el dibujo antes de seleccionar las cercanas. Objetos próximos podían desaparecer por orden de inserción. | Selección de objetos visibles por distancia antes del límite de 1.150 dibujos. Pruebas con 9.001 objetos lejanos y con saturación del presupuesto. |
| 17 | La propagación de alertas comparaba cada perseguidor con todos los miembros de la fortaleza. | Índice espacial de celdas de 22 m, manteniendo distancia, salas y línea de visión. En la prueba de 100 actores separados se realizan 300 lecturas de posición. |
| 18 | Cada búsqueda de interacción recorría todos los objetos del mundo. | Consulta de las celdas vecinas del índice existente y eliminación de duplicados. Prueba de candidatos próximos, incluidos bordes de celdas. |
| 19 | La cadena de extensiones del guardado escribía sucesivamente el mismo archivo en `localStorage`. | Acumulación temporal y una sola escritura durable al terminar, conservando las extensiones de la partida. Se cuenta la escritura y se comprueban los campos. |
| 20 | Los objetos `exit95` no tenían etiqueta en el botón de interacción y mostraban `undefined · R`. | Etiqueta «Salir al exterior». Prueba de interacción en una salida real. |

Las escaleras y los desembarcos se recolocaron para mantener la nueva ruta entre plantas; se comprueban 210 muestras de altura. Los tesoros finales, salidas, trampas y marcadores se ajustaron al plano nuevo.

Las comprobaciones gráficas se ejecutan en Chromium con WebGL por software. Esto permite verificar profundidad y estabilidad, pero no sirve como medición de FPS de una GPU física. No se ha completado toda la campaña de principio a fin.
