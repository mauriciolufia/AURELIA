# Aurelia RPG · actualización 128

Los enemigos hostiles del bioma demoníaco final, el volcán, las seis plantas del Eclipse y la caverna reciben detalles anatómicos por especie. Se añaden párpados, esclerótica, iris, pupilas verticales, brillos en los ojos, cejas óseas, pómulos, mandíbulas, encías, dientes y colmillos. Los humanoides incorporan pecho, abdomen, hombros, antebrazos, manos, nudillos, dedos y uñas. Las bestias e insectos tienen placas, articulaciones y garras; reptiles y demonios apropiados reciben colas segmentadas y espinas. Los murciélagos incorporan nervaduras y ganchos en las alas.

Las manos se vinculan a las articulaciones originales cuando existen. Los modelos de cuerpo fusionado reciben brazos adicionales con animación de espera y preparación de ataque. No se modifican HP, ATK, DEF, técnicas, velocidad ni colisiones de los monstruos.

Las piezas usan geometría fusionada, material común y buffers compartidos entre modelos iguales. Los detalles se construyen al acercarse, solo para enemigos residentes y visibles: cuerpo hasta 48 m, manos y extremidades hasta 28 m, y dientes y ojos finos hasta 24 m. Fuera de esas distancias se conserva el modelo existente. Las plantas ocultas siguen sin dibujarse; las cámaras del Eclipse conservan sus 3–4 enemigos.

Solo la última planta del Trono del Eclipse aumenta su altura arquitectónica un 30%: 23,4 m frente a los 18 m de las otras cinco. Se ajustan techo, muros y alturas de interacción, manteniendo la cota del suelo, la escalera de acceso y el tamaño de los enemigos.

Pruebas: `npm run test:anatomy`, `npm run test:anatomy:mobile`, `npm run test:package`, `npm run test:scale`, `npm run test:techniques`. La prueba de anatomía genera una galería de modelos reales, comprueba las estadísticas y la reutilización de geometría, y mantiene las comprobaciones de escaleras, guardado, población y combate.
