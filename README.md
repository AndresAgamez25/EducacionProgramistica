# Bitácora - Universidad abierta de programación

Una página web para aprender programación desde cero, como si fuera una carrera. Va en orden, materia por materia, de lo más básico a lo más avanzado. Está pensada para:

- personas que nunca han programado (incluso estudiantes de bachillerato),
- estudiantes universitarios con temas flojos,
- profesionales que quieren repasar y reforzar.

La guía es **Nala**, una gatica calicó (naranja, blanco y negro).

## Qué tiene la versión 1.0

- **Semestres 1 y 2 completos**: 9 materias, 36 clases, más de 250 bloques de contenido y más de 100 ejercicios.
  - PRG-100 Aprender a aprender
  - PRG-101 Lógica y algoritmos
  - MAT-101 Matemáticas para programar
  - PY-101 a PY-106: Python desde cero hasta una tienda completa en consola
- **Semestres 3 a 6 en el plan de estudios** (Git, HTML, CSS, JavaScript, TypeScript, SQL, backend, seguridad, pruebas, Java, estructuras de datos, C#, C++, videojuegos, ágil, ética y proyecto final). Aparecen como "en preparación", con su temario.
- **Python de verdad en el navegador** (Pyodide). No necesitas instalar nada. Los ejercicios de código se califican ejecutando tu programa.
- **Cada signo explicado**: en cualquier código puedes tocar `>`, `==`, `:`, `%`, etc. y ver qué significa y cómo se lee.
- **Glosario** con las palabras técnicas, tocables dentro de las clases.
- **Repaso espaciado**: lo que respondes vuelve a los 1, 3, 7, 16, 35 y 90 días, mezclado entre materias.
- **Validar materias**: si ya sabes un tema, presentas un examen. Si sacas 80% o más, la materia queda validada; si no, te dice qué clases repasar.
- **Proyecto hilo**: toda la carrera construye una tienda, pieza por pieza.
- **Mi bitácora**: guarda lo que explicas con tus palabras.
- **Laboratorio** para Python, JavaScript y HTML.
- Sesión de enfoque de 25 + 5 minutos, modo noche, constancias imprimibles por semestre.
- Funciona en celular, tablet y computador.

El método y las investigaciones en las que se basa están en [docs/METODO.md](docs/METODO.md).

## Cómo publicarla en GitHub Pages

1. Crea un repositorio nuevo en GitHub (por ejemplo `bitacora`).
2. Sube **todo el contenido** de esta carpeta (incluida la carpeta `vendor`, que trae Python).
   - Desde la web: "Add file" > "Upload files", arrastra todo y "Commit changes".
   - O con Git:
     ```bash
     git init
     git add .
     git commit -m "Bitácora v1.0"
     git branch -M main
     git remote add origin https://github.com/TU-USUARIO/bitacora.git
     git push -u origin main
     ```
3. En el repositorio ve a **Settings > Pages**.
4. En "Source" elige **Deploy from a branch**, rama `main`, carpeta `/ (root)` y guarda.
5. En uno o dos minutos la página queda en `https://TU-USUARIO.github.io/bitacora/`.

El archivo `.nojekyll` ya está incluido para que GitHub sirva todos los archivos tal cual.

## Probarla en tu computador

Abrir `index.html` con doble clic funciona para casi todo, pero Python necesita un servidor (los navegadores no dejan cargar el "Worker" desde un archivo local). Desde esta carpeta:

```bash
python -m http.server 8000
```

y abre `http://localhost:8000`.

## Estructura

```
index.html              la página
css/estilos.css         todo el diseño (estilo cuaderno de ingeniería)
js/nucleo.js            progreso, repaso espaciado, reglas de avance
js/codigo.js            resaltado, signos tocables, ejecución de Python y JavaScript
js/py-worker.js         Python (Pyodide) en segundo plano
js/bloques.js           cómo se dibuja cada bloque de clase y cada ejercicio
js/vistas.js            las pantallas
js/app.js               menú, navegación y botones
js/datos/               el contenido: materias, símbolos, glosario, plan de estudios
img/nala/               la mascota en SVG
herramientas/nala.py    genera las poses de Nala
sonidos/                efectos de sonido
vendor/pyodide/         Python para el navegador (licencia MPL-2.0)
docs/                   el método y cómo agregar contenido
```

Para agregar materias o clases, lee [docs/COMO-AGREGAR-CONTENIDO.md](docs/COMO-AGREGAR-CONTENIDO.md).

## Tu progreso

Se guarda en el navegador (localStorage). Para pasarlo a otro dispositivo usa **Perfil > Descargar mi progreso** y luego **Cargar progreso** en el otro. Al cargar, se une con lo que ya tenías.

## Licencia

Código y contenido bajo licencia MIT (ver `LICENSE`). Pyodide se distribuye bajo MPL-2.0.

Hecho por Andrés Felipe Agámez Cali, estudiante de Ingeniería Multimedia (UNAD).
