# Finance Control App

Una **Single Page Application (SPA)** para gestionar finanzas personales, desarrollada con HTML, CSS y JavaScript.  
Permite llevar registro de ingresos, gastos, categorías, balance, historial y recordatorios con persistencia local (localStorage) y exportación en CSV.

🔗 **Demo Online:**  
https://ana-maria-ruiz-salcedo.github.io/control-finanzas-personales/

---

## Descripción

Esta aplicación permite a cualquier persona organizar sus finanzas personales desde el navegador sin necesidad de backend ni base de datos remota.  
Los datos se guardan en el navegador (localStorage) para que el usuario no pierda su información al cerrar o actualizar la página.

Las funcionalidades están basadas en historias de usuario y reglas claras de negocio.

---

## Historias de Usuario

1. **Gestión de Categorías:**  
   - Crear, editar y eliminar categorías para clasificar movimientos.
   - Si se elimina una categoría con movimientos asociados, habra un bloqueo con un mensaje "No puedes eliminar una categoria con movimientos asociados".

2. **Gestión de Movimientos:**  
   - Registrar ingresos y gastos con:
     - Monto
     - Fecha
     - Descripción
     - Categoría
     - Foto opcional

3. **Balance General:**  
   - Muestra:
     - Total de ingresos
     - Total de gastos
     - Saldo actual ($Ingresos – Gastos$)

---

## Reglas de Oro implementadas

✔ Los ingresos suman al balance  
✔ Los gastos restan del balance  
✔ LocalStorage mantiene los datos guardados  
✔ No se puede eliminar una categoria con movimientos asociados.  
✔ Responsive: diseño adaptable a celular, tablet y escritorio  

---

## Características adicionales

✔ Exportar historial a CSV  
✔ Validaciones simples en formularios  
✔ Interfaz visual limpia y moderna  
✔ Notificaciones visuales (alertas simples)  
✔ Recordatorios pendientes  

---

## Tecnologías utilizadas

- HTML5  
- CSS3 (Grid, Flexbox, variables CSS)  
- JavaScript ES6  
- localStorage  

---

## Estructura del repositorio
