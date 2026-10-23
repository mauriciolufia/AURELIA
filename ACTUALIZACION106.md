# Aurelia v106: iluminación de fortalezas

Las fortalezas y cavernas tienen una iluminación algo más tenue que el exterior, con luz ambiental amplia que mantiene visibles las salas, los enemigos y las texturas. La luz del sol o de la luna se atenúa en interiores y las antorchas aportan acentos cálidos; los recintos polares conservan un relleno más frío y los volcánicos, uno más cálido.

- Transición gradual al entrar y salir, también al cambiar de planta.
- Exposición interior un 9 % menor que la exterior; luz ambiental equilibrada para evitar rincones negros en condiciones normales.
- Antorchas con brillo acotado y atenuación antes de trasladar una luz a otra antorcha, evitando saltos de iluminación.
- Las farolas exteriores dejan de iluminar el interior a través de sus muros.
- Se reutilizan las luces existentes: seis antorchas en PC y tres en celular. No se añaden luces, ray tracing, pasadas de posprocesado ni mapas de sombras para las antorchas.
- Se mantienen la resolución, las texturas, los modelos, las opciones gráficas y los controles. Las trampas de oscuridad y Luz Divina conservan sus efectos.

`npm run test:lighting` y `npm run test:lighting:mobile` comprueban todas las plantas de día y de noche, la vuelta a la iluminación exterior, la oscuridad maldita, el presupuesto de luces y el renderizado real. Guardan comparativas en `/tmp/aurelia-106/`.
