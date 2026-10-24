# Actualización 113 · Conversaciones táctiles y combate

En celular, conversaciones, comerciantes, posadas, servicios de castillos y catálogos de sabios permiten recorrer su contenido hasta el final. Los paneles caben en el visor vertical u horizontal; los botones conservan sus acciones y tienen una altura mínima de 48 píxeles. Al conversar se liberan los gestos pendientes de cámara y palanca. PC conserva sus paneles y controles.

La detección enemiga amplía su alcance otro 15% respecto a v112 y las decisiones de persecución se revisan cada 0,10–0,13 segundos, dentro del presupuesto existente de IA. Los muros y las plantas siguen bloqueando la visión. Los enemigos a distancia se acercan para dar golpes normales; para una técnica corta utilizan el alcance de esa técnica, evitando quedarse esperando a la distancia de otro hechizo. Se conservan las decisiones de flanqueo, evasión, retirada y apoyo. Los invasores de Forjabrasa también reconocen y atacan al héroe cercano o que los ha golpeado: antes fijaban su atención exclusivamente en los defensores NPC.

Se corrige además un bloqueo del minijefe volcánico: su aviso de golpe podía carecer de material y provocar una excepción durante la preparación del ataque. Ahora cualquier jefe recibe un anillo de aviso válido.

Los proyectiles y cargas anticipan brevemente el movimiento del héroe al salir, con límites de distancia y comprobación de obstáculos. Las áreas de peligro ya anunciadas en el suelo permanecen fijas para permitir esquivarlas.

La frecuencia de los relojes de ataque se duplica respecto a v112: golpes, preparación, recuperación, técnicas y controladores especiales. La velocidad de desplazamiento y el daño por golpe conservan sus valores de v112. Cada enemigo recibe una secuencia mezclada de **tres técnicas y siete golpes normales por diez decisiones de ataque**. La decisión permanece fija hasta comenzar el ataque; estar lejos no fuerza técnicas ni vuelve a sortear el turno. El Emperador y la invasión usan la misma proporción. Una interrupción, muerte o pérdida de visión puede impedir completar un ataque elegido.

Toda la EXP de enemigos vuelve a duplicarse respecto a v112, incluidos normales, élites, enemigos de misión y jefes. Los normales acumulan ×4 frente a la base anterior a v112; los demás enemigos, ×2. También se duplica el bono adicional de élite y el pago efectivo de jefes que estaba limitado por nivel. Reconstruir el mundo o cargar una partida no acumula multiplicadores. Las misiones, cofres y barriles mantienen su EXP.

## Comprobaciones

- Pruebas en Chromium con perfiles PC y Android, gestos táctiles reales en horizontal y vertical, desplazamiento y cierre de conversaciones; acciones de misiones, compras, preparación de magia, posadas, servicios de castillos y búsqueda del catálogo del sabio.
- Detección, preparación y golpe de enemigos terrestres activos; visión bloqueada por muros y plantas; acercamiento al alcance correcto y anticipación limitada por obstáculos.
- Proporción de técnicas y golpes en todos los enemigos generados; ejecución de los repertorios de especies y efectos de apoyo.
- EXP entregada por muertes reales, bono de élite, límite de jefe, cobro único y recalibración sin acumulación.
- Topología de fortalezas, escalas de atributos y catálogo de 7.320 combinaciones de especie, nivel y rango.

```sh
npm run build
npm run test:interaction
npm run test:interaction:mobile
npm test
npm run test:scale
npm run test:techniques
```
