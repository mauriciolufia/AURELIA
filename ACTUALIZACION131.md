# Aurelia RPG · actualización 131

Las plantas 4, 5 y 6 del Trono del Eclipse tienen ahora texturas infernales originales en suelo, paredes y techo, con una progresión visual inspirada en las fortalezas demoníacas de Doom.

- Planta 5: placas de metal quemado y oxidado, remaches, rejillas, piedra erosionada, grietas con brasas y sellos rituales grabados.
- Planta 4: basalto oscuro y obsidiana fracturada, muchas más vetas de magma, sellos de mayor brillo, relieves de cráneos con cuernos y costillas, y cadenas en las bóvedas.

La planta 6 recupera la piedra violeta, las cenefas doradas y las tracerías de la arquitectura imperial, con motivos de eclipse. Se conserva la altura adicional del salón final.

Se reutilizan nueve materiales y sus texturas, generadas una sola vez a 512 px en PC y 256 px en móvil. El relieve y el brillo se dibujan sobre la arquitectura existente: no se añaden luces, partículas, geometría ni animaciones por fotograma. Se conserva la agrupación de la arquitectura y la carga de plantas por proximidad. Las plantas 1 a 3, los enemigos, las colisiones y la altura adicional del salón final no cambian.

Validación: `node tests/infernal131.cjs` y `node tests/infernal131.cjs --mobile` comprueban que los nueve materiales están aplicados a la arquitectura real, que no afectan a otras plantas y que se comparten sin aumentar los grupos de dibujo de la arquitectura. También dibujan las tres plantas con sus materiales nuevos para comprobar errores de WebGL y guardar capturas.
