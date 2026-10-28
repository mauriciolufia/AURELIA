# Actualización 137 · Roles enemigos y estados visibles

Los enemigos usan atributos y repertorios según su especie, rango y nivel. Los multiplicadores se aplican a las curvas existentes de nivel 1–60; no sustituyen los niveles de las misiones. La consulta de un enemigo muestra su rol.

| Rol | HP | DEF | ATK | Desplazamiento | Comportamiento |
| --- | ---: | ---: | ---: | ---: | --- |
| Asalto | ×0,78 | ×0,75 | ×1,12 | ×1,20 | Cargas y ataques agresivos, preparación más corta y turnos un 12% más rápidos |
| Tanque | ×1,65 | ×1,60 | ×0,72 | ×0,76 | Resiste, aumenta DEF y auxilia a sus aliados; turnos más lentos |
| Tirador | ×0,65 | ×0,70 | ×0,95 | ×1,05 | Mantiene distancia y dispara proyectiles físicos, también en sus turnos normales |
| Mago elemental | ×0,72 | ×0,65 | ×1,05 | ×0,95 | Proyectiles y zonas elementales de su especie, con nombres del escalón de magia aprendido |
| Especialista en estados | ×0,82 | ×0,80 | ×0,88 | ×1 | Venenos, miradas, maldiciones o control según especie y nivel |
| Equilibrado | ×1 | ×1 | ×1 | ×1 | Slimes comunes y fauna sin especialización |

Los valores parten de las curvas de la actualización 136 de esa especie y nivel, incluidos los rangos de normal, élite o jefe. Se mantienen el límite base de 350.000 ATK y los 700.000 ATK del Emperador, además de la calibración del daño contra armadura del mismo nivel. Los roles modifican el daño alrededor de esa referencia y las mejoras temporales pueden superar el ataque base. Se conservan las técnicas propias de los controladores del Emperador y la invasión, la curación del 30% de los archidiablos y la Ira de los Devoradores. Los valores se recalculan desde la base para impedir acumulaciones al cargar o reaparecer.

## Técnicas y apoyo

- Se conservan hasta dos técnicas hasta nivel 40 y tres desde el 41, además de las excepciones existentes de jefes y bestias.
- Los escalones elementales son 1, 5, 10, 20, 30, 40, 50, 55 y 60. Una criatura no recibe un escalón superior a su nivel.
- Sueño y quemadura se habilitan desde nivel 5; congelación desde 10; veneno desde 20; confusión desde 30 y petrificación desde 40. Una técnica de control inferior puede ralentizar hasta alcanzar el nivel necesario para su estado avanzado.
- Los tanques aumentan su DEF un 35% durante 8 segundos. Hasta nivel 40 combinan defensa y auxilio en una técnica; desde el 41 tienen una curación de aliados independiente.
- El auxilio recupera entre un 12% y un 20% del HP máximo según nivel, con 10 segundos entre apoyos. Solo ayuda a aliados vivos de la misma zona, cercanos y con línea de visión; mantiene el límite de dos curaciones por objetivo y vida.
- Los ataques normales de tiradores y magos son proyectiles físicos de potencia ×0,85, con preparación visible, alcance limitado y colisión con paredes. Las técnicas conservan su elemento. Al acercarte pueden combatir cuerpo a cuerpo.
- Se mantiene el límite de tres enemigos que atacan al héroe a la vez y las comprobaciones de alcance, colisiones y visibilidad.

## Estados y apariencia

| Estado | Enemigos | Héroe en tercera persona |
| --- | --- | --- |
| Petrificación | 10 segundos sin desplazarse ni iniciar ataques; acabado de piedra y pose congelada | Mismo acabado e inmovilización de 10 segundos; bloquea movimiento, salto, ataques y magia |
| Congelación | 10 segundos inmóvil, acabado azul helado, cristales y copos | Mismo bloqueo de 10 segundos, cuerpo helado y cobertura de hielo |
| Quemadura | Llamas alrededor del cuerpo; daño elemental cada 2 segundos durante 8 segundos | Llamas alrededor del cuerpo; conserva el sistema de daño periódico del héroe |
| Veneno | Tinte verde moderado y burbujas tóxicas; daño cada 2 segundos durante 12 segundos | Tinte verde y toxicidad; conserva los pulsos de veneno del héroe |
| Sueño | Postura vencida, “Z” flotantes y acciones suspendidas durante 10 segundos | Postura dormida y “Z”; bloquea movimiento, salto, ataques y magia durante 10 segundos |
| Confusión | Altera decisiones y puntería durante 8 segundos | Desvía suavemente el desplazamiento durante 8 segundos, con señal visual tenue |

En primera persona se sustituye el efecto del cuerpo por un borde tenue y pequeñas señales periféricas: hielo, llamas, toxicidad, piedra o sueño. Opacidad del 16%, centro despejado y sin interceptar controles.

Las magias elementales de fuego desde nivel 5, hielo desde 10 y naturaleza desde 20 pueden causar quemadura, congelación o veneno. Los estados del jugador conservan una única tirada de éxito: 50% contra normales y élites, 20% contra jefes. Existe además Quemadura como magia de estado de nivel 5. El daño periódico no vuelve a aplicar su propio estado.

La panacea elimina también petrificación, congelación y confusión. Los temporizadores se detienen al pausar. Los materiales originales se restauran al terminar o curar el estado, morir o cargar una partida. Los estados transitorios no se guardan como efectos permanentes.

## Renderizado y comprobaciones

Los materiales se duplican únicamente para criaturas afectadas, sin teñir las otras criaturas que compartan material. Las partículas se agrupan por estado, con hasta 192 instancias por grupo y 24 actores visibles, incluido el héroe. No se añaden luces ni archivos externos; ambos HTML siguen siendo autónomos.

`npm run test:roles` revisa la cobertura de especies y los requisitos de nivel. `npm run test:states` y `npm run test:states:mobile` comprueban la progresión, los atributos de todos los enemigos, las habilidades infernales conservadas, apoyo, inmovilización, materiales, daño periódico, controles, proyectiles, pausa y recarga. También generan capturas y un catálogo JSON de atributos reales en `/tmp/aurelia-*137-*`.

El [catálogo por especie](docs/enemigos137.md) recoge los atributos y las técnicas de la partida de prueba. Estas pruebas no equivalen a completar toda la campaña.
