# mision3_react

Misión M3 · CountryWeb — Web Development I.

## Cómo probarlo
Abre index.html en el navegador con Vite usando los comandos npm run dev y luego con enter + o abres la página. Empieza a buscar países o a navegar la lista, puedes filtrar por región o por texto. 
Al hacer click en un país te muestra su ficha con capital, población, región, subregión y moneda.
También tiene un comparador que tiene un máximo de 2 países.

## Uso de IA
Usé Gemini para generar un comparador porque no sabía como hacerlo. También para crar una variable que ignorara una respuesta de la api que llegaba tarde.

Ejemplo de prompt: "Como puedo implementar un comparador de dos países con 5 categorías, y las funciones para añadir o quitarlo".

Usé Claude para crear el hook useLocalStorage.js. También para decidir que iba a aparecer, es decir aparecer en pantalla usando condicionales.

Usé Copilot para modificar y mejorar el diseño css anterior. Además lo usé para poder acceder a las opciones de la pantalla usando el teclado, es decir usando las flechas del teclado para desplazarse por los botones.

Usé Claude para mejorar la parte visual de la lista y cada ficha

Ejemplo de prompt: "La lista no está ni alineada y además no tienen un borde entre fichas"



## Autopsia
1. Al pasar de la misión 2 a la tercera algunos de mis css usaban los ids que ya no existían así que lo cambie para evitar problemas.
2. Para mejorar el comparador lo extendí de 2 a 4 países para que fuera un como más flexivle pero tampoco tanto como para acumular mucho espacio de la pantalla.