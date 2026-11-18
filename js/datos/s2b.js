/* =========================================================
   SEMESTRE 2: Python desde cero (parte B)
   PY-104 Funciones · PY-105 Listas y diccionarios · PY-106 Errores y archivos
   ========================================================= */
window.CURSOS = window.CURSOS || [];

window.CURSOS.push(
/* =========================================================
   PY-104  FUNCIONES
   ========================================================= */
{
  id:"py-funciones", codigo:"PY-104", titulo:"Funciones: ordenar el código en piezas", semestre:2, horas:6, color:"#C05A3C", requiere:["py-bucles"],
  resumen:"Crea tus propias instrucciones con def, pásales datos y recibe resultados con return.",
  paraQue:"Tu caja ya hace muchas cosas, pero todo está en un solo bloque largo y difícil de leer. Si quieres cambiar cómo se calcula el IVA, tienes que buscarlo entre decenas de líneas. Con funciones, cada tarea (calcular IVA, dar cambio, mostrar menú) queda en su propia pieza con nombre.",
  cierre:"Lo que hiciste es descomposición (PRG-101) convertida en código. Desde aquí, todo programa grande que veas (una web, un juego, una API) está hecho de funciones que se llaman entre sí. En PY-105 esas funciones van a trabajar sobre el inventario completo.",
  hilo:"La tienda organizada en funciones",
  pregunta:"¿Cómo escribo una tarea una sola vez y la uso muchas veces, sin copiar y pegar?",
  metas:["Definir funciones con def","Pasar datos con parámetros","Diferenciar return de print","Entender el ámbito de las variables"],
  clases:[
  { id:"py-fun-1", titulo:"def: crear tu propia instrucción", min:20, bloques:[
    { t:"inicio", pregunta:"Ya usaste print(), input(), int() y round(). ¿Quién crees que las escribió? ¿Podrías crear las tuyas?", nota:"Las escribieron otros programadores y vienen con Python. Una [[función]] es un bloque de código con nombre que haces una vez y usas cuantas veces quieras. Sí: puedes crear las tuyas, y es una de las habilidades más importantes que vas a aprender." },
    { t:"ejemplo", lang:"python", titulo:"Definir y usar una función", partes:[
      { meta:"1. Definir (enseñarle a Python)", lineas:[["def saludar():","def significa «definir». Luego el nombre de la función, paréntesis y dos puntos."],["    print(\"Bienvenido a la tienda\")","El bloque con sangría es lo que hace la función."],["    print(\"¿En qué le ayudo?\")",""]] },
      { meta:"2. Llamar (usarla)", lineas:[["saludar()","Escribir el nombre con paréntesis EJECUTA la función. Sin paréntesis no pasa nada."],["saludar()","Se puede llamar las veces que quieras."]] }
    ]},
    { t:"predecir", lang:"python", codigo:`def saludar():
    print("Hola")

print("Inicio")
saludar()
saludar()
print("Fin")`, pregunta:"¿En qué orden aparecen los mensajes?", opciones:["Hola, Inicio, Hola, Fin","Inicio, Hola, Hola, Fin","Inicio, Fin"], respuesta:1, salida:"Inicio\nHola\nHola\nFin", explicacion:"Definir la función no la ejecuta: solo la guarda. Se ejecuta cuando se llama con saludar()." },
    { t:"error", lang:"python", codigo:`saludar()

def saludar():
    print("Hola")`, linea:1, explicacion:"Se llama a la función antes de definirla. Python lee de arriba a abajo y todavía no la conoce: NameError: name 'saludar' is not defined.", arreglo:"Mover la definición (def) antes de la llamada." },
    { t:"critica", pregunta:"¿Qué ventajas tiene meter un bloque de código en una función, aunque solo se use una vez?", respuesta:"Le pone NOMBRE a la tarea, así el programa principal se lee como una lista de pasos (saludar, cobrar, dar_cambio). Además se puede probar sola y cambiar en un solo lugar. Es la descomposición de PRG-101 hecha código." },
    { t:"autoexplica", pregunta:"¿Qué diferencia hay entre DEFINIR una función y LLAMARLA?", ideas:["Definir (def) la guarda, no la ejecuta","Llamar (nombre()) la ejecuta","Hay que definir antes de llamar"] }
  ]},
  { id:"py-fun-2", titulo:"Parámetros: pasarle datos", min:25, bloques:[
    { t:"ejemplo", lang:"python", titulo:"Una función que recibe datos", partes:[
      { meta:"Definir con parámetros", lineas:[["def mostrar_total(producto, total):","producto y total son [[parámetro]]s: variables que recibirán los datos al llamar la función."],["    print(f\"{producto}: {total} pesos\")",""]] },
      { meta:"Llamar con argumentos", lineas:[["mostrar_total(\"Cargador\", 25000)","\"Cargador\" y 25000 son [[argumento]]s: los valores reales. Se asignan en orden: el primero a producto, el segundo a total."],["mostrar_total(\"Forro\", 15000)","Otra llamada, otros datos."]] }
    ]},
    { t:"traza", lang:"python", codigo:`def area(base, altura):
    resultado = base * altura
    print(resultado)

area(4, 5)
area(2, 3)`, vars:["base","altura","resultado"], pasos:[
      { l:1, v:{}, sal:"", nota:"Se define la función. No se ejecuta todavía." },
      { l:5, v:{}, sal:"", nota:"Primera llamada con 4 y 5." },
      { l:2, v:{base:"4",altura:"5",resultado:"20"}, sal:"", nota:"Dentro: base recibe 4 y altura recibe 5." },
      { l:3, v:{base:"4",altura:"5",resultado:"20"}, sal:"20", nota:"" },
      { l:6, v:{}, sal:"20", nota:"Al terminar, las variables de adentro desaparecen. Segunda llamada." },
      { l:2, v:{base:"2",altura:"3",resultado:"6"}, sal:"20", nota:"Ahora base es 2 y altura 3." },
      { l:3, v:{base:"2",altura:"3",resultado:"6"}, sal:"20\n6", nota:"" }
    ]},
    { t:"predecir", lang:"python", codigo:`def resta(a, b):
    print(a - b)

resta(10, 3)
resta(3, 10)`, pregunta:"¿Qué se muestra?", opciones:["7 y 7","7 y -7","-7 y 7"], respuesta:1, salida:"7\n-7", explicacion:"El orden de los argumentos importa: en la segunda llamada a es 3 y b es 10." },
    { t:"error", lang:"python", codigo:`def mostrar_total(producto, total):
    print(f"{producto}: {total}")

mostrar_total("Cargador")`, linea:4, explicacion:"La función espera 2 argumentos y recibe 1. TypeError: missing 1 required positional argument: 'total'.", arreglo:"mostrar_total(\"Cargador\", 25000)" },
    { t:"autoexplica", pregunta:"Explica la diferencia entre parámetro y argumento con el ejemplo de mostrar_total.", ideas:["Parámetro: el nombre en la definición (producto, total)","Argumento: el valor al llamar (\"Cargador\", 25000)","Se asignan en orden"] }
  ]},
  { id:"py-fun-3", titulo:"return no es print", min:25, bloques:[
    { t:"inicio", pregunta:"¿Qué crees que es más útil: una función que MUESTRA el IVA en pantalla, o una que te lo ENTREGA para que tú hagas lo que quieras con él?", nota:"La segunda. Si solo lo muestra, no puedes sumarlo al total ni guardarlo. Esa es la diferencia entre print y return, y confundirlas es de los errores más comunes al aprender funciones." },
    { t:"ejemplo", lang:"python", titulo:"Una función que devuelve un valor", partes:[
      { meta:"Calcular y devolver", lineas:[["def calcular_iva(subtotal):",""],["    return subtotal * 0.19","return ENTREGA el resultado a quien llamó la función y la termina. No muestra nada en pantalla."]] },
      { meta:"Usar lo devuelto", lineas:[["iva = calcular_iva(20000)","La llamada se «reemplaza» por el valor devuelto: es como escribir iva = 3800.0"],["total = 20000 + iva","Ahora puedes usarlo en cuentas."],["print(total)","Muestra 23800.0"]] }
    ]},
    { t:"predecir", lang:"python", codigo:`def doble_print(n):
    print(n * 2)

def doble_return(n):
    return n * 2

a = doble_print(5)
b = doble_return(5)
print(a, b)`, pregunta:"¿Qué muestra la última línea?", opciones:["10 10","None 10","10 None"], respuesta:1, salida:"10\nNone 10", explicacion:"doble_print MUESTRA 10 (por eso aparece un 10 antes) pero no devuelve nada, así que a queda en None (vacío). doble_return no muestra nada, pero devuelve 10 y b lo guarda." },
    { t:"simbolos", claves:["return"] },
    { t:"error", lang:"python", codigo:`def precio_con_iva(precio):
    print(precio * 1.19)

total = precio_con_iva(10000) + 2000
print(total)`, linea:2, explicacion:"La función muestra el resultado pero no lo devuelve, así que precio_con_iva(10000) vale None y None + 2000 da TypeError. Debe usar return.", arreglo:"    return precio * 1.19" },
    { t:"chequeo", e:{ tipo:"codigo", lang:"python", pregunta:"Crea la función cambio(total, pago) que DEVUELVA el cambio, o -1 si el pago no alcanza.", funcion:"cambio", inicial:"def cambio(total, pago):\n    \n", pruebas:[[[23800,30000],6200],[[10000,10000],0],[[5000,2000],-1]], explicacion:"if pago < total: return -1 y si no, return pago - total." } },
    { t:"autoexplica", pregunta:"¿Cuándo usarías return y cuándo print dentro de una función?", ideas:["return para entregar un valor que se va a usar después","print solo para mostrar en pantalla","Una función con solo print devuelve None"] }
  ]},
  { id:"py-fun-4", titulo:"Ámbito y buenas funciones", min:20, bloques:[
    { t:"texto", html:`<p>Las variables creadas dentro de una función son <b>locales</b>: solo existen mientras la función se ejecuta. Esto es el [[ámbito]]. Evita que una parte del programa dañe a otra sin querer.</p>` },
    { t:"predecir", lang:"python", codigo:`def calcular():
    resultado = 42
    return resultado

calcular()
print(resultado)`, pregunta:"¿Qué pasa en la última línea?", opciones:["Muestra 42","NameError: resultado no existe","Muestra None"], respuesta:1, salida:"NameError: name 'resultado' is not defined", explicacion:"resultado es local: murió al terminar la función. Además, el valor devuelto no se guardó. Lo correcto: r = calcular() y print(r)." },
    { t:"texto", html:`<h3>Cómo se ve una buena función</h3><ul><li><b>Hace una sola cosa</b> y su nombre lo dice con un verbo: <code>calcular_iva</code>, <code>dar_cambio</code>, <code>mostrar_menu</code>.</li><li><b>Recibe lo que necesita</b> por parámetros y <b>entrega</b> el resultado con return.</li><li><b>Es corta:</b> si pasa de 20 líneas, probablemente se puede partir.</li><li>Puede llevar un comentario de documentación (docstring) entre triple comillas que diga qué hace.</li></ul>` },
    { t:"comparar", izquierda:{ titulo:"Antes: todo junto", lang:"python", codigo:`subtotal = 20000
iva = subtotal * 0.19
total = subtotal + iva
pago = 30000
print(pago - total)` }, derecha:{ titulo:"Después: en funciones", lang:"python", codigo:`def calcular_total(subtotal):
    """Suma el IVA del 19%."""
    return subtotal * 1.19

def dar_cambio(total, pago):
    return pago - total

total = calcular_total(20000)
print(dar_cambio(total, 30000))` }, nota:"Las dos hacen lo mismo. La de la derecha se lee como una lista de pasos y cada pieza se puede probar sola." },
    { t:"critica", pregunta:"Un compañero dice: «Mejor pongo todas las variables por fuera de las funciones (globales), así cualquier función las puede usar y es más fácil». ¿Qué problema le ves?", respuesta:"Es más fácil al principio, pero cuando el programa crece no sabes qué función cambió qué variable, y los errores se vuelven difíciles de encontrar. Con parámetros y return, cada función dice claramente qué recibe y qué entrega. Es más ordenado y se puede probar cada pieza por separado." },
    { t:"autoexplica", pregunta:"Descompón tu caja registradora en 4 funciones. Escribe solo el nombre de cada una y qué recibe y qué devuelve.", ideas:["Nombres con verbos","Cada una hace una sola cosa","Dice qué recibe y qué devuelve"] }
  ]}
  ],
  ejercicios:[
  { tipo:"opcion", pregunta:"¿Qué palabra se usa para crear una función en Python?", opciones:["function","def","func"], respuesta:1, explicacion:"def." },
  { tipo:"opcion", pregunta:"¿Qué devuelve una función que no tiene return?", opciones:["0","None","Un error"], respuesta:1, explicacion:"None: la ausencia de valor." },
  { tipo:"completar", lang:"python", pregunta:"Completa para que la función entregue el resultado.", plantilla:"def doble(n):\n    ___ n * 2", respuestas:[["return"]], explicacion:"return entrega el valor." },
  { tipo:"error", lang:"python", pregunta:"Toca la línea con el error.", codigo:"def promedio(a, b):\n    return (a + b) / 2\n\nr = promedio(4)\nprint(r)", linea:4, explicacion:"Faltan argumentos: la función pide 2." },
  { tipo:"ordenar", pregunta:"Ordena el programa.", lineas:["def saludo(nombre):","    return f\"Hola {nombre}\"","mensaje = saludo(\"Ana\")","print(mensaje)"], explicacion:"Definir, luego llamar y usar el resultado." },
  { tipo:"codigo", lang:"python", pregunta:"Crea la función es_mayor(edad) que devuelva True si la edad es 18 o más.", funcion:"es_mayor", inicial:"def es_mayor(edad):\n    \n", pruebas:[[[18],true],[[17],false],[[40],true]], explicacion:"return edad >= 18  (la comparación ya da True o False)." },
  { tipo:"codigo", lang:"python", pregunta:"Crea la función billetes_de_20(cambio) que devuelva cuántos billetes de 20.000 caben en el cambio.", funcion:"billetes_de_20", inicial:"def billetes_de_20(cambio):\n    \n", pruebas:[[[68000],3],[[19000],0],[[40000],2]], explicacion:"return cambio // 20000" }
  ],
  prueba:[
  { tipo:"opcion", pregunta:"¿Qué hace return?", opciones:["Muestra un valor en pantalla","Entrega un valor a quien llamó la función y la termina","Repite la función"], respuesta:1, explicacion:"Entrega y termina." },
  { tipo:"opcion", pregunta:"En  def area(b, h):  ¿qué son b y h?", opciones:["Argumentos","Parámetros","Constantes"], respuesta:1, explicacion:"En la definición son parámetros." },
  { tipo:"escribir", pregunta:"¿Qué se muestra?  def f(): return 5   print(f() + f())", respuestas:["10"], explicacion:"Cada llamada vale 5." },
  { tipo:"error", lang:"python", pregunta:"Toca la línea con el error.", codigo:"def iva(x):\n    print(x * 0.19)\n\ntotal = 1000 + iva(1000)", linea:2, explicacion:"La función usa print en vez de return, así que iva(1000) es None y la suma falla." },
  { tipo:"vf", pregunta:"Una variable creada dentro de una función se puede usar fuera de ella.", respuesta:false, explicacion:"Es local." },
  { tipo:"codigo", lang:"python", pregunta:"Crea la función total_con_descuento(total, porcentaje) que devuelva el total menos ese porcentaje (porcentaje viene como número, ej: 10 para 10%).", funcion:"total_con_descuento", inicial:"def total_con_descuento(total, porcentaje):\n    \n", pruebas:[[[100000,10],90000],[[50000,0],50000],[[20000,25],15000]], explicacion:"return total * (1 - porcentaje / 100)" }
  ],
  proyecto:{ titulo:"La tienda organizada en funciones", objetivo:"Reescribir tu caja (PY-101 a PY-103) separando cada tarea en una función. El programa debe hacer lo mismo, pero leerse como una lista de pasos.",
    antes:["def y llamar funciones (clase 1)","Parámetros (clase 2)","return vs print (clase 3)"],
    etapas:[
      { nombre:"Completa el modelo", tipo:"guiada", lang:"python", descripcion:"Completa las funciones y prueba que el resultado sea el mismo que tu caja anterior.", plantilla:`def calcular_total(subtotal):
    return subtotal * ___

def dar_cambio(total, pago):
    if pago < total:
        return ___
    return pago - total

subtotal = int(input("Subtotal: "))
total = round(calcular_total(subtotal))
pago = int(input("Pago: "))
c = dar_cambio(total, pago)
if c == -1:
    print("El pago no alcanza")
else:
    print(f"Total {total}, cambio {c}")`, pasos:["Completé los dos huecos (1.19 y -1).","Probé con subtotal 20000 y pago 30000 (Total 23800, cambio 6200).","Probé con un pago que no alcanza."] },
      { nombre:"Separa todo tu programa", tipo:"semi", pasos:["Creé funciones para: pedir la clave, registrar una venta (con el while de PY-103) y mostrar el menú.","El programa principal ahora tiene menos de 15 líneas y solo llama funciones.","Cada función hace una sola cosa y su nombre empieza con un verbo."] },
      { nombre:"Crea", tipo:"libre", pasos:["Agregué una función nueva útil para la tienda (por ejemplo, calcular puntos de fidelidad).","La probé sola, llamándola con 3 valores distintos antes de usarla en el programa.","En la bitácora expliqué qué mejoró al separar en funciones."] }
    ],
    lab:{ modo:"python", codigo:`def calcular_total(subtotal):
    return subtotal * ___

def dar_cambio(total, pago):
    if pago < total:
        return ___
    return pago - total

subtotal = int(input("Subtotal: "))
total = round(calcular_total(subtotal))
pago = int(input("Pago: "))
c = dar_cambio(total, pago)
if c == -1:
    print("El pago no alcanza")
else:
    print(f"Total {total}, cambio {c}")
`, entradas:"20000\n30000" },
    lang:"python",
    solucion:`def pedir_clave():
    for intento in range(3):
        if input("Clave: ") == "1234":
            return True
        print("Clave incorrecta")
    return False

def calcular_total(subtotal):
    return round(subtotal * 1.19)

def registrar_venta():
    subtotal = 0
    dato = input("Precio (o fin): ")
    while dato != "fin":
        subtotal += int(dato)
        dato = input("Precio (o fin): ")
    return calcular_total(subtotal)

def mostrar_menu():
    print("1) Nueva venta  2) Total del día  3) Cerrar")
    return input("Opción: ")

if pedir_clave():
    total_dia = 0
    while True:
        opcion = mostrar_menu()
        if opcion == "1":
            total = registrar_venta()
            print(f"Total con IVA: {total}")
            total_dia += total
        elif opcion == "2":
            print(f"Total del día: {total_dia}")
        elif opcion == "3":
            break` }
},

/* =========================================================
   PY-105  LISTAS Y DICCIONARIOS
   ========================================================= */
{
  id:"py-colecciones", codigo:"PY-105", titulo:"Listas y diccionarios", semestre:2, horas:7, color:"#2E8C8C", requiere:["py-funciones"],
  resumen:"Guarda muchos datos juntos: listas para colecciones ordenadas y diccionarios para datos con nombre.",
  paraQue:"Una tienda no tiene un producto: tiene cientos, cada uno con nombre, precio y stock. Con variables sueltas sería imposible (producto1, producto2, producto3...). Aquí construyes el inventario de la tienda: una lista de productos donde cada producto es un diccionario.",
  cierre:"Una lista de diccionarios es la forma más común de representar datos en el mundo real. Cuando llegues a la web (JSON), a las bases de datos (cada fila de una tabla) y a las APIs, vas a reconocer esta misma estructura. Ya la dominas.",
  hilo:"El inventario de la tienda",
  pregunta:"¿Cómo guardo y manejo cientos de productos sin crear cientos de variables?",
  metas:["Crear y modificar listas","Recorrer listas con for","Usar diccionarios clave: valor","Manejar una lista de diccionarios (inventario)"],
  clases:[
  { id:"py-col-1", titulo:"Listas: muchos valores en una variable", min:25, bloques:[
    { t:"ejemplo", lang:"python", titulo:"Crear y usar una lista", partes:[
      { meta:"Crear", lineas:[["precios = [2000, 3500, 1200]","Los corchetes [ ] crean una lista. Las comas separan los elementos."]] },
      { meta:"Leer por posición", lineas:[["print(precios[0])","Cada elemento tiene una posición ([[índice]]) que EMPIEZA EN 0. precios[0] es 2000."],["print(precios[-1])","Los índices negativos cuentan desde el final: -1 es el último, 1200."]] },
      { meta:"Cambiar y agregar", lineas:[["precios[1] = 4000","Reemplaza el elemento en la posición 1."],["precios.append(5000)","append agrega al final. El punto se lee «de»: append de precios."]] },
      { meta:"Saber cuántos hay", lineas:[["print(len(precios))","len da la cantidad de elementos: 4."]] }
    ]},
    { t:"simbolos", claves:["[","]","."] },
    { t:"diagrama", svg:"lista", pie:"Una lista: cada caja tiene un índice que empieza en 0." },
    { t:"predecir", lang:"python", codigo:`frutas = ["mango", "guayaba", "lulo"]
frutas.append("piña")
frutas[0] = "maracuyá"
print(frutas)
print(len(frutas))`, pregunta:"¿Qué muestra la primera print?", opciones:["['mango', 'guayaba', 'lulo', 'piña']","['maracuyá', 'guayaba', 'lulo', 'piña']","['maracuyá', 'mango', 'guayaba', 'lulo', 'piña']"], respuesta:1, salida:"['maracuyá', 'guayaba', 'lulo', 'piña']\n4", explicacion:"append agrega al final y frutas[0] = ... REEMPLAZA el primero, no lo empuja." },
    { t:"error", lang:"python", codigo:`notas = [3.5, 4.0, 4.8]
print(notas[3])`, linea:2, explicacion:"La lista tiene 3 elementos con índices 0, 1 y 2. El índice 3 no existe: IndexError: list index out of range. Es el error de «empezar a contar en 1».", arreglo:"print(notas[2])  o  print(notas[-1])" },
    { t:"autoexplica", pregunta:"Si una lista tiene 5 elementos, ¿cuál es el índice del último y por qué?", ideas:["El índice empieza en 0","El último es 4 (largo menos 1)","También se puede usar -1"] }
  ]},
  { id:"py-col-2", titulo:"Recorrer listas con for", min:25, bloques:[
    { t:"conecta", html:`<p>En PY-103 usaste <code>for i in range(...)</code>. Con listas es todavía más fácil: el for te va dando cada elemento, uno por uno.</p>` },
    { t:"ejemplo", lang:"python", titulo:"Sumar los precios de una venta", partes:[
      { meta:"Los datos", lineas:[["precios = [2000, 3500, 1200]",""]] },
      { meta:"Acumulador antes del bucle", lineas:[["total = 0",""]] },
      { meta:"Recorrer", lineas:[["for precio in precios:","Se lee: «para cada precio en precios». En cada vuelta, precio toma el siguiente valor de la lista: 2000, luego 3500, luego 1200."],["    total += precio",""]] },
      { meta:"Resultado", lineas:[["print(total)","6700"]] }
    ]},
    { t:"texto", html:`<p>Python ya trae funciones para lo más común: <code>sum(precios)</code> suma todo, <code>max(precios)</code> da el mayor, <code>min(precios)</code> el menor. Pero entender el bucle es importante: no siempre habrá una función lista para lo que necesitas.</p>` },
    { t:"predecir", lang:"python", codigo:`ventas = [12000, 45000, 8000, 30000]
grandes = 0
for v in ventas:
    if v > 10000:
        grandes += 1
print(grandes)`, pregunta:"¿Qué se muestra?", opciones:["2","3","4"], respuesta:1, salida:"3", explicacion:"12000, 45000 y 30000 pasan de 10000. Es un contador dentro de un for con un if." },
    { t:"chequeo", e:{ tipo:"codigo", lang:"python", pregunta:"Crea la función mayor(lista) que devuelva el número más grande SIN usar max(). Recorre la lista.", funcion:"mayor", inicial:"def mayor(lista):\n    el_mayor = lista[0]\n    # recorre y compara\n    return el_mayor\n", pruebas:[[[[3,9,2]],9],[[[5]],5],[[[-4,-1,-8]],-1]], explicacion:"for x in lista: if x > el_mayor: el_mayor = x", pistas:["Supón que el primero es el mayor.","Recorre la lista: si encuentras uno más grande, ese pasa a ser el mayor."] } },
    { t:"chequeo", e:{ tipo:"codigo", lang:"python", pregunta:"Crea la función buscar(lista, valor) que devuelva la posición de valor o -1 si no está. Usa range(len(lista)).", funcion:"buscar", inicial:"def buscar(lista, valor):\n    for i in range(len(lista)):\n        # compara lista[i] con valor\n        pass\n    return -1\n", pruebas:[[[["a","b","c"],"b"],1],[[["a","b"],"z"],-1],[[[],"a"],-1]], explicacion:"if lista[i] == valor: return i" } },
    { t:"autoexplica", pregunta:"Explica qué hace  for precio in precios:  como si se lo contaras a alguien que no programa.", ideas:["Recorre la lista de principio a fin","En cada vuelta precio es un elemento","El bloque se repite una vez por elemento"] }
  ]},
  { id:"py-col-3", titulo:"Diccionarios: datos con nombre", min:20, bloques:[
    { t:"inicio", pregunta:"Si un producto es  [\"Cargador\", 25000, 10] , ¿qué es el 10? ¿El precio de algo? ¿La cantidad?", nota:"No se sabe sin una explicación aparte. Con un diccionario cada dato lleva su nombre: \"stock\": 10. Así el código se explica solo." },
    { t:"ejemplo", lang:"python", titulo:"Un producto como diccionario", partes:[
      { meta:"Crear", lineas:[["producto = {\"nombre\": \"Cargador\", \"precio\": 25000, \"stock\": 10}","Las llaves { } crean un diccionario. Cada par es clave: valor, separados por comas."]] },
      { meta:"Leer por clave", lineas:[["print(producto[\"precio\"])","Se accede con la clave entre corchetes: 25000."]] },
      { meta:"Cambiar y agregar", lineas:[["producto[\"stock\"] = 9","Cambia un valor existente."],["producto[\"marca\"] = \"Samsung\"","Si la clave no existe, la agrega."]] },
      { meta:"Leer sin riesgo", lineas:[["print(producto.get(\"color\", \"sin color\"))",".get devuelve un valor por defecto si la clave no existe, en vez de dar error."]] }
    ]},
    { t:"simbolos", claves:["{","}",":"] },
    { t:"predecir", lang:"python", codigo:`p = {"nombre": "Forro", "precio": 15000}
p["precio"] = p["precio"] * 2
p["stock"] = 4
print(p)`, pregunta:"¿Qué se muestra?", opciones:["{'nombre': 'Forro', 'precio': 30000, 'stock': 4}","{'nombre': 'Forro', 'precio': 15000, 'stock': 4}","Error: stock no existe"], respuesta:0, salida:"{'nombre': 'Forro', 'precio': 30000, 'stock': 4}", explicacion:"El precio se duplica y stock se agrega porque no existía." },
    { t:"error", lang:"python", codigo:`p = {"nombre": "Forro", "precio": 15000}
print(p["Precio"])`, linea:2, explicacion:"Las claves distinguen mayúsculas: \"Precio\" no es \"precio\". KeyError: 'Precio'.", arreglo:"print(p[\"precio\"])" },
    { t:"critica", pregunta:"¿Cuándo conviene una lista y cuándo un diccionario?", respuesta:"Lista: muchos elementos del MISMO tipo en orden (todos los precios, todos los productos). Diccionario: varios datos DISTINTOS de una misma cosa, cada uno con nombre (nombre, precio y stock de un producto). Y en la vida real se combinan: una lista de diccionarios." },
    { t:"autoexplica", pregunta:"Describe un cliente de la tienda como diccionario. ¿Qué claves pondrías?", ideas:["Claves con nombres claros","Valores del tipo correcto","Usa llaves, dos puntos y comas"] }
  ]},
  { id:"py-col-4", titulo:"El inventario: lista de diccionarios", min:25, bloques:[
    { t:"ejemplo", lang:"python", titulo:"Recorrer el inventario", partes:[
      { meta:"Los datos: una lista donde cada elemento es un diccionario", lineas:[["inventario = [",""],["    {\"nombre\": \"Cargador\", \"precio\": 25000, \"stock\": 10},",""],["    {\"nombre\": \"Audífonos\", \"precio\": 60000, \"stock\": 2},",""],["    {\"nombre\": \"Forro\", \"precio\": 15000, \"stock\": 0}",""],["]",""]] },
      { meta:"Recorrer cada producto", lineas:[["for p in inventario:","En cada vuelta, p es un diccionario completo."],["    print(f\"{p['nombre']}: {p['stock']} unidades\")","Ojo: dentro de la f-string se usan comillas simples para la clave, porque las dobles ya abren el texto."]] }
    ]},
    { t:"predecir", lang:"python", codigo:`inventario = [
    {"nombre": "Cargador", "precio": 25000, "stock": 10},
    {"nombre": "Audífonos", "precio": 60000, "stock": 2},
    {"nombre": "Forro", "precio": 15000, "stock": 0}
]
valor = 0
for p in inventario:
    valor += p["precio"] * p["stock"]
print(valor)`, pregunta:"¿Cuánto vale todo el inventario?", opciones:["100000","370000","250000"], respuesta:1, salida:"370000", explicacion:"25.000 × 10 + 60.000 × 2 + 15.000 × 0 = 250.000 + 120.000 + 0 = 370.000." },
    { t:"chequeo", e:{ tipo:"codigo", lang:"python", pregunta:"Crea la función agotados(inventario) que devuelva una LISTA con los nombres de los productos con stock 0.", funcion:"agotados", inicial:"def agotados(inventario):\n    resultado = []\n    # recorre y usa append\n    return resultado\n", pruebas:[[[[{"nombre":"A","stock":0},{"nombre":"B","stock":3},{"nombre":"C","stock":0}]],["A","C"]],[[[]],[]]], explicacion:"for p in inventario: if p[\"stock\"] == 0: resultado.append(p[\"nombre\"])" } },
    { t:"chequeo", e:{ tipo:"codigo", lang:"python", pregunta:"Crea la función vender(inventario, nombre, cantidad) que reste la cantidad al stock del producto y devuelva True; si no hay suficiente stock o no existe, devuelve False.", funcion:"vender", devolverTambien:"inventario", inicial:"def vender(inventario, nombre, cantidad):\n    for p in inventario:\n        if p[\"nombre\"] == nombre:\n            # revisa el stock y resta\n            pass\n    return False\n", pruebas:[[[[{"nombre":"A","stock":5}],"A",2],true],[[[{"nombre":"A","stock":1}],"A",2],false],[[[{"nombre":"A","stock":1}],"Z",1],false]], explicacion:"if p[\"stock\"] >= cantidad: p[\"stock\"] -= cantidad; return True. Si no: return False." } },
    { t:"conecta", html:`<p>Esta estructura (una lista de objetos con nombre, precio y stock) es casi idéntica a un archivo <b>JSON</b> de la web y a una <b>tabla</b> de una base de datos. Cuando llegues a esas materias, vas a reconocerla de inmediato.</p>` },
    { t:"autoexplica", pregunta:"Explica con tus palabras qué es inventario[1][\"precio\"] y cómo lo lee Python.", ideas:["inventario[1] es el segundo producto (diccionario)","[\"precio\"] saca el precio de ese producto","Se lee de izquierda a derecha"] }
  ]}
  ],
  ejercicios:[
  { tipo:"escribir", pregunta:"Si  l = [10, 20, 30] , ¿qué muestra print(l[1])?", respuestas:["20"], explicacion:"El índice 1 es el segundo." },
  { tipo:"opcion", pregunta:"¿Qué método agrega un elemento al final de una lista?", opciones:["add","append","push"], respuesta:1, explicacion:"append. (push es de JavaScript, lo verás después.)" },
  { tipo:"escribir", pregunta:"Si  d = {\"a\": 1, \"b\": 2} , ¿qué muestra print(d[\"b\"])?", respuestas:["2"], explicacion:"Se accede por clave." },
  { tipo:"error", lang:"python", pregunta:"Toca la línea con el error.", codigo:"productos = [\"A\", \"B\", \"C\"]\nfor i in range(len(productos)):\n    print(productos[i])\nprint(productos[len(productos)])", linea:4, explicacion:"len es 3 y el último índice es 2. productos[3] da IndexError." },
  { tipo:"completar", lang:"python", pregunta:"Completa para mostrar el nombre de cada producto.", plantilla:"for p in inventario:\n    print(p[___])", respuestas:[["\"nombre\"","'nombre'"]], explicacion:"La clave va entre comillas." },
  { tipo:"codigo", lang:"python", pregunta:"Crea la función promedio(lista) que devuelva el promedio de los números (0 si la lista está vacía).", funcion:"promedio", inicial:"def promedio(lista):\n    \n", pruebas:[[[[3,4,5]],4],[[[]],0],[[[10]],10]], explicacion:"if len(lista) == 0: return 0; return sum(lista) / len(lista)" }
  ],
  prueba:[
  { tipo:"opcion", pregunta:"¿En qué número empiezan los índices de una lista?", opciones:["0","1","-1"], respuesta:0, explicacion:"En 0." },
  { tipo:"escribir", pregunta:"Si  l = [4, 8, 15, 16] , ¿qué muestra print(l[-1])?", respuestas:["16"], explicacion:"-1 es el último." },
  { tipo:"opcion", pregunta:"¿Qué estructura usarías para guardar nombre, precio y stock de UN producto?", opciones:["Una lista","Un diccionario","Un número"], respuesta:1, explicacion:"Datos distintos de una cosa, cada uno con nombre." },
  { tipo:"error", lang:"python", pregunta:"Toca la línea con el error.", codigo:"p = {\"nombre\": \"Forro\", \"precio\": 15000}\nprint(p[\"nombre\"])\nprint(p[\"stock\"])", linea:3, explicacion:"La clave stock no existe: KeyError. Se puede usar p.get(\"stock\", 0)." },
  { tipo:"ordenar", pregunta:"Ordena el código que cuenta productos con poco stock.", lineas:["pocos = 0","for p in inventario:","    if p[\"stock\"] < 3:","        pocos += 1","print(pocos)"], explicacion:"Contador, recorrer, condición, contar, usar." },
  { tipo:"codigo", lang:"python", pregunta:"Crea la función nombres_caros(inventario, limite) que devuelva la lista de nombres de productos con precio mayor que limite.", funcion:"nombres_caros", inicial:"def nombres_caros(inventario, limite):\n    \n", pruebas:[[[[{"nombre":"A","precio":100},{"nombre":"B","precio":500}],200],["B"]],[[[],100],[]]], explicacion:"Recorre, compara p[\"precio\"] > limite y haz append del nombre." }
  ],
  proyecto:{ titulo:"El inventario de la tienda", objetivo:"Agregar a tu tienda un inventario real: productos con nombre, precio y stock, que se descuentan al vender.",
    antes:["Listas y for (clases 1 y 2)","Diccionarios (clase 3)","Lista de diccionarios (clase 4)","Funciones (PY-104)"],
    etapas:[
      { nombre:"Completa el modelo", tipo:"guiada", lang:"python", descripcion:"Completa los huecos y ejecuta.", plantilla:`inventario = [
    {"nombre": "cargador", "precio": 25000, "stock": 10},
    {"nombre": "forro", "precio": 15000, "stock": 3},
]

def mostrar(inventario):
    for p in ___:
        print(f"{p['nombre']}: {p['precio']} ({p['stock']} disp.)")

def buscar(inventario, nombre):
    for p in inventario:
        if p["nombre"] == ___:
            return p
    return None

mostrar(inventario)
encontrado = buscar(inventario, "forro")
print(encontrado)`, pasos:["Completé los huecos.","Busqué un producto que existe y uno que no (debe dar None).","Agregué un tercer producto a la lista y lo vi en mostrar()."] },
      { nombre:"Conecta con la caja", tipo:"semi", pasos:["Al registrar una venta, el cajero escribe el NOMBRE del producto y la cantidad (en vez del precio).","La caja busca el precio en el inventario y descuenta el stock.","Si no hay stock suficiente o el producto no existe, muestra un aviso claro."] },
      { nombre:"Crea", tipo:"libre", pasos:["Agregué una opción al menú: «Productos por agotarse» (stock menor a 3).","Agregué otra opción: agregar un producto nuevo al inventario.","En la bitácora dibujé cómo se ve la lista de diccionarios (como una tabla)."] }
    ],
    lab:{ modo:"python", codigo:`inventario = [
    {"nombre": "cargador", "precio": 25000, "stock": 10},
    {"nombre": "forro", "precio": 15000, "stock": 3},
]

def mostrar(inventario):
    for p in ___:
        print(f"{p['nombre']}: {p['precio']} ({p['stock']} disp.)")

def buscar(inventario, nombre):
    for p in inventario:
        if p["nombre"] == ___:
            return p
    return None

mostrar(inventario)
encontrado = buscar(inventario, "forro")
print(encontrado)
`, entradas:"" },
    lang:"python",
    solucion:`inventario = [
    {"nombre": "cargador", "precio": 25000, "stock": 10},
    {"nombre": "forro", "precio": 15000, "stock": 3},
    {"nombre": "audifonos", "precio": 60000, "stock": 2},
]

def buscar(nombre):
    for p in inventario:
        if p["nombre"] == nombre:
            return p
    return None

def vender():
    nombre = input("Producto: ").strip().lower()
    p = buscar(nombre)
    if p is None:
        print("No existe ese producto")
        return 0
    cantidad = int(input("Cantidad: "))
    if cantidad > p["stock"]:
        print(f"Solo hay {p['stock']}")
        return 0
    p["stock"] -= cantidad
    return p["precio"] * cantidad

def por_agotarse():
    for p in inventario:
        if p["stock"] < 3:
            print(f"{p['nombre']}: quedan {p['stock']}")

total = vender()
print(f"Total: {total}")
por_agotarse()` }
},

/* =========================================================
   PY-106  ERRORES, ARCHIVOS Y DEPURACIÓN
   ========================================================= */
{
  id:"py-errores", codigo:"PY-106", titulo:"Errores, archivos y depuración", semestre:2, horas:6, color:"#A23B5A", requiere:["py-colecciones"],
  resumen:"Lee los mensajes de error, haz que tu programa no se caiga y guarda datos en archivos.",
  paraQue:"Tu tienda funciona... hasta que alguien escribe «diez» en vez de 10 y el programa se cae. Y al cerrarlo, todas las ventas del día desaparecen. Aquí la tienda se vuelve robusta: entiende los errores, se recupera de ellos y guarda las ventas en un archivo.",
  cierre:"Terminaste el semestre de Python con una tienda completa en consola: menú, inventario, ventas, cambio, validaciones y archivo de ventas. Además aprendiste lo que más diferencia a un programador junior de uno que se frustra: leer errores con calma y depurar con método. El siguiente semestre esta tienda pasa a la web.",
  hilo:"Una tienda que no se cae y recuerda sus ventas",
  pregunta:"¿Qué hace un programador cuando su programa falla?",
  metas:["Leer un mensaje de error (traceback) y ubicar el problema","Usar try/except para que el programa no se caiga","Leer y escribir archivos","Depurar con un método, no a la suerte"],
  clases:[
  { id:"py-err-1", titulo:"Leer un mensaje de error", min:25, bloques:[
    { t:"inicio", pregunta:"Cuando un programa muestra un mensaje de error en rojo, ¿qué haces normalmente?", nota:"Mucha gente se asusta, no lo lee y empieza a cambiar cosas al azar. Pero el mensaje de error es tu mejor amigo: casi siempre dice QUÉ pasó y EN QUÉ LÍNEA. Hoy aprendes a leerlo." },
    { t:"ejemplo", lang:"text", titulo:"Las partes de un traceback", partes:[
      { meta:"Encabezado", lineas:[["Traceback (most recent call last):","«Rastro» de lo que pasó. Se lee de abajo hacia arriba: lo más importante está al final."]] },
      { meta:"Dónde pasó", lineas:[["  File \"tienda.py\", line 4, in <module>","El archivo y la LÍNEA donde ocurrió el error: línea 4."],["    total = precio + cantidad","Te muestra la línea exacta."]] },
      { meta:"Qué pasó", lineas:[["TypeError: can only concatenate str (not \"int\") to str","El TIPO de error (TypeError) y una descripción: estás uniendo un texto con un número."]] }
    ]},
    { t:"texto", html:`<h3>Los errores que más vas a ver</h3>
<ul><li><b>SyntaxError:</b> algo mal escrito (falta : o una comilla, paréntesis sin cerrar).</li>
<li><b>IndentationError:</b> sangría incorrecta.</li>
<li><b>NameError:</b> usas un nombre que no existe (mal escrito o sin definir).</li>
<li><b>TypeError:</b> operación con tipos que no se combinan ("5" + 1).</li>
<li><b>ValueError:</b> el tipo está bien pero el valor no sirve: int("diez").</li>
<li><b>IndexError:</b> posición que no existe en una lista.</li>
<li><b>KeyError:</b> clave que no existe en un diccionario.</li>
<li><b>ZeroDivisionError:</b> división entre cero.</li></ul>` },
    { t:"chequeo", e:{ tipo:"opcion", pregunta:"El programa dice  NameError: name 'totl' is not defined . ¿Qué es lo más probable?", opciones:["Python está dañado","Escribiste mal el nombre de una variable (total)","Falta instalar algo"], respuesta:1, explicacion:"NameError casi siempre es un nombre mal escrito o una variable que no se creó antes." } },
    { t:"chequeo", e:{ tipo:"opcion", pregunta:"int(\"diez\") produce...", opciones:["TypeError","ValueError","10"], respuesta:1, explicacion:"El tipo (texto) es aceptable para int(), pero el valor \"diez\" no se puede convertir." } },
    { t:"autoexplica", pregunta:"¿En qué orden lees un traceback y qué buscas en cada parte?", ideas:["Se empieza por la última línea: tipo y mensaje","Luego la línea del código donde pasó","Con eso se forma una hipótesis"] }
  ]},
  { id:"py-err-2", titulo:"try y except: no dejar que se caiga", min:25, bloques:[
    { t:"ejemplo", lang:"python", titulo:"Pedir un número sin que el programa se caiga", partes:[
      { meta:"Intentar lo que puede fallar", lineas:[["try:","«Intenta» lo que está en el bloque."],["    cantidad = int(input(\"Cantidad: \"))","Si el usuario escribe «diez», aquí ocurre un ValueError."]] },
      { meta:"Atrapar el error", lineas:[["except ValueError:","Si ocurre un ValueError, en vez de caerse el programa salta aquí."],["    print(\"Eso no es un número\")",""],["    cantidad = 0",""]] },
      { meta:"El programa sigue", lineas:[["print(\"Cantidad:\", cantidad)","Se ejecuta en los dos casos."]] }
    ]},
    { t:"predecir", lang:"python", entradas:["diez"], codigo:`try:
    cantidad = int(input("Cantidad: "))
    print("Leído")
except ValueError:
    print("Eso no es un número")
    cantidad = 0
print("Cantidad:", cantidad)`, pregunta:"El usuario escribe «diez». ¿Se muestra «Leído»?", opciones:["Sí","No"], respuesta:1, salida:"Eso no es un número\nCantidad: 0", explicacion:"Cuando ocurre el error en int(), Python salta directo al except: el resto del bloque try se salta." },
    { t:"ejemplo", lang:"python", titulo:"Insistir hasta que el dato sea válido", partes:[
      { meta:"Bucle + try", lineas:[["while True:",""],["    try:",""],["        cantidad = int(input(\"Cantidad: \"))",""],["        break","Si llegó aquí, la conversión funcionó: salimos del bucle."],["    except ValueError:",""],["        print(\"Escribe un número, por ejemplo 3\")","Mensaje útil: dice qué hacer, no solo que hubo un error."]] }
    ]},
    { t:"critica", pregunta:"Algunos escriben  except:  sin poner el tipo de error, para atrapar «cualquier cosa». ¿Por qué puede ser mala idea?", respuesta:"Porque esconde errores que no esperabas. Si escribiste mal una variable (NameError) dentro del try, el except genérico lo atrapa y muestra «Eso no es un número», y tú nunca te enteras del verdadero problema. Es mejor atrapar solo el error que esperas (ValueError) y dejar que los demás se vean." },
    { t:"chequeo", e:{ tipo:"codigo", lang:"python", pregunta:"Crea la función a_numero(texto) que devuelva el texto convertido a int, o None si no se puede.", funcion:"a_numero", inicial:"def a_numero(texto):\n    \n", pruebas:[[["12"],12],[["doce"],null],[["-3"],-3]], explicacion:"try: return int(texto) except ValueError: return None" } },
    { t:"autoexplica", pregunta:"¿Qué pasa con las líneas del bloque try que están DESPUÉS de la línea que falla?", ideas:["No se ejecutan","Python salta al except","Luego sigue después del try/except"] }
  ]},
  { id:"py-err-3", titulo:"Archivos: que los datos no se pierdan", min:25, bloques:[
    { t:"texto", html:`<p>Las variables viven en la memoria RAM: al cerrar el programa, desaparecen. Para que las ventas del día sobrevivan hay que guardarlas en un <b>archivo</b>, que queda en el disco.</p>` },
    { t:"ejemplo", lang:"python", titulo:"Guardar y leer ventas", partes:[
      { meta:"Escribir (agregar al final)", lineas:[["with open(\"ventas.txt\", \"a\", encoding=\"utf-8\") as f:","open abre el archivo. \"a\" significa append: agregar al final sin borrar lo anterior (\"w\" borraría todo). with lo cierra solo al terminar el bloque."],["    f.write(\"cargador,25000\\n\")","\\n es un salto de línea: cada venta queda en su propia línea."]] },
      { meta:"Leer línea por línea", lineas:[["with open(\"ventas.txt\", encoding=\"utf-8\") as f:","Sin modo, abre para leer."],["    for linea in f:","Recorre el archivo línea por línea, como una lista."],["        nombre, precio = linea.strip().split(\",\")","strip quita el salto de línea. split(\",\") parte el texto por las comas y da una lista; se reparte en dos variables."],["        print(nombre, int(precio))",""]] }
    ]},
    { t:"predecir", lang:"python", codigo:`with open("ventas.txt", "w", encoding="utf-8") as f:
    f.write("forro,15000\\n")
    f.write("cargador,25000\\n")

total = 0
with open("ventas.txt", encoding="utf-8") as f:
    for linea in f:
        nombre, precio = linea.strip().split(",")
        total += int(precio)
print(total)`, pregunta:"¿Qué se muestra?", opciones:["40000","forro,15000cargador,25000","Error"], respuesta:0, salida:"40000", explicacion:"Se escriben dos líneas y luego se leen, se separan por la coma y se suman los precios." },
    { t:"error", lang:"python", codigo:`with open("ventas.txt", "w", encoding="utf-8") as f:
    f.write("venta de hoy\\n")`, linea:1, explicacion:"No da error, pero es un error de lógica peligroso: el modo \"w\" BORRA todo lo que había en el archivo. Para agregar ventas sin perder las anteriores se usa \"a\".", arreglo:"open(\"ventas.txt\", \"a\", encoding=\"utf-8\")" },
    { t:"autoexplica", pregunta:"¿Qué diferencia hay entre abrir un archivo con \"w\" y con \"a\"? ¿Cuál usarías para el registro de ventas?", ideas:["\"w\" borra y escribe desde cero","\"a\" agrega al final","Para ventas: \"a\""] }
  ]},
  { id:"py-err-4", titulo:"Depurar con método", min:20, bloques:[
    { t:"texto", html:`<p>La [[depuración]] es encontrar y arreglar errores. Lo que separa a un buen programador no es que no cometa errores (todos los cometen), sino que los busca con <b>método</b>:</p>
<ol><li><b>Reproduce:</b> encuentra los datos exactos con los que falla.</li>
<li><b>Lee el error:</b> tipo, mensaje y línea.</li>
<li><b>Haz una hipótesis:</b> «creo que total es texto y no número».</li>
<li><b>Compruébala:</b> agrega un <code>print()</code> de diagnóstico, por ejemplo <code>print(type(total), total)</code>.</li>
<li><b>Cambia UNA cosa</b> y vuelve a probar.</li>
<li><b>Cuando funcione, quita los print de diagnóstico.</b></li></ol>` },
    { t:"tip", html:`<p><b>El método del patito de hule:</b> explica tu código, línea por línea, en voz alta a un objeto (un patito, un peluche, Nala). Muchísimas veces encuentras el error mientras lo explicas. Es la autoexplicación que practicas en cada clase.</p>` },
    { t:"error", lang:"python", codigo:`precios = [2000, 3500, 1200]
total = 0
for p in precios:
    total = p
print("Total:", total)`, linea:4, explicacion:"El programa muestra 1200 en vez de 6700. No hay mensaje de error: es un error de lógica. total = p REEMPLAZA en cada vuelta en vez de acumular. Una traza a mano lo revela enseguida.", arreglo:"    total += p" },
    { t:"error", lang:"python", codigo:`def promedio(notas):
    suma = 0
    for n in notas:
        suma += n
    return suma / len(notas)

print(promedio([]))`, linea:5, explicacion:"Con una lista vacía, len(notas) es 0: ZeroDivisionError. Un caso borde que no se probó. Hay que revisarlo antes: if len(notas) == 0: return 0.", arreglo:"if len(notas) == 0: return 0  (antes del return)" },
    { t:"critica", pregunta:"«Si el programa funciona con los datos que probé, está bien». ¿Estás de acuerdo?", respuesta:"No del todo. Funcionó con ESOS datos. Hay que probar casos borde: listas vacías, cero, números negativos, textos con mayúsculas, el valor justo en el límite (3.0 en una nota). La mayoría de errores reales aparecen en los bordes. Por eso los proyectos te piden probar esos casos." },
    { t:"autoexplica", pregunta:"Escribe los pasos del método de depuración que usarías la próxima vez que tu programa falle.", ideas:["Reproducir","Leer el error","Hipótesis y comprobar con print","Cambiar una cosa a la vez"] }
  ]}
  ],
  ejercicios:[
  { tipo:"opcion", pregunta:"¿Qué error produce  [1, 2, 3][5] ?", opciones:["KeyError","IndexError","ValueError"], respuesta:1, explicacion:"Posición inexistente en una lista." },
  { tipo:"opcion", pregunta:"¿Qué error produce  {\"a\": 1}[\"b\"] ?", opciones:["KeyError","IndexError","NameError"], respuesta:0, explicacion:"Clave inexistente en un diccionario." },
  { tipo:"completar", lang:"python", pregunta:"Completa para atrapar el error de conversión.", plantilla:"try:\n    n = int(texto)\nexcept ___:\n    n = 0", respuestas:[["ValueError"]], explicacion:"int(\"abc\") produce ValueError." },
  { tipo:"opcion", pregunta:"¿Qué modo de open() agrega al final sin borrar?", opciones:["\"r\"","\"w\"","\"a\""], respuesta:2, explicacion:"a de append." },
  { tipo:"error", lang:"python", pregunta:"El programa debe contar los productos, pero siempre muestra 1. Toca la línea con el error.", codigo:"productos = [\"a\", \"b\", \"c\"]\nfor p in productos:\n    cuenta = 0\n    cuenta += 1\nprint(cuenta)", linea:3, explicacion:"El contador se reinicia en cada vuelta. Debe ir antes del for." },
  { tipo:"codigo", lang:"python", pregunta:"Crea la función dividir(a, b) que devuelva a / b, o None si b es 0. Usa try/except ZeroDivisionError.", funcion:"dividir", inicial:"def dividir(a, b):\n    \n", pruebas:[[[10,2],5],[[1,0],null],[[9,3],3]], explicacion:"try: return a / b except ZeroDivisionError: return None" }
  ],
  prueba:[
  { tipo:"opcion", pregunta:"¿Por dónde conviene empezar a leer un traceback?", opciones:["Por la primera línea","Por la última línea","Por el medio"], respuesta:1, explicacion:"La última dice el tipo y el mensaje." },
  { tipo:"opcion", pregunta:"Si dentro de un try ocurre un error, las líneas siguientes del try...", opciones:["Se ejecutan igual","Se saltan","Se ejecutan dos veces"], respuesta:1, explicacion:"Se salta al except." },
  { tipo:"escribir", pregunta:"¿Qué tipo de error da  print(10 / 0) ? (escribe el nombre)", respuestas:["ZeroDivisionError"], explicacion:"División entre cero." },
  { tipo:"vf", pregunta:"Abrir un archivo con modo \"w\" conserva lo que ya tenía y escribe al final.", respuesta:false, explicacion:"\"w\" borra todo. Para agregar se usa \"a\"." },
  { tipo:"ordenar", pregunta:"Ordena el método de depuración.", lineas:["Reproducir el error","Leer el mensaje y la línea","Plantear una hipótesis","Comprobarla con un print","Cambiar una cosa y volver a probar"], explicacion:"Método, no suerte." },
  { tipo:"codigo", lang:"python", pregunta:"Crea un programa que pida un número hasta que sea válido y luego muestre «Doble: X». (Se prueba escribiendo «tres» y luego 3.)", casos:[{ entradas:["tres","3"], salida:"Doble: 6" }], inicial:"", explicacion:"while True con try/except ValueError y break." }
  ],
  proyecto:{ titulo:"Proyecto de semestre: la tienda completa en consola", objetivo:"Unir todo el semestre en una sola aplicación: menú, clave, inventario, ventas con cambio, validaciones que no dejan que se caiga, y un archivo donde se guardan las ventas.",
    antes:["Todo PY-101 a PY-105","try/except (clase 2)","Archivos con modo \"a\" (clase 3)","Depurar con método (clase 4)"],
    etapas:[
      { nombre:"Completa el modelo", tipo:"guiada", lang:"python", descripcion:"Completa la función que pide números de forma segura y la que guarda una venta.", plantilla:`def pedir_entero(mensaje):
    while True:
        try:
            return int(input(mensaje))
        except ___:
            print("Escribe un número entero")

def guardar_venta(producto, total):
    with open("ventas.txt", "___", encoding="utf-8") as f:
        f.write(f"{producto},{total}\\n")

cantidad = pedir_entero("Cantidad: ")
guardar_venta("forro", 15000 * cantidad)
print("Venta guardada")`, pasos:["Completé ValueError y el modo \"a\".","Probé escribiendo letras en la cantidad: el programa no se cayó.","Guardé dos ventas y comprobé que el archivo tiene dos líneas."] },
      { nombre:"Une todo", tipo:"semi", pasos:["Junté en un solo programa: clave, menú, inventario (PY-105), venta con cambio (PY-102) y archivo de ventas.","Agregué al menú: «Ver ventas guardadas», que lee el archivo y muestra el total.","Ningún dato del usuario puede hacer caer el programa: probé letras, números negativos y productos que no existen."] },
      { nombre:"Crea y presenta", tipo:"libre", pasos:["Agregué una mejora propia (por ejemplo, reporte del producto más vendido o guardar también el inventario).","Escribí un README corto: qué hace la tienda, cómo se usa y qué aprendí.","Hice una lista de casos de prueba con resultado esperado y real (como en una prueba de software).","Me autoevalué: ¿cada función hace una sola cosa?, ¿los mensajes de error dicen qué hacer?, ¿hay código repetido?"] }
    ],
    lab:{ modo:"python", codigo:`def pedir_entero(mensaje):
    while True:
        try:
            return int(input(mensaje))
        except ___:
            print("Escribe un número entero")

def guardar_venta(producto, total):
    with open("ventas.txt", "___", encoding="utf-8") as f:
        f.write(f"{producto},{total}\\n")

cantidad = pedir_entero("Cantidad: ")
guardar_venta("forro", 15000 * cantidad)
print("Venta guardada")
with open("ventas.txt", encoding="utf-8") as f:
    print(f.read())
`, entradas:"dos\n2" },
    lang:"python",
    solucion:`inventario = [
    {"nombre": "cargador", "precio": 25000, "stock": 10},
    {"nombre": "forro", "precio": 15000, "stock": 3},
]

def pedir_entero(mensaje):
    while True:
        try:
            n = int(input(mensaje))
            if n >= 0:
                return n
            print("Debe ser 0 o más")
        except ValueError:
            print("Escribe un número entero")

def buscar(nombre):
    for p in inventario:
        if p["nombre"] == nombre:
            return p
    return None

def guardar_venta(producto, total):
    with open("ventas.txt", "a", encoding="utf-8") as f:
        f.write(f"{producto},{total}\\n")

def vender():
    p = buscar(input("Producto: ").strip().lower())
    if p is None:
        print("Ese producto no existe")
        return
    cantidad = pedir_entero("Cantidad: ")
    if cantidad > p["stock"]:
        print(f"Solo quedan {p['stock']}")
        return
    total = round(p["precio"] * cantidad * 1.19)
    pago = pedir_entero(f"Total {total}. Paga con: ")
    if pago < total:
        print(f"Faltan {total - pago}")
        return
    p["stock"] -= cantidad
    guardar_venta(p["nombre"], total)
    print(f"Cambio: {pago - total}")

def ver_ventas():
    suma = 0
    try:
        with open("ventas.txt", encoding="utf-8") as f:
            for linea in f:
                nombre, total = linea.strip().split(",")
                suma += int(total)
    except FileNotFoundError:
        print("Todavía no hay ventas")
    print(f"Total vendido: {suma}")

while True:
    print("1) Vender  2) Ver ventas  3) Salir")
    op = input("Opción: ")
    if op == "1":
        vender()
    elif op == "2":
        ver_ventas()
    elif op == "3":
        break` }
}
);
