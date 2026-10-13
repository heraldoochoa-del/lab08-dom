# Bitacora de JavaScript interactivo

Laboratorio 08: JavaScript Interactivo - DOM, Eventos y Objetos.
Navegador usado: Google Chrome

## Ejercicio 2: Seleccionar y modificar el DOM

| Instruccion | Que cambio en la pantalla | Se mantiene al recargar (Si/No) |
|-------------|---------------------------|--------------------------------|
| textContent desde la consola | Cambió el título temporalmente a "Hola desde la consola" | No |
| textContent desde app.js | Cambió el título a "Hola TECSUP" | Sí |
| style.color | Cambió el color del título a azul | Sí |
| classList.add | Aplicó un fondo amarillo al párrafo | Sí |
| createElement + appendChild | Agregó "JavaScript" como un nuevo elemento a la lista | Sí |

## Ejercicio 3: Evento click

| Tipo de evento | Que accion lo dispara | Cuanto suma por accion |
|----------------|-----------------------|------------------------|
| click | Hacer un clic primario sobre el botón | Suma 1 por cada clic |
| dblclick | Hacer doble clic rápido sobre el botón | Suma 1 solo al completar el doble clic |
| mouseover | Pasar el puntero del mouse por encima del botón | Suma 1 cada vez que el mouse entra al botón |

`evento.type` muestra el nombre del evento que se ejecutó (por ejemplo: `click`).
`evento.target` muestra el elemento HTML exacto que recibió la interacción (en este caso, `<button id="btnSumar">`).

## Ejercicio 4: Eventos input y submit

| Prueba | Que paso en la pantalla | Se recargo la pagina (Si/No) |
|--------|-------------------------|------------------------------|
| Escribir en el campo nombre | El texto "Hola, ..." se actualiza letra por letra en tiempo real | No |
| Enviar sin preventDefault | El mensaje "Enviado: ..." aparece un instante y se borra | Sí |
| Enviar con preventDefault, correo sin @ | Muestra "Correo no valido: falta @" en texto color rojo | No |
| Enviar con preventDefault, correo con @ | Muestra "Enviado: " seguido del correo ingresado | No |


## Ejercicio 5: Clases y objetos

| Objeto | nombre | precio | descripcion() | conDescuento(0.25) |
|--------|--------|--------|---------------|--------------------|
| laptop | Laptop | 2500 | Laptop - S/ 2500.00 | 1875 |
| mouse | Mouse | 45 | Mouse - S/ 45.00 | 33.75 |
| teclado | Teclado | 120 | Teclado - S/ 120.00 | 90 |
| monitor | Monitor | 680 | Monitor - S/ 680.00 | 510 |

Usar una clase permite reutilizar la estructura y la lógica (métodos) para múltiples objetos sin duplicar código.
Además, facilita agregar o modificar productos dinámicamente en la interfaz dibujando los datos desde un arreglo sin alterar el HTML manualmente.

## Ejercicio 6: DOM, eventos y objetos juntos

| Prueba | Total que muestra la pagina | Correcto (Si/No) |
|--------|-----------------------------|------------------|
| Cuaderno 12.50 | 12.50 | Sí |
| + Lapicero 3.20 | 15.70 | Sí |
| + Mochila 89.90 | 105.60 | Sí |
| Sin Number() | Error en consola (this.precio.toFixed is not a function) | No |

| Pieza | Linea de tu codigo donde aparece | Para que sirve |
|-------|----------------------------------|----------------|
| DOM | `document.querySelector("#carrito")` | Selecciona y modifica elementos del HTML para dibujar la lista y el total en pantalla |
| Evento | `formProducto.addEventListener("submit", ...)` | Captura la interacción del usuario al enviar el formulario sin recargar la página |
| Objeto | `new Producto(...)` / `new Carrito()` | Almacena y gestiona los datos de los productos y realiza el cálculo matemático del total |