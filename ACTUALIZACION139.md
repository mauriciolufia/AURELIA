# Actualización 139 · Torre de la Aurora Carmesí

La isla del dragón tiene ahora una torre medieval de diez pisos, construida siguiendo los [planos publicados](docs/torre139/). Las nueve primeras plantas tienen cuatro salas pequeñas y pasillos delimitados por muros: hay que recorrer sala 1 → sala 2 → sala 3 → sala 4 antes de subir. Las plantas alternan el sentido del recorrido. Las nueve escaleras permiten subir y bajar físicamente.

Cada planta ordinaria contiene cuatro enemigos, dos en cada una de las dos salas orientales. Hay cuatro especies propias de nivel 35–45: Guardián de Basalto (tanque), Bestia de Brasa (asalto), Vigía Carmesí (tirador) y Oráculo de Ceniza (mago de fuego). Sus atributos y técnicas respetan especie y nivel. Las bajas quedan guardadas.

El dragón y su cofre original están en la planta 10, un salón único de 14 metros de altura frente a los 10 de las plantas ordinarias. Se conserva la condición de derrotar al dragón para acceder al tesoro.

El exterior es de piedra gris azulada, con contrafuertes y tejado de pico; los interiores tienen ladrillo medieval. Una [imagen original de losas](assets/torre139/piso-piedra-gris-azulada.png) se aplica al suelo de las diez plantas y sus balcones. Su versión WebP está incluida en ambos HTML para jugar sin archivos externos.

Ochenta antorchas en los muros tienen llamas animadas y utilizan el conjunto existente de luces locales. La iluminación interior es media a baja: más tenue de noche y algo mayor de día, conservando la luz cálida de las antorchas. Los cuarenta balcones se pueden recorrer y tienen barandillas con colisión. Al salir recuperan la iluminación exterior y la vista del entorno; están separados para impedir atajos entre salas.

Validación en Chromium de escritorio y móvil: cadena obligatoria en las nueve plantas, 549 muestras de escalera, subida y bajada con el controlador real, salida y regreso por los cuarenta balcones, barandillas, textura incrustada, iluminación día/noche, guardado, técnicas y cofre. Se dibujan las diez plantas, el exterior y vistas de día, noche y balcón para revisar errores de WebGL. También se verifica el paquete autónomo y la regresión de escaleras de las otras fortalezas.
