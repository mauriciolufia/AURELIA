# v123 · Mundo activo alrededor del jugador

El terreno se construye por sectores a medida que avanzas; los sectores que dejas atrás se descargan. La misma política se extiende a las decoraciones y a los actores de PC y celular. Cerca de una frontera se mantienen los sectores vecinos dentro del radio, aunque pertenezcan a otro bioma, para evitar huecos al cruzarla.

- Terreno: conserva el radio exterior de 200 unidades y la carga gradual existente. Caramelo mantiene su presupuesto previo de sectores.
- Personajes y criaturas: carga gráfica hasta 225 unidades (210 en Caramelo), con consultas espaciales en lugar de recorrer toda la población por fotograma. Se suspenden las rutinas detalladas y el combate lejanos; los proyectiles pendientes conservan sus objetivos.
- Decoración: carga hasta 440 unidades y libera lo que queda a más de 472. Ese margen evita cargar y descargar repetidamente al caminar junto al límite. Se retiran grupos de la escena, se liberan búferes de instancias y geometrías sin usuarios activos y se conservan las texturas compartidas.
- Las arboledas que estaban agrupadas para todo un bioma se dividen por sectores manteniendo matrices, colores, geometría, materiales y referencias de los árboles destructibles.
- Al regresar, los residentes recuperan el horario vigente. Los viajeros mantienen su itinerario con una actualización sencilla de posición, sin ejecutar animaciones ni búsquedas de caminos mientras están lejos, incluso con el reloj del día congelado.
- Se mantienen las reglas existentes de reaparición, las derrotas permanentes, el estado de cofres y enigmas, las colisiones, las misiones y el guardado. El cielo que sigue al héroe, sus armas y las aeronaves quedan protegidos de la descarga de decoraciones fijas.

Las definiciones del mundo, los registros de personajes y las plantillas necesarias para recuperarlos permanecen en memoria de CPU. La optimización reduce la escena residente en GPU y el trabajo por fotograma; no elimina contenido ni cambia la resolución seleccionada o la definición de texturas y modelos.

## Comprobación

`npm run test:streaming` y `npm run test:streaming:mobile` recorren los diez biomas, verifican la descarga, regresan a enemigos con la misma identidad y vida, revisan los horarios de todos los vendedores, prueban movimiento continuo durante 600 unidades, guardado y recuperación, árboles destructibles y las partículas del volcán. También comprueban la suspensión del combate lejano y la conservación de objetivos de proyectiles.

`node tests/streaming123.cjs --draw` dibuja con el renderizador real al salir y volver a Caramelo, el volcán y la caverna, comprobando que los búferes se recuperan sin errores WebGL. `npm run test:entry` conserva la comprobación de las cinco plantas y los 7.600 puntos de correspondencia entre el minimapa y el suelo físico de la caverna.

El arranque real se comprueba con `npm run test:startup:compatible` en Microsoft Edge y `npm run test:startup:mobile`, en el modo de colores vivos a 1920×1080. Los dos HTML continúan siendo autónomos, con las 17 imágenes originales integradas; `npm run test:package` comprueba su integridad.
