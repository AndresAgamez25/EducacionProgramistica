/* =========================================================
   CÓDIGO: resaltado con signos tocables, globo de símbolos,
   ejecución de JavaScript (Worker) y de Python (Pyodide),
   y traductor de errores al español.
   ========================================================= */
(function (B) {
"use strict";
const { esc } = B;
const SIM = window.SIMBOLOS || {}, PAL = window.PALABRAS || {};

/* ---------- palabras clave por lenguaje ---------- */
const KW = {
  python: "def return if elif else for while in not and or import from as class try except finally with True False None lambda pass break continue is print input int float str bool len range type round sum max min append open get lower upper strip split",
  javascript: "const let var function return if else for while do switch case break continue default new class extends this async await try catch throw import from export of in typeof null undefined true false console log",
  java: "public private protected class static void int double boolean char long String new return if else for while extends implements this super import true false null interface final",
  cpp: "include int double float bool char void return if else for while class public private protected const auto using namespace std new delete struct true false nullptr cout cin endl",
  sql: "select from where insert into values update set delete create table primary key foreign references join inner left right on group by order having limit as and or not null is in like between count sum avg min max desc asc",
  pseudo: "Algoritmo FinAlgoritmo Escribir Leer Si Entonces SiNo FinSi Mientras FinMientras Para Hasta Hacer MOD trunc",
  bash: "git npm cd ls mkdir pwd touch code init add commit push pull branch merge",
  html: "", css: "", text: ""
};
const RE = {};
function regex(lang) {
  if (RE[lang]) return RE[lang];
  const p = [];
  const com = { python: "#.*", bash: "#.*", sql: "--.*", html: "<!--.*?-->", css: "\\/\\*.*?\\*\\/", text: null }[lang];
  const c = com === undefined ? "\\/\\/.*" : com;
  if (c) p.push("(?<c>" + c + ")");
  if (lang === "python") p.push('(?<s>[fFrRbB]?"""[^\\n]*?"""|[fFrRbB]?"(?:[^"\\\\\\n]|\\\\.)*"?|[fFrRbB]?\'(?:[^\'\\\\\\n]|\\\\.)*\'?)');
  else p.push('(?<s>"(?:[^"\\\\\\n]|\\\\.)*"?|\'(?:[^\'\\\\\\n]|\\\\.)*\'?|`(?:[^`\\\\]|\\\\.)*`?)');
  if (lang === "html") p.push("(?<t><\\/?[a-zA-Z][\\w-]*|\\/?>)");
  if (lang === "css") p.push("(?<f>[\\w-]+(?=\\s*:[^:]))");
  p.push("(?<n>\\b\\d+(?:\\.\\d+)?\\b)");
  const kw = (KW[lang] || "").split(" ").filter(Boolean);
  if (kw.length) p.push("(?<k>\\b(?:" + kw.join("|") + ")\\b)");
  if (!["html", "css", "sql", "text"].includes(lang)) p.push("(?<f>\\b[A-Za-z_]\\w*(?=\\())");
  if (lang !== "text") p.push("(?<o>===|!==|==|!=|<=|>=|<-|<>|=>|->|\\*\\*|\\/\\/|\\+=|-=|\\*=|\\/=|&&|\\|\\||\\+\\+|--|::|<<|>>|[=+\\-*/%<>!(){}\\[\\];,.:?&|#])");
  return (RE[lang] = new RegExp(p.join("|"), lang === "sql" ? "gi" : "g"));
}
/* Resalta UNA línea. Los signos y palabras clave quedan tocables. */
B.resaltarLinea = (txt, lang) => {
  let re; try { re = regex(lang); } catch (e) { return esc(txt); }
  let out = "", ult = 0;
  txt.replace(re, (...a) => {
    const m = a[0], g = a[a.length - 1], off = a[a.length - 3];
    const tipo = Object.keys(g).find(k => g[k] !== undefined) || "x";
    out += esc(txt.slice(ult, off));
    if (tipo === "o" && simboloDe(m, lang)) out += `<span class="tok tk-o" data-s="${esc(m)}" tabindex="0">${esc(m)}</span>`;
    else if (tipo === "k" && palabraDe(m)) out += `<span class="tok tk-k" data-p="${esc(m)}" tabindex="0">${esc(m)}</span>`;
    else if (tipo === "s") out += `<span class="tok tk-s" data-s="${m.startsWith("`") ? "`" : (lang === "sql" ? "'" : '"')}">${esc(m)}</span>`;
    else if (tipo === "c") out += `<span class="tok tk-c" data-s="${lang === "python" || lang === "bash" ? "#" : lang === "sql" ? "--" : "//"}">${esc(m)}</span>`;
    else if (tipo === "t") out += `<span class="tok tk-t" data-s="${m.startsWith("</") ? "</" : m.includes(">") ? ">" : "<"}">${esc(m)}</span>`;
    else out += `<span class="tk-${tipo}">${esc(m)}</span>`;
    ult = off + m.length; return m;
  });
  return out + esc(txt.slice(ult));
};
function simboloDe(s, lang) { return SIM[lang + ":" + s] || SIM[s] || null; }
function palabraDe(p) { return PAL[p] || PAL[p.toLowerCase()] || null; }
B.infoSimbolo = (s, lang) => { const x = simboloDe(s, lang) || (lang === "sql" && s === "'" ? SIM["sql:'"] : null); return x; };
B.infoPalabra = palabraDe;

const NOMBRES = { python: "Python", javascript: "JavaScript", java: "Java", cpp: "C++", sql: "SQL", html: "HTML", css: "CSS", bash: "Terminal", pseudo: "Pseudocódigo", text: "Notas" };
B.nombreLang = l => NOMBRES[l] || l;

/* Bloque de código completo, con números de línea.
   op: { tocable: líneas clicables (ejercicio de error), marcar: n, mala: n, botones: html, id } */
B.bloqueCodigo = (codigo, lang, op = {}) => {
  const lineas = String(codigo).replace(/\n$/, "").split("\n");
  const html = lineas.map((l, i) => {
    const n = i + 1, cls = ["ln"]; if (op.tocable) cls.push("tocable"); if (op.marcar === n) cls.push("marcada"); if (op.mala === n) cls.push("mala");
    return `<span class="${cls.join(" ")}" data-n="${n}"${op.tocable ? ` data-a="tocar-linea" data-id="${op.id}" role="button" tabindex="0"` : ""}>${B.resaltarLinea(l, lang) || " "}</span>`;
  }).join("");
  const copiar = op.sinCopiar ? "" : '<button data-a="copiar">Copiar</button>';
  return `<div class="codigo" data-lang="${lang}"><div class="cab"><span class="lang">${esc(B.nombreLang(lang))}</span>${op.botones || ""}${copiar}</div><pre><code>${html}</code></pre></div>`;
};

/* ---------- globo que explica un signo o palabra ---------- */
B.cerrarGlobo = () => { const g = B.$(".globo"); if (g) g.remove(); };
B.globo = (el) => {
  B.cerrarGlobo();
  const lang = (el.closest("[data-lang]") || {}).dataset ? el.closest("[data-lang]").dataset.lang : "javascript";
  let titulo, cuerpo;
  if (el.dataset.p) {
    const t = palabraDe(el.dataset.p); if (!t) return;
    titulo = `<span class="s">${esc(el.dataset.p)}</span> palabra clave`;
    cuerpo = `<p style="margin:0">${esc(t)}</p>`;
  } else {
    const info = B.infoSimbolo(el.dataset.s, lang); if (!info) return;
    titulo = `<span class="s">${esc(el.dataset.s === "\"" ? "\" \"" : el.dataset.s)}</span>${esc(info.nombre)}`;
    cuerpo = `<div class="lee">Se lee: ${esc(info.lee)}</div><p style="margin:0">${esc(info.que)}</p>${info.ej ? `<pre>${esc(info.ej)}</pre>` : ""}`;
  }
  const g = document.createElement("div");
  g.className = "globo"; g.setAttribute("role", "dialog");
  g.innerHTML = `<button class="cerrar" data-a="cerrar-globo" aria-label="Cerrar">×</button><h4>${titulo}</h4>${cuerpo}`;
  document.body.appendChild(g);
  const r = el.getBoundingClientRect(), gw = g.offsetWidth, gh = g.offsetHeight;
  let x = Math.min(Math.max(12, r.left + r.width / 2 - gw / 2), innerWidth - gw - 12);
  let y = r.bottom + 10; if (y + gh > innerHeight - 12) y = Math.max(12, r.top - gh - 10);
  g.style.left = x + "px"; g.style.top = y + "px";
  B.sonar("clic");
};

/* =========================================================
   EJECUTAR JAVASCRIPT (en un Worker, con límite de tiempo)
   ========================================================= */
const PRE_JS = 'const __fmt=function(v){if(typeof v==="string")return JSON.stringify(v);if(v===undefined)return "undefined";if(typeof v==="function")return "[función]";try{return JSON.stringify(v)}catch(e){return String(v)}};const __fl=function(v){return typeof v==="string"?v:__fmt(v)};const __igual=function(a,b){if(typeof a==="number"&&typeof b==="number")return Math.abs(a-b)<1e-9;if(Array.isArray(a)&&Array.isArray(b))return a.length===b.length&&a.every(function(x,i){return __igual(x,b[i])});if(a&&b&&typeof a==="object"&&typeof b==="object"){var ka=Object.keys(a),kb=Object.keys(b);return ka.length===kb.length&&ka.every(function(k){return __igual(a[k],b[k])})}return a===b};const __logs=[];const __L=function(p,a){var s=p+Array.prototype.map.call(a,__fl).join(" ");if(__logs.length<500){__logs.push(s);postMessage({log:s})}};const __c={log:function(){__L("",arguments)},info:function(){__L("",arguments)},warn:function(){__L("⚠ ",arguments)},error:function(){__L("✖ ",arguments)},table:function(t){__L("",[t])}};';
function fuenteJS(codigo, funcion, pruebas) {
  const fin = funcion
    ? `;(function(){var f=(typeof ${funcion}==="function")?${funcion}:undefined;if(!f){postMessage({fin:1,error:{tipo:"ReferenceError",mensaje:"No encontré la función ${funcion}"},logs:__logs,ok:false});return;}var P=${JSON.stringify(pruebas)};var res=P.map(function(p){try{var r=f.apply(null,JSON.parse(JSON.stringify(p[0])));return{args:__fmt(p[0]).slice(1,-1),esp:__fmt(p[1]),r:__fmt(r),ok:__igual(r,p[1])}}catch(e){return{args:__fmt(p[0]).slice(1,-1),esp:__fmt(p[1]),error:String(e&&e.message||e),ok:false}}});postMessage({fin:1,resultados:res,logs:__logs,ok:res.every(function(x){return x.ok})});})();`
    : `;postMessage({fin:1,logs:__logs,ok:true});`;
  return PRE_JS + "\n{const console=__c;\ntry{\n" + codigo + "\n" + fin + "\n}catch(__e){postMessage({fin:1,error:{tipo:(__e&&__e.name)||'Error',mensaje:String(__e&&__e.message||__e)},logs:__logs,ok:false});}\n}";
}
B.ejecutarJS = (codigo, funcion, pruebas, op = {}) => new Promise(res => {
  let w, url;
  try { url = URL.createObjectURL(new Blob([fuenteJS(codigo, funcion, pruebas)], { type: "text/javascript" })); w = new Worker(url); }
  catch (e) { res({ error: { tipo: "Error", mensaje: "Tu navegador no permitió ejecutar el código." }, ok: false, logs: [] }); return; }
  let listo = false, final = null, lim;
  const cerrar = r => { if (listo) return; listo = true; clearTimeout(lim); try { w.terminate(); } catch (e) {} try { URL.revokeObjectURL(url); } catch (e) {} res(r); };
  const extra = op.esperaExtra || 0;
  lim = setTimeout(() => cerrar(final || { error: { tipo: "Tiempo", mensaje: "El código tardó más de 3 segundos. ¿Hay un bucle infinito?" }, ok: false, logs: [] }), 3000 + extra);
  w.onmessage = ev => {
    const d = ev.data;
    if (d && d.log !== undefined) { if (op.onLog) op.onLog(d.log); return; }
    final = d;
    if (!extra || d.error) cerrar(d); else { clearTimeout(lim); lim = setTimeout(() => cerrar(final), extra); }
  };
  w.onerror = ev => { if (ev.preventDefault) ev.preventDefault(); cerrar({ error: { tipo: "SyntaxError", mensaje: String(ev.message || "Error de sintaxis").replace(/^Uncaught (SyntaxError: )?/, ""), linea: ev.lineno ? Math.max(1, ev.lineno - 3) : null }, ok: false, logs: [] }); };
});

/* =========================================================
   EJECUTAR PYTHON (Pyodide en un Worker)
   La primera vez tarda unos segundos: descarga Python.
   ========================================================= */
const PY = { w: null, listo: null, n: 0, esperas: {} };
function crearPython() {
  PY.w = new Worker("js/py-worker.js");
  PY.listo = new Promise((ok, mal) => {
    PY.w.onmessage = ev => {
      const d = ev.data;
      if (d.tipo === "listo") { ok(); return; }
      if (d.tipo === "fallo") { mal(new Error(d.mensaje)); return; }
      const e = PY.esperas[d.id]; if (e) { clearTimeout(e.t); delete PY.esperas[d.id]; e.ok(d); }
    };
    PY.w.onerror = ev => mal(new Error(ev.message || "No se pudo cargar Python"));
  });
  PY.listo.catch(() => {});
}
B.pythonListo = () => !!PY.w && PY.cargado;
B.prepararPython = () => { if (!PY.w) crearPython(); return PY.listo.then(() => { PY.cargado = true; }); };
B.ejecutarPython = async (codigo, op = {}) => {
  try { await B.prepararPython(); }
  catch (e) { return { error: { tipo: "Carga", mensaje: "No se pudo cargar Python en este navegador. Revisa tu conexión e intenta de nuevo." }, consola: [], limpio: "" }; }
  const id = ++PY.n;
  return new Promise(ok => {
    const t = setTimeout(() => {
      delete PY.esperas[id];
      try { PY.w.terminate(); } catch (e) {}
      PY.w = null; PY.cargado = false;     // se reinicia Python para la próxima vez
      ok({ error: { tipo: "Tiempo", mensaje: "El programa tardó demasiado y se detuvo. ¿Hay un bucle infinito?" }, consola: [], limpio: "" });
    }, op.limite || 6000);
    PY.esperas[id] = { ok, t };
    PY.w.postMessage({ id, codigo, entradas: op.entradas || [], funcion: op.funcion || null, pruebas: op.pruebas || null });
  });
};

/* =========================================================
   TRADUCTOR DE ERRORES: qué significa y qué revisar
   ========================================================= */
B.traducirError = (err) => {
  if (!err) return "";
  const t = err.tipo || "", m = err.mensaje || "";
  const reglas = [
    [/expected ':'/, "Falta poner dos puntos (:) al final de la línea. Van después de if, elif, else, for, while, def, try y except."],
    [/unterminated string|EOL while scanning|Invalid or unexpected token|Unterminated string/i, "Abriste unas comillas y no las cerraste. Todo texto empieza y termina con comillas."],
    [/was never closed|missing \) after|unexpected EOF|Unexpected end of input/i, "Abriste un paréntesis, corchete o llave y no lo cerraste. Cuenta los que abren y los que cierran."],
    [/cannot assign to literal|Invalid left-hand side in assignment/i, "La asignación está al revés. La variable que recibe va a la IZQUIERDA del =: precio = 5000."],
    [/Maybe you meant '==' or ':=' instead of '='|invalid syntax.*=/i, "Para COMPARAR se usa ==. Un solo = sirve para guardar un valor."],
    [/expected an indented block/, "Después de una línea que termina en dos puntos, la siguiente debe ir con sangría (4 espacios)."],
    [/unexpected indent/, "Hay espacios al inicio de una línea que no debería tenerlos. Revisa la sangría."],
    [/unindent does not match/, "La sangría no coincide con las líneas de arriba. Usa siempre 4 espacios por nivel."],
    [/can only concatenate str|must be str, not int|unsupported operand type\(s\) for \+: 'int' and 'str'/, "Estás uniendo texto con un número. Convierte el número con str() o usa una f-string: f\"Total: {total}\". Si el número vino de input(), conviértelo con int()."],
    [/unsupported operand type/, "Estás operando con tipos que no se combinan. Si un dato vino de input(), es texto: conviértelo con int() o float()."],
    [/missing \d+ required positional argument/, "Llamaste la función con menos datos de los que pide. Revisa cuántos parámetros tiene en el def."],
    [/takes \d+ positional arguments? but \d+ (were|was) given/, "Llamaste la función con más datos de los que pide."],
    [/'NoneType'/, "Estás usando el resultado de una función que no devuelve nada (None). ¿Le falta un return?"],
    [/invalid literal for int\(\)/, "int() recibió un texto que no es un número entero (por ejemplo \"diez\" o \"3.5\"). Para decimales usa float(), y para datos del usuario usa try/except."],
    [/could not convert string to float/, "float() recibió un texto que no es un número. ¿Escribiste coma en vez de punto?"],
    [/list index out of range/, "Pediste una posición que no existe en la lista. Recuerda: los índices van de 0 a len(lista) - 1."],
    [/is not defined/, "Usaste un nombre que Python no conoce. Revisa la ortografía y las mayúsculas, o si lo creaste ANTES de usarlo."],
    [/division by zero/, "Dividiste entre cero. Revisa antes con un if que el divisor no sea 0."],
    [/No encontré la función/, "El nombre de la función no coincide con el que pide el ejercicio. Revisa mayúsculas y guiones bajos."],
    [/pidió un dato con input/, "Tu programa pidió más datos con input() de los que hay en la caja «Entradas». Agrega más líneas allí, una por dato."],
    [/has no attribute/, "Usaste un método que no existe para ese tipo de dato. Revisa la ortografía (por ejemplo .append, .lower)."],
    [/No such file/, "El archivo no existe todavía. Créalo primero escribiendo en él (modo \"w\" o \"a\")."]
  ];
  for (const [re, txt] of reglas) if (re.test(m) || re.test(t + ": " + m)) return txt;
  const porTipo = {
    KeyError: "Pediste una clave que no existe en el diccionario. Revisa mayúsculas, o usa .get(clave, valor_por_defecto).",
    IndexError: "Pediste una posición que no existe.",
    NameError: "Usaste un nombre que no existe todavía.",
    TypeError: "Operación con tipos de dato que no se combinan.",
    ValueError: "El tipo de dato está bien pero el valor no sirve para esa operación.",
    SyntaxError: "Algo está mal escrito en esa línea: revisa dos puntos, comillas y paréntesis.",
    IndentationError: "Problema de sangría: revisa los espacios al inicio de la línea.",
    ReferenceError: "Usaste un nombre que no existe (JavaScript).",
    Tiempo: "El programa no terminó. Revisa que la condición de tus bucles cambie en algún momento."
  };
  return porTipo[t] || "Lee el mensaje con calma: dice qué pasó y en qué línea.";
};
})(window.B);
