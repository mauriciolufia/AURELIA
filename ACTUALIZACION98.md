# Aurelia 98: definición de texturas e inteligencia de personajes

Esta versión sustituye la reducción de calidad de texturas de la versión 97. Se conservan los controles originales de PC y el modo táctil exclusivo de celular.

## Calidad visual

- Texturas de personajes generadas directamente a **1024 × 1024 en PC** y **512 × 512 en celular**. La versión anterior a la 97 usaba 512 y 256; la 97 las reducía a 256 y 128. Se elimina ese remuestreo.
- La ilustración original se dibuja a la nueva resolución y recibe fibras, tejido, vetas, arañazos y grano fino adicional. El aumento de resolución no consiste en ampliar una imagen pequeña.
- Texturas de arquitectura procedural de 1024 en PC y 512 en celular; hielo pintado con detalle fino de escarcha. Se conservan los atlas ilustrados existentes y la iluminación de caricatura.
- El mobiliario incorpora UV, un atlas compartido para madera, piedra, metal y tela, y relieve de superficie. El atlas mide 2048 en PC y 1024 en celular.
- Las superficies redondas del mobiliario usan esferas de 16 segmentos y 12 anillos, superando las de los modelos anteriores. Se conservan las piezas, detalles de rostro, referencias de animación y colisiones.
- Filtrado con mipmaps y anisotropía hasta el límite del dispositivo para reducir el desenfoque de superficies vistas en ángulo.

Los modelos nuevos continúan agrupando sus piezas en una malla y compartiendo geometría, material y atlas. La mayor definición consume más memoria gráfica que la versión 97: solo los mapas de personajes sin mipmaps pasan a unos 120 MiB en PC y 30 MiB en celular. La velocidad efectiva depende del dispositivo y del ajuste gráfico.

## Enemigos

Quince conductas según percepción, salud, distancia, rol y acciones del jugador:

1. Patrullar.
2. Investigar la última posición vista.
3. Perseguir.
4. Interceptar el movimiento visible del jugador.
5. Flanquear por la izquierda.
6. Flanquear por la derecha.
7. Rodear en grupo.
8. Mantener distancia de ataque.
9. Reposicionarse si el paso está bloqueado.
10. Evadir un ataque cercano.
11. Retirarse con poca salud.
12. Curarse cuando resulta útil.
13. Apoyar o curar aliados.
14. Defenderse con una técnica disponible.
15. Recuperarse y respetar el tiempo entre ataques.

La memoria visual dura tres segundos. La percepción interior de los enemigos ordinarios pasa de 5 a 18 metros y exige línea de visión; se conservan los alcances superiores de jefes. Los destinos se comprueban contra paredes y plantas; los impactos conservan la comprobación de línea de visión. Las posiciones reservadas y la separación entre aliados reducen aglomeraciones. La selección de técnicas favorece curaciones necesarias y ataques que alcanzan al objetivo; no aumenta el daño ni elimina tiempos de recuperación o límites de curación.

Las decisiones se reparten entre fotogramas sobre un máximo de 96 enemigos cercanos. El presupuesto consultado entre decisiones es de 1,5 ms en PC y 0,85 ms en celular; una decisión individual puede superar ese intervalo. La navegación mantiene sus presupuestos anteriores.

Se corrige además un fallo que interrumpía el combate cuando un impacto mortal vaciaba la lista de proyectiles durante su actualización.

## NPC y habitantes

Quince actividades contextuales: trabajar, comerciar, leer, barrer, cocinar, pasear, conversar, jugar, saludar, descansar, rezar, dormir, refugiarse del clima, huir y avisar a vecinos.

Los habitantes añadidos eligen actividades según energía, curiosidad, necesidad de compañía, edad, hora, clima y peligro. Trabajar produce artesanías, cocinar consume provisiones y el intercambio mueve existencias entre vecinos. Conversaciones, saludos, lectura y tareas tienen poses propias; la boca se anima al conversar y en el diálogo.

Los comerciantes, sacerdotes, reyes y personajes de misión conservan sus funciones y horarios. Reciben los ajustes de percepción, saludo y huida compatibles con su papel. No todos los roles realizan todas las actividades. La huida de los NPC utiliza rutas con colisiones; los avisos cercanos propagan una memoria breve del peligro.

## Pruebas

```sh
npm run build
npm test
npm run test:ai-quality
npm run test:upgrade
npm run test:mobile
npm run test:browser
```

La prueba de calidad comprueba información real de alta frecuencia, UV completas, recursos compartidos y un render de un modelo texturizado. La de IA comprueba memoria limitada, oclusión del daño, intercepción, separación del ataque a distancia, evasión, límite de curaciones y la posibilidad de seleccionar las quince actividades civiles. También ejecuta una simulación de combate y navegación para detectar errores.
