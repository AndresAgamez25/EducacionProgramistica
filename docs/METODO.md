# El método de Bitácora

Esta página no es un libro digital ni una lista de videos. Cada parte está pensada a partir de lo que la investigación dice sobre cómo se aprende a programar. Aquí explico qué hace la página y por qué.

## 1. El orden: una materia a la vez

- Las materias se ven **en orden lineal**, de lo más básico a lo más avanzado. Cada una necesita la anterior (`requiere`), porque lo que se aprende se usa después.
- Primero se aprende a pensar (lógica y pseudocódigo), después un lenguaje simple (Python) y luego los más exigentes (JavaScript, TypeScript, Java, C#, C++).
- La razón: un lenguaje con sintaxis simple deja la cabeza libre para los conceptos. Cuando ya entiendes variables, decisiones y bucles, pasar a otro lenguaje es "traducir", no empezar de cero.
- **Cero relleno.** Cada materia empieza con *Para qué te va a servir* y termina con *Ahora entiendes por qué*, que muestra qué pieza del proyecto quedó lista.
- **Dominio antes de avanzar.** Una materia se aprueba con 80% en la prueba y el proyecto terminado.

## 2. La clase: leer antes de escribir (PRIMM)

Cada clase sigue el ciclo **PRIMM**: predecir, ejecutar, investigar, modificar y crear (Sentance, Waite y Kallia, 2019).

| Bloque | Qué hace | Por qué |
|---|---|---|
| Antes de empezar | Una pregunta antes de explicar | Activa lo que ya sabes y prepara el terreno |
| Ejemplo resuelto | Código partido en submetas con nombre y una nota por línea | Los ejemplos con submetas reducen la carga mental de los principiantes (Margulieux, Morrison y Decker) |
| Los signos de este código | Tarjetas con cada símbolo y cómo se lee | Los principiantes se traban con símbolos que nadie les explicó |
| Predice antes de ejecutar | Eliges una respuesta y después se ejecuta el código de verdad | Comprometerse con una predicción y ver el resultado corrige ideas equivocadas |
| Sigue el código paso a paso | Tabla de variables que cambia línea por línea | Trazar código es una habilidad que hay que enseñar explícitamente |
| Encuentra el error | Tocas la línea que falla | Leer y depurar es la mitad del trabajo real |
| Explícalo con tus palabras | Escribes y se guarda en tu bitácora | La autoexplicación mejora la comprensión |
| Piensa con criterio | Preguntas sin una sola respuesta | Entrena el pensamiento crítico |
| Chequeo | Pregunta corta sin mirar arriba | Recordar fija más que releer |

La página **no deja seguir** hasta que respondes el bloque interactivo. Así no es posible "pasar de largo".

## 3. Los ejercicios: el andamiaje se retira poco a poco

1. **Completar huecos** en un código casi listo.
2. **Ordenar piezas** (problemas de Parsons). Son más eficientes que escribir desde cero al principio (Hou, Ericson y Wang 2023; Harms y colaboradores 2016).
3. **Modificar** un código que ya funciona.
4. **Crear** desde cero. Se califica ejecutando tu programa con Python real (Pyodide) y comparando con casos de prueba.

Además:
- **Escalera de pistas**: primero una pista general, luego una más concreta, nunca la respuesta directa.
- **Errores en español**: cuando Python o JavaScript muestran un error, la página explica qué significa.
- **¿Qué tan seguro estás?** Antes de comprobar marcas *Adivino*, *Creo que sí* o *Seguro*. En Perfil ves si aciertas tanto como crees (calibración).

## 4. Las concepciones erróneas se atacan de frente

Hay errores típicos que casi todo principiante tiene (Sorva). Las clases los enfrentan directamente:

- confundir `=` (guardar) con `==` (comparar);
- escribir la asignación al revés (`5 = x`);
- creer que una variable guarda varios valores a la vez o que dos variables "quedan unidas";
- creer que la computadora adivina lo que uno quiso decir;
- olvidar que `input()` siempre devuelve texto.

## 5. Recordar, no releer

Las técnicas con más evidencia son la **práctica de recuperación** y la **práctica espaciada** (Dunlosky y colaboradores, 2013).

- Cada ejercicio respondido entra a un sistema de **repaso espaciado** (cajas de Leitner): vuelve a los 1, 3, 7, 16, 35 y 90 días. Si fallas, vuelve a la primera caja.
- El repaso del día **mezcla** preguntas de distintas materias (práctica intercalada): obliga a elegir qué herramienta usar, como en un problema real.
- Si al terminar una clase dices que te quedó "poco" clara, sus preguntas vuelven al día siguiente.

## 6. Enfoque y descanso

- Sesiones de **25 minutos** de enfoque y **5** de descanso.
- Cuando te trabas, descansar activa el **modo difuso** del cerebro, que conecta ideas (Oakley, *Learning How to Learn*).
- La página recomienda poco tiempo todos los días en vez de mucho una vez a la semana.

## 7. Motivación

Según la teoría de la autodeterminación, la motivación duradera necesita tres cosas:

- **Competencia**: pasos pequeños, progreso visible, sellos de APROBADA.
- **Autonomía**: eliges tu ritmo, tu perfil y, en la etapa libre del proyecto, tu propia versión.
- **Sentido**: cada materia muestra para qué sirve y qué pieza de la tienda construye.

## 8. Para quien ya sabe

- **Perfil** al entrar: empiezo de cero, estoy estudiando con temas flojos, o ya estudié y quiero reforzar.
- **Examen de validación** por materia (preguntas de cada clase + la prueba). Con 80% la materia queda validada. Si no, la página marca en rojo **las clases exactas** que conviene repasar.
- **Modo libre** para entrar a cualquier materia sin seguir el orden.

## 9. Por qué estos lenguajes y en este orden

- Encuestas de Stack Overflow 2025 y 2026: JavaScript, HTML/CSS, SQL y Python son los más usados; TypeScript crece.
- Índice TIOBE (noviembre de 2026): Python primero; Java, C++ y C# en los primeros lugares.
- En las universidades, Python es hoy el primer lenguaje más común y Java el segundo.
- Currículo de referencia: CS2023 (ACM, IEEE y AAAI).

## Fuentes

- Sentance, S., Waite, J. y Kallia, M. (2019). *Teaching computer programming with PRIMM: a sociocultural perspective*. Computer Science Education.
- Margulieux, L., Morrison, B. y Decker, A. Trabajos sobre ejemplos resueltos con submetas en programación.
- Dunlosky, J. y colaboradores (2013). *Improving Students' Learning With Effective Learning Techniques*. Psychological Science in the Public Interest.
- Hou, X., Ericson, B. y Wang, X. (2023), y Harms, K. y colaboradores (2016). Investigaciones sobre problemas de Parsons.
- Raspberry Pi Foundation / NCCE. Guías de pedagogía en computación (trazado de código, PRIMM).
- Sorva, J. Catálogo de concepciones erróneas en programación introductoria.
- Hermans, F. (2021). *The Programmer's Brain*. Manning.
- Oakley, B. *Learning How to Learn* / *A Mind for Numbers*.
- Ryan, R. y Deci, E. Teoría de la autodeterminación.
- Stack Overflow Developer Survey 2025 y 2026. Índice TIOBE, noviembre de 2026.
- ACM, IEEE-CS y AAAI (2023). *Computer Science Curricula 2023 (CS2023)*.
