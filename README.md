# Hoja de Vida Profesional - Despliegue Web Embed en Flutter (Tarea 6)

**Universidad Politécnica Estatal del Carchi (UPEC)**  
**Carrera:** Desarrollo de Software / Computación  
**Asignatura:** Programación Móvil  
**Docente:** PhD. Samuel Lascano Rivera  
**Estudiante:** Jhoel Sebastian Reina Gordon (`SebasReina.Dev`)  
**Contacto:** 0999736566 | 10cdreinasebastian@gmail.com  

---

## 📌 Descripción del Proyecto
Este repositorio contiene la solución técnica de la **Tarea 6**, estructurada en dos fases de desarrollo:
1. **Fase 1 (`web_cv/`):** Hoja de vida profesional interactiva desarrollada bajo estándares web (HTML5 semántico, CSS3 con diseño Mobile-First y JavaScript interactivo).
2. **Fase 2 (`cv_flutter_wrapper/`):** Aplicación móvil en Flutter que embebe la interfaz web mediante el componente `webview_flutter`, integrando controles nativos de navegación en la `AppBar` y soporte de assets locales offline.

---

## 📂 Estructura del Código

```text
├── web_cv/                                      # Fase 1: Hoja de Vida Web Interactiva
│   ├── index.html                               # Maquetación semántica (Hero, Perfil, Skills, Proyectos, Contacto)
│   ├── styles.css                               # Sistema de diseño responsive Mobile-First, Dark/Light Mode y @media print
│   ├── app.js                                   # Filtros interactivos, acordeón, animaciones y validaciones
│   ├── profile.jpg                              # Fotografía de perfil profesional
│   └── Certificado-Sebastian-Reina-Gordon.pdf   # Certificado internacional de IA
│
└── cv_flutter_wrapper/                          # Fase 2: Contenedor Móvil en Flutter
    ├── lib/
    │   └── main.dart                            # Implementación de WebView, NavigationDelegate y AppBar nativa
    ├── assets/
    │   └── web_cv/                              # Assets web locales para ejecución 100% offline
    ├── android/                                 # Configuración nativa Android (Gradle, Manifest, Kotlin)
    └── pubspec.yaml                             # Dependencias y recursos de Flutter
```

---

## 🚀 Instrucciones de Ejecución

### 1. Ejecución de la Web (`web_cv/`)
Para abrir y probar la hoja de vida interactiva en el navegador:
* Haz doble clic sobre el archivo `web_cv/index.html` o ábrelo con cualquier navegador web moderno (Google Chrome, Microsoft Edge, Brave, Firefox).

### 2. Ejecución de la App Móvil en Flutter (`cv_flutter_wrapper/`)
Para compilar y correr la aplicación móvil:

1. **Abrir la carpeta en la terminal o IDE:**
   ```bash
   cd cv_flutter_wrapper
   ```
2. **Descargar dependencias:**
   ```bash
   flutter pub get
   ```
3. **Ejecutar en un emulador o dispositivo físico:**
   ```bash
   flutter run
   ```

---

## 🛠️ Tecnologías Utilizadas
* **Frontend Web:** HTML5, CSS3 (Variables, Grid, Flexbox, Glassmorphism), JavaScript ES6+.
* **Mobile Framework:** Flutter 3.x, Dart 3.x.
* **Plugin Móvil:** `webview_flutter: ^4.7.0`.
* **Plataforma Objetivo:** Android (minSdkVersion 21, targetSdkVersion 34) & Web.
