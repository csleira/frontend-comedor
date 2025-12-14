# Comedor Frontend

Frontend del proyecto **Comedor**, desarrollado con React y herramientas modernas del ecosistema JavaScript. Esta aplicación se encarga de la interfaz de usuario, la navegación, la autenticación y la gestión de bebidas, comunicándose con un backend mediante una API REST.

---

## 🧾 Descripción general

Comedor Frontend es una aplicación web modular que permite:

* Navegar por páginas públicas y privadas
* Autenticarse mediante login y registro de usuarios
* Gestionar bebidas (listar, crear, editar y eliminar)
* Consumir datos desde un backend desacoplado

El proyecto está pensado para ser claro, escalable y fácil de mantener.

---

## 🛠️ Tecnologías utilizadas

* **React**: librería principal para construir la interfaz de usuario mediante componentes reutilizables.
* **Vite**: entorno de desarrollo rápido y herramienta de build para producción.
* **React Router DOM**: manejo de rutas y navegación dentro de la aplicación.
* **Axios**: cliente HTTP para la comunicación con la API REST.
* **Formik**: gestión de formularios y estados asociados.
* **Zod**: validación de datos y esquemas.
* **Tailwind CSS**: estilos y diseño responsivo.
* **ESLint**: control de calidad y buenas prácticas de código.

---

## 📁 Estructura del proyecto

```
src
├── assets            # Recursos estáticos (imágenes)
├── constants         # Constantes globales
├── layouts           # Layouts compartidos
├── modules           # Módulos funcionales de la app
│   ├── auth          # Autenticación
│   ├── drink         # Gestión de bebidas
│   └── home          # Página principal
├── router            # Configuración de rutas
├── shared            # Utilidades compartidas
├── ui                # Componentes reutilizables de UI
├── App.jsx           # Componente principal
├── main.jsx          # Punto de entrada
└── index.css         # Estilos globales
```

---

## 🧩 Descripción de módulos y componentes

### App.jsx

Componente principal de la aplicación. Inicializa el sistema de rutas y los providers globales.

### main.jsx

Punto de entrada donde React se monta en el navegador.

---

### Layouts

**MainLayout.jsx**
Define la estructura visual general que comparten las distintas páginas de la aplicación.

---

### Router

* **mainRouter.jsx**: define todas las rutas disponibles y los componentes asociados.
* **ProtectedRoute.jsx**: protege las rutas privadas, permitiendo el acceso solo a usuarios autenticados.

---

### Módulo Auth

Maneja todo lo relacionado con la autenticación de usuarios.

* **AuthPage.jsx**: página principal de autenticación.
* **LoginForm.jsx**: formulario de inicio de sesión.
* **RegisterForm.jsx**: formulario de registro.
* **AuthContext / AuthProvider**: gestionan el estado global del usuario autenticado.
* **useAuth**: hook para acceder al estado de autenticación.
* **useLogin / useRegister**: hooks con la lógica de login y registro.
* **authService.js**: llamadas a la API relacionadas con autenticación.

---

### Módulo Drink

Encargado de la gestión de bebidas dentro del sistema.

* **DrinkPage.jsx**: página principal de bebidas.
* **DrinkForm.jsx**: formulario para crear o editar bebidas.
* **DrinksContext / DrinksProvider**: manejo del estado global de bebidas.
* **useDrinks**: hook para obtener el listado de bebidas.
* **useDeleteDrink**: hook para eliminar bebidas.
* **drinkSchemas.js**: esquemas de validación con Zod.
* **drinkService.js**: comunicación con la API de bebidas.

---

### Home

* **HomePage.jsx**: página pública principal del sistema.

---

### UI Components

Componentes reutilizables que mantienen un diseño consistente en toda la aplicación:

* AppButton
* AppInput
* AppTextarea
* AppCard
* AppHeroCard
* AppLoader

---

### Shared Utils

* **httpClient.js**: configuración centralizada de Axios.
* **validateSchema.js**: validación de datos utilizando Zod.

---

## ⚙️ Instalación y ejecución

1. Clonar el repositorio
2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
```

4. Generar build de producción:

```bash
npm run build
```

---

## 🔄 Funcionamiento general

* El usuario navega por la aplicación mediante React Router.
* Las rutas privadas requieren autenticación.
* Los datos se consumen desde el backend usando Axios.
* Los formularios validan datos con Formik y Zod antes de enviarlos.
* El estado global se maneja mediante Context y hooks personalizados.

---

## 📌 Notas finales

Este frontend está desarrollado siguiendo buenas prácticas de desarrollo, con una arquitectura modular y componentes reutilizables, lo que facilita su integración con el backend y su mantenimiento a largo plazo.
