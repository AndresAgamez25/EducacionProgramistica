# Cómo agregar contenido

Todo el contenido vive en `js/datos/`. No hace falta tocar el motor (`nucleo.js`, `bloques.js`, `vistas.js`, `app.js`) para agregar materias, clases o ejercicios.

## 1. Agregar una materia

1. Crea un archivo, por ejemplo `js/datos/s3a.js`.
2. Agrega la materia con `window.CURSOS.push({...})`:

```js
window.CURSOS = window.CURSOS || [];
window.CURSOS.push({
  id: "html",                 // identificador único, sin espacios
  codigo: "WEB-201",
  titulo: "HTML: la estructura de la web",
  semestre: 3,
  horas: 5,
  color: "#D9643A",
  requiere: ["py-errores"],   // materias que hay que aprobar antes
  lang: "html",               // lenguaje principal
  resumen: "Una frase sobre la materia.",
  paraQue: "Para qué te va a servir (se muestra al inicio).",
  cierre: "Ahora entiendes por qué... (se muestra al aprobar).",
  hilo: "La vitrina web de la tienda",  // pieza del proyecto de la carrera
  pregunta: "Pregunta guía de la materia",
  metas: ["Lo que vas a poder hacer 1", "Lo que vas a poder hacer 2"],
  clases: [ /* ver punto 2 */ ],
  ejercicios: [ /* práctica, ver punto 4 */ ],
  prueba: [ /* prueba de dominio, ver punto 4 */ ],
  proyecto: { /* ver punto 5 */ }
});
```

3. Carga el archivo en `index.html`, **antes** de `pensum.js` y de `nucleo.js`:

```html
<script src="js/datos/s3a.js"></script>
```

4. Si la materia estaba en `PROXIMAS` (en `pensum.js`), bórrala de ahí para que no salga dos veces.

El orden de `window.CURSOS` es el orden de la carrera.

## 2. Una clase

```js
{ id: "html-1", titulo: "Etiquetas: las cajas de la página", min: 20, bloques: [ ... ] }
```

Los `id` de clase deben ser únicos en toda la página. **No los cambies después de publicar**: el progreso de los estudiantes se guarda con esos `id`.

## 3. Tipos de bloque

Los marcados con ★ son interactivos: el botón *Continuar* no aparece hasta que el estudiante los responde.

| `t` | Campos | Para qué |
|---|---|---|
| `texto` | `html` | Explicación. Escribe `[[término]]` para enlazar al glosario |
| `tip`, `ojo`, `dato` | `html` | Notas adhesivas |
| `analogia` | `titulo`, `html` | Comparación con la vida diaria |
| `conecta` | `html` | Conexión con otra materia |
| `diagrama` | `svg` (nombre en `B.DIAGRAMAS`), `pie` | Dibujo |
| `ejemplo` | `lang`, `titulo`, `partes: [{ meta, lineas: [[código, nota]] }]` | Ejemplo resuelto con submetas |
| `simbolos` | `claves: ["==", "python::"]` | Tarjetas de signos (claves de `SIMBOLOS`) |
| `comparar` | `izquierda: {titulo, codigo, lang}`, `derecha`, `nota` | Dos códigos lado a lado |
| `resumen` | `puntos: [...]` | Para llevar |
| `inicio` ★ | `pregunta`, `nota` | Pregunta antes de explicar |
| `predecir` ★ | `lang`, `codigo`, `pregunta`, `opciones`, `respuesta` (índice), `salida`, `explicacion` | Predice y luego se ejecuta de verdad |
| `traza` ★ | `lang`, `codigo`, `vars`, `pasos: [{ l, v: {var: "valor"}, sal, nota }]` | Paso a paso |
| `error` ★ | `lang`, `codigo`, `linea`, `explicacion`, `arreglo` | Toca la línea que falla |
| `autoexplica` ★ | `pregunta`, `ideas: [...]` | Explícalo con tus palabras |
| `critica` ★ | `pregunta`, `respuesta` | Pensamiento crítico |
| `chequeo` ★ | `e: { ejercicio }` | Un ejercicio dentro de la clase |

Estructura recomendada de una clase: `inicio` → `texto`/`analogia` → `ejemplo` → `simbolos` → `predecir` → `traza` → `error` → `chequeo` → `autoexplica` o `critica` → `resumen`.

## 4. Tipos de ejercicio

```js
{ tipo: "opcion", pregunta: "...", opciones: ["a", "b", "c"], respuesta: 1, explicacion: "..." }
{ tipo: "vf", pregunta: "...", respuesta: true, explicacion: "..." }
{ tipo: "escribir", pregunta: "...", respuestas: ["4", "cuatro"], explicacion: "...", pistas: ["..."] }
{ tipo: "ordenar", pregunta: "...", lineas: ["en", "el", "orden", "correcto"], explicacion: "..." }
{ tipo: "completar", lang: "python", pregunta: "...", plantilla: "precio = ___(input())", respuestas: [["float"]], explicacion: "..." }
{ tipo: "error", lang: "python", pregunta: "...", codigo: "...", linea: 3, explicacion: "..." }
```

Ejercicios de código (`tipo: "codigo"`), tres formas de calificar:

```js
// a) Una función con pruebas: [[argumentos], resultado esperado]
{ tipo: "codigo", lang: "python", pregunta: "...", funcion: "con_iva",
  inicial: "def con_iva(precio):\n    return 0\n",
  pruebas: [[[100], 119], [[0], 0]], explicacion: "..." }

// b) Un programa con entradas y salida esperada
{ tipo: "codigo", lang: "python", pregunta: "...",
  casos: [{ entradas: ["Mango", "1500"], salida: "El producto Mango cuesta 1500 pesos" }],
  inicial: "producto = input()\n", explicacion: "..." }

// c) Solo que muestre al menos N líneas
{ tipo: "codigo", lang: "python", pregunta: "...", minSalidas: 2, inicial: "", explicacion: "..." }
```

`lang` puede ser `"python"` o `"javascript"` (con `funcion` y `pruebas`).

**Antes de publicar, prueba cada ejercicio de código con una solución real.** Las respuestas de `predecir` también deben coincidir con lo que muestra Python de verdad.

## 5. El proyecto

```js
proyecto: {
  titulo: "La caja que decide",
  objetivo: "Qué vas a construir.",
  antes: ["Lo que debes saber antes 1", "..."],
  lang: "python",
  lab: { modo: "python", codigo: "...", entradas: "10000\n2" }, // opcional
  etapas: [
    { nombre: "...", tipo: "guiada", descripcion: "...", lang: "python", plantilla: "...", pasos: ["...", "..."] },
    { nombre: "...", tipo: "semi", descripcion: "...", pasos: ["..."] },
    { nombre: "...", tipo: "libre", descripcion: "...", pasos: ["..."] }
  ],
  solucion: "código de referencia"
}
```

## 6. Signos y palabras

- `js/datos/simbolos.js` → `SIMBOLOS`: la clave es el signo (`"=="`) o `"lenguaje:signo"` (`"python::"`) cuando cambia según el lenguaje.
  ```js
  "==": { grupo: "Comparación", nombre: "Doble igual", lee: "«¿es igual a?»", que: "...", ej: "..." }
  ```
- `PALABRAS`: palabra clave → explicación corta.
- Si un signo o palabra del código no está en el diccionario, simplemente no queda tocable. Agrégalo para que lo esté.

## 7. Glosario

`js/datos/glosario.js`:

```js
"variable": { cat: "Fundamentos", def: "Un nombre que guarda un valor.", ej: "edad = 20" }
```

En los textos se enlaza con `[[variable]]`.

## 8. Mascota

Las poses de Nala se generan con `python3 herramientas/nala.py` y quedan en `img/nala/`.
