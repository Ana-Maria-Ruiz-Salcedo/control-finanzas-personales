💰 Finance Control App

Una Single Page Application (SPA) para gestionar finanzas personales, desarrollada con HTML, CSS y JavaScript.
Permite llevar registro de ingresos, gastos, categorías, balance, historial y recordatorios con persistencia local (localStorage) y exportación en CSV.

🔗 Git:
https://ana-maria-ruiz-salcedo.github.io/control-finanzas-personales/

📌 Descripción

Esta aplicación permite a cualquier persona organizar sus finanzas personales desde el navegador sin necesidad de backend ni base de datos remota.

Los datos se almacenan en el navegador mediante localStorage, lo que permite conservar la información incluso después de cerrar o actualizar la página.

El desarrollo se realizó bajo el enfoque de SPA (Single Page Application), aplicando principios de organización modular en JavaScript.

🚀 Cómo ejecutar el proyecto
🔹 Opción 1: Ejecutar en línea (Recomendado)
Ingresar al siguiente enlace:
👉 https://ana-maria-ruiz-salcedo.github.io/control-finanzas-personales/
No requiere instalación.

🔹 Opción 2: Ejecutar localmente
Clonar el repositorio:
git clone https://github.com/Ana-Maria-Ruiz-Salcedo/control-finanzas-personales.git
Ingresar a la carpeta del proyecto:
cd control-finanzas-personales
Abrir el archivo index.html en el navegador
O ejecutar con una extensión como Live Server en Visual Studio Code.

👩‍💻 Historias de Usuario
1. Gestión de Categorías

Crear, editar y eliminar categorías.
No se puede eliminar una categoría con movimientos asociados (muestra mensaje de validación).

2. Gestión de Movimientos

Registrar ingresos y gastos con:

Monto
Fecha
Descripción
Categoría
Foto opcional

3. Balance General

Muestra automáticamente:
Total de ingresos
Total de gastos
Saldo actual (Ingresos – Gastos)

✅ Reglas de Negocio Implementadas

✔ Los ingresos suman al balance
✔ Los gastos restan del balance
✔ Persistencia de datos con localStorage
✔ Bloqueo de eliminación de categorías con movimientos asociados
✔ Diseño responsive (celular, tablet y escritorio)

⭐ Características adicionales

✔ Exportación del historial a CSV
✔ Validaciones en formularios
✔ Interfaz limpia y moderna
✔ Notificaciones visuales
✔ Recordatorios pendientes

🛠 Tecnologías utilizadas

HTML5
CSS3 (Grid, Flexbox, variables CSS)
JavaScript ES6
localStorage

📁 Estructura del repositorio
/control-finanzas-personales
│── index.html
│── styles.css
│── script.js
│── /assets

