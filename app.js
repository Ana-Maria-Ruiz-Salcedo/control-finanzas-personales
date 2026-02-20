
// DATOS EN LOCALSTORAGE

// Si no hay datos guardados, se inician vacíos
let categorias = JSON.parse(localStorage.getItem("categorias")) || [];
let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
let recordatorios = JSON.parse(localStorage.getItem("recordatorios")) || [];

let editandoMovimiento = null;

// Guarda todo en localStorage
function guardarDatos() {
  localStorage.setItem("categorias", JSON.stringify(categorias));
  localStorage.setItem("movimientos", JSON.stringify(movimientos));
  localStorage.setItem("recordatorios", JSON.stringify(recordatorios));
}

// CATEGORÍAS

function agregarCategoria() {
  const input = document.getElementById("categoria-nombre");
  const nombre = input.value.trim();

  if (nombre === "") {
    alert("Ingresa un nombre de categoría");
    return;
  }

  categorias.push({
    id: Date.now(),
    nombre
  });

  guardarDatos();
  input.value = "";
  renderCategorias();
}

function editarCategoria(id) {
  const categoria = categorias.find(c => c.id === id);
  const nuevoNombre = prompt("Editar nombre de categoría:", categoria.nombre);

  if (nuevoNombre && nuevoNombre.trim() !== "") {
    categoria.nombre = nuevoNombre.trim();
    guardarDatos();
    renderCategorias();
    renderMovimientos();
  }
}

function eliminarCategoria(id) {
  const tieneMovimientos = movimientos.some(m => m.categoriaId === id);

  if (tieneMovimientos) {
    alert("No puedes eliminar una categoría con movimientos asociados");
    return;
  }

  if (!confirm("¿Seguro que deseas eliminar esta categoría?")) return;

  categorias = categorias.filter(c => c.id !== id);
  guardarDatos();
  renderCategorias();
}

function renderCategorias() {
  const lista = document.getElementById("lista-categorias");
  const select = document.getElementById("categoria-select");

  lista.innerHTML = "";
  select.innerHTML = "";

  categorias.forEach(cat => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${cat.nombre}
      <span>
        <button onclick="editarCategoria(${cat.id})">Editar</button>
        <button onclick="eliminarCategoria(${cat.id})">X</button>
      </span>
    `;
    lista.appendChild(li);

    const option = document.createElement("option");
    option.value = cat.id;
    option.textContent = cat.nombre;
    select.appendChild(option);
  });
}

// MOVIMIENTOS

function agregarMovimiento() {
  const tipo = document.querySelector('input[name="tipo"]:checked').value;
  const monto = parseFloat(document.getElementById("monto").value);
  const fecha = document.getElementById("fecha").value;
  const descripcion = document.getElementById("descripcion").value;
  const categoriaId = parseInt(document.getElementById("categoria-select").value);
  const fotoInput = document.getElementById("foto");

  if (!monto || !fecha || !descripcion || !categoriaId) {
    alert("Completa todos los campos");
    return;
  }

  // Función interna para guardar el movimiento
  const procesarMovimiento = (fotoBase64 = null) => {
    if (editandoMovimiento) {
      editandoMovimiento.tipo = tipo;
      editandoMovimiento.monto = monto;
      editandoMovimiento.fecha = fecha;
      editandoMovimiento.descripcion = descripcion;
      editandoMovimiento.categoriaId = categoriaId;
      if (fotoBase64) editandoMovimiento.foto = fotoBase64;
      editandoMovimiento = null;
    } else {
      movimientos.push({
        id: Date.now(),
        tipo,
        monto,
        fecha,
        descripcion,
        categoriaId,
        foto: fotoBase64
      });
    }

    guardarDatos();
    limpiarFormulario();
    renderMovimientos();
    calcularBalance();
  };

  // Si hay foto, convertirla a base64
  if (fotoInput && fotoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = e => procesarMovimiento(e.target.result);
    reader.readAsDataURL(fotoInput.files[0]);
  } else {
    procesarMovimiento();
  }
}

function editarMovimiento(id) {
  const mov = movimientos.find(m => m.id === id);
  editandoMovimiento = mov;

  document.getElementById("monto").value = mov.monto;
  document.getElementById("fecha").value = mov.fecha;
  document.getElementById("descripcion").value = mov.descripcion;
  document.getElementById("categoria-select").value = mov.categoriaId;

  if (mov.tipo === "ingreso") {
    document.getElementById("tipo-ingreso").checked = true;
  } else {
    document.getElementById("tipo-gasto").checked = true;
  }
}

function eliminarMovimiento(id) {
  if (!confirm("¿Eliminar este movimiento?")) return;

  movimientos = movimientos.filter(m => m.id !== id);
  guardarDatos();
  renderMovimientos();
  calcularBalance();
}

function renderMovimientos() {
  const lista = document.getElementById("lista-movimientos");
  lista.innerHTML = "";

  movimientos.forEach(mov => {
    const categoria = categorias.find(c => c.id === mov.categoriaId);
    const nombreCategoria = categoria ? categoria.nombre : "Sin categoría";

    const li = document.createElement("li");

    let fotoHTML = "";
    if (mov.foto) {
      fotoHTML = `<br><img src="${mov.foto}" width="60">`;
    }

    li.innerHTML = `
      <span>
        ${mov.descripcion} - ${nombreCategoria} - ${mov.fecha}
        ${fotoHTML}
      </span>
      <span>
        $${mov.monto}
        <button onclick="editarMovimiento(${mov.id})">Editar</button>
        <button onclick="eliminarMovimiento(${mov.id})">X</button>
      </span>
    `;
    lista.appendChild(li);
  });
}

// RECORDATORIOS

function agregarRecordatorio() {
  const texto = document.getElementById("texto-recordatorio").value;
  const fecha = document.getElementById("fecha-recordatorio").value;

  if (!texto || !fecha) {
    alert("Completa los datos del recordatorio");
    return;
  }

  recordatorios.push({
    id: Date.now(),
    texto,
    fecha,
    hecho: false
  });

  guardarDatos();
  renderRecordatorios();

  document.getElementById("texto-recordatorio").value = "";
  document.getElementById("fecha-recordatorio").value = "";
}

function marcarHecho(id) {
  const rec = recordatorios.find(r => r.id === id);
  rec.hecho = !rec.hecho;
  guardarDatos();
  renderRecordatorios();
}

function eliminarRecordatorio(id) {
  if (!confirm("¿Eliminar recordatorio?")) return;
  recordatorios = recordatorios.filter(r => r.id !== id);
  guardarDatos();
  renderRecordatorios();
}

function renderRecordatorios() {
  const lista = document.getElementById("lista-recordatorios");
  if (!lista) return;

  lista.innerHTML = "";

  recordatorios.forEach(r => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span style="text-decoration:${r.hecho ? "line-through" : "none"}">
        ${r.texto} - ${r.fecha}
      </span>
      <span>
        <button onclick="marcarHecho(${r.id})">✔</button>
        <button onclick="eliminarRecordatorio(${r.id})">X</button>
      </span>
    `;
    lista.appendChild(li);
  });
}

// Aviso si hay recordatorios hoy
function verificarRecordatoriosHoy() {
  const hoy = new Date().toISOString().split("T")[0];
  const pendientes = recordatorios.filter(r => r.fecha === hoy && !r.hecho);

  if (pendientes.length > 0) {
    alert("Tienes recordatorios pendientes para hoy.");
  }
}

// BALANCE

function calcularBalance() {
  let totalIngresos = 0;
  let totalGastos = 0;

  movimientos.forEach(mov => {
    if (mov.tipo === "ingreso") totalIngresos += mov.monto;
    else totalGastos += mov.monto;
  });

  const saldo = totalIngresos - totalGastos;

  document.getElementById("total-ingresos").textContent = "$" + totalIngresos;
  document.getElementById("total-gastos").textContent = "$" + totalGastos;
  document.getElementById("saldo").textContent = "$" + saldo;
}

function limpiarFormulario() {
  document.getElementById("monto").value = "";
  document.getElementById("fecha").value = "";
  document.getElementById("descripcion").value = "";
  const foto = document.getElementById("foto");
  if (foto) foto.value = "";
}


// EXPORTAR CSV delimitdo por comas o ecxel

document.getElementById("btn-exportar").addEventListener("click", exportarCSV);

function exportarCSV() {
  if (movimientos.length === 0) {
    alert("No hay movimientos para exportar.");
    return;
  }

  let csv = "Tipo,Categoría,Monto,Fecha,Descripción\n";

  movimientos.forEach(mov => {
    const categoria = categorias.find(c => c.id === mov.categoriaId);
    const nombreCategoria = categoria ? categoria.nombre : "Sin categoría";

    const fila = [
      mov.tipo,
      nombreCategoria,
      mov.monto,
      mov.fecha,
      mov.descripcion || ""
    ].join(",");

    csv += fila + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "historial_finanzas.csv";
  link.click();
}

// INICIALIZACIÓN


renderCategorias();
renderMovimientos();
renderRecordatorios();
calcularBalance();
verificarRecordatoriosHoy();
