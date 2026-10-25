# Actualización 117 — Progresión y combate

Los 24 objetivos de campaña usan el nivel recomendado de su misión, en el orden de la historia. Se eliminan los saltos ocultos de seis niveles de Dunas, Garra e Icebergs. Sus guardianes de llaves quedan dos niveles por debajo; las guarniciones permanecen por debajo del jefe. Nivel, HP, ATK, DEF y técnicas se recalculan juntos con las curvas existentes, sin escalar al nivel actual del héroe.

Los jefes opcionales que antes se trataban como élites reciben el rango de jefe: doble HP y ×1,5 DEF de la referencia del nivel, con variación de especie dentro de /1,20–×1,20. El Emperador conserva su excepción de 48.000 HP y el ataque calibrado de 233.156. Se mantiene la fórmula `(ATK / DEF) × 8`, el daño enemigo ×1,5 y los multiplicadores de experiencia existentes.

| Ruta opcional | Niveles de guardias por planta | Jefe |
| --- | --- | --- |
| Isla del Corsario | 8–9 / 9–10 / 10–11 | Barbanegra: 12 |
| Pirámide del Sol Eterno | 30–31 / 32–33 / 34–35 | Faraón: 36 |
| Pirámide de Jade | 30–31 / 33–34 | Ah-Kin: 35 |
| Palacio de Cristal Polar | 34–35 / 36–37 | Boreas: 40 |
| Corona Boreal | 38–39 / 40–41 / 42–43 | Auralis: 45 |
| Castillo Candy Candy | 25–26 / 29–30 / 33–34 / 37–38 / 41–42 | Rey Candy: 45 |
| Caldera de Obsidiana | 40–41 / 41–42 / 42–43 / 43–44 / 44 | Ígneo: 45 |

Todas las plantas de la Caldera apuntan al verdadero jefe Ígneo; antes algunas registraban al primer escarabajo como jefe. Se actualizan los niveles del mapa y las definiciones del jefe. La actualización conserva proporción de vida, enemigos vencidos, llaves y misiones completadas; las correcciones se reaplican al cargar y reconstruir el mundo, sin acumular bonos.

La espada realiza un corte lateral con hoja horizontal en primera y tercera persona, manteniendo la ventana original de daño. Incorpora barrido estéreo, golpe grave y transitorio metálico al causar daño, destello breve y retroceso visual del arma; en móviles compatibles, una vibración breve. El sonido respeta el ajuste de efectos. El ruido se reutiliza y los nodos temporales de audio se desconectan al terminar.

Cada jefe o élite puede alertar a **dos aliados cercanos como máximo**, elegidos por distancia, misma planta y camino sin muro interpuesto. Las llamadas repetidas y campanas comparten esos dos lugares; los seguidores no reclutan cadenas de refuerzos. Los demás enemigos conservan su detección individual del héroe: el límite afecta al reclutamiento, no vuelve ciegas a las patrullas.

Las magias ofensivas adquieren al enemigo que estás mirando dentro de un cono de 12°, siempre dentro del alcance de la técnica, en la misma planta y con línea de visión desde el héroe y la cámara. Priorizan la cercanía al centro de la mirada. La trayectoria se actualiza con la posición real del cuerpo para evitar los fallos por retraso contra objetivos en movimiento. No cambian automáticamente a otro enemigo cuando el objetivo muere. Los muros, puertas, inmunidades y protecciones de misión siguen aplicándose.

Cada enemigo alcanzado dispone de **una decisión de evasión del 30% por lanzamiento**, sin tiradas repetidas por fotograma. La evasión intenta un paso lateral validado contra colisiones y muestra «MAGIA EVADIDA»; una técnica de área comprueba la evasión de cada enemigo por separado. Cada proyectil aplica daño una sola vez al llegar, usando su ATK elemental y la DEF del objetivo.

Los enemigos usan ahora una distancia física única de cuerpo a cuerpo, compartida por la IA, el aviso circular y la comprobación del golpe. Dentro del contacto cercano no hay evasión aleatoria; en el borde del alcance se permite un 30% y al salir del alcance el golpe falla. Los proyectiles, áreas y rayos conservan su propia trayectoria, radio y alcance. Se reemplaza la antigua tirada de evasión del 20%, sin sumar dos probabilidades. La puntería anticipa el movimiento con una predicción limitada a 0,45 segundos y conserva la dirección tras disparar, de modo que apartarte del proyectil funciona. El Emperador y los incursores también se acercan al alcance correcto. Se mantienen dos técnicas hasta el nivel 40 y tres del 41 al 60.

Validación automatizada: `npm run test:combat`, `npm run test:combat:mobile`, `npm run test:package`, `npm run test:load` y `npm run test:load:mobile`. La suite de combate recorre todos los hostiles y rutas, comprueba la conservación de progreso, dos aliados por líder, los ocho elementos contra monstruos y jefes en movimiento, 100 impactos con 30 evasiones y 70 aciertos mediante muestreo controlado, sonido activo/silenciado y renderizado WebGL real. La generación conserva ambos HTML completos, iguales y autónomos, con las imágenes integradas de v116.
