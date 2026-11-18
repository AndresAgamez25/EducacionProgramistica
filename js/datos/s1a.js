/* =========================================================
   SEMESTRE 1: Pensar como programador (PRG-100, PRG-101, MAT-101 en s1b.js)
   Cada clase es una lista de "bloques". Tipos de bloque:
   texto, inicio, analogia, ejemplo, predecir, traza, error,
   chequeo, autoexplica, critica, simbolos, diagrama, resumen,
   conecta, tip, ojo, dato.  (ver docs/COMO-AGREGAR-CONTENIDO.md)
   ========================================================= */
window.CURSOS = window.CURSOS || [];

window.CURSOS.push(
/* =========================================================
   PRG-100  APRENDER A APRENDER
   ========================================================= */
{
  id:"aprender", codigo:"PRG-100", titulo:"Aprender a aprender", semestre:1, horas:2, color:"#237A4E", requiere:[],
  resumen:"Antes de programar, entiende cómo aprende tu cerebro y cómo funciona esta universidad.",
  paraQue:"Programar se aprende con práctica, no leyendo. Aquí aprendes CÓMO estudiar para que cada hora que inviertas en las demás materias rinda el doble. Vas a usar estas técnicas en todas las clases.",
  cierre:"Cada clase que sigue usa lo que viste aquí: vas a predecir antes de ejecutar, practicar sin mirar, repasar espaciado y explicar con tus palabras. Ahora sabes por qué la página te pide eso.",
  pregunta:"¿Por qué a veces sientes que entendiste algo y al día siguiente no te acuerdas?",
  metas:["Saber qué técnicas de estudio funcionan y cuáles engañan","Conocer el ciclo de cada clase","Armar tu propio plan de estudio"],
  clases:[
  { id:"aprender-1", titulo:"Cómo aprende tu cerebro", min:15, bloques:[
    { t:"inicio", pregunta:"Piensa en la última vez que estudiaste para un examen. ¿Qué hiciste? ¿Releer, subrayar, hacer resúmenes, hacerte preguntas?", nota:"La mayoría de personas relee y subraya. Se siente productivo, pero es de lo que MENOS funciona. Hoy vas a ver por qué, y qué hacer en cambio." },
    { t:"texto", html:`<p>Tu cerebro tiene dos memorias que trabajan juntas:</p>
<ul><li><b>Memoria de trabajo:</b> es como la mesa donde haces una tarea. Es pequeña: solo caben unas pocas cosas a la vez, y lo que no usas se cae en segundos.</li>
<li><b>Memoria de largo plazo:</b> es como una bodega gigante. Lo que guardas bien ahí puede durar años.</li></ul>
<p>Aprender es pasar cosas de la mesa a la bodega. Y lo más importante: <b>lo que fortalece el camino a la bodega no es meter información, sino SACARLA</b>. Cada vez que intentas recordar algo sin mirar, ese recuerdo se vuelve más fuerte.</p>` },
    { t:"analogia", titulo:"El camino en el monte", html:`<p>Imagina un potrero con el pasto alto. La primera vez que lo cruzas, cuesta. Si vuelves a pasar al otro día, ya hay un caminito. Si pasas cada tantos días, se vuelve un camino fijo.</p><p>Recordar es caminar ese camino. Releer es mirar el potrero desde la cerca: se ve bonito, pero no abre camino.</p>` },
    { t:"texto", html:`<h3>Lo que dicen los estudios</h3>
<p>Investigadores revisaron cientos de estudios sobre técnicas de estudio. Las que más funcionan:</p>
<ol><li><b>Practicar recordando</b> (hacerse preguntas, ejercicios sin mirar la respuesta).</li>
<li><b>Repasar espaciado</b>: volver al tema después de un día, de tres, de una semana. No todo el mismo día.</li>
<li><b>Mezclar temas</b> al practicar, en vez de hacer 20 ejercicios iguales seguidos.</li>
<li><b>Explicarte a ti mismo</b> el porqué de cada paso.</li></ol>
<p>Las que menos funcionan: releer, subrayar y resumir sin luego practicar.</p>` },
    { t:"chequeo", e:{ tipo:"opcion", pregunta:"Según la investigación, ¿cuál de estas técnicas ayuda MÁS a recordar a largo plazo?", opciones:["Releer el tema tres veces seguidas","Subrayar lo importante con resaltador","Hacerte preguntas e intentar responder sin mirar"], respuesta:2, explicacion:"Recordar sin mirar (práctica de recuperación) fortalece la memoria mucho más que releer o subrayar." } },
    { t:"texto", html:`<h3>La trampa de «ya entendí»</h3>
<p>Cuando lees una explicación clara, tu cerebro dice «sí, entiendo». Pero <b>reconocer</b> algo no es lo mismo que <b>poder hacerlo</b>. En programación esto pasa mucho: ves un código y parece lógico, pero cuando te toca escribirlo desde cero, no sale.</p>
<p>Por eso en esta universidad casi nunca vas a solo leer: vas a predecir, corregir, completar y crear.</p>` },
    { t:"critica", pregunta:"Un compañero dice: «Yo estudio la noche antes del examen, leo todo cinco veces y me va bien». ¿Qué le responderías? ¿Tiene algo de razón?", respuesta:"Puede que le vaya bien en el examen del día siguiente, porque la información sigue «en la mesa». Pero estudiar todo junto (atracón) se olvida rápido. Si lo que quiere es saber programar dentro de un año, le conviene repartir el estudio en varios días y practicar recordando. Tiene razón en que funciona para mañana; no en que funciona para aprender." },
    { t:"autoexplica", pregunta:"Con tus palabras: ¿por qué releer se siente útil pero no lo es tanto?", ideas:["Reconocer no es lo mismo que recordar o hacer","Lo que fortalece la memoria es intentar sacar la información","Hay que practicar sin mirar y repartir el estudio en días"] },
    { t:"resumen", puntos:["La memoria de trabajo es pequeña; la de largo plazo es enorme.","Recordar sin mirar es lo que más fortalece lo aprendido.","Repasar espaciado y mezclar temas ayuda a que dure.","Releer y subrayar se sienten útiles, pero engañan."] }
  ]},
  { id:"aprender-2", titulo:"El método de esta universidad", min:15, bloques:[
    { t:"texto", html:`<p>Cada clase de programación aquí sigue el mismo ciclo. No es un capricho: está basado en un método llamado <b>PRIMM</b> que se probó con cientos de estudiantes.</p>` },
    { t:"diagrama", svg:"ciclo", pie:"El ciclo de cada clase. Primero lees y entiendes; al final creas solo." },
    { t:"texto", html:`<ol>
<li><b>Predice:</b> antes de ejecutar un código, decides qué va a pasar. Comprometerte con una respuesta, aunque falles, hace que prestes atención de verdad.</li>
<li><b>Ejecuta:</b> ves qué pasa realmente y lo comparas con tu predicción.</li>
<li><b>Investiga:</b> recorres el código paso a paso, mirando cómo cambian las variables.</li>
<li><b>Modifica:</b> cambias un código que ya funciona.</li>
<li><b>Crea:</b> escribes tu propio código desde cero.</li></ol>
<p>Primero se aprende a <b>leer</b> código y después a <b>escribirlo</b>, igual que con un idioma.</p>` },
    { t:"chequeo", e:{ tipo:"ordenar", pregunta:"Ordena el ciclo de una clase.", lineas:["Predecir","Ejecutar","Investigar","Modificar","Crear"], explicacion:"Se va de leer y entender (predecir, ejecutar, investigar) a hacer (modificar, crear)." } },
    { t:"texto", html:`<h3>Herramientas que vas a usar</h3>
<ul><li><b>Pistas por niveles:</b> si te trabas, Nala te da primero una pista pequeña, luego una más concreta. Intenta siempre con la primera.</li>
<li><b>Seguridad:</b> en muchos ejercicios puedes marcar qué tan seguro estás. Así aprendes a saber cuándo sabes algo de verdad.</li>
<li><b>Tu bitácora:</b> lo que escribes con tus palabras se guarda ahí. Es tu cuaderno de estudio.</li>
<li><b>Repaso del día:</b> preguntas de clases anteriores que vuelven en el momento justo para que no se te olviden.</li>
<li><b>Símbolos:</b> toca cualquier signo de un código y te dice qué significa.</li></ul>` },
    { t:"texto", html:`<h3>Concentrarte y descansar</h3>
<p>El cerebro trabaja en dos modos: <b>enfocado</b> (concentrado en un problema) y <b>difuso</b> (relajado, cuando caminas o descansas). Muchas veces la solución a un problema aparece en el modo difuso.</p>
<p>Por eso puedes usar las <b>sesiones de enfoque</b>: 25 minutos concentrado, sin celular ni redes, y luego 5 minutos de descanso de verdad. Si te trabas mucho, levántate, camina, y vuelve.</p>` },
    { t:"chequeo", e:{ tipo:"vf", pregunta:"Si llevas 40 minutos trabado en un ejercicio, lo mejor es seguir mirándolo sin parar hasta que salga.", respuesta:false, explicacion:"Cuando te trabas, un descanso corto activa el modo difuso, que conecta ideas. Muchas veces vuelves y lo ves claro." } },
    { t:"critica", pregunta:"¿Por qué crees que equivocarse al predecir es BUENO para aprender?", respuesta:"Porque la sorpresa te obliga a buscar la razón. Si predices y aciertas, confirmas lo que sabías. Si fallas, descubres justo lo que te faltaba entender, y eso se queda grabado. Un error en una práctica no cuenta en contra: es información." },
    { t:"autoexplica", pregunta:"Explica el ciclo de una clase como si se lo contaras a un amigo que nunca ha programado.", ideas:["Primero se predice qué hará el código","Luego se ejecuta y se compara","Se investiga paso a paso","Se modifica un código y al final se crea uno propio"] }
  ]}
  ],
  ejercicios:[
  { tipo:"opcion", pregunta:"Estudiaste un tema hoy. ¿Cuándo te conviene repasarlo para recordarlo más tiempo?", opciones:["Otra vez hoy mismo, tres veces","Mañana, luego en unos días y luego en una semana","Solo el día antes del examen"], respuesta:1, explicacion:"El repaso espaciado (repartido en días cada vez más separados) es una de las técnicas más efectivas." },
  { tipo:"vf", pregunta:"Reconocer un código como «lógico» significa que ya lo sabes escribir.", respuesta:false, explicacion:"Reconocer es más fácil que producir. Hay que practicar escribiéndolo." },
  { tipo:"opcion", pregunta:"En PRIMM, ¿qué haces ANTES de ejecutar un código?", opciones:["Copiarlo","Predecir qué va a hacer","Borrarlo"], respuesta:1, explicacion:"Predecir obliga a leer con atención y compromete tu razonamiento." },
  { tipo:"opcion", pregunta:"¿Cuál es un buen uso de la sesión de enfoque?", opciones:["25 minutos concentrado sin celular y 5 de descanso","Estudiar 4 horas sin parar","Estudiar con videos de fondo"], respuesta:0, explicacion:"Bloques cortos de concentración con descansos reales." }
  ],
  prueba:[
  { tipo:"opcion", pregunta:"¿Qué fortalece más un recuerdo?", opciones:["Mirarlo otra vez","Intentar recordarlo sin mirar","Escribirlo con letra bonita"], respuesta:1, explicacion:"La práctica de recuperación." },
  { tipo:"vf", pregunta:"Mezclar temas al practicar ayuda a diferenciar cuándo usar cada cosa.", respuesta:true, explicacion:"Eso es la práctica intercalada." },
  { tipo:"ordenar", pregunta:"Ordena del principio al final: así se va de leer a escribir código.", lineas:["Predecir","Ejecutar","Investigar","Modificar","Crear"], explicacion:"Es el ciclo PRIMM." },
  { tipo:"opcion", pregunta:"Si te equivocas al predecir lo que hace un código, eso significa:", opciones:["Que no sirves para programar","Que encontraste algo que todavía no entendías","Que el código está mal"], respuesta:1, explicacion:"El error es información valiosa." },
  { tipo:"opcion", pregunta:"¿Qué memoria es pequeña y se olvida en segundos si no usas la información?", opciones:["La de trabajo","La de largo plazo"], respuesta:0, explicacion:"Por eso conviene trabajar en pasos pequeños." }
  ],
  proyecto:{ titulo:"Tu plan de estudio", objetivo:"Organizar cómo vas a estudiar en esta universidad, como lo haría un estudiante juicioso.",
    antes:["Saber qué técnicas de estudio funcionan (clase 1)","Conocer el ciclo de una clase (clase 2)"],
    etapas:[
      { nombre:"Configura", tipo:"guiada", pasos:["Ve a Perfil y escribe tu nombre.","Elige cuántos minutos al día vas a estudiar. Sé realista: 20 minutos todos los días es mejor que 3 horas un día.","Mira la fecha en que terminarías el semestre 1."] },
      { nombre:"Planea", tipo:"semi", pasos:["Escribe en tu bitácora a qué hora del día vas a estudiar y dónde (un lugar sin distracciones).","Prueba una sesión de enfoque de 25 minutos con el botón del reloj."] },
      { nombre:"Comprométete", tipo:"libre", pasos:["Escribe en tu bitácora por qué quieres aprender a programar. Cuando te dé pereza, vuelve a leerlo."] }
    ] }
},

/* =========================================================
   PRG-101  LÓGICA Y ALGORITMOS
   ========================================================= */
{
  id:"logica", codigo:"PRG-101", titulo:"Lógica y algoritmos", semestre:1, horas:5, color:"#1D6FA3", requiere:["aprender"],
  resumen:"Aprende a dar instrucciones tan precisas que una máquina pueda seguirlas.",
  paraQue:"Todo programa, en cualquier lenguaje, es un algoritmo. Aquí diseñas la lógica de una venta en la tienda, que es la primera pieza del proyecto que vas a construir toda la carrera.",
  cierre:"El algoritmo de la caja registradora que hiciste en pseudocódigo es exactamente el que vas a escribir en Python en PY-101. Solo cambian las palabras: Leer será input(), Escribir será print() y <- será =. La lógica ya la tienes.",
  hilo:"El algoritmo de la venta",
  pregunta:"¿Cómo le explicas algo a alguien que hace EXACTAMENTE lo que dices, ni más ni menos?",
  metas:["Escribir instrucciones precisas y en orden","Leer pseudocódigo símbolo por símbolo","Seguir un algoritmo paso a paso como lo hace la computadora"],
  clases:[
  { id:"logica-1", titulo:"La computadora no adivina", min:15, bloques:[
    { t:"inicio", pregunta:"Escribe (o piensa) las instrucciones para que un robot prepare un vaso de agua de panela. El robot nunca ha visto una cocina.", nota:"Seguro escribiste algo como «poner panela en agua». Pero el robot preguntaría: ¿qué cantidad?, ¿agua de dónde?, ¿en qué recipiente?, ¿la panela entera o rallada? Las personas rellenamos los huecos con sentido común. La computadora no tiene sentido común." },
    { t:"texto", html:`<p>Una computadora es increíblemente rápida, pero solo hace lo que le dices, <b>exactamente</b> como se lo dices y <b>en el orden</b> en que se lo dices. Si una instrucción se puede entender de dos formas, el programa falla o hace algo raro.</p>
<p><b>Programar</b> es escribir instrucciones tan precisas que no dejen nada para adivinar. Esas instrucciones se escriben en un [[lenguaje de programación]], y el texto que escribes se llama [[código fuente]].</p>` },
    { t:"predecir", lang:"pseudo", codigo:"1. Toma el vaso\n2. Echa agua en el vaso\n3. Llena el vaso hasta la mitad\n4. Mezcla", pregunta:"Un robot sigue estas instrucciones al pie de la letra. ¿Qué problema va a tener?", opciones:["Ninguno, están perfectas","En el paso 2 no sabe cuánta agua echar, y el paso 3 llega tarde","El robot no sabe qué es un vaso"], respuesta:1, salida:"Paso 2: el robot echa agua... ¿cuánta? Sigue echando hasta que el vaso se desborda.\nPaso 3: el vaso ya está lleno, no puede «llenarlo hasta la mitad».", explicacion:"El orden y la precisión importan. El paso 3 debió estar dentro del paso 2: «Echa agua hasta la mitad del vaso». Y además falta la panela." },
    { t:"texto", html:`<p>Ese error tiene nombre: un <b>bug</b> (error en un programa). Fíjate que las instrucciones «parecían» bien. Así son la mayoría de los errores: el código hace lo que dice, no lo que tú querías.</p>` },
    { t:"chequeo", e:{ tipo:"opcion", pregunta:"¿Cuál instrucción es más precisa para un robot?", opciones:["Echa un poquito de sal","Echa 5 gramos de sal","Echa sal al gusto"], respuesta:1, explicacion:"«Un poquito» y «al gusto» dependen de la interpretación. 5 gramos solo se puede entender de una forma." } },
    { t:"texto", html:`<h3>Cómo entiende la computadora tu código</h3>
<p>El procesador solo entiende [[binario]] (ceros y unos). Por eso existen programas que traducen lo que escribes:</p>
<ul><li>El [[compilador]] traduce todo tu programa de una vez y crea un archivo ejecutable (así trabajan Java y C++).</li>
<li>El [[intérprete]] lee y ejecuta tu código línea por línea (así trabajan Python y JavaScript).</li></ul>` },
    { t:"critica", pregunta:"«Las computadoras son inteligentes». ¿Estás de acuerdo? Piensa en el robot del agua de panela.", respuesta:"Son rapidísimas y precisas, pero no entienden la intención. Siguen instrucciones. Incluso la inteligencia artificial funciona con programas escritos por personas. Pensar que la computadora «sabe lo que quiero» es uno de los errores más comunes al empezar a programar." },
    { t:"autoexplica", pregunta:"¿Qué significa programar? Explícalo sin usar la palabra «código».", ideas:["Dar instrucciones","Que sean precisas, sin ambigüedad","En el orden correcto","La máquina las sigue literalmente"] }
  ]},
  { id:"logica-2", titulo:"Algoritmos: entrada, proceso y salida", min:20, bloques:[
    { t:"texto", html:`<p>Un [[algoritmo]] es una lista de pasos para resolver un problema. Para que sirva, tiene que ser:</p>
<ul><li><b>Preciso:</b> cada paso se entiende de una sola forma.</li>
<li><b>Ordenado:</b> los pasos van en una secuencia.</li>
<li><b>Finito:</b> en algún momento termina.</li></ul>
<p>Casi todos los programas siguen el mismo esqueleto:</p>` },
    { t:"diagrama", svg:"eps", pie:"Entrada → proceso → salida. Así funciona desde una calculadora hasta un videojuego." },
    { t:"texto", html:`<ul><li><b>Entrada:</b> los datos que recibe el programa (lo que escribe el usuario, un clic, un archivo).</li>
<li><b>Proceso:</b> lo que el programa hace con esos datos (calcular, comparar, ordenar).</li>
<li><b>Salida:</b> el resultado que muestra (un mensaje, un número, una imagen).</li></ul>
<p>Ejemplo en una tienda: <b>entrada</b> = precio y cantidad; <b>proceso</b> = multiplicar; <b>salida</b> = el total a pagar.</p>` },
    { t:"chequeo", e:{ tipo:"opcion", pregunta:"En una app de clima, ¿qué es la ENTRADA?", opciones:["El nombre de la ciudad que escribes","El cálculo de la temperatura","El dibujo del sol en pantalla"], respuesta:0, explicacion:"La ciudad es el dato que recibe. El cálculo es el proceso y el dibujo es la salida." } },
    { t:"chequeo", e:{ tipo:"ordenar", pregunta:"Ordena el algoritmo para calcular el total de una compra.", lineas:["Pedir el precio del producto","Pedir la cantidad","Multiplicar precio por cantidad","Mostrar el total"], explicacion:"Primero las entradas, después el proceso, al final la salida. No puedes multiplicar algo que todavía no tienes." } },
    { t:"critica", pregunta:"¿Una receta de cocina es un algoritmo? ¿En qué se parece y en qué no?", respuesta:"Se parece porque tiene entradas (ingredientes), proceso (pasos) y salida (el plato), en orden. Pero muchas recetas no son precisas («sal al gusto», «hasta que dore»), porque confían en el criterio de quien cocina. Un algoritmo para una computadora no puede tener eso." },
    { t:"autoexplica", pregunta:"Piensa en una app que uses (WhatsApp, Nequi, un juego). Describe una acción con entrada, proceso y salida.", ideas:["Una entrada concreta del usuario","Qué hace el programa con ella","Qué muestra como resultado"] }
  ]},
  { id:"logica-3", titulo:"Leer pseudocódigo, símbolo por símbolo", min:25, bloques:[
    { t:"texto", html:`<p>El [[pseudocódigo]] es una forma de escribir algoritmos en español, pero con reglas fijas, como un lenguaje de programación. Sirve para pensar la solución sin preocuparte todavía por la escritura exacta de un lenguaje real. Es el que se usa en PSeInt, muy común en universidades de Colombia.</p>
<p>Vamos a leer un algoritmo completo, línea por línea. Toca cualquier palabra o signo del código para ver qué significa.</p>` },
    { t:"ejemplo", lang:"pseudo", titulo:"Algoritmo que suma dos números", partes:[
      { meta:"Empezar y ponerle nombre", lineas:[["Algoritmo SumarDosNumeros","Algoritmo marca el inicio. SumarDosNumeros es el nombre: sin espacios y que diga qué hace."]] },
      { meta:"Pedir los datos (entrada)", lineas:[
        ["    Escribir \"Primer número:\"","Escribir muestra un mensaje. Las comillas dicen: esto es TEXTO literal, se muestra tal cual."],
        ["    Leer a","Leer espera que el usuario escriba algo y lo GUARDA en una variable llamada a."],
        ["    Escribir \"Segundo número:\"","Otro mensaje para guiar al usuario."],
        ["    Leer b","Guarda el segundo dato en la variable b."]] },
      { meta:"Calcular (proceso)", lineas:[["    suma <- a + b","La flecha <- se lee «recibe». Primero se calcula a + b, y el resultado se guarda en suma."]] },
      { meta:"Mostrar el resultado (salida)", lineas:[["    Escribir \"La suma es: \", suma","La coma separa dos cosas a mostrar: un texto fijo y el valor de la variable suma (sin comillas, porque queremos su valor)."]] },
      { meta:"Terminar", lineas:[["FinAlgoritmo","Marca el final. Todo lo que hay entre Algoritmo y FinAlgoritmo es el programa."]] }
    ]},
    { t:"simbolos", claves:["<-","\"",",","+"] },
    { t:"ojo", html:`<p><b>Con comillas o sin comillas cambia todo:</b> <code>Escribir "suma"</code> muestra la palabra suma. <code>Escribir suma</code> muestra el valor guardado, por ejemplo 12.</p>` },
    { t:"texto", html:`<h3>¿Qué es una variable?</h3><p>Una [[variable]] es un nombre que apunta a un valor guardado en la memoria. Cuando escribes <code>Leer a</code>, el valor que escribe el usuario queda guardado con el nombre <code>a</code>, y puedes usarlo después.</p>` },
    { t:"traza", lang:"pseudo", codigo:"Algoritmo SumarDosNumeros\n    Escribir \"Primer número:\"\n    Leer a\n    Escribir \"Segundo número:\"\n    Leer b\n    suma <- a + b\n    Escribir \"La suma es: \", suma\nFinAlgoritmo", vars:["a","b","suma"], pasos:[
      { l:1, v:{}, sal:"", nota:"Empieza el algoritmo. Todavía no hay variables." },
      { l:2, v:{}, sal:"Primer número:", nota:"Se muestra el mensaje." },
      { l:3, v:{a:"7"}, sal:"Primer número:", nota:"El usuario escribe 7. Se guarda en a." },
      { l:4, v:{a:"7"}, sal:"Primer número:\nSegundo número:", nota:"Segundo mensaje." },
      { l:5, v:{a:"7",b:"5"}, sal:"Primer número:\nSegundo número:", nota:"El usuario escribe 5. Se guarda en b." },
      { l:6, v:{a:"7",b:"5",suma:"12"}, sal:"Primer número:\nSegundo número:", nota:"Se calcula 7 + 5 = 12 y se guarda en suma." },
      { l:7, v:{a:"7",b:"5",suma:"12"}, sal:"Primer número:\nSegundo número:\nLa suma es: 12", nota:"Se muestra el texto y el VALOR de suma." },
      { l:8, v:{a:"7",b:"5",suma:"12"}, sal:"Primer número:\nSegundo número:\nLa suma es: 12", nota:"Fin." }
    ]},
    { t:"predecir", lang:"pseudo", codigo:"Algoritmo Precio\n    precio <- 2000\n    cantidad <- 3\n    total <- precio * cantidad\n    Escribir \"total\"\nFinAlgoritmo", pregunta:"¿Qué se muestra en pantalla?", opciones:["6000","total","total 6000"], respuesta:1, salida:"total", explicacion:"Fíjate en las comillas: \"total\" es un texto fijo, así que se muestra la palabra total. Para mostrar el valor habría que escribir Escribir total, sin comillas." },
    { t:"error", lang:"pseudo", codigo:"Algoritmo Area\n    Escribir \"Base:\"\n    Leer base\n    area <- base * altura\n    Escribir \"Altura:\"\n    Leer altura\n    Escribir area\nFinAlgoritmo", linea:4, explicacion:"En la línea 4 se usa altura antes de pedirla. La computadora va de arriba a abajo: en ese momento altura todavía no tiene valor.", arreglo:"Mover el cálculo después de «Leer altura»." },
    { t:"autoexplica", pregunta:"¿Qué diferencia hay entre Escribir \"nombre\" y Escribir nombre?", ideas:["Con comillas se muestra el texto literal","Sin comillas se muestra el valor guardado en la variable"] }
  ]},
  { id:"logica-4", titulo:"Diagramas de flujo", min:15, bloques:[
    { t:"texto", html:`<p>Un [[diagrama de flujo]] dibuja un algoritmo. Ver el camino ayuda mucho cuando el programa empieza a tomar decisiones. Cada figura tiene un significado:</p>` },
    { t:"diagrama", svg:"figuras", pie:"Las figuras básicas de un diagrama de flujo." },
    { t:"diagrama", svg:"flujo-suma", pie:"El algoritmo de la suma dibujado como diagrama de flujo." },
    { t:"chequeo", e:{ tipo:"opcion", pregunta:"¿Qué figura se usa para mostrar un resultado o pedir un dato?", opciones:["Rectángulo","Paralelogramo (rectángulo inclinado)","Rombo"], respuesta:1, explicacion:"El paralelogramo es para entrada y salida de datos." } },
    { t:"chequeo", e:{ tipo:"opcion", pregunta:"El rombo tiene dos salidas. ¿Por qué?", opciones:["Porque representa una pregunta con respuesta sí o no","Por decoración","Porque el programa termina dos veces"], respuesta:0, explicacion:"El rombo es una decisión. Lo vas a usar mucho en la materia de Decisiones." } },
    { t:"conecta", html:`<p>Por ahora tus algoritmos van en línea recta (secuencia). En <b>PRG-103 Decisiones</b> vas a usar el rombo para que el programa elija caminos, y en <b>PRG-104 Repeticiones</b> las flechas van a volver hacia atrás.</p>` }
  ]},
  { id:"logica-5", titulo:"Descomponer problemas grandes", min:20, bloques:[
    { t:"inicio", pregunta:"Te piden «hacer un videojuego de carreras». ¿Por dónde empezarías?", nota:"Nadie hace un videojuego de una sola vez. Se parte en pedazos: el carro, la pista, los controles, el tiempo, el puntaje. Y cada pedazo en pedazos más pequeños." },
    { t:"texto", html:`<p>Los programadores no son personas que resuelven problemas gigantes. Son personas que saben <b>partir</b> problemas gigantes en problemas pequeños. A esto se le llama pensamiento computacional, y tiene cuatro herramientas:</p>
<ol><li><b>[[Descomposición]]:</b> partir el problema en partes.</li>
<li><b>Patrones:</b> notar lo que se repite para resolverlo una sola vez.</li>
<li><b>[[Abstracción]]:</b> quedarte con lo importante e ignorar el resto.</li>
<li><b>Algoritmo:</b> escribir los pasos de cada parte.</li></ol>` },
    { t:"analogia", titulo:"Un sancocho", html:`<p>Nadie «hace un sancocho». Se pela la yuca, se pica el plátano, se pone el agua, se echa la carne, se sazona. Cada paso es fácil. Lo difícil sería intentar hacerlo todo al mismo tiempo.</p>` },
    { t:"chequeo", e:{ tipo:"opcion", pregunta:"En una app de domicilios, ¿cuál es un buen ejemplo de abstracción?", opciones:["Guardar del cliente solo nombre, dirección y teléfono","Guardar todo sobre el cliente, incluso su color favorito","Hacer toda la app en un solo archivo"], respuesta:0, explicacion:"Abstraer es quedarte con lo que importa para el problema." } },
    { t:"chequeo", e:{ tipo:"ordenar", pregunta:"Descompón «registrar una venta en la tienda» en pasos ordenados.", lineas:["Buscar el producto","Pedir la cantidad","Calcular el subtotal","Sumar el IVA","Mostrar el total y guardar la venta"], explicacion:"Cada paso es pequeño y se puede programar por separado." } },
    { t:"critica", pregunta:"¿Por qué crees que dividir un problema hace que cometas menos errores?", respuesta:"Porque la memoria de trabajo es pequeña. Si intentas pensar en todo a la vez, se te escapan cosas. Con partes pequeñas, puedes revisar cada una con calma y probarla sola antes de juntarlas." },
    { t:"autoexplica", pregunta:"Escribe cómo descompondrías una tarea que haces seguido (ir al colegio o a la universidad, hacer una tarea, un mandado).", ideas:["Partes concretas y pequeñas","En un orden lógico","Que cada parte se pueda hacer sola"] }
  ]}
  ],
  ejercicios:[
  { tipo:"opcion", pregunta:"¿Cuál NO es una característica de un algoritmo?", opciones:["Preciso","Finito","Ambiguo","Ordenado"], respuesta:2, explicacion:"Ambiguo es justo lo contrario de preciso." },
  { tipo:"escribir", pregunta:"En pseudocódigo, ¿qué palabra se usa para pedir un dato al usuario?", respuestas:["leer"], explicacion:"Leer guarda lo que escribe el usuario en una variable.", pistas:["Es lo contrario de Escribir.","Empieza con L."] },
  { tipo:"opcion", pregunta:"¿Qué hace la línea  total <- precio * 2 ?", opciones:["Compara total con precio * 2","Calcula precio * 2 y guarda el resultado en total","Muestra en pantalla precio * 2"], respuesta:1, explicacion:"La flecha <- se lee «recibe»: total recibe el resultado." },
  { tipo:"completar", lang:"pseudo", pregunta:"Completa para mostrar el VALOR de la variable nombre.", plantilla:"Leer nombre\nEscribir \"Hola, \", ___", respuestas:[["nombre"]], explicacion:"Sin comillas, para mostrar el valor guardado." },
  { tipo:"error", lang:"pseudo", pregunta:"¿En qué línea está el error? Toca la línea.", codigo:"Algoritmo Doble\n    Leer numero\n    Escribir resultado\n    resultado <- numero * 2\nFinAlgoritmo", linea:3, explicacion:"Se muestra resultado antes de calcularlo. Las líneas 3 y 4 van al revés." },
  { tipo:"ordenar", pregunta:"Ordena el algoritmo que calcula el promedio de dos notas.", lineas:["Leer nota1","Leer nota2","promedio <- (nota1 + nota2) / 2","Escribir promedio"], explicacion:"Entradas, proceso, salida. Los paréntesis hacen que primero se sume y luego se divida." }
  ],
  prueba:[
  { tipo:"opcion", pregunta:"¿Qué muestra  Escribir \"edad\"  si la variable edad vale 20?", opciones:["20","edad","Error"], respuesta:1, explicacion:"Con comillas se muestra el texto literal." },
  { tipo:"opcion", pregunta:"El orden entrada → proceso → salida significa que:", opciones:["Primero se muestran los resultados","Primero se reciben datos, luego se calculan, luego se muestran","Da igual el orden"], respuesta:1, explicacion:"No puedes calcular algo que todavía no tienes." },
  { tipo:"escribir", pregunta:"¿Cómo se lee la flecha <- ? (una palabra)", respuestas:["recibe"], explicacion:"x <- 5 se lee «x recibe 5»." },
  { tipo:"error", lang:"pseudo", pregunta:"Toca la línea con el error.", codigo:"Algoritmo Total\n    Leer precio\n    total <- precio * cantidad\n    Leer cantidad\n    Escribir total\nFinAlgoritmo", linea:3, explicacion:"Se usa cantidad antes de leerla." },
  { tipo:"opcion", pregunta:"¿Qué figura de un diagrama de flujo representa una decisión?", opciones:["Rombo","Óvalo","Rectángulo"], respuesta:0, explicacion:"El rombo tiene salidas sí/no." },
  { tipo:"vf", pregunta:"Descomponer un problema es partirlo en partes más pequeñas.", respuesta:true, explicacion:"Es la primera herramienta del pensamiento computacional." }
  ],
  proyecto:{ titulo:"La caja registradora", objetivo:"Diseñar en pseudocódigo el algoritmo que calcula el total de una compra con IVA. Solo usa lo que ya sabes: secuencia, Leer, Escribir y operaciones.",
    antes:["Leer pseudocódigo y entender Leer, Escribir y <- (clase 3)","Ordenar pasos en entrada, proceso y salida (clase 2)"],
    etapas:[
      { nombre:"Completa el modelo", tipo:"guiada", descripcion:"Este algoritmo está casi listo. Copia en tu cuaderno o en PSeInt y completa los huecos.", lang:"pseudo", plantilla:"Algoritmo CajaRegistradora\n    Escribir \"Precio del producto:\"\n    Leer precio\n    Escribir \"Cantidad:\"\n    Leer ___\n    subtotal <- precio * cantidad\n    iva <- subtotal * ___\n    total <- subtotal + ___\n    Escribir \"Total a pagar: \", total\nFinAlgoritmo", pasos:["Completé el hueco de la cantidad (Leer cantidad).","Completé el porcentaje del IVA (0.19).","Completé la suma del total (total <- subtotal + iva).","Hice la traza a mano con precio 10000 y cantidad 2 y me dio 23800."] },
      { nombre:"Agrega un descuento", tipo:"semi", descripcion:"Ahora modifica el algoritmo: la tienda da un descuento de 5000 pesos fijos a toda compra.", pasos:["Decidí en qué lugar va el descuento: ¿antes o después del IVA? Escribí por qué.","Agregué la variable descuento y la resté.","Hice la traza con precio 10000 y cantidad 2."] },
      { nombre:"Tu propio algoritmo", tipo:"libre", descripcion:"Crea desde cero otro algoritmo de secuencia.", pasos:["Escribí un algoritmo que convierta pesos colombianos a dólares (pide los pesos y el valor del dólar).","Lo dibujé como diagrama de flujo.","Revisé: ¿es preciso?, ¿está en orden?, ¿termina?"] }
    ],
    lang:"pseudo",
    solucion:`Algoritmo CajaRegistradora
    Escribir "Precio del producto:"
    Leer precio
    Escribir "Cantidad:"
    Leer cantidad
    subtotal <- precio * cantidad
    descuento <- 5000
    subtotal <- subtotal - descuento
    iva <- subtotal * 0.19
    total <- subtotal + iva
    Escribir "Total a pagar: ", total
FinAlgoritmo

// Con precio 10000 y cantidad 2:
// subtotal = 20000 - 5000 = 15000
// iva = 2850
// total = 17850` }
}
);
