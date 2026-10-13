class Estudiante {
  constructor(nombre, nota) {
    this.nombre = nombre;
    this.nota = Number(nota);
  }

  obtenerEstado() {
    return this.nota >= 13 ? "Aprobado" : "Desaprobado";
  }

  obtenerDescripcion() {
    return `${this.nombre} - Nota: ${this.nota.toFixed(2)} (${this.obtenerEstado()})`;
  }
}

class GestorNotas {
  constructor() {
    this.estudiantes = [];
  }

  agregar(estudiante) {
    this.estudiantes.push(estudiante);
  }

  eliminar(nombre) {
    this.estudiantes = this.estudiantes.filter(e => e.nombre !== nombre);
  }

  calcularPromedio() {
    if (this.estudiantes.length === 0) return 0;
    const suma = this.estudiantes.reduce((acc, est) => acc + est.nota, 0);
    return suma / this.estudiantes.length;
  }
}

const gestor = new GestorNotas();

const form = document.querySelector("#formEstudiante");
const inputNombre = document.querySelector("#nombre");
const inputNota = document.querySelector("#nota");
const lista = document.querySelector("#listaEstudiantes");
const promedioEl = document.querySelector("#promedioGeneral");
const mensajeError = document.querySelector("#mensajeError");
const buscador = document.querySelector("#buscador");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  mensajeError.textContent = "";

  const nombre = inputNombre.value.trim();
  const notaVal = Number(inputNota.value);

  if (!nombre || inputNota.value === "" || isNaN(notaVal) || notaVal < 0 || notaVal > 20) {
    mensajeError.textContent = "Error: Ingrese un nombre y una nota válida entre 0 y 20.";
    return;
  }

  const nuevoEstudiante = new Estudiante(nombre, notaVal);
  gestor.agregar(nuevoEstudiante);

  renderizarLista();
  form.reset();
});

function renderizarLista() {
  lista.innerHTML = "";
  const filtro = buscador.value.toLowerCase();

  gestor.estudiantes.forEach(est => {
    if (est.nombre.toLowerCase().includes(filtro)) {
      const li = document.createElement("li");
      li.textContent = est.obtenerDescripcion();

      const btnBorrar = document.createElement("button");
      btnBorrar.textContent = "Eliminar";
      btnBorrar.className = "delete-btn";

      btnBorrar.addEventListener("click", () => {
        gestor.eliminar(est.nombre);
        renderizarLista();
      });

      li.appendChild(btnBorrar);
      lista.appendChild(li);
    }
  });

  promedioEl.textContent = gestor.calcularPromedio().toFixed(2);
}

buscador.addEventListener("input", () => {
  renderizarLista();
});