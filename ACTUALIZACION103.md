# Actualización 103 · Caldera de Obsidiana

El volcán del noroeste alcanza una cota de 420 m. Una carretera de montaña da cuatro vueltas alrededor de su ladera, con una longitud aproximada de 3549 m y una pendiente máxima del 14,5 %. El terreno visible y la altura al caminar usan el mismo recorrido. El cráter tiene una cubeta de lava, rocas, brasas, vapor y tres coladas interrumpidas en los cruces con la carretera. Tocar la lava quita HP; la carretera conserva un paso seguro.

El **Hito de la Caldera** marca el campamento de **Inés Basalto**, quien ofrece **Las brasas del corazón**, una misión secundaria. La expedición, su reliquia y su minijefe son opcionales y no condicionan las 24 etapas de la campaña.

## Cinco plantas que descienden

La entrada está en el borde del cráter. Dentro hay cinco plantas de cavernas naturales: Boca de Basalto, Galerías del Azufre, Laberinto de las Brasas, Fallas de Obsidiana y Corazón de la Caldera. Usa **Interactuar / usar objeto** en sus escaleras para descender o regresar. Cada planta está 18 m por debajo de la anterior.

Cada nivel contiene siete cámaras principales de aproximadamente 40 × 40 m y seis grutas secundarias de 24 × 24 m, 40 × 24 m o 24 × 40 m. Los espacios grandes tienen prioridad sobre los pasillos. Hay **16 circuitos identificados por planta**: C1–C12 rodean columnas de basalto dentro de las salas y C13–C16 son desvíos que confluyen en las grutas. Las cámaras principales deben recorrerse en orden; los desvíos permiten explorar sin saltarse los sellos.

La [galería de planos](docs/volcano103/index.html) incluye **una imagen independiente por planta**, con entradas, escaleras, salas, circuitos, estatuas de enigma, barreras, cofres, barriles, lava, puentes, trampas, enemigos y elementos decorativos. Los PNG de 1680 × 1500 y los SVG se generan con la misma distribución que construye la caverna. Los cinco PNG también están incluidos en `index.html` para consultar el mapa sin conexión.

## Enemigos, objetos y peligros

Hay cuatro especies exclusivas: escarabajo de basalto, murciélago de brasa, salamandra de lava y guardián de obsidiana. Son **nivel 40–45**, con dificultad creciente al descender. **Ígneo, Corazón de la Caldera**, es el minijefe exclusivo de nivel 45 en la última planta. Se conserva la reducción global de velocidad de los ataques enemigos y el límite de dos técnicas para los enemigos de nivel 40.

Cada planta tiene dos estatuas cuyos enigmas abren barreras físicas, seis cofres, 24 barriles rompibles (12 comunes, seis de experiencia y seis explosivos), diez zonas de lava y diez trampas de pinchos, flechas o vapor tóxico. Las plantas 2 y 4 también contienen trampas de oscuridad: dos de las cinco plantas, el 40 %. La penumbra conserva algo de luz y puede disiparse con Luz Divina. Los barriles de EXP conceden experiencia una sola vez; los explosivos avisan durante 0,9 s y dañan a los personajes y enemigos próximos, con paredes que bloquean la onda. Las trampas tienen intervalos de aviso, actividad y descanso. Los puentes sobre la lava de las rutas son seguros.

Inés pasea y realiza actividades en su campamento; tiene una cama y una mesa fijas para dormir y comer. La reliquia solo puede recogerse después de derrotar a Ígneo. Entregarla concede 1500 de oro una sola vez. Se guardan la misión, cofres, enemigos derrotados, reliquia, recompensa y posición en las cinco plantas.

## Verificación

Las pruebas comprueban conectividad de las 65 cámaras, orden de las principales, sellos sin rodeos, recorrido completo de la carretera con el control real, colisiones y espacio abierto de las salas, daño de lava, guardado de todas las plantas, independencia de la campaña, desplazamiento de Inés, derrota del minijefe, recompensa única y carga de los planos incluidos en el HTML. Se ejecutan además las regresiones de navegador y controles móviles. Estas pruebas no equivalen a completar toda la campaña ni garantizan una tasa de cuadros fija en todos los equipos.

```sh
npm ci
npm run blueprints
npm run build
npm test
npm run test:volcano-plan
npm run test:volcano
npm run test:volcano:mobile
CHROMIUM_PATH=/usr/bin/chromium npm run test:browser
CHROMIUM_PATH=/usr/bin/chromium npm run test:mobile
CHROMIUM_PATH=/usr/bin/chromium npm run test:fortress
```

Las paredes, columnas, brasas y vapor comparten geometrías e instancias. Solo se muestra la planta actual. Las texturas de roca y lava conservan 1024 píxeles por lado y los modelos usan los recursos detallados del juego.
