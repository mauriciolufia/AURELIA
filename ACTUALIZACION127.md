# Aurelia RPG · actualización 127

Incluye las mejoras de población y rendimiento de la actualización 126, y extiende el renderizado por planta a todas las fortalezas y castillos hostiles registrados, torres, pirámides y los cinco niveles de la caverna.

Se dibuja la planta actual. Al estar a menos de 22 metros del extremo de una escalera, se añade solo la planta inmediatamente conectada: superior al subir e inferior al bajar. El resto de plantas permanece oculto. Los enemigos de otras plantas no se muestran ni participan en el combate de la planta actual. Las escaleras del Eclipse, las torres y pirámides, y los pozos ascendentes/descendentes de la caverna conservan sus conexiones.

Durante el dibujo interior, el terreno y la decoración exterior se limitan a sectores cercanos de hasta 96 metros y al descarte habitual de la cámara. Las exclusiones temporales se restauran al terminar el dibujo: al salir se recupera la visibilidad exterior normal. No se borran niveles ni se regeneran enemigos, botines o misiones al cambiar de planta; su estado persiste en memoria y en la partida.

Se mantienen las texturas, la resolución, las 46 cámaras del Eclipse con 3–4 enemigos asignados y las cuatro técnicas móviles del Emperador. Se reutilizan consultas idénticas de línea de visión durante un fotograma y se reducen los recorridos de visibilidad a los actores residentes. El objetivo de rendimiento es 60 FPS; las pruebas de Chromium por software no permiten garantizar esa tasa en cualquier dispositivo.

Verificación: `npm run test:interiors` y `npm run test:interiors:mobile` comprueban aislamiento de plantas, vecinos inmediatos junto a escaleras en ambos sentidos, población, guardado, trampas, combate y renderizado sin errores WebGL.
