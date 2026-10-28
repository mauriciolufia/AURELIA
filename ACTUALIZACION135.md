# Aurelia RPG · actualización 135

Cuatro grados de recuperación, tanto para pociones de salud como para elixires de maná:

| Grado | Recuperación del máximo actual | Precio |
| --- | --- | --- |
| Normal | 30 % | 20 de oro |
| Súper | 50 % | 200 de oro |
| Mega | 75 % | 750 de oro |
| Ultra | 100 % | 2000 de oro |

Cada uno de los ocho artículos tiene una tienda diferente. Se distribuyen entre ciudades amigas según la progresión de sus regiones: normales al inicio, súper y mega en regiones intermedias y ultra en las últimas regiones. **Inventario → Objetos** indica la tienda y el precio de cada artículo. Los demás comerciantes no los venden.

La recuperación usa el HP o MP máximo real del personaje, incluidos los bonus de equipo, redondeada a unidades enteras y limitada al máximo. No hay cantidades fijas adicionales. Un recurso completo, una cantidad agotada o una recarga activa no consumen el objeto.

Todos los objetos consumibles, incluida la panacea, comparten **3 segundos de recarga**. Los accesos rápidos **8** y **9** pueden asignarse al grado de salud o maná elegido desde Inventario → Objetos. El selector táctil muestra las ocho variantes y la panacea con sus cantidades. Usar un grado no cambia automáticamente a otro ni consume otras existencias.

Las cantidades y los dos accesos rápidos se guardan con la partida. Las pociones y elixires de partidas anteriores se conservan como grado normal; los nuevos grados empiezan en cero. Se mantienen las recompensas de consumibles normales y las funciones de la panacea. La pantalla de personaje con V también respeta la pausa manual al abrirse y cerrarse.

Pruebas: `npm run test:potions` y `npm run test:potions:mobile`. Se comprueban las ocho tiendas independientes, precios exactos, porcentajes con y sin equipo, recarga real compartida, cantidades, compras válidas e inválidas, límite de inventario, guardado y migración, asignaciones de teclado, selector táctil y disposición vertical en móvil.
