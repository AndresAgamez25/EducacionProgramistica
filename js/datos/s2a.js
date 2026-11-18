/* =========================================================
   SEMESTRE 2: Python desde cero (parte A)
   PY-101 Primeros pasos · PY-102 Decisiones · PY-103 Repeticiones
   ========================================================= */
window.CURSOS = window.CURSOS || [];

window.CURSOS.push(
/* =========================================================
   PY-101  PRIMEROS PASOS EN PYTHON
   ========================================================= */
{
  id:"py-base", codigo:"PY-101", titulo:"Primeros pasos en Python", semestre:2, horas:7, color:"#2F6DB5", requiere:["mate"],
  resumen:"Tu primer lenguaje real. Mostrar mensajes, guardar datos, pedirle datos al usuario y hacer cuentas, con cada signo explicado.",
  paraQue:"El algoritmo de la caja registradora que hiciste en pseudocódigo todavía no se puede ejecutar. Aquí lo vas a escribir en Python y va a funcionar de verdad. Python es hoy uno de los lenguajes más usados del mundo: datos, inteligencia artificial, automatización y servidores.",
  cierre:"Escribiste tu caja registradora en un lenguaje real. Cada variable, cada input() y cada cuenta de esta materia vuelven en todas las que siguen. En PY-102 la caja va a aprender a decidir: ¿el pago alcanza? ¿el cliente tiene descuento?",
  hilo:"La caja registradora en Python",
  pregunta:"¿Cómo convierto el algoritmo de la caja registradora en un programa que de verdad se ejecuta?",
  metas:["Leer y escribir una línea de Python pieza por pieza","Guardar y cambiar datos en variables","Pedir datos con input() y convertirlos","Hacer cuentas con + - * / // % **"],
  clases:[
  { id:"py-base-1", titulo:"Tu primera línea: print()", min:20, bloques:[
    { t:"texto", html:`<p>[[Python]] es un lenguaje con muy pocos signos raros, por eso es ideal para empezar. Lo vas a ejecutar aquí mismo: esta página trae Python dentro del navegador.</p>
<p>Lee el ejemplo línea por línea. Toca cualquier palabra o signo para ver qué significa.</p>` },
    { t:"ejemplo", lang:"python", titulo:"Mostrar mensajes", partes:[
      { meta:"Un comentario (para personas)", lineas:[["# Mi primer programa en Python","El numeral # empieza un comentario. Python lo ignora: es una nota para quien lee."]] },
      { meta:"Mostrar un texto", lineas:[["print(\"Hola, Corozal\")","print significa «imprimir» o «mostrar». Los paréntesis encierran lo que quieres mostrar. Las comillas dicen: esto es TEXTO literal. En Python no hace falta punto y coma al final."]] },
      { meta:"Mostrar números y cuentas", lineas:[["print(7)","Sin comillas, 7 es un número."],["print(7 + 3)","Python calcula primero 7 + 3 y muestra 10."]] },
      { meta:"Mostrar varias cosas a la vez", lineas:[["print(\"Total:\", 7 + 3)","La coma separa cosas a mostrar. Python pone un espacio entre ellas: Total: 10"]] }
    ]},
    { t:"simbolos", claves:["python:#","(",")","\"",","] },
    { t:"predecir", lang:"python", codigo:`print("5 + 5")
print(5 + 5)
print("5 + 5 =", 5 + 5)`, pregunta:"¿Qué muestra la tercera línea?", opciones:["10","5 + 5 = 10","5 + 5 = 5 + 5"], respuesta:1, salida:"5 + 5\n10\n5 + 5 = 10", explicacion:"La parte entre comillas se muestra igual; la parte sin comillas se calcula. La coma las separa con un espacio." },
    { t:"tip", html:`<p>Lee el código en voz alta. <code>print("Hola")</code> se lee: «muestra el texto Hola». Quienes investigan cómo aprendemos a programar recomiendan esta técnica, porque te obliga a entender cada pieza.</p>` },
    { t:"error", lang:"python", codigo:`print("Bienvenido")
print("a la tienda)
print("de Corozal")`, linea:2, explicacion:"Las comillas se abren pero no se cierran. Python no sabe dónde termina el texto y muestra un SyntaxError (error de escritura). Todo lo que se abre se cierra: comillas, paréntesis, corchetes.", arreglo:"print(\"a la tienda\")" },
    { t:"chequeo", e:{ tipo:"codigo", lang:"python", pregunta:"Modifica y crea: escribe un programa que muestre tu nombre en una línea y, en otra, el resultado de 2026 menos el año en que naciste.", minSalidas:2, inicial:"# escribe tu programa aquí\n", explicacion:"Por ejemplo: print(\"Andrés\") y print(2026 - 2004)." } },
    { t:"autoexplica", pregunta:"¿Qué diferencia hay entre print(\"3 * 4\") y print(3 * 4)?", ideas:["Con comillas es texto y se muestra igual","Sin comillas es una cuenta y se calcula","El segundo muestra 12"] }
  ]},
  { id:"py-base-2", titulo:"Variables: el = que no es igual", min:25, bloques:[
    { t:"inicio", pregunta:"En matemáticas, ¿puede ser verdad que  x = x + 1 ?", nota:"En matemáticas no. En programación sí, porque el = NO significa «es igual». Significa «recibe». Confundir esto es de los errores más comunes de quien empieza, según estudios con miles de estudiantes. Hoy lo resolvemos." },
    { t:"ejemplo", lang:"python", titulo:"Crear y cambiar una variable", partes:[
      { meta:"Crear la variable", lineas:[["puntos = 0","Se crea una variable llamada puntos y recibe el valor 0. Se lee: «puntos recibe cero»."]] },
      { meta:"Cambiar su valor", lineas:[["puntos = 10","puntos recibe 10. El 0 se pierde: una variable guarda un solo valor a la vez."],["puntos = puntos + 5","Se lee de DERECHA a izquierda: primero se calcula puntos + 5 (10 + 5 = 15) y luego ese 15 se guarda en puntos."]] },
      { meta:"Usar el valor", lineas:[["print(puntos)","Sin comillas: muestra el valor, 15."]] }
    ]},
    { t:"simbolos", claves:["=","+="] },
    { t:"traza", lang:"python", codigo:`a = 3
b = a
a = 8
print(a)
print(b)`, vars:["a","b"], pasos:[
      { l:1, v:{a:"3"}, sal:"", nota:"a recibe 3." },
      { l:2, v:{a:"3",b:"3"}, sal:"", nota:"b recibe una COPIA del valor de a. No quedan unidas." },
      { l:3, v:{a:"8",b:"3"}, sal:"", nota:"a cambia a 8. ¡b sigue en 3!" },
      { l:4, v:{a:"8",b:"3"}, sal:"8", nota:"Muestra a." },
      { l:5, v:{a:"8",b:"3"}, sal:"8\n3", nota:"Muestra b: 3." }
    ]},
    { t:"predecir", lang:"python", codigo:`vidas = 3
vidas = vidas - 1
vidas = vidas - 1
print(vidas)`, pregunta:"¿Qué se muestra?", opciones:["3","2","1"], respuesta:2, salida:"1", explicacion:"Cada línea toma el valor actual y le resta 1: 3 → 2 → 1." },
    { t:"texto", html:`<h3>Nombres de variables</h3>
<ul><li>Sin espacios y sin empezar con número: <code>2jugadores</code> y <code>mi edad</code> están mal.</li>
<li>Sin tildes ni ñ (funcionan, pero traen problemas): mejor <code>anio</code> que <code>año</code>.</li>
<li>En Python se usa <b>snake_case</b>: palabras en minúscula unidas con guion bajo: <code>precio_total</code>.</li>
<li>Que digan lo que guardan: <code>precio_total</code> se entiende; <code>x</code> no.</li>
<li>Mayúsculas y minúsculas son distintas: <code>Precio</code> y <code>precio</code> son dos variables diferentes.</li></ul>` },
    { t:"error", lang:"python", codigo:`precio = 2000
5000 = precio
print(precio)`, linea:2, explicacion:"La asignación va al revés. La variable que RECIBE siempre va a la izquierda del =. Python muestra: SyntaxError: cannot assign to literal.", arreglo:"precio = 5000" },
    { t:"critica", pregunta:"Mucha gente explica una variable como «una caja». Con el ejemplo de a y b, ¿en qué falla esa idea?", respuesta:"Si fuera una caja, al hacer b = a parecería que el 3 se mueve y a queda vacía. Pero a conserva su valor y b recibe una copia. Además una caja puede tener varias cosas y una variable guarda UN valor a la vez. Es más preciso pensarla como una etiqueta con nombre pegada a un valor." },
    { t:"autoexplica", pregunta:"Explica paso por paso qué pasa en  saldo = saldo - 20000", ideas:["Se lee de derecha a izquierda","Se calcula con el valor actual de saldo","El resultado reemplaza el valor anterior"] }
  ]},
  { id:"py-base-3", titulo:"Tipos de dato: Python es estricto", min:20, bloques:[
    { t:"texto", html:`<p>Cada valor tiene un [[tipo de dato]]. Los cuatro que vas a usar todo el tiempo:</p>
<ul><li><b>int</b> (entero): <code>25</code>, <code>-3</code>.</li>
<li><b>float</b> (decimal): <code>3.5</code>, <code>0.19</code>. Con punto, nunca con coma.</li>
<li><b>str</b> (texto, «string»): <code>"Hola"</code>, <code>"25"</code>. Siempre entre comillas.</li>
<li><b>bool</b> (lógico): <code>True</code> o <code>False</code>, con la primera en mayúscula.</li></ul>
<p>La función <code>type()</code> te dice el tipo de cualquier valor.</p>` },
    { t:"predecir", lang:"python", codigo:`print(type(25))
print(type(2.5))
print(type("25"))
print(type(True))`, pregunta:"¿Qué tipo tiene \"25\" (con comillas)?", opciones:["int","str","float"], respuesta:1, salida:"<class 'int'>\n<class 'float'>\n<class 'str'>\n<class 'bool'>", explicacion:"Las comillas lo convierten en texto, aunque tenga números." },
    { t:"predecir", lang:"python", codigo:`print("5" * 3)
print(5 * 3)`, pregunta:"¿Qué muestra la PRIMERA línea?", opciones:["15","555","Error"], respuesta:1, salida:"555\n15", explicacion:"Multiplicar un texto por un número lo REPITE: \"5\" tres veces es \"555\". Con números sí multiplica." },
    { t:"error", lang:"python", codigo:`edad = "17"
print(edad + 1)`, linea:2, explicacion:"No se puede sumar un texto con un número. Python muestra: TypeError: can only concatenate str (not \"int\") to str. Python es estricto: no adivina si quieres unir o sumar.", arreglo:"print(int(edad) + 1)" },
    { t:"ejemplo", lang:"python", titulo:"Convertir de un tipo a otro", partes:[
      { meta:"El dato llega como texto", lineas:[["edad_texto = \"17\"","Así llega lo que escribe un usuario."]] },
      { meta:"Convertir", lineas:[["edad = int(edad_texto)","int() convierte a entero. float() convertiría a decimal y str() a texto."]] },
      { meta:"Ahora sí operar", lineas:[["print(edad + 1)","Muestra 18."],["print(\"Tienes \" + str(edad) + \" años\")","Para UNIR texto con un número, el número se convierte a texto con str()."]] }
    ]},
    { t:"chequeo", e:{ tipo:"opcion", pregunta:"¿Qué muestra  print(int(\"7\") + int(\"3\")) ?", opciones:["73","10","Error"], respuesta:1, explicacion:"Los dos textos se convierten a enteros y se suman." } },
    { t:"autoexplica", pregunta:"¿Por qué \"17\" + 1 da error en Python? ¿Cómo lo arreglarías?", ideas:["\"17\" es texto y 1 es número","Python no mezcla tipos sin que se lo pidas","Se arregla con int(\"17\") + 1"] }
  ]},
  { id:"py-base-4", titulo:"Pedir datos: input() y f-strings", min:25, bloques:[
    { t:"texto", html:`<p>En pseudocódigo usabas <code>Leer</code>. En Python se usa <code>input()</code>: muestra un mensaje, espera a que el usuario escriba y devuelve lo que escribió. <b>Siempre lo devuelve como texto (str)</b>, aunque escriba un número.</p>` },
    { t:"ejemplo", lang:"python", titulo:"Pedir un dato y usarlo", partes:[
      { meta:"Pedir el dato", lineas:[["nombre = input(\"¿Cómo te llamas? \")","Muestra la pregunta, espera la respuesta y la guarda en nombre."]] },
      { meta:"Pedir un número y convertirlo", lineas:[["edad = int(input(\"¿Cuántos años tienes? \"))","Se lee de adentro hacia afuera: primero input() trae el texto, luego int() lo convierte en número, luego se guarda en edad."]] },
      { meta:"Mostrar con una f-string", lineas:[["print(f\"Hola {nombre}, el otro año tendrás {edad + 1}\")","La f antes de las comillas crea una f-string: lo que va entre llaves { } se reemplaza por su valor. Es la forma más cómoda de mezclar texto y datos."]] }
    ]},
    { t:"simbolos", claves:["{","}"] },
    { t:"conecta", html:`<p>Compara con lo que hiciste en PRG-101. Es el mismo algoritmo, solo cambia la forma de escribirlo:</p>` },
    { t:"comparar", izquierda:{ titulo:"Pseudocódigo (PRG-101)", lang:"pseudo", codigo:`Leer precio
Leer cantidad
total <- precio * cantidad
Escribir "Total: ", total` }, derecha:{ titulo:"Python", lang:"python", codigo:`precio = float(input("Precio: "))
cantidad = int(input("Cantidad: "))
total = precio * cantidad
print("Total:", total)` }, nota:"Leer se volvió input(), <- se volvió =, Escribir se volvió print(). Y apareció algo nuevo: convertir el texto a número." },
    { t:"predecir", lang:"python", entradas:["2500","3"], codigo:`precio = float(input("Precio: "))
cantidad = int(input("Cantidad: "))
print(f"Total: {precio * cantidad}")`, pregunta:"El usuario escribe 2500 y luego 3. ¿Qué se muestra al final?", opciones:["Total: 7500","Total: 7500.0","Total: 25003"], respuesta:1, salida:"Total: 7500.0", explicacion:"precio es float (por float()), así que el resultado también es float y Python lo muestra con .0. Si quisieras 7500 sin decimal, usarías int() o round()." },
    { t:"error", lang:"python", codigo:`cantidad = input("Cantidad: ")
total = cantidad * 1500
print(total)`, linea:1, explicacion:"input() devuelve texto. Si el usuario escribe 2, cantidad es \"2\" y \"2\" * 1500 repite el texto 1500 veces. No da error, pero el resultado es absurdo: es un error de lógica, más peligroso porque no avisa.", arreglo:"cantidad = int(input(\"Cantidad: \"))" },
    { t:"chequeo", e:{ tipo:"codigo", lang:"python", pregunta:"Crea un programa que pida el nombre de un producto y su precio, y muestre: «El producto X cuesta Y pesos». (Para probarlo, el sistema escribirá «Mango» y 1500.)", casos:[{ entradas:["Mango","1500"], salida:"El producto Mango cuesta 1500 pesos" }], inicial:"producto = input(\"Producto: \")\n# pide el precio y muestra el mensaje\n", explicacion:"precio = input(\"Precio: \") y print(f\"El producto {producto} cuesta {precio} pesos\"). Aquí no hace falta convertir porque no haces cuentas." } },
    { t:"autoexplica", pregunta:"¿Por qué casi siempre se escribe int(input(...)) o float(input(...)) cuando se pide un número?", ideas:["input() siempre devuelve texto","Para hacer cuentas se necesita un número","int o float convierten el texto"] }
  ]},
  { id:"py-base-5", titulo:"Operadores: cuentas y el orden", min:25, bloques:[
    { t:"simbolos", claves:["+","-","*","/","python://","%","**"] },
    { t:"texto", html:`<p>Fíjate en tres detalles de Python:</p>
<ul><li><code>/</code> SIEMPRE da decimal: <code>10 / 2</code> es <code>5.0</code>.</li>
<li><code>//</code> es la <b>división entera</b> de MAT-101: <code>17 // 5</code> es <code>3</code>.</li>
<li><code>%</code> es el <b>residuo</b>, no un porcentaje: <code>17 % 5</code> es <code>2</code>.</li></ul>` },
    { t:"predecir", lang:"python", codigo:`print(10 / 2)
print(17 // 5)
print(17 % 5)
print(2 ** 3)`, pregunta:"¿Qué muestra la PRIMERA línea?", opciones:["5","5.0","2"], respuesta:1, salida:"5.0\n3\n2\n8", explicacion:"La barra / siempre da float en Python, incluso si la división es exacta." },
    { t:"texto", html:`<h3>El orden de las operaciones</h3><p>Igual que en matemáticas: primero paréntesis, luego <code>**</code>, luego <code>* / // %</code>, y al final <code>+ -</code>. Si empatan, de izquierda a derecha.</p>` },
    { t:"traza", lang:"python", codigo:`r = 2 + 3 * 4 - (6 - 2) // 2
print(r)`, vars:["paso","queda"], pasos:[
      { l:1, v:{paso:"Paréntesis: (6 - 2) = 4",queda:"2 + 3 * 4 - 4 // 2"}, sal:"", nota:"Primero lo que está entre paréntesis." },
      { l:1, v:{paso:"Multiplicar: 3 * 4 = 12",queda:"2 + 12 - 4 // 2"}, sal:"", nota:"Luego * y //, de izquierda a derecha." },
      { l:1, v:{paso:"División entera: 4 // 2 = 2",queda:"2 + 12 - 2"}, sal:"", nota:"" },
      { l:1, v:{paso:"Sumar y restar",queda:"12"}, sal:"", nota:"2 + 12 = 14 y 14 − 2 = 12." },
      { l:2, v:{paso:"Mostrar",queda:"12"}, sal:"12", nota:"" }
    ]},
    { t:"texto", html:`<h3>Atajos de asignación</h3><ul><li><code>total += 500</code> es <code>total = total + 500</code></li><li><code>saldo -= 100</code> es <code>saldo = saldo - 100</code></li><li><code>precio *= 1.19</code> es <code>precio = precio * 1.19</code></li></ul><p>Python <b>no</b> tiene <code>++</code> como otros lenguajes: se escribe <code>i += 1</code>.</p>` },
    { t:"chequeo", e:{ tipo:"codigo", lang:"python", pregunta:"Crea la función con_iva(precio) que devuelva el precio con 19% de IVA. (Las funciones las verás a fondo en PY-104; aquí solo completa la cuenta después de return.)", funcion:"con_iva", inicial:"def con_iva(precio):\n    return precio * 1  # cambia el 1 por lo correcto\n", pruebas:[[[100],119],[[1000],1190],[[0],0]], explicacion:"return precio * 1.19" } },
    { t:"chequeo", e:{ tipo:"escribir", pregunta:"¿Qué muestra print(7 // 2 + 7 % 2)?", respuestas:["4"], explicacion:"7 // 2 = 3 y 7 % 2 = 1. 3 + 1 = 4." } },
    { t:"autoexplica", pregunta:"¿En qué se diferencian / y // ? Da un ejemplo de la tienda donde uses //.", ideas:["/ da decimal","// da la división entera","Ejemplo: cuántos billetes de 20.000 caben en el cambio"] }
  ]}
  ],
  ejercicios:[
  { tipo:"opcion", pregunta:"¿Qué hace  total = 0 ?", opciones:["Pregunta si total es 0","Hace que total reciba el valor 0","Muestra 0"], respuesta:1, explicacion:"El = asigna." },
  { tipo:"escribir", pregunta:"Después de  x = 5  y luego  x += 3, ¿cuánto vale x?", respuestas:["8"], explicacion:"x += 3 es x = x + 3." },
  { tipo:"escribir", pregunta:"¿Qué muestra  print(\"ja\" * 3) ?", respuestas:["jajaja"], explicacion:"Multiplicar un texto lo repite." },
  { tipo:"completar", lang:"python", pregunta:"Completa para que precio sea un número decimal.", plantilla:"precio = ___(input(\"Precio: \"))", respuestas:[["float"]], explicacion:"float() convierte el texto en número decimal." },
  { tipo:"error", lang:"python", pregunta:"Toca la línea con el error.", codigo:"nombre = input(\"Nombre: \")\nedad = int(input(\"Edad: \"))\nprint(\"Hola \" + nombre)\nprint(\"Tienes \" + edad + \" años\")", linea:4, explicacion:"No se puede unir texto con un int usando +. Usa str(edad) o una f-string." },
  { tipo:"ordenar", pregunta:"Ordena el programa que calcula el total de una compra.", lineas:["precio = float(input(\"Precio: \"))","cantidad = int(input(\"Cantidad: \"))","total = precio * cantidad","print(f\"Total: {total}\")"], explicacion:"Entradas, proceso, salida. Igual que en pseudocódigo." },
  { tipo:"codigo", lang:"python", pregunta:"Crea un programa que pida minutos y muestre horas y minutos con el formato «2 h 15 min». (Se probará con 135.)", casos:[{ entradas:["135"], salida:"2 h 15 min" },{ entradas:["60"], salida:"1 h 0 min" }], inicial:"minutos = int(input(\"Minutos: \"))\n", explicacion:"print(f\"{minutos // 60} h {minutos % 60} min\")", pistas:["Usa // para las horas y % para los minutos que sobran (MAT-101).","Una f-string te deja escribir el mensaje con los dos valores."] }
  ],
  prueba:[
  { tipo:"opcion", pregunta:"¿Cómo se lee  puntos = puntos + 10 ?", opciones:["puntos es igual a puntos más 10 (imposible)","puntos recibe su valor actual más 10","Compara puntos con puntos + 10"], respuesta:1, explicacion:"El = asigna, de derecha a izquierda." },
  { tipo:"opcion", pregunta:"¿Qué tipo devuelve input()?", opciones:["int","str","Depende de lo que escriba el usuario"], respuesta:1, explicacion:"Siempre texto." },
  { tipo:"escribir", pregunta:"¿Qué muestra  print(10 / 4) ?", respuestas:["2.5"], explicacion:"La barra / da decimal." },
  { tipo:"escribir", pregunta:"¿Qué muestra  print(10 // 4) ?", respuestas:["2"], explicacion:"División entera." },
  { tipo:"error", lang:"python", pregunta:"Toca la línea con el error.", codigo:"saldo = 50000\nretiro = 20000\nsaldo - retiro = saldo\nprint(saldo)", linea:3, explicacion:"La variable que recibe va a la izquierda: saldo = saldo - retiro." },
  { tipo:"codigo", lang:"python", pregunta:"Crea un programa que pida un precio (decimal) y muestre el precio con IVA del 19% usando el formato «Con IVA: X». (Se prueba con 100.)", casos:[{ entradas:["100"], salida:"Con IVA: 119.0" }], inicial:"", explicacion:"precio = float(input(\"Precio: \")) y print(f\"Con IVA: {precio * 1.19}\")" }
  ],
  proyecto:{ titulo:"La caja registradora en Python", objetivo:"Llevar a Python el algoritmo de la caja registradora: pedir producto, precio y cantidad, calcular IVA y total, y dar el cambio en billetes.",
    antes:["input() y conversión con int() / float() (clase 4)","f-strings (clase 4)","// y % para dar el cambio (clase 5 y MAT-101)"],
    etapas:[
      { nombre:"Completa el modelo", tipo:"guiada", lang:"python", descripcion:"Abre la plantilla en el laboratorio, completa los huecos ___ y ejecuta.", plantilla:`producto = input("Producto: ")
precio = float(input("Precio: "))
cantidad = int(input("Cantidad: "))

subtotal = precio * ___
iva = subtotal * ___
total = subtotal + ___

print(f"{cantidad} x {producto}")
print(f"Subtotal: {subtotal}")
print(f"IVA: {iva}")
print(f"Total: {total}")`, pasos:["Completé los tres huecos.","Antes de ejecutar, escribí en la bitácora qué esperaba ver con precio 10000 y cantidad 2.","Ejecuté y comparé con mi predicción (Total: 23800.0)."] },
      { nombre:"Agrega el cambio", tipo:"semi", pasos:["Pedí con cuánto paga el cliente y calculé el cambio.","Con // y % calculé cuántos billetes de 20.000, 10.000 y 2.000 devolver.","Usé round() o int() para que el total no muestre decimales raros."] },
      { nombre:"Crea", tipo:"libre", pasos:["Hice un programa propio: un conversor (pesos a dólares, °C a °F o minutos a horas).","Lo probé con al menos dos valores que conozco de memoria.","Me pregunté: ¿qué pasa si el cliente paga menos que el total? Lo anoté: se resuelve en PY-102."] }
    ],
    lab:{ modo:"python", codigo:`producto = input("Producto: ")
precio = float(input("Precio: "))
cantidad = int(input("Cantidad: "))

subtotal = precio * ___
iva = subtotal * ___
total = subtotal + ___

print(f"{cantidad} x {producto}")
print(f"Subtotal: {subtotal}")
print(f"IVA: {iva}")
print(f"Total: {total}")
`, entradas:"Mango\n10000\n2" },
    lang:"python",
    solucion:`producto = input("Producto: ")
precio = float(input("Precio: "))
cantidad = int(input("Cantidad: "))
pago = int(input("Paga con: "))

subtotal = precio * cantidad
iva = subtotal * 0.19
total = round(subtotal + iva)

print(f"{cantidad} x {producto}")
print(f"Total: {total}")

cambio = pago - total
print(f"Cambio: {cambio}")
b20 = cambio // 20000
cambio = cambio % 20000
b10 = cambio // 10000
cambio = cambio % 10000
b2 = cambio // 2000
resto = cambio % 2000
print(f"{b20} de 20 mil, {b10} de 10 mil, {b2} de 2 mil y {resto} en monedas")` }
},

/* =========================================================
   PY-102  DECISIONES
   ========================================================= */
{
  id:"py-decisiones", codigo:"PY-102", titulo:"Decisiones: if, elif y else", semestre:2, horas:6, color:"#3E8A4F", requiere:["py-base"],
  resumen:"Haz que el programa elija qué hacer según los datos, con condiciones simples y compuestas.",
  paraQue:"Tu caja registradora ya calcula, pero no piensa: si el cliente paga menos que el total, da un cambio negativo. Aquí la caja aprende a decidir: validar el pago, aplicar descuentos solo a quien le toca y pedir la clave al cajero.",
  cierre:"Todo programa real está lleno de decisiones: un login revisa la clave, un juego revisa si chocaste, una tienda revisa el stock. Lo que hiciste con if, elif y else es exactamente eso. En PY-103 la caja va a poder atender a varios clientes seguidos.",
  hilo:"La caja que decide: pago, descuentos y clave",
  pregunta:"¿Cómo hace un programa para tomar caminos distintos según lo que pase?",
  metas:["Escribir if, elif y else con la sangría correcta","Comparar con == != < > <= >=","Combinar condiciones con and, or y not","Validar datos antes de usarlos"],
  clases:[
  { id:"py-dec-1", titulo:"if: el programa elige", min:25, bloques:[
    { t:"texto", html:`<p>Hasta ahora tus programas iban en línea recta: todas las líneas se ejecutaban siempre. Un [[condicional]] hace que un bloque de código se ejecute <b>solo si</b> una condición es verdadera. Es el rombo del diagrama de flujo de PRG-101.</p>` },
    { t:"diagrama", svg:"if", pie:"Si la condición es verdadera se ejecuta el bloque; si no, se salta." },
    { t:"ejemplo", lang:"python", titulo:"Aviso de pago insuficiente", partes:[
      { meta:"Los datos", lineas:[["total = 23800",""],["pago = 20000",""]] },
      { meta:"La pregunta", lineas:[["if pago < total:","if significa «si». Después va la condición (pago < total, que da True o False) y al final DOS PUNTOS. Los dos puntos dicen: aquí empieza el bloque."]] },
      { meta:"El bloque (lo que pasa si es verdad)", lineas:[["    print(\"El pago no alcanza\")","Esta línea tiene 4 espacios al inicio: eso es la sangría o [[indentación]]. Le dice a Python que esta línea pertenece al if. Solo se ejecuta si la condición es True."],["    print(f\"Faltan {total - pago}\")","Misma sangría: también es parte del bloque."]] },
      { meta:"Fuera del if", lineas:[["print(\"Gracias por su compra\")","Sin sangría: ya salimos del if. Esta línea se ejecuta SIEMPRE."]] }
    ]},
    { t:"simbolos", claves:["<",">","<=",">=","==","!=","python::"] },
    { t:"traza", lang:"python", codigo:`total = 23800
pago = 20000
if pago < total:
    print("El pago no alcanza")
    print(f"Faltan {total - pago}")
print("Gracias por su compra")`, vars:["total","pago","pago < total"], pasos:[
      { l:1, v:{total:"23800"}, sal:"", nota:"" },
      { l:2, v:{total:"23800",pago:"20000"}, sal:"", nota:"" },
      { l:3, v:{total:"23800",pago:"20000","pago < total":"True"}, sal:"", nota:"20000 < 23800 es True: se entra al bloque." },
      { l:4, v:{total:"23800",pago:"20000","pago < total":"True"}, sal:"El pago no alcanza", nota:"" },
      { l:5, v:{total:"23800",pago:"20000","pago < total":"True"}, sal:"El pago no alcanza\nFaltan 3800", nota:"" },
      { l:6, v:{total:"23800",pago:"20000","pago < total":"True"}, sal:"El pago no alcanza\nFaltan 3800\nGracias por su compra", nota:"Fuera del if: se ejecuta siempre." }
    ]},
    { t:"predecir", lang:"python", codigo:`total = 23800
pago = 50000
if pago < total:
    print("El pago no alcanza")
print("Gracias por su compra")`, pregunta:"Ahora paga 50.000. ¿Qué se muestra?", opciones:["El pago no alcanza y Gracias por su compra","Solo: Gracias por su compra","Nada"], respuesta:1, salida:"Gracias por su compra", explicacion:"50000 < 23800 es False: el bloque se salta. La última línea no tiene sangría, así que se ejecuta siempre." },
    { t:"error", lang:"python", codigo:`edad = 20
if edad >= 18
    print("Puede entrar")`, linea:2, explicacion:"Faltan los dos puntos al final del if. Python muestra: SyntaxError: expected ':'.", arreglo:"if edad >= 18:" },
    { t:"error", lang:"python", codigo:`edad = 20
if edad >= 18:
print("Puede entrar")`, linea:3, explicacion:"La línea del bloque no tiene sangría. Python muestra: IndentationError: expected an indented block. La sangría en Python no es decoración: es parte del lenguaje.", arreglo:"    print(\"Puede entrar\")" },
    { t:"autoexplica", pregunta:"¿Cómo sabe Python qué líneas pertenecen al if y cuáles no?", ideas:["Por la sangría (4 espacios)","Las líneas con sangría son el bloque","Al volver sin sangría se sale del if"] }
  ]},
  { id:"py-dec-2", titulo:"else y elif: varios caminos", min:25, bloques:[
    { t:"ejemplo", lang:"python", titulo:"Clasificar una nota", partes:[
      { meta:"El dato", lineas:[["nota = float(input(\"Nota: \"))",""]] },
      { meta:"Primera pregunta", lineas:[["if nota >= 4.5:","Si es 4.5 o más..."],["    print(\"Excelente\")",""]] },
      { meta:"Si no, otra pregunta", lineas:[["elif nota >= 3.0:","elif = «si no, si...». Solo se revisa si la anterior fue False."],["    print(\"Aprobado\")",""]] },
      { meta:"Si ninguna se cumplió", lineas:[["else:","else = «si no». No lleva condición: atrapa todo lo demás."],["    print(\"Reprobado\")",""]] }
    ]},
    { t:"texto", html:`<p>Regla clave: Python revisa de <b>arriba hacia abajo</b> y entra en la <b>primera</b> condición verdadera. Las demás se saltan, aunque también sean verdaderas.</p>` },
    { t:"predecir", lang:"python", codigo:`nota = 4.8
if nota >= 3.0:
    print("Aprobado")
elif nota >= 4.5:
    print("Excelente")
else:
    print("Reprobado")`, pregunta:"Las condiciones están en otro orden. Con nota 4.8, ¿qué se muestra?", opciones:["Excelente","Aprobado","Aprobado y Excelente"], respuesta:1, salida:"Aprobado", explicacion:"4.8 >= 3.0 ya es True, así que entra ahí y no revisa más. Con este orden, nadie sacaría nunca «Excelente». Es un error de lógica: el programa no se cae, pero hace algo que no querías." },
    { t:"critica", pregunta:"¿Qué regla general sacas del ejemplo anterior sobre el orden de los elif cuando se trabaja con rangos?", respuesta:"Cuando los rangos se montan unos sobre otros (todo el que tiene 4.5 también tiene 3.0), hay que preguntar primero por el más exigente. Otra forma es escribir rangos que no se crucen: elif 3.0 <= nota < 4.5. Siempre conviene probar el programa con un valor de cada rango y con los bordes (3.0 y 4.5)." },
    { t:"chequeo", e:{ tipo:"codigo", lang:"python", pregunta:"Crea la función tipo_cliente(compras) que devuelva \"nuevo\" si compras es 0, \"frecuente\" si es 10 o más, y \"ocasional\" en cualquier otro caso.", funcion:"tipo_cliente", inicial:"def tipo_cliente(compras):\n    if compras == 0:\n        return \"nuevo\"\n    # completa con elif y else\n", pruebas:[[[0],"nuevo"],[[3],"ocasional"],[[10],"frecuente"],[[25],"frecuente"]], explicacion:"elif compras >= 10: return \"frecuente\" y else: return \"ocasional\".", pistas:["Usa == para comparar, no =.","Después del if, agrega elif compras >= 10: y luego else:"] } },
    { t:"autoexplica", pregunta:"¿Qué diferencia hay entre escribir tres if seguidos y escribir if, elif, elif?", ideas:["Con tres if se revisan todos","Con elif se detiene en el primero verdadero","Con rangos que se cruzan, tres if podrían ejecutar varios bloques"] }
  ]},
  { id:"py-dec-3", titulo:"Condiciones compuestas: and, or, not", min:20, bloques:[
    { t:"conecta", html:`<p>Esto ya lo razonaste en MAT-101 con Y, O y NO. En Python se escriben <code>and</code>, <code>or</code> y <code>not</code>.</p>` },
    { t:"ejemplo", lang:"python", titulo:"Descuento para clientes frecuentes", partes:[
      { meta:"Datos", lineas:[["es_frecuente = True","Un booleano."],["compra = 120000",""]] },
      { meta:"Condición combinada", lineas:[["if es_frecuente and compra > 100000:","Las DOS deben ser True. True and True → True."],["    compra = compra * 0.9","Aplica 10% de descuento."]] },
      { meta:"Resultado", lineas:[["print(compra)","Muestra 108000.0"]] }
    ]},
    { t:"predecir", lang:"python", codigo:`edad = 15
con_acudiente = True
if edad >= 18 or con_acudiente:
    print("Puede entrar")
else:
    print("No puede entrar")`, pregunta:"¿Qué se muestra?", opciones:["Puede entrar","No puede entrar"], respuesta:0, salida:"Puede entrar", explicacion:"Con or basta una verdadera: viene con acudiente." },
    { t:"texto", html:`<h3>Un regalo de Python: rangos encadenados</h3><p>En Python puedes escribir <code>1 &lt;= n &lt;= 10</code> igual que en matemáticas, y funciona. Ojo: en otros lenguajes como JavaScript o Java eso <b>no</b> funciona y hay que escribir <code>n &gt;= 1 and n &lt;= 10</code>. Lo verás cuando lleguen esos lenguajes.</p>` },
    { t:"chequeo", e:{ tipo:"opcion", pregunta:"La tienda abre de 8 a 18 (hora en número). ¿Cuál condición dice que está CERRADA?", opciones:["hora < 8 or hora >= 18","hora < 8 and hora >= 18","not hora"], respuesta:0, explicacion:"Está cerrada si es antes de las 8 O desde las 18. Con and nunca se cumplirían las dos a la vez." } },
    { t:"autoexplica", pregunta:"Escribe una regla de tu vida con and y otra con or, y explica qué pasa cuando solo se cumple una condición.", ideas:["Con and deben cumplirse todas","Con or basta una"] }
  ]},
  { id:"py-dec-4", titulo:"Validar datos y comparar textos", min:20, bloques:[
    { t:"texto", html:`<p>Antes de usar un dato, un buen programa lo revisa. Si la cantidad es negativa o el pago no alcanza, no tiene sentido seguir. Eso se llama <b>validar</b>.</p>` },
    { t:"predecir", lang:"python", codigo:`respuesta = "Si"
if respuesta == "si":
    print("Confirmado")
else:
    print("No confirmado")`, pregunta:"¿Qué se muestra?", opciones:["Confirmado","No confirmado"], respuesta:1, salida:"No confirmado", explicacion:"Para Python, \"Si\" y \"si\" son textos distintos: la mayúscula cuenta. Por eso se suele normalizar con .lower(), que pasa todo a minúsculas." },
    { t:"ejemplo", lang:"python", titulo:"Comparar sin que importen las mayúsculas", partes:[
      { meta:"Leer y normalizar", lineas:[["respuesta = input(\"¿Desea factura? \").strip().lower()",".strip() quita espacios de los bordes y .lower() pasa a minúsculas. El punto se lee «de»: lower de respuesta."]] },
      { meta:"Comparar", lineas:[["if respuesta == \"si\":","Ahora «Si», «SI» o «si » funcionan igual."],["    print(\"Generando factura\")",""]] }
    ]},
    { t:"error", lang:"python", codigo:`clave = input("Clave: ")
if clave = "1234":
    print("Bienvenido")`, linea:2, explicacion:"Se usó = (asignar) en vez de == (comparar). Python lo detecta: SyntaxError. Recuerda: = guarda, == pregunta.", arreglo:"if clave == \"1234\":" },
    { t:"chequeo", e:{ tipo:"codigo", lang:"python", pregunta:"Crea un programa que pida el total y el pago. Si el pago alcanza, muestra «Cambio: X»; si no, «Faltan X». (Se prueba con total 23800 y pago 30000, y con total 23800 y pago 20000.)", casos:[{ entradas:["23800","30000"], salida:"Cambio: 6200" },{ entradas:["23800","20000"], salida:"Faltan 3800" }], inicial:"total = int(input(\"Total: \"))\npago = int(input(\"Pago: \"))\n", explicacion:"if pago >= total: print(f\"Cambio: {pago - total}\") else: print(f\"Faltan {total - pago}\")" } },
    { t:"autoexplica", pregunta:"¿Por qué conviene usar .lower() al comparar respuestas del usuario?", ideas:["Python distingue mayúsculas de minúsculas","Los usuarios escriben de muchas formas","Normalizar evita errores"] }
  ]}
  ],
  ejercicios:[
  { tipo:"opcion", pregunta:"¿Qué signo PREGUNTA si dos valores son iguales en Python?", opciones:["=","==","==="], respuesta:1, explicacion:"== compara; = asigna. === no existe en Python." },
  { tipo:"completar", lang:"python", pregunta:"Completa la línea del if.", plantilla:"if cantidad > 0___\n    print(\"Cantidad válida\")", respuestas:[[":"]], explicacion:"Todo if termina en dos puntos." },
  { tipo:"error", lang:"python", pregunta:"Toca la línea con el error.", codigo:"stock = 5\nif stock == 0:\n    print(\"Agotado\")\nelse\n    print(\"Disponible\")", linea:4, explicacion:"else también lleva dos puntos." },
  { tipo:"opcion", pregunta:"Con x = 7, ¿qué muestra?  if x > 5: print(\"A\")  elif x > 3: print(\"B\")", opciones:["A","B","A y B"], respuesta:0, explicacion:"Entra en el primero verdadero y no revisa los demás." },
  { tipo:"ordenar", pregunta:"Ordena el programa que dice si un número es par o impar.", lineas:["n = int(input(\"Número: \"))","if n % 2 == 0:","    print(\"Par\")","else:","    print(\"Impar\")"], explicacion:"Entrada, pregunta, bloque si sí, else, bloque si no." },
  { tipo:"codigo", lang:"python", pregunta:"Crea la función precio_final(precio, es_frecuente) que aplique 10% de descuento solo si es_frecuente es True, y devuelva el precio.", funcion:"precio_final", inicial:"def precio_final(precio, es_frecuente):\n    \n", pruebas:[[[100,true],90],[[100,false],100],[[5000,true],4500]], explicacion:"if es_frecuente: return precio * 0.9 y si no, return precio." }
  ],
  prueba:[
  { tipo:"opcion", pregunta:"¿Qué le dice a Python que una línea pertenece al bloque de un if?", opciones:["Las llaves { }","La sangría","El punto y coma"], respuesta:1, explicacion:"La indentación." },
  { tipo:"escribir", pregunta:"¿Qué palabra significa «si no, si...» en Python?", respuestas:["elif"], explicacion:"elif." },
  { tipo:"opcion", pregunta:"Con a = True y b = False, ¿cuánto vale  a and not b ?", opciones:["True","False"], respuesta:0, explicacion:"not b es True; True and True es True." },
  { tipo:"error", lang:"python", pregunta:"Toca la línea con el error.", codigo:"pago = int(input(\"Pago: \"))\nif pago = 0:\n    print(\"Sin pago\")", linea:2, explicacion:"Para comparar se usa ==." },
  { tipo:"opcion", pregunta:"Con nota = 3.0, ¿qué muestra?  if nota > 3.0: print(\"Aprobado\")  else: print(\"Reprobado\")", opciones:["Aprobado","Reprobado"], respuesta:1, explicacion:"3.0 no es MAYOR que 3.0. Para incluirlo se usa >=." },
  { tipo:"codigo", lang:"python", pregunta:"Crea la función estado_stock(cantidad) que devuelva \"agotado\" si es 0, \"pocas\" si es menor que 5, y \"disponible\" si no.", funcion:"estado_stock", inicial:"def estado_stock(cantidad):\n    \n", pruebas:[[[0],"agotado"],[[3],"pocas"],[[5],"disponible"],[[40],"disponible"]], explicacion:"if cantidad == 0 ... elif cantidad < 5 ... else ..." }
  ],
  proyecto:{ titulo:"La caja que decide", objetivo:"Agregarle decisiones a tu caja registradora: validar el pago, aplicar descuento a clientes frecuentes y pedir la clave del cajero.",
    antes:["if, elif y else con sangría (clases 1 y 2)","and, or y not (clase 3)","Comparar textos con .lower() (clase 4)"],
    etapas:[
      { nombre:"Completa el modelo", tipo:"guiada", lang:"python", descripcion:"Completa los huecos y prueba con los dos casos: pago suficiente y pago insuficiente.", plantilla:`total = int(input("Total: "))
pago = int(input("Pago: "))

if pago ___ total:
    print(f"Cambio: {pago - total}")
___:
    print(f"Faltan {total - pago}")`, pasos:["Completé el signo de comparación y el else.","Probé con pago mayor, menor e IGUAL al total (el borde).","Revisé qué pasa si el pago es exactamente igual: ¿debe decir Cambio: 0?"] },
      { nombre:"Agrega descuento y clave", tipo:"semi", pasos:["Antes de todo, el programa pide la clave del cajero y solo sigue si es correcta.","Pregunta si el cliente es frecuente (si/no, con .lower()) y aplica 10% si lo es y la compra pasa de 100.000.","Probé las cuatro combinaciones de frecuente / no frecuente y compra alta / baja."] },
      { nombre:"Crea", tipo:"libre", pasos:["Inventé una regla nueva para la tienda (por ejemplo, envío gratis por ciudad o por monto) y la programé.","Hice una tabla en la bitácora con mis casos de prueba y el resultado esperado de cada uno.","Escribí qué fue lo más difícil y cómo lo resolví."] }
    ],
    lab:{ modo:"python", codigo:`total = int(input("Total: "))
pago = int(input("Pago: "))

if pago ___ total:
    print(f"Cambio: {pago - total}")
___:
    print(f"Faltan {total - pago}")
`, entradas:"23800\n30000" },
    lang:"python",
    solucion:`clave = input("Clave del cajero: ")
if clave != "1234":
    print("Clave incorrecta")
else:
    total = int(input("Total: "))
    frecuente = input("¿Cliente frecuente? ").strip().lower()
    if frecuente == "si" and total > 100000:
        total = round(total * 0.9)
        print(f"Descuento aplicado. Nuevo total: {total}")
    pago = int(input("Pago: "))
    if pago >= total:
        print(f"Cambio: {pago - total}")
    else:
        print(f"Faltan {total - pago}")` }
},

/* =========================================================
   PY-103  REPETICIONES
   ========================================================= */
{
  id:"py-bucles", codigo:"PY-103", titulo:"Repeticiones: while y for", semestre:2, horas:7, color:"#8A4FB5", requiere:["py-decisiones"],
  resumen:"Haz que el programa repita tareas sin copiar código: contadores, acumuladores y menús.",
  paraQue:"Tu caja atiende un solo producto y se cierra. Una tienda real registra muchos productos por venta y atiende a muchos clientes. Aquí la caja aprende a repetir: sumar productos hasta que el cajero escriba «fin» y mostrar un menú hasta que decidas salir.",
  cierre:"Con bucles, acumuladores y contadores tu caja ya funciona como una caja real. Esto es la base de casi todo: recorrer listas de productos (PY-105), dibujar cada cuadro de un videojuego o revisar cada fila de una base de datos.",
  hilo:"La caja con varios productos y menú",
  pregunta:"¿Cómo hago que el programa repita algo sin escribir el mismo código veinte veces?",
  metas:["Escribir bucles while con una condición que termine","Usar for con range()","Usar contadores y acumuladores","Construir menús con while True y break"],
  clases:[
  { id:"py-buc-1", titulo:"while: repetir mientras se cumpla", min:25, bloques:[
    { t:"inicio", pregunta:"Si quisieras mostrar los números del 1 al 100, ¿escribirías 100 veces print()?", nota:"Funcionaría, pero es absurdo. Y si mañana fueran 10.000, peor. Un bucle repite un bloque las veces que haga falta con unas pocas líneas." },
    { t:"diagrama", svg:"while", pie:"while revisa la condición; si es verdadera ejecuta el bloque y VUELVE a revisar." },
    { t:"ejemplo", lang:"python", titulo:"Contar del 1 al 3", partes:[
      { meta:"Preparar el contador", lineas:[["n = 1","Valor inicial."]] },
      { meta:"La condición", lineas:[["while n <= 3:","while significa «mientras». Mientras n <= 3 sea True, se repite el bloque. Lleva dos puntos, igual que el if."]] },
      { meta:"El bloque que se repite", lineas:[["    print(n)",""],["    n = n + 1","CLAVE: algo dentro del bucle debe cambiar la condición. Si no, nunca termina."]] },
      { meta:"Después del bucle", lineas:[["print(\"Listo\")","Sin sangría: se ejecuta cuando la condición ya es False."]] }
    ]},
    { t:"traza", lang:"python", codigo:`n = 1
while n <= 3:
    print(n)
    n = n + 1
print("Listo")`, vars:["n","n <= 3"], pasos:[
      { l:1, v:{n:"1"}, sal:"", nota:"" },
      { l:2, v:{n:"1","n <= 3":"True"}, sal:"", nota:"Primera vuelta." },
      { l:3, v:{n:"1","n <= 3":"True"}, sal:"1", nota:"" },
      { l:4, v:{n:"2","n <= 3":"True"}, sal:"1", nota:"" },
      { l:2, v:{n:"2","n <= 3":"True"}, sal:"1", nota:"Vuelve a preguntar." },
      { l:3, v:{n:"2","n <= 3":"True"}, sal:"1\n2", nota:"" },
      { l:4, v:{n:"3","n <= 3":"True"}, sal:"1\n2", nota:"" },
      { l:2, v:{n:"3","n <= 3":"True"}, sal:"1\n2", nota:"" },
      { l:3, v:{n:"3","n <= 3":"True"}, sal:"1\n2\n3", nota:"" },
      { l:4, v:{n:"4","n <= 3":"True"}, sal:"1\n2\n3", nota:"" },
      { l:2, v:{n:"4","n <= 3":"False"}, sal:"1\n2\n3", nota:"4 <= 3 es False: sale del bucle." },
      { l:5, v:{n:"4","n <= 3":"False"}, sal:"1\n2\n3\nListo", nota:"" }
    ]},
    { t:"predecir", lang:"python", codigo:`vidas = 3
while vidas > 0:
    print("Te quedan", vidas)
    vidas -= 1
print("Game over")`, pregunta:"¿Cuántas veces se muestra «Te quedan»?", opciones:["2","3","4"], respuesta:1, salida:"Te quedan 3\nTe quedan 2\nTe quedan 1\nGame over", explicacion:"Con vidas en 3, 2 y 1 la condición es True. En 0 ya es False." },
    { t:"error", lang:"python", codigo:`n = 1
while n <= 5:
    print(n)
print("Fin")`, linea:2, explicacion:"Nada dentro del bucle cambia n, así que n <= 5 es True para siempre: es un [[bucle infinito]] y el programa se congela. Aquí el laboratorio lo detiene a los pocos segundos; en tu computador tendrías que cerrarlo a la fuerza (Ctrl + C).", arreglo:"Agregar  n = n + 1  dentro del bucle." },
    { t:"autoexplica", pregunta:"¿Qué tres cosas necesita un while para funcionar bien?", ideas:["Un valor inicial antes del bucle","Una condición","Algo dentro que la cambie para que en algún momento sea False"] }
  ]},
  { id:"py-buc-2", titulo:"Contadores y acumuladores", min:25, bloques:[
    { t:"texto", html:`<p>Dos patrones que vas a usar en casi todos tus programas:</p>
<ul><li><b>Contador:</b> cuenta cuántas veces pasa algo. Empieza en 0 y suma 1: <code>cantidad += 1</code>.</li>
<li><b>Acumulador:</b> va sumando valores. Empieza en 0 y suma el valor: <code>total += precio</code>.</li></ul>` },
    { t:"ejemplo", lang:"python", titulo:"Sumar productos hasta escribir fin", partes:[
      { meta:"1. Iniciar contador y acumulador ANTES del bucle", lineas:[["total = 0","El acumulador empieza en 0."],["productos = 0","El contador también."]] },
      { meta:"2. Pedir el primer dato", lineas:[["dato = input(\"Precio (o fin): \")",""]] },
      { meta:"3. Repetir mientras no sea la señal de parar", lineas:[["while dato != \"fin\":","\"fin\" es un valor centinela: una señal que indica que ya no hay más datos."],["    total += float(dato)","Actualiza el acumulador."],["    productos += 1","Actualiza el contador."],["    dato = input(\"Precio (o fin): \")","Pide el siguiente dato. Sin esto, sería un bucle infinito."]] },
      { meta:"4. Usar los resultados DESPUÉS del bucle", lineas:[["print(f\"{productos} productos, total {total}\")",""]] }
    ]},
    { t:"predecir", lang:"python", entradas:["2000","3500","fin"], codigo:`total = 0
productos = 0
dato = input("Precio (o fin): ")
while dato != "fin":
    total += float(dato)
    productos += 1
    dato = input("Precio (o fin): ")
print(f"{productos} productos, total {total}")`, pregunta:"El cajero escribe 2000, 3500 y fin. ¿Qué se muestra al final?", opciones:["2 productos, total 5500.0","3 productos, total 5500.0","2 productos, total 5500"], respuesta:0, salida:"2 productos, total 5500.0", explicacion:"«fin» no se suma ni se cuenta: el bucle termina antes. El total es float por el float()." },
    { t:"error", lang:"python", codigo:`productos = 0
dato = input("Precio (o fin): ")
while dato != "fin":
    total = 0
    total += float(dato)
    productos += 1
    dato = input("Precio (o fin): ")
print(total)`, linea:4, explicacion:"El acumulador se reinicia en 0 en CADA vuelta, así que al final solo queda el último precio. Hay que iniciarlo una sola vez, ANTES del bucle.", arreglo:"Mover  total = 0  antes del while." },
    { t:"chequeo", e:{ tipo:"codigo", lang:"python", pregunta:"Crea la función contar_pares(n) que devuelva cuántos números pares hay del 1 al n. Usa un while y un contador.", funcion:"contar_pares", inicial:"def contar_pares(n):\n    contador = 0\n    i = 1\n    # tu bucle aquí\n    return contador\n", pruebas:[[[10],5],[[1],0],[[7],3]], explicacion:"while i <= n: if i % 2 == 0: contador += 1; i += 1" } },
    { t:"autoexplica", pregunta:"¿Por qué el acumulador se inicia ANTES del bucle y no adentro?", ideas:["Si va adentro se reinicia en cada vuelta","Se pierde lo acumulado","Se inicia una sola vez"] }
  ]},
  { id:"py-buc-3", titulo:"for y range: repetir un número conocido de veces", min:25, bloques:[
    { t:"ejemplo", lang:"python", titulo:"Tabla de multiplicar", partes:[
      { meta:"El número", lineas:[["n = 7",""]] },
      { meta:"El bucle for", lineas:[["for i in range(1, 11):","Se lee: «para cada i en el rango de 1 a 10». range(1, 11) genera 1, 2, ... 10: el último (11) NO se incluye. En cada vuelta, i toma el siguiente valor solo; no hay que sumarle 1."]] },
      { meta:"El bloque", lineas:[["    print(f\"{n} x {i} = {n * i}\")",""]] }
    ]},
    { t:"texto", html:`<h3>Las tres formas de range()</h3><ul><li><code>range(5)</code> → 0, 1, 2, 3, 4 (empieza en 0, cinco números).</li><li><code>range(1, 6)</code> → 1, 2, 3, 4, 5.</li><li><code>range(0, 10, 2)</code> → 0, 2, 4, 6, 8 (de 2 en 2).</li></ul><p>Regla de oro: el número final <b>nunca</b> se incluye.</p>` },
    { t:"predecir", lang:"python", codigo:`for i in range(3):
    print(i)`, pregunta:"¿Qué números se muestran?", opciones:["1, 2, 3","0, 1, 2","0, 1, 2, 3"], respuesta:1, salida:"0\n1\n2", explicacion:"range(3) empieza en 0 y no incluye el 3. Contar desde 0 es muy común en programación." },
    { t:"critica", pregunta:"¿Cuándo usarías while y cuándo for? Piensa en «sumar productos hasta escribir fin» y en «mostrar la tabla del 1 al 10».", respuesta:"for cuando sabes cuántas veces se repite (del 1 al 10, cada producto de una lista). while cuando no sabes cuántas veces será y dependes de una condición (hasta que el cajero escriba fin, mientras queden vidas). Todo for se puede escribir con while, pero for evita olvidar el i += 1." },
    { t:"chequeo", e:{ tipo:"codigo", lang:"python", pregunta:"Crea la función suma_hasta(n) que devuelva la suma 1 + 2 + ... + n usando for y range.", funcion:"suma_hasta", inicial:"def suma_hasta(n):\n    total = 0\n    # usa for i in range(...)\n    return total\n", pruebas:[[[4],10],[[1],1],[[10],55],[[0],0]], explicacion:"for i in range(1, n + 1): total += i  (n + 1 porque el final no se incluye)", pistas:["range(1, n) se queda corto: el final no se incluye.","Usa range(1, n + 1)."] } },
    { t:"autoexplica", pregunta:"Explica por qué para ir del 1 al 10 se escribe range(1, 11) y no range(1, 10).", ideas:["El número final no se incluye","range(1, 10) llega solo hasta 9"] }
  ]},
  { id:"py-buc-4", titulo:"Menús con while True y break", min:20, bloques:[
    { t:"texto", html:`<p>Muchos programas muestran un menú, hacen lo que eliges y vuelven a mostrar el menú, hasta que eliges salir. Para eso se usa un bucle que no se detiene solo (<code>while True</code>) y se rompe a propósito con <code>break</code>.</p>` },
    { t:"ejemplo", lang:"python", titulo:"El menú de la tienda", partes:[
      { meta:"Repetir para siempre...", lineas:[["while True:","True siempre es verdadero: el bucle no termina por la condición."]] },
      { meta:"Mostrar opciones y leer", lineas:[["    print(\"1) Vender  2) Ver total  3) Salir\")",""],["    opcion = input(\"Opción: \")",""]] },
      { meta:"Atender cada opción", lineas:[["    if opcion == \"1\":",""],["        print(\"Registrando venta...\")","Doble sangría: está dentro del if, que está dentro del while."],["    elif opcion == \"3\":",""],["        break","break rompe el bucle de inmediato y salta a lo que sigue después."]] },
      { meta:"Después de salir", lineas:[["print(\"Caja cerrada\")",""]] }
    ]},
    { t:"predecir", lang:"python", entradas:["1","1","3"], codigo:`ventas = 0
while True:
    opcion = input("Opción: ")
    if opcion == "1":
        ventas += 1
    elif opcion == "3":
        break
print("Ventas:", ventas)`, pregunta:"El usuario escribe 1, 1 y 3. ¿Qué se muestra?", opciones:["Ventas: 2","Ventas: 3","Nada, nunca termina"], respuesta:0, salida:"Ventas: 2", explicacion:"Dos veces suma una venta y con 3 hace break." },
    { t:"chequeo", e:{ tipo:"opcion", pregunta:"¿Qué pasaría si en el menú olvidaras el break de la opción salir?", opciones:["El programa termina igual","El menú se repite para siempre","Python da un error"], respuesta:1, explicacion:"while True solo termina con break." } },
    { t:"autoexplica", pregunta:"Describe un programa o app que uses que funcione como un menú que se repite.", ideas:["Muestra opciones","Hace la acción elegida","Vuelve al menú hasta que sales"] }
  ]}
  ],
  ejercicios:[
  { tipo:"escribir", pregunta:"¿Cuántas veces se repite  for i in range(2, 6): ?", respuestas:["4"], explicacion:"2, 3, 4 y 5." },
  { tipo:"opcion", pregunta:"¿Qué palabra rompe un bucle de inmediato?", opciones:["stop","break","exit"], respuesta:1, explicacion:"break." },
  { tipo:"error", lang:"python", pregunta:"Este programa debe mostrar 5, 4, 3, 2, 1. Toca la línea con el error.", codigo:"n = 5\nwhile n > 0:\n    print(n)\n    n += 1", linea:4, explicacion:"n aumenta en vez de disminuir: bucle infinito. Debe ser n -= 1." },
  { tipo:"completar", lang:"python", pregunta:"Completa para mostrar 0, 2, 4, 6, 8.", plantilla:"for i in range(0, 10, ___):\n    print(i)", respuestas:[["2"]], explicacion:"El tercer número es el paso." },
  { tipo:"ordenar", pregunta:"Ordena el programa que suma los números del 1 al 5.", lineas:["total = 0","for i in range(1, 6):","    total += i","print(total)"], explicacion:"Acumulador antes, bucle, actualizar dentro, usar después." },
  { tipo:"codigo", lang:"python", pregunta:"Crea un programa que pida precios hasta que se escriba \"fin\" y muestre «Total: X» con el total como entero. (Se prueba con 1000, 2500, fin.)", casos:[{ entradas:["1000","2500","fin"], salida:"Total: 3500" },{ entradas:["fin"], salida:"Total: 0" }], inicial:"total = 0\n", explicacion:"while con centinela, total += int(dato), y print(f\"Total: {total}\")." }
  ],
  prueba:[
  { tipo:"opcion", pregunta:"¿Qué genera range(4)?", opciones:["1, 2, 3, 4","0, 1, 2, 3","0, 1, 2, 3, 4"], respuesta:1, explicacion:"Empieza en 0 y no incluye el 4." },
  { tipo:"opcion", pregunta:"Un acumulador se inicia...", opciones:["Dentro del bucle","Antes del bucle","Después del bucle"], respuesta:1, explicacion:"Una sola vez, antes." },
  { tipo:"escribir", pregunta:"¿Cómo se llama el valor especial que indica que ya no hay más datos (por ejemplo, \"fin\")?", respuestas:["centinela","valor centinela"], explicacion:"Valor centinela." },
  { tipo:"error", lang:"python", pregunta:"Toca la línea que causa un bucle infinito.", codigo:"intentos = 0\nwhile intentos < 3:\n    clave = input(\"Clave: \")\n    intentos == intentos + 1\n    if clave == \"1234\":\n        break\nprint(\"Fin\")", linea:4, explicacion:"== compara, no guarda. intentos nunca aumenta y, si la clave es incorrecta, el bucle no termina. Debe ser intentos += 1." },
  { tipo:"ordenar", pregunta:"Ordena el menú.", lineas:["while True:","    opcion = input(\"Opción: \")","    if opcion == \"salir\":","        break","print(\"Adiós\")"], explicacion:"Bucle, leer, revisar, romper, seguir." },
  { tipo:"codigo", lang:"python", pregunta:"Crea la función factorial(n) que devuelva 1 x 2 x ... x n (factorial(0) es 1). Usa for.", funcion:"factorial", inicial:"def factorial(n):\n    resultado = 1\n    \n    return resultado\n", pruebas:[[[5],120],[[0],1],[[1],1],[[6],720]], explicacion:"for i in range(1, n + 1): resultado *= i" }
  ],
  proyecto:{ titulo:"La caja con varios productos y menú", objetivo:"Convertir la caja en un programa que atiende muchas ventas: un menú que se repite, registro de varios productos por venta y el total del día.",
    antes:["while con centinela (clase 2)","Acumuladores y contadores (clase 2)","while True y break (clase 4)"],
    etapas:[
      { nombre:"Completa el modelo", tipo:"guiada", lang:"python", descripcion:"Completa los huecos y prueba una venta con tres productos.", plantilla:`total_venta = ___
dato = input("Precio (o fin): ")
while dato != ___:
    total_venta += int(dato)
    dato = input("Precio (o fin): ")
print(f"Total de la venta: {total_venta}")`, pasos:["Completé los dos huecos.","Probé con tres precios y con fin de una vez (venta vacía).","Hice la traza a mano con 2000, 3000 y fin."] },
      { nombre:"Agrega el menú del día", tipo:"semi", pasos:["Envolví la venta en un menú con while True: 1) Nueva venta 2) Total del día 3) Cerrar caja.","Llevé un acumulador del total del día y un contador de ventas.","Al cerrar caja, muestro cuántas ventas hubo y el promedio por venta (cuidado si hubo 0 ventas)."] },
      { nombre:"Crea", tipo:"libre", pasos:["Agregué algo propio: un número máximo de intentos para la clave del cajero, o la venta más alta del día.","Probé el caso borde de cada cosa que agregué.","Escribí en la bitácora cuándo usé while y cuándo for, y por qué."] }
    ],
    lab:{ modo:"python", codigo:`total_venta = ___
dato = input("Precio (o fin): ")
while dato != ___:
    total_venta += int(dato)
    dato = input("Precio (o fin): ")
print(f"Total de la venta: {total_venta}")
`, entradas:"2000\n3000\nfin" },
    lang:"python",
    solucion:`total_dia = 0
ventas = 0
while True:
    print("1) Nueva venta  2) Total del día  3) Cerrar caja")
    opcion = input("Opción: ")
    if opcion == "1":
        total_venta = 0
        dato = input("Precio (o fin): ")
        while dato != "fin":
            total_venta += int(dato)
            dato = input("Precio (o fin): ")
        print(f"Total de la venta: {total_venta}")
        total_dia += total_venta
        ventas += 1
    elif opcion == "2":
        print(f"Llevamos {total_dia} en {ventas} ventas")
    elif opcion == "3":
        if ventas > 0:
            print(f"Promedio por venta: {total_dia // ventas}")
        print("Caja cerrada")
        break` }
}
);
