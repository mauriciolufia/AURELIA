# Aurelia RPG · actualización 124

El Trono del Eclipse incorpora 56 estatuas demoníacas repartidas por los muros de sus 28 salas y 12 trampas adicionales: rayos negros y oscuridad en las tres plantas. La iluminación ambiental baja moderadamente solo en este lugar, conservando detalle en suelo, enemigos y salidas, sin ray tracing ni luces adicionales.

## Combate

- Todos los enemigos hostiles y jefes conservan el 40% de su ATK anterior; HP, DEF, armas y estadísticas del héroe mantienen sus valores. La reducción se aplica una sola vez, también al cargar partidas o reaparecer enemigos.
- Mejora la frecuencia de percepción, el desplazamiento alrededor de obstáculos y la animación de piernas, brazos y cuerpo. Se conserva el máximo global de tres enemigos persiguiendo y atacando al héroe.
- Solo la última planta del Eclipse conserva un tercio de su guarnición: 29 de 87 enemigos, incluido el Emperador y los actores de misión. Los enemigos de esta planta, salvo el Emperador, reciben ×2,5 de movimiento, alcance y detección. Las otras plantas conservan sus cantidades y parámetros.
- Los ojos flotan visualmente y lanzan bolas de oscuridad. Las bestias mórbidas tienen Mega Mordisco y Lanzamiento de Espinas.
- El Devorador Ígneo lanza bolas de fuego acordes con su nivel y usa Ira: +50% ATK durante 600 segundos de simulación, sin acumulación. Su duración se conserva en la partida guardada.
- Los archidiablos tienen bola de oscuridad superior, curación del 30% de HP máximo y bola de fuego infernal, incluida su actuación durante la batalla de Forjabrasa.
- Forjabrasa cuenta con diez defensores equipados; cinco tienen ×3 HP y ATK, y cinco usan arco y flechas además de espada. Los proyectiles se desplazan realmente y comprueban paredes antes de impactar.

## Trampas y caverna

Las 754 franjas de trampas se reubican y redimensionan entre muros sólidos, evitando puertas y escaleras. El modelo y su zona de efecto comparten coordenadas. Se pueden atravesar caminando y no añaden barreras físicas; saltar no evita las franjas activas. La protección contra trampas bloquea daño y oscuridad; los impactos dañinos generan partículas de sangre y daño.

Las flechas de muro viajan a 44 m/s, el doble que antes, con alcance limitado y colisión continua. Sus placas inferiores quedan invisibles, incluso después de actualizar la visibilidad de la sala. La caverna usa proyectiles reales en lugar de daño instantáneo en las trampas de flechas.

Las cinco plantas volcánicas mantienen visibles sus superficies de lava y los restos de las cascadas durante sus ciclos. Cuatro escaleras atraviesan huecos reales en el suelo y descienden con peldaños y paredes laterales. Los siete tipos de enemigos volcánicos incorporan placas, articulaciones, escamas, minerales o detalles de alas y vestimenta según su especie.

## Pausa y recuperación

Al perder el foco, ocultarse, congelarse o abandonar la página, el juego detiene su única cadena de animación, libera los controles y pausa la simulación. Al regresar reinicia el reloj sin recuperar tiempo perdido y conserva cualquier pausa manual previa. Una pérdida del contexto gráfico en segundo plano permite reconstruir los gráficos en memoria sin reiniciar al personaje.

Se mantienen ambos archivos HTML autónomos, la resolución elegida y las texturas existentes. Las pruebas automatizadas no garantizan una tasa constante de fotogramas en todos los dispositivos.

## Verificación

- `npm run test:scale` y `npm run test:techniques`: progresión y 7.320 combinaciones de técnicas por especie, nivel y rango.
- `npm run test:update:124` y `npm run test:update:124:mobile`: ATK, franjas, guarnición, Forjabrasa, habilidades, estatuas, protección, lava y huecos de escalera.
- `npm run test:lifecycle` y `npm run test:lifecycle:mobile`: renderizado real, pausas repetidas, pausa manual, congelación del navegador y recuperación del contexto WebGL.
- `npm run test:visual:124`: renderizado de estatuas y escaleras sin errores WebGL.
- Arranque y movimiento reales a 1920×1080 con colores vivos, tanto en PC como en emulación móvil; comprobación adicional en Microsoft Edge.
