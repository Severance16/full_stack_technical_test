# 📝 **Prueba Técnica Fullstack - Gestión de Tareas**

Bienvenido a la prueba técnica para desarrollador Fullstack. En esta prueba, deberás desarrollar una **aplicación web de gestión de tareas (To-Do List)** utilizando **Next.js** para el frontend (o algun framework de **JavaScript** que te sea práctico) y cualquier tecnología de backend que prefieras. La prueba está diseñada para completarse en un plazo de **5 días**.

## **Objetivo del Proyecto**
Construir una aplicación que permita gestionar tareas, implementando las siguientes funcionalidades principales:

- **Crear**, **leer**, **actualizar** y **eliminar** tareas (CRUD completo).
- Consumir un **endpoint REST** desde el backend para mostrar las tareas en el frontend.
- Utilizar **Next.js** de preferencia como framework de frontend y un backend que exponga un API REST (puedes usar Node.js con Express, Python con Flask/Django, o cualquier otra tecnología que prefieras).

---

## 🖥️ **Requisitos del Proyecto**

### **Frontend (Next.js)**

1. **Interfaz de Usuario**:
   - Crear una página principal que liste todas las tareas.
   - Incluir un formulario para añadir nuevas tareas.
   - Implementar páginas dinámicas para editar tareas y mostrar detalles.
   - Cada tarea debe tener: **título**, **descripción**, **fecha límite** y **estado** (pendiente o completada).
   - Filtrar las tareas por estado (pendiente/completada).

2. **Navegación y Componentes**:
   - Implementar rutas dinámicas en Next.js para acceder a los detalles de cada tarea.
   - Crear componentes reutilizables para formularios, botones, listas de tareas, etc.

3. **Consumo del Backend**:
   - Consumir un **API REST** que permita obtener, crear, actualizar y eliminar tareas.
   - Utilizar **fetch** o **Axios** para realizar las peticiones HTTP.

4. **Estilos**:
   - Implementar un diseño visual sencillo pero funcional. Puedes utilizar **CSS Modules**, **Sass**, **TailwindCSS**, o cualquier otro framework de CSS.

### **Backend (API REST)**

1. **Endpoints**:
   - Crear un backend que exponga al menos los siguientes endpoints:
     - `POST /tasks`: Crear una nueva tarea.
     - `GET /tasks`: Obtener todas las tareas.
     - `GET /tasks/:id`: Obtener los detalles de una tarea específica.
     - `PUT /tasks/:id`: Actualizar una tarea existente.
     - `DELETE /tasks/:id`: Eliminar una tarea.
   
2. **Base de Datos**:
   - La información de las tareas debe almacenarse en una base de datos.
   - Puedes utilizar **PostgreSQL**, **MySQL**, **MongoDB**, o cualquier otra base de datos de tu elección.
   
3. **Validaciones**:
   - Asegúrate de que el backend maneje errores y valide los datos correctamente (por ejemplo, que los campos de una tarea no estén vacíos).

### **Entrega**
- Realiza un **fork** de este repositorio y crea tu propio repositorio a partir de él.
- Desarrolla el proyecto en ese repositorio y realiza **commits frecuentes** con mensajes claros y descriptivos. Sigue buenas prácticas de commit (puedes usar prefijos como `feat`, `fix`, `docs`, etc.).
- Al finalizar, comparte el enlace a tu repositorio para su revisión.

---

## 📝 **Especificaciones Adicionales**

- **Duración de la prueba**: 5 días desde el momento en que haces el fork del repositorio, no importa que no logres completar la prueba, queremos ver cómo asumes el reto.
- **Frontend preferencial**: **Next.js**.
- **Backend**: Eres libre de elegir la tecnología, pero asegúrate de implementar al menos los endpoints solicitados.
- **Base de datos**: Eres libre de elegir entre bases de datos relacionales o NoSQL.

---

## 🚀 **Bonus (Opcional)**
Si tienes tiempo extra o deseas destacar, puedes implementar alguno de los siguientes puntos adicionales:

1. **Autenticación**: Agregar autenticación con **JWT** o **OAuth** para que solo usuarios autenticados puedan modificar las tareas.
2. **Pruebas Unitarias**: Escribir pruebas unitarias para el frontend o backend.
3. **Deploy**: Desplegar la aplicación en plataformas gratuitas como **Vercel** (frontend) y **Heroku** o **Render** (backend), y compartir los enlaces en el README.
4. **Validación Avanzada**: Agregar validaciones más avanzadas en los formularios del frontend.

---

## ¡Happy coding esperamos ver tu implementación!
