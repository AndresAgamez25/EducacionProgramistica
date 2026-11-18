/* =========================================================
   SEMESTRE 1: MAT-101 Matemáticas para programar
   Solo la matemática que de verdad se usa al programar.
   ========================================================= */
window.CURSOS = window.CURSOS || [];

window.CURSOS.push({
  id:"mate", codigo:"MAT-101", titulo:"Matemáticas para programar", semestre:1, horas:4, color:"#B5652A", requiere:["logica"],
  resumen:"Solo la matemática que vas a usar: binario, división entera, residuo, porcentajes y lógica de verdadero o falso.",
  paraQue:"La tienda necesita cuentas: el IVA, los descuentos, el cambio en billetes y decidir quién tiene descuento. Además, los colores de una imagen o el peso de un video se miden en bits y bytes. Nada de esto es relleno: lo vas a usar en Python en el siguiente semestre.",
  cierre:"El residuo que aprendiste aquí será el operador % de Python. La división entera será //. El Y, O y NO serán and, or y not. Y los porcentajes son las cuentas del IVA de la tienda. Ya sabes la matemática; en Python solo cambia la forma de escribirla.",
  hilo:"Las cuentas de la tienda: IVA, descuentos y cambio",
  pregunta:"Si alguien paga con un billete de 50.000 una compra de 31.700, ¿cómo decide la caja cuántos billetes y monedas devolver?",
  metas:["Entender por qué la computadora usa binario","Usar división entera y residuo para repartir y convertir","Calcular porcentajes, IVA y descuentos","Razonar con verdadero y falso (Y, O, NO)"],
  clases:[
  { id:"mate-1", titulo:"Contar como la computadora: el binario", min:20, bloques:[
    { t:"inicio", pregunta:"Un bombillo solo puede estar prendido o apagado. ¿Cuántas combinaciones distintas puedes hacer con 3 bombillos?", nota:"Son 8: apagado-apagado-apagado, apagado-apagado-prendido... y así hasta los tres prendidos. Con cada bombillo que agregas, las combinaciones se duplican. Así guarda todo la computadora." },
    { t:"texto", html:`<p>Por dentro, la computadora solo maneja dos estados: hay corriente o no hay corriente. Por eso usa el sistema [[binario]], que solo tiene dos dígitos: <b>0</b> y <b>1</b>.</p>
<ul><li>Un <b>bit</b> es un solo 0 o 1 (un bombillo).</li>
<li>Un <b>byte</b> son 8 bits juntos. Con 8 bits hay 256 combinaciones: del 0 al 255.</li></ul>` },
    { t:"diagrama", svg:"binario", pie:"En binario, cada posición vale el doble que la de su derecha: 1, 2, 4, 8, 16..." },
    { t:"ejemplo", lang:"text", titulo:"Pasar 1101 de binario a decimal", partes:[
      { meta:"Escribir el valor de cada posición", lineas:[["  8   4   2   1","De derecha a izquierda: 1, 2, 4, 8. Cada uno es el doble del anterior."]] },
      { meta:"Poner los bits debajo", lineas:[["  1   1   0   1","Un 1 significa «cuenta este valor»; un 0, «no lo cuentes»."]] },
      { meta:"Sumar los que tienen 1", lineas:[["  8 + 4 + 0 + 1 = 13","1101 en binario es 13 en decimal."]] }
    ]},
    { t:"predecir", lang:"text", codigo:"  8   4   2   1\n  1   0   1   0", pregunta:"¿Qué número decimal es 1010?", opciones:["10","1010","5"], respuesta:0, salida:"8 + 0 + 2 + 0 = 10", explicacion:"Se suman las posiciones con 1: 8 y 2." },
    { t:"texto", html:`<h3>¿Para qué te sirve esto en multimedia?</h3>
<ul><li><b>Colores:</b> en una pantalla, cada color se mezcla con rojo, verde y azul (RGB). Cada canal usa un byte, por eso va de 0 a 255. <code>rgb(255, 160, 75)</code> es el naranja de Nala.</li>
<li><b>Peso de archivos:</b> 1 KB son unos mil bytes, 1 MB un millón, 1 GB mil millones. Por eso un video pesa más que una foto.</li></ul>` },
    { t:"chequeo", e:{ tipo:"opcion", pregunta:"¿Por qué en CSS un canal de color llega máximo a 255?", opciones:["Porque es un número de la suerte","Porque se guarda en un byte (8 bits) y eso da 256 valores: 0 a 255","Porque las pantallas tienen 255 colores"], respuesta:1, explicacion:"8 bits permiten 256 combinaciones, del 0 al 255." } },
    { t:"autoexplica", pregunta:"Explica con tus palabras qué es un bit y qué es un byte, y da un ejemplo de dónde los ves en la vida real.", ideas:["Un bit es un 0 o un 1","Un byte son 8 bits","Ejemplo: colores RGB o el peso de archivos"] }
  ]},
  { id:"mate-2", titulo:"División entera y residuo", min:25, bloques:[
    { t:"inicio", pregunta:"Tienes 135 minutos de video. ¿Cuántas horas y minutos son? ¿Cómo lo calculaste?", nota:"Son 2 horas y 15 minutos. Sin darte cuenta hiciste dos operaciones: cuántas veces cabe 60 en 135 (eso es 2, la división entera) y cuánto sobra (15, el residuo). Esas dos operaciones aparecen en programación todo el tiempo." },
    { t:"texto", html:`<p>Cuando divides números enteros hay dos resultados útiles:</p>
<ul><li><b>División entera (cociente):</b> cuántas veces cabe completo. 17 entre 5 → 3.</li>
<li><b>Residuo (o [[módulo]]):</b> lo que sobra. 17 entre 5 → sobran 2, porque 5 × 3 = 15 y 17 − 15 = 2.</li></ul>
<p>En pseudocódigo se escriben <code>trunc(17 / 5)</code> y <code>17 MOD 5</code>. En Python serán <code>17 // 5</code> y <code>17 % 5</code>.</p>` },
    { t:"analogia", titulo:"Repartir bolsas de agua", html:`<p>Tienes 23 bolsas de agua y cajas donde caben 6. Llenas 3 cajas completas (división entera: 23 // 6 = 3) y te quedan 5 bolsas sueltas (residuo: 23 % 6 = 5).</p>` },
    { t:"chequeo", e:{ tipo:"escribir", pregunta:"¿Cuál es el residuo de 20 entre 6?", respuestas:["2"], explicacion:"6 cabe 3 veces (18) y sobran 2.", pistas:["¿Cuántas veces cabe 6 en 20 sin pasarse?","6 × 3 = 18. ¿Cuánto falta para llegar a 20?"] } },
    { t:"texto", html:`<h3>Tres usos que vas a ver mucho</h3>
<ol><li><b>Saber si un número es par:</b> si el residuo de dividir entre 2 es 0, es par.</li>
<li><b>Convertir unidades:</b> minutos a horas, segundos a minutos, centímetros a metros.</li>
<li><b>Dar el cambio en billetes:</b> cuántos billetes grandes caben y con lo que sobra seguir con los más pequeños.</li></ol>` },
    { t:"traza", lang:"pseudo", codigo:"cambio <- 68000\nb50 <- trunc(cambio / 50000)\ncambio <- cambio MOD 50000\nb10 <- trunc(cambio / 10000)\ncambio <- cambio MOD 10000\nm1 <- trunc(cambio / 1000)", vars:["cambio","b50","b10","m1"], pasos:[
      { l:1, v:{cambio:"68000"}, sal:"", nota:"Hay que devolver 68.000." },
      { l:2, v:{cambio:"68000",b50:"1"}, sal:"", nota:"50.000 cabe 1 vez en 68.000: un billete de 50." },
      { l:3, v:{cambio:"18000",b50:"1"}, sal:"", nota:"Lo que sobra: 68.000 − 50.000 = 18.000." },
      { l:4, v:{cambio:"18000",b50:"1",b10:"1"}, sal:"", nota:"10.000 cabe 1 vez en 18.000." },
      { l:5, v:{cambio:"8000",b50:"1",b10:"1"}, sal:"", nota:"Sobran 8.000." },
      { l:6, v:{cambio:"8000",b50:"1",b10:"1",m1:"8"}, sal:"", nota:"8 billetes de 1.000 (para simplificar no usamos billetes de 2.000 ni de 5.000)." }
    ]},
    { t:"predecir", lang:"pseudo", codigo:"minutos <- 200\nhoras <- trunc(minutos / 60)\nresto <- minutos MOD 60\nEscribir horas, \" h \", resto, \" min\"", pregunta:"¿Qué se muestra?", opciones:["3 h 20 min","3.33 h","2 h 80 min"], respuesta:0, salida:"3 h 20 min", explicacion:"60 cabe 3 veces en 200 (180) y sobran 20." },
    { t:"critica", pregunta:"¿Por qué para dar el cambio hay que empezar por el billete más grande y no por el más pequeño?", respuesta:"Si empiezas por el pequeño, darías 68 billetes de 1.000. Funciona, pero nadie quiere eso. Empezar por el más grande da la menor cantidad de billetes. Fíjate que el algoritmo correcto depende de lo que la persona espera, no solo de que la cuenta dé." },
    { t:"autoexplica", pregunta:"Explica cómo convertirías 3.725 segundos a horas, minutos y segundos.", ideas:["Primero horas: división entera entre 3600","Con el residuo, minutos: división entera entre 60","Lo que sobra son los segundos"] }
  ]},
  { id:"mate-3", titulo:"Porcentajes, IVA y descuentos", min:20, bloques:[
    { t:"texto", html:`<p>Un porcentaje es una parte de 100. El 19% es 19 de cada 100, o sea <b>0.19</b>. En programación casi siempre se trabaja con el número decimal, no con el signo %.</p>
<ul><li><b>Calcular el 19% de algo:</b> multiplicar por 0.19.</li>
<li><b>Sumar el 19% (con IVA):</b> multiplicar por 1.19 (el 100% más el 19%).</li>
<li><b>Restar el 10% (descuento):</b> multiplicar por 0.90 (te queda el 90%).</li></ul>` },
    { t:"ejemplo", lang:"pseudo", titulo:"Precio con descuento e IVA", partes:[
      { meta:"Datos", lineas:[["precio <- 100000",""],["descuento <- 0.10","10% escrito como decimal."],["iva <- 0.19","19% escrito como decimal."]] },
      { meta:"Aplicar el descuento", lineas:[["conDescuento <- precio * (1 - descuento)","1 − 0.10 = 0.90. Te queda el 90%: 90.000."]] },
      { meta:"Aplicar el IVA", lineas:[["total <- conDescuento * (1 + iva)","1 + 0.19 = 1.19. 90.000 × 1.19 = 107.100."]] },
      { meta:"Mostrar", lineas:[["Escribir total","Muestra 107100."]] }
    ]},
    { t:"predecir", lang:"pseudo", codigo:"precio <- 50000\ntotal <- precio * 1.19\nEscribir total", pregunta:"¿Qué se muestra?", opciones:["50019","59500","9500"], respuesta:1, salida:"59500", explicacion:"50.000 × 1.19 = 59.500. Multiplicar por 1.19 suma el 19% de una vez." },
    { t:"critica", pregunta:"Un vendedor dice: «Si primero aplico el descuento y después el IVA, el cliente paga menos que si primero aplico el IVA y después el descuento». ¿Es cierto? Haz la cuenta con 100.000.", respuesta:"No es cierto. Descuento primero: 100.000 × 0.90 × 1.19 = 107.100. IVA primero: 100.000 × 1.19 × 0.90 = 107.100. Da lo mismo porque en la multiplicación el orden no altera el resultado. Pero ojo: si el descuento fuera un valor fijo (por ejemplo, 5.000 pesos menos), el orden SÍ cambiaría el total. Comprobar con números en vez de creerle a la intuición es pensar como programador." },
    { t:"chequeo", e:{ tipo:"escribir", pregunta:"¿Por qué número multiplicas para quitar un 25% de descuento?", respuestas:["0.75",".75","0,75"], explicacion:"Te queda el 75%: 0.75." } },
    { t:"ojo", html:`<p>En programación el decimal se escribe con <b>punto</b>, no con coma: <code>0.19</code>. La coma se usa para separar cosas.</p>` },
    { t:"autoexplica", pregunta:"Explica por qué multiplicar por 1.19 es lo mismo que sumar el 19%.", ideas:["1 es el 100% del precio","0.19 es el 19% extra","Juntos dan el precio más su 19%"] }
  ]},
  { id:"mate-4", titulo:"Lógica: verdadero y falso", min:25, bloques:[
    { t:"inicio", pregunta:"La tienda da descuento a quien es cliente frecuente Y compra más de 100.000. Laura es cliente frecuente y compró 80.000. ¿Tiene descuento?", nota:"No. Cumple una condición pero no la otra, y la regla pide las dos. Estás usando lógica booleana sin saberlo: cada condición es verdadera o falsa, y se combinan con Y, O, NO." },
    { t:"texto", html:`<p>Una <b>condición</b> es una pregunta que solo puede responderse con <b>verdadero</b> o <b>falso</b> (en inglés, <code>true</code> o <code>false</code>). «La compra es mayor a 100.000» es una condición. Ese tipo de valor se llama <b>booleano</b>.</p>
<p>Las condiciones se combinan con tres operadores:</p>
<ul><li><b>Y</b>: verdadero solo si las dos son verdaderas.</li>
<li><b>O</b>: verdadero si al menos una es verdadera.</li>
<li><b>NO</b>: invierte: lo verdadero se vuelve falso y al revés.</li></ul>` },
    { t:"diagrama", svg:"verdad", pie:"Tabla de verdad: todas las combinaciones posibles." },
    { t:"chequeo", e:{ tipo:"opcion", pregunta:"Regla: hay envío gratis si la compra es mayor a 200.000 O si el cliente vive en Corozal. Pedro vive en Sincelejo y compró 250.000. ¿Envío gratis?", opciones:["Sí","No"], respuesta:0, explicacion:"Con O basta una condición verdadera: su compra pasa de 200.000." } },
    { t:"predecir", lang:"text", codigo:"esFrecuente = verdadero\ncompra > 100000 = falso\n\nesFrecuente Y (compra > 100000)  =  ?\nesFrecuente O (compra > 100000)  =  ?\nNO esFrecuente                   =  ?", pregunta:"¿Cuáles son los tres resultados, en orden?", opciones:["falso, verdadero, falso","verdadero, verdadero, falso","falso, falso, verdadero"], respuesta:0, salida:"falso\nverdadero\nfalso", explicacion:"Y necesita las dos (una es falsa: falso). O necesita una (hay una verdadera: verdadero). NO invierte verdadero: falso." },
    { t:"critica", pregunta:"Una regla dice: «NO (llueve Y hace frío)». Tu compañero dice que eso es lo mismo que «NO llueve Y NO hace frío». ¿Tiene razón? Prueba con el caso: llueve pero no hace frío.", respuesta:"No tiene razón. Si llueve pero no hace frío: «llueve Y hace frío» es falso, y NO de eso es verdadero. Pero «NO llueve Y NO hace frío» es falso Y verdadero, que da falso. Dan distinto. Lo correcto es «NO llueve O NO hace frío» (es la ley de De Morgan). Cuando dudes, prueba un caso concreto: así se encuentran errores de lógica en programas reales." },
    { t:"autoexplica", pregunta:"Inventa una regla de la tienda que use Y y otra que use O. Explica qué pasa en un caso donde solo se cumple una condición.", ideas:["Con Y, si falta una, el resultado es falso","Con O, basta una verdadera","Usaste un caso concreto para comprobar"] }
  ]}
  ],
  ejercicios:[
  { tipo:"escribir", pregunta:"¿Qué número decimal es el binario 111?", respuestas:["7"], explicacion:"4 + 2 + 1 = 7.", pistas:["Las posiciones valen 4, 2 y 1.","Todos son 1: suma los tres valores."] },
  { tipo:"escribir", pregunta:"¿Cuál es el residuo de 47 entre 10?", respuestas:["7"], explicacion:"10 cabe 4 veces (40) y sobran 7." },
  { tipo:"escribir", pregunta:"¿Cuánto es la división entera de 47 entre 10?", respuestas:["4"], explicacion:"10 cabe 4 veces completas en 47." },
  { tipo:"opcion", pregunta:"¿Cómo sabes con el residuo si un número es par?", opciones:["Si el residuo de dividir entre 2 es 0","Si el residuo de dividir entre 2 es 1","Si el número termina en 2"], respuesta:0, explicacion:"Los pares se dividen exacto entre 2." },
  { tipo:"escribir", pregunta:"Un producto cuesta 80.000. ¿Cuánto cuesta con 19% de IVA? (sin puntos)", respuestas:["95200"], explicacion:"80.000 × 1.19 = 95.200." },
  { tipo:"opcion", pregunta:"A es verdadero y B es falso. ¿Cuánto vale (A O B) Y NO B?", opciones:["verdadero","falso"], respuesta:0, explicacion:"A O B = verdadero. NO B = verdadero. verdadero Y verdadero = verdadero." },
  { tipo:"ordenar", pregunta:"Ordena los pasos para convertir 500 segundos a minutos y segundos.", lineas:["Leer segundos","minutos <- trunc(segundos / 60)","resto <- segundos MOD 60","Escribir minutos, resto"], explicacion:"Entrada, división entera, residuo, salida." }
  ],
  prueba:[
  { tipo:"escribir", pregunta:"¿Qué número decimal es el binario 1001?", respuestas:["9"], explicacion:"8 + 1 = 9." },
  { tipo:"opcion", pregunta:"¿Cuántos valores distintos caben en un byte?", opciones:["8","255","256"], respuesta:2, explicacion:"2 elevado a 8 = 256 (del 0 al 255)." },
  { tipo:"escribir", pregunta:"¿Cuál es el residuo de 100 entre 7?", respuestas:["2"], explicacion:"7 × 14 = 98, sobran 2." },
  { tipo:"escribir", pregunta:"¿Por qué número multiplicas un precio para aplicarle 15% de descuento?", respuestas:["0.85",".85","0,85"], explicacion:"Queda el 85%." },
  { tipo:"opcion", pregunta:"Envío gratis si (compra > 200.000) Y (ciudad = Corozal). Ana compró 300.000 y vive en Sincelejo. ¿Tiene envío gratis?", opciones:["Sí","No"], respuesta:1, explicacion:"Con Y deben cumplirse las dos." },
  { tipo:"error", lang:"pseudo", pregunta:"Este algoritmo debe convertir minutos a horas y minutos. Toca la línea con el error.", codigo:"Leer minutos\nhoras <- trunc(minutos / 60)\nresto <- minutos MOD 100\nEscribir horas, resto", linea:3, explicacion:"Una hora tiene 60 minutos: debe ser minutos MOD 60." }
  ],
  proyecto:{ titulo:"La caja da el cambio", objetivo:"Diseñar el algoritmo que calcula el cambio de una compra y cuántos billetes de cada tipo hay que devolver. Usa solo secuencia, división entera y residuo.",
    antes:["División entera y residuo (clase 2)","Traza del algoritmo del cambio (clase 2)","Leer y escribir pseudocódigo (PRG-101)"],
    etapas:[
      { nombre:"Completa el modelo", tipo:"guiada", lang:"pseudo", descripcion:"Copia en tu cuaderno o en PSeInt y completa los huecos.", plantilla:"Algoritmo DarCambio\n    Leer total\n    Leer pago\n    cambio <- pago - ___\n    b20 <- trunc(cambio / 20000)\n    cambio <- cambio ___ 20000\n    b10 <- trunc(cambio / ___)\n    cambio <- cambio MOD 10000\n    m1 <- trunc(cambio / 1000)\n    Escribir b20, \" de 20 mil, \", b10, \" de 10 mil, \", m1, \" de mil\"\nFinAlgoritmo", pasos:["Completé los tres huecos (total, MOD y 10000).","Hice la traza con total 31000 y pago 70000 (debe dar 1, 1 y 9).","Escribí en mi bitácora qué hace cada línea."] },
      { nombre:"Agrega billetes", tipo:"semi", pasos:["Agregué billetes de 50.000 al principio, en el lugar correcto.","Agregué billetes de 5.000 y 2.000 en el orden correcto (de mayor a menor).","Probé con pago 100000 y total 31700 y revisé que la suma de billetes dé el cambio."] },
      { nombre:"Crea", tipo:"libre", pasos:["Hice desde cero un algoritmo que convierta segundos a horas, minutos y segundos.","Lo probé con 3725 (debe dar 1 h 2 min 5 s).","Me pregunté: ¿qué pasa si pago es menor que total? Anoté el problema en la bitácora: lo vamos a resolver en Python con decisiones."] }
    ],
    lang:"pseudo",
    solucion:`Algoritmo DarCambio
    Leer total
    Leer pago
    cambio <- pago - total
    b50 <- trunc(cambio / 50000)
    cambio <- cambio MOD 50000
    b20 <- trunc(cambio / 20000)
    cambio <- cambio MOD 20000
    b10 <- trunc(cambio / 10000)
    cambio <- cambio MOD 10000
    b5 <- trunc(cambio / 5000)
    cambio <- cambio MOD 5000
    b2 <- trunc(cambio / 2000)
    cambio <- cambio MOD 2000
    m1 <- trunc(cambio / 1000)
    resto <- cambio MOD 1000
    Escribir b50, " de 50, ", b20, " de 20, ", b10, " de 10, ", b5, " de 5, ", b2, " de 2, ", m1, " de mil y ", resto, " en monedas"
FinAlgoritmo` }
});
