// ===== OBJETOS =====
class Tarea {
  constructor(texto, prioridad = "media") {
    this.id = Date.now() + Math.random();
    this.texto = texto;
    this.prioridad = prioridad;
    this.completada = false;
  }
  alternar() {
    this.completada = !this.completada;
  }
  coincide(termino) {
    return this.texto.toLowerCase().includes(termino.toLowerCase());
  }
}

class ListaTareas {
  constructor() {
    this.tareas = [];
  }
  agregar(tarea) {
    this.tareas.push(tarea);
  }
  eliminar(id) {
    this.tareas = this.tareas.filter(t => t.id !== id);
  }
  buscar(termino) {
    return this.tareas.filter(t => t.coincide(termino));
  }
  pendientes() {
    return this.tareas.filter(t => !t.completada).length;
  }
}

// ===== DOM =====
const formulario = document.getElementById("formulario");
const inputTexto = document.getElementById("texto");
const selectPrioridad = document.getElementById("prioridad");
const mensaje = document.getElementById("mensaje");
const buscador = document.getElementById("buscador");
const ul = document.getElementById("lista");
const contador = document.getElementById("contador");

const lista = new ListaTareas();

function mostrar() {
  ul.innerHTML = "";
  const visibles = lista.buscar(buscador.value);
  visibles.forEach(tarea => {
    const li = document.createElement("li");
    li.className = tarea.prioridad + (tarea.completada ? " completada" : "");

    const span = document.createElement("span");
    span.textContent = tarea.texto;
    span.addEventListener("click", () => {          // evento click: marcar
      tarea.alternar();
      mostrar();
    });

    const botonBorrar = document.createElement("button");
    botonBorrar.textContent = "Borrar";
    botonBorrar.addEventListener("click", () => {   // evento click: borrar
      lista.eliminar(tarea.id);
      mostrar();
    });

    li.append(span, botonBorrar);
    ul.appendChild(li);
  });
  contador.textContent = "Pendientes: " + lista.pendientes();
}

// ===== EVENTOS =====
formulario.addEventListener("submit", evento => {   // evento submit
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

buscador.addEventListener("input", mostrar);        // evento input

mostrar();