# Actualización 121 — Reparación del inicio en PC

La bienvenida iniciaba el bucle completo del juego antes de pulsar «Comenzar»: simulaba el mundo y dibujaba la escena de PC mientras aún se ejecutaban reparaciones diferidas de actores y materiales. La prueba de escritorio con el renderizador activo mostró una espera mucho mayor que las pruebas de construcción y del fotograma aislado. Las reparaciones posteriores al primer dibujo podían volver a invalidar materiales que ya se habían preparado para la GPU.

El arranque ahora carga las texturas, construye el mundo, deja terminar las reparaciones diferidas y recupera la partida guardada antes de habilitar el botón. La pantalla indica «Cargando texturas», «Preparando el mundo», «Recuperando tu partida» y «Listo para jugar» según corresponda. El bucle de juego no simula ni renderiza detrás de la bienvenida. Al pulsar «Comenzar» o «Continuar», se muestra «Entrando al mundo» durante la preparación del primer fotograma.

Se conserva el renderizador, la resolución seleccionada, las texturas y el contenido. La corrección no borra partidas. Si una imagen no termina de cargar en 60 segundos, la espera acaba con un error visible y el botón «Reintentar carga», conservando el almacenamiento. La carga de imágenes integradas sigue sin depender de `fetch`, archivos vecinos ni URLs Blob.

`tests/startup121.cjs` usa el HTML completo con el renderizador y `requestAnimationFrame` activos. Comprueba que el botón sea utilizable antes de iniciar el renderizado, pulsa el botón real y espera varios fotogramas de la escena completa. Cubre el modo de PC a 1920×1080 con colores vivos y una partida guardada, el modo celular y una imagen cuya carga queda bloqueada. Las pruebas anteriores de archivo autónomo, carga sin `fetch` y renderizado aislado se conservan como regresión. La preparación del mundo todavía consume tiempo de CPU y su duración depende del equipo; la corrección elimina el trabajo gráfico anticipado y hace visible la etapa de carga.

Comandos: `npm run test:startup:vivid`, `npm run test:startup:mobile`, `npm run test:startup:timeout`, `npm run test:package`, `npm run test:load` y `npm run test:load:mobile`.
