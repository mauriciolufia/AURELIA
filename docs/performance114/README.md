# Perfil de lógica móvil v114

Comparación con los mismos cambios de contenido, habitantes y colores vivos de v114. La primera ejecución desactiva únicamente las optimizaciones de consultas, streaming y texto para obtener una referencia con el mismo contenido. No compara NPC activos con NPC inmóviles de otra versión.

Chromium, perfil Android 844 × 390, buffer 1920 × 1080, 30 fotogramas de preparación y **450 muestras por escena**, paso simulado de 17 ms y profiler de CPU a 1 ms. El renderizado se desactiva: estos valores son milisegundos de lógica por actualización y **no son FPS de un teléfono**.

| Escena | Mediana anterior | Mediana optimizada | P95 anterior | P95 optimizado | Media anterior | Media optimizada |
|---|---:|---:|---:|---:|---:|---:|
| town | 5.00 | 4.30 | 9.90 | 16.30 | 5.69 | 6.39 |
| house | 4.20 | 3.40 | 9.30 | 6.80 | 5.18 | 3.82 |
| fortress | 7.80 | 6.40 | 11.70 | 10.30 | 8.15 | 6.87 |

Las medianas bajaron entre el 14% y el 19% en esta ejecución. El percentil 95 y la media del exterior urbano empeoraron; esta muestra no demuestra una mejora uniforme de todos los fotogramas ni garantiza 60 FPS constantes. Los tiempos también dependen de la planificación de rutas, del recolector de memoria y del entorno de ejecución.

El seguimiento conserva los **6.261 actores** y procesa 154–240 candidatos próximos o previamente cargados en estas escenas. Las pruebas de residentes contrastan el índice con la lista completa, incluyendo teletransportación, actores desplazados y apariciones tardías. No se recortan texturas, modelos, habitantes ni resolución.

Reproducción, en ejecuciones consecutivas y sin otras pruebas de navegador simultáneas:

```sh
node scripts/profile114.cjs --unoptimized --frames=450
node scripts/profile114.cjs --frames=450
```

Los informes nuevos se guardan en /tmp/aurelia-performance114-features-before.json y /tmp/aurelia-performance114-after.json.
