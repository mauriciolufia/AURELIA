# Actualización 142 · Verificación de versión y cierre de atajos

- El dibujante compartido acepta planos sin listas opcionales `furniture` y `addedTraps85`. La corrección ya no depende exclusivamente de que el constructor de la torre cree esas listas.
- La zona central ajena a salas y pasillos tiene colisión propia en las nueve plantas ordinarias.
- El desplazamiento dentro de la torre obliga a caminar. El modo vuelo omitía las colisiones de todos los muros; ya no permite saltarse el circuito interior. Fuera de la torre mantiene su funcionamiento.
- La bienvenida y el HUD muestran **Versión 142** y **v142**, respectivamente.
- El controlador antiguo de pantalla completa respeta los menús y el modo móvil, y atiende los rechazos del navegador al capturar el ratón.
- `version142.html` contiene el juego completo en una dirección propia; comparte el guardado del mismo dominio con `index.html` y `play.html`.

Pruebas: dibujado de los diez planos con ambas listas opcionales ausentes o nulas, bloqueo del centro, intento de atravesar los muros volando, carga real con GPU de un guardado del formato 140 dentro de la torre, conservación de oro y planta, recorrido con controles, mapa y selector de plantas en móvil.

```sh
npm run build
node tests/map141.cjs --release142 --legacy-save --live
node tests/map141.cjs --release142 --circuit --mobile
npm run test:package
```

La publicación 141 se contrastó con el registro público de GitHub Actions, ejecución 40942834414, que terminó correctamente para el commit `1313e52`. El acceso HTTP directo a GitHub Pages está bloqueado por la política de red de este entorno; la comprobación de publicación y las pruebas locales no equivalen a haber leído el HTML servido en el navegador del usuario.
