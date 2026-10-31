# mision3_react

Misión M3 · CountryWeb — Web Development I.

## Cómo probarlo
Abre index.html en el navegador con Vite usando los comandos npm run dev y luego con enter + o abres la página. Empieza a buscar países o a navegar la lista, puedes filtrar por región 

## Uso de IA
Usé Gemini CLI (VS Code) como pareja de programación, fase a fase.
Ejemplo de prompt real: "Propón 4 o 5 fases pequeñas para construir un
whack-a-mole en JS puro; no escribas código todavía".
Verifiqué cada cambio jugando una partida completa antes de aceptar la
siguiente fase, y probé los casos límite (clic en casilla vacía, clic
después del fin de partida).
Escribí a mano: el setTimeout encadenado que hace aparecer los bugs,
que la primera propuesta resolvía con setInterval y no se detenía bien
al acabar la partida.

## Autopsia
1. Guardo la posición del bug activo en una variable del módulo en vez
   de leerla del DOM cada vez, porque el DOM solo debería reflejar el
   estado, no ser la fuente de verdad. Descarté buscar la casilla por su
   clase CSS: es más frágil y acopla la lógica al aspecto.
2. Uso un solo listener en el contenedor de la cuadrícula (delegación) en
   vez de nueve listeners, uno por casilla. Descarté los nueve porque al
   reiniciar la partida habría que quitarlos y volver a ponerlos, y es
   justo donde aparecen los bugs de eventos duplicados.