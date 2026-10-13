# Tarea: Mi componente interactivo

## Componente elegido

Una **lista de tareas de estudio**: se agregan tareas con una prioridad (alta, media, baja), se marcan como hechas con un clic, se borran con un botón y se filtran con un buscador. Muestra cuántas tareas quedan pendientes.

## Versión 1: solo DOM

**Qué agregué:** una lista fija de tareas dentro de un arreglo y una función que recorre el arreglo y crea con `createElement` un `<li>` por cada tarea, que se agrega al `<ul>`.

**Por qué:** para practicar primero la creación de elementos sin mezclar eventos ni clases.

**Qué cambió en el comportamiento:** la página muestra la lista al cargar, pero es estática: no responde a ninguna acción del usuario.

```js
const ul = document.getElementById("lista");
const tareas = ["Estudiar DOM", "Hacer el laboratorio", "Subir a GitHub"];

tareas.forEach(texto => {
  const li = document.createElement("li");
  li.textContent = texto;
  ul.appendChild(li);
});
```

## Versión 2: con eventos

**Qué agregué:** un formulario (evento `submit`) con validación y mensaje visible, un clic sobre la tarea para marcarla (`click`), un botón Borrar (`click`) y un buscador (`input`). Las tareas pasaron a ser objetos simples `{ texto, completada }`.

**Por qué:** para que el usuario pueda modificar la lista y no solo verla.

**Qué cambió en el comportamiento:** ahora se pueden agregar, tachar, borrar y filtrar tareas. Si el texto tiene menos de 3 caracteres, aparece un mensaje en rojo en la página (sin `alert`).

```js
let tareas = [];
const formulario = document.getElementById("formulario");
const inputTexto = document.getElementById("texto");
const mensaje = document.getElementById("mensaje");
const buscador = document.getElementById("buscador");
const ul = document.getElementById("lista");

function mostrar() {
  ul.innerHTML = "";
  tareas
    .filter(t => t.texto.toLowerCase().includes(buscador.value.toLowerCase()))
    .forEach(t => {
      const li = document.createElement("li");
      if (t.completada) li.className = "completada";
      const span = document.createElement("span");
      span.textContent = t.texto;
      span.addEventListener("click", () => {
        t.completada = !t.completada;
        mostrar();
      });
      const borrar = document.createElement("button");
      borrar.textContent = "Borrar";
      borrar.addEventListener("click", () => {
        tareas = tareas.filter(x => x !== t);
        mostrar();
      });
      li.append(span, borrar);
      ul.appendChild(li);
    });
}

formulario.addEventListener("submit", e => {
  e.preventDefault();
  const texto = inputTexto.value.trim();
  if (texto.length < 3) {
    mensaje.textContent = "Escribe al menos 3 caracteres.";
    return;
  }
  mensaje.textContent = "";
  tareas.push({ texto, completada: false });
  inputTexto.value = "";
  mostrar();
});

buscador.addEventListener("input", mostrar);
mostrar();
```

## Versión 3: con clases y objetos

**Qué agregué:** la clase `Tarea` (atributos `id`, `texto`, `prioridad`, `completada`; métodos `alternar()` y `coincide()`) y la clase `ListaTareas` (atributo `tareas`; métodos `agregar()`, `eliminar()`, `buscar()` y `pendientes()`). También agregué el selector de prioridad con colores y el contador de pendientes.

**Por qué:** para que los datos y su comportamiento vivan juntos, y la parte del DOM solo se encargue de dibujar.

**Qué cambió en el comportamiento:** visualmente es casi igual a la v2, pero ahora hay prioridades, contador de pendientes y el código está más ordenado: el DOM llama a métodos de los objetos en vez de manipular datos sueltos.

```js
class Tarea {
  constructor(texto, prioridad = "media") {
    this.id = Date.now() + Math.random();
    this.texto = texto;
    this.prioridad = prioridad;
    this.completada = false;
  }
  alternar() { this.completada = !this.completada; }
  coincide(termino) {
    return this.texto.toLowerCase().includes(termino.toLowerCase());
  }
}

class ListaTareas {
  constructor() { this.tareas = []; }
  agregar(tarea) { this.tareas.push(tarea); }
  eliminar(id) { this.tareas = this.tareas.filter(t => t.id !== id); }
  buscar(termino) { return this.tareas.filter(t => t.coincide(termino)); }
  pendientes() { return this.tareas.filter(t => !t.completada).length; }
}

const lista = new ListaTareas();

function mostrar() {
  ul.innerHTML = "";
  lista.buscar(buscador.value).forEach(tarea => {
    const li = document.createElement("li");
    li.className = tarea.prioridad + (tarea.completada ? " completada" : "");
    const span = document.createElement("span");
    span.textContent = tarea.texto;
    span.addEventListener("click", () => { tarea.alternar(); mostrar(); });
    const botonBorrar = document.createElement("button");
    botonBorrar.textContent = "Borrar";
    botonBorrar.addEventListener("click", () => { lista.eliminar(tarea.id); mostrar(); });
    li.append(span, botonBorrar);
    ul.appendChild(li);
  });
  contador.textContent = "Pendientes: " + lista.pendientes();
}

formulario.addEventListener("submit", evento => {
  evento.preventDefault();
  const texto = inputTexto.value.trim();
  if (texto.length < 3) {
    mensaje.textContent = "Escribe al menos 3 caracteres.";
    return;
  }
  mensaje.textContent = "";
  lista.agregar(new Tarea(texto, selectPrioridad.value));
  inputTexto.value = "";
  mostrar();
});
buscador.addEventListener("input", mostrar);
```

## Dónde uso DOM, eventos y objetos

| Parte | Dónde aparece en el código final |
|---|---|
| DOM | `getElementById` para obtener los elementos; `createElement` para crear `<li>`, `<span>` y `<button>`; `appendChild` / `append` para insertarlos; `textContent` y `className` para modificarlos; `ul.innerHTML = ""` para limpiar la lista; eliminación de elementos al borrar una tarea (se vuelve a dibujar sin ella) |
| Eventos | `submit` en el formulario (agregar con validación); `click` en cada tarea (marcar) y en cada botón Borrar; `input` en el buscador (filtrar en tiempo real) |
| Objetos | Clase `Tarea` (constructor, 4 atributos, métodos `alternar` y `coincide`); clase `ListaTareas` (constructor, `tareas`, métodos `agregar`, `eliminar`, `buscar`, `pendientes`); instancias creadas con `new Tarea(...)` y `new ListaTareas()` |

## Pruebas realizadas

| N.° | Acción | Resultado esperado | Resultado obtenido | ¿Cumple? |
|---|---|---|---|---|
| 1 | Escribir "Estudiar JS" con prioridad alta y pulsar Agregar | Aparece la tarea con borde rojo y el contador sube en 1 | Se agrega la tarea con indicador rojo de prioridad alta y el contador marca Pendientes: 1 | Sí |
| 2 | Pulsar Agregar con el campo vacío | Mensaje rojo "Escribe al menos 3 caracteres." y no se agrega nada | Muestra el mensaje en rojo "Escribe al menos 3 caracteres." y la lista no cambia | Sí |
| 3 | Hacer clic sobre el texto de una tarea | La tarea se tacha y el contador de pendientes baja en 1 | El texto de la tarea aparece tachado y el contador disminuye a 0 | Sí |
| 4 | Hacer clic otra vez sobre la tarea tachada | Se quita el tachado y el contador vuelve a subir | Se remueve el estilo tachado y el contador vuelve a subir a 1 | Sí |
| 5 | Pulsar Borrar en una tarea | La tarea desaparece de la lista | La tarea es removida del DOM y la lista se actualiza correctamente | Sí |
| 6 | Escribir "js" en el buscador | Solo se ven las tareas que contienen "js" | Filtra dinámicamente mostrando solo las tareas coincidentes | Sí |
| 7 | Revisar la consola del navegador (F12) en GitHub Pages | No hay errores | La consola se mantiene limpia sin excepciones ni advertencias | Sí |

## Por qué diseñé así mi clase

Diseñé `Tarea` con los atributos `texto`, `prioridad`, `completada` e `id` porque son los datos mínimos que necesito para mostrar una tarea, ordenarla visualmente por importancia, saber si ya se hizo y poder borrarla sin confundirla con otra de igual texto. Sus métodos `alternar()` y `coincide()` salen de las dos cosas que el usuario hace con una tarea individual: marcarla y buscarla, así la propia tarea sabe cómo cambiar y cuándo coincide con un término. Separé la clase `ListaTareas` para manejar el conjunto (agregar, eliminar, buscar, contar), de modo que el código del DOM solo llama a esos métodos y se limita a dibujar el resultado.