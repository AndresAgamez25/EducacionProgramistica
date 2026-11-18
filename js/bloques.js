/* =========================================================
   BLOQUES Y EJERCICIOS
   Cada tipo de bloque de una clase y cada tipo de ejercicio
   se dibuja aquí. Las acciones (clics) se registran en B.acc.
   ========================================================= */
(function (B) {
"use strict";
const { esc, $, $$ } = B;
B.acc = B.acc || {};
B.S = { r: {}, res: {}, mez: {}, tests: {}, pista: {}, conf: {}, traza: {}, prueba: {}, corriendo: {} };
const S = B.S;

/* ---------- texto con términos del glosario ---------- */
B.conTerminos = html => String(html).replace(/\[\[(.+?)\]\]/g, (m, t) => {
  const [k, vis] = t.split("|");
  return `<span class="term" data-a="termino" data-t="${esc(k.toLowerCase())}" tabindex="0" role="button">${esc(vis || k)}</span>`;
});
B.nala = (pose, alt = "") => `<img src="img/nala/${pose}.svg" alt="${esc(alt)}" loading="lazy">`;

/* ---------- diagramas dibujados como en el cuaderno ---------- */
const T = 'stroke="currentColor" stroke-width="2.2" fill="none" stroke-linejoin="round" stroke-linecap="round"';
const caja = (x, y, w, h, txt, f = "var(--hoja)", r = 6) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" style="fill:${f}" stroke="currentColor" stroke-width="2.2"/><text x="${x + w / 2}" y="${y + h / 2 + 5}" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-weight="700" font-size="15" fill="currentColor">${txt}</text>`;
const flecha = (x1, y1, x2, y2) => `<path d="M${x1},${y1} L${x2},${y2}" ${T}/><path d="M${x2},${y2} l-8,-5 M${x2},${y2} l-8,5" ${T} transform="rotate(${Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI} ${x2} ${y2})"/>`;
const mano = (x, y, txt, color = "var(--azul)", size = 20, anchor = "middle") => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Caveat,cursive" font-size="${size}" style="fill:${color}">${txt}</text>`;
B.DIAGRAMAS = {
  ciclo: () => {
    const pasos = ["Predecir", "Ejecutar", "Investigar", "Modificar", "Crear"], cx = 210, cy = 150, r = 105;
    let s = `<circle cx="${cx}" cy="${cy}" r="${r}" ${T} stroke-dasharray="6 8" opacity=".5"/>`;
    pasos.forEach((p, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / 5, x = cx + r * Math.cos(a), y = cy + r * Math.sin(a); s += caja(x - 56, y - 18, 112, 36, (i + 1) + ". " + p, i < 3 ? "var(--hoja)" : "color-mix(in srgb,var(--resaltador) 50%,var(--hoja))"); });
    s += mano(cx, cy - 4, "leer y entender", "var(--azul)", 21) + mano(cx, cy + 20, "→ luego hacer", "var(--rojo)", 21);
    return `<svg viewBox="0 0 420 300" width="420">${s}</svg>`;
  },
  eps: () => `<svg viewBox="0 0 520 130" width="520">${caja(10, 40, 130, 50, "Entrada")}${flecha(146, 65, 186, 65)}${caja(192, 40, 136, 50, "Proceso", "color-mix(in srgb,var(--resaltador) 50%,var(--hoja))")}${flecha(334, 65, 374, 65)}${caja(380, 40, 130, 50, "Salida")}${mano(75, 120, "precio y cantidad")}${mano(260, 120, "multiplicar")}${mano(445, 120, "el total")}</svg>`,
  figuras: () => `<svg viewBox="0 0 560 120" width="560"><rect x="10" y="30" width="110" height="44" rx="22" style="fill:var(--hoja)" stroke="currentColor" stroke-width="2.2"/><path d="M160,74 L178,30 L270,30 L252,74 Z" style="fill:var(--hoja)" stroke="currentColor" stroke-width="2.2"/><rect x="300" y="30" width="110" height="44" style="fill:var(--hoja)" stroke="currentColor" stroke-width="2.2"/><path d="M490,22 L540,52 L490,82 L440,52 Z" style="fill:var(--hoja)" stroke="currentColor" stroke-width="2.2"/>${mano(65, 105, "inicio / fin")}${mano(215, 105, "entrada / salida")}${mano(355, 105, "proceso")}${mano(490, 110, "decisión")}</svg>`,
  "flujo-suma": () => `<svg viewBox="0 0 300 420" width="300"><rect x="95" y="10" width="110" height="40" rx="20" style="fill:var(--hoja)" stroke="currentColor" stroke-width="2.2"/><text x="150" y="35" text-anchor="middle" font-family="Bricolage Grotesque" font-weight="700" fill="currentColor">Inicio</text>${flecha(150, 50, 150, 78)}<path d="M80,120 L100,80 L220,80 L200,120 Z" style="fill:var(--hoja)" stroke="currentColor" stroke-width="2.2"/><text x="150" y="105" text-anchor="middle" font-family="Bricolage Grotesque" font-weight="700" fill="currentColor">Leer a, b</text>${flecha(150, 120, 150, 148)}${caja(85, 150, 130, 42, "suma ← a + b", "color-mix(in srgb,var(--resaltador) 50%,var(--hoja))", 0)}${flecha(150, 192, 150, 220)}<path d="M80,262 L100,222 L220,222 L200,262 Z" style="fill:var(--hoja)" stroke="currentColor" stroke-width="2.2"/><text x="150" y="247" text-anchor="middle" font-family="Bricolage Grotesque" font-weight="700" fill="currentColor">Escribir suma</text>${flecha(150, 262, 150, 290)}<rect x="95" y="292" width="110" height="40" rx="20" style="fill:var(--hoja)" stroke="currentColor" stroke-width="2.2"/><text x="150" y="317" text-anchor="middle" font-family="Bricolage Grotesque" font-weight="700" fill="currentColor">Fin</text>${mano(240, 105, "entrada", "var(--azul)", 20, "start")}${mano(225, 176, "proceso", "var(--azul)", 20, "start")}${mano(240, 247, "salida", "var(--azul)", 20, "start")}</svg>`,
  binario: () => { let s = ""; [128, 64, 32, 16, 8, 4, 2, 1].forEach((v, i) => { const x = 14 + i * 64, on = [0, 0, 0, 0, 1, 1, 0, 1][i]; s += `<circle cx="${x + 26}" cy="40" r="20" style="fill:${on ? "var(--resaltador)" : "var(--hoja)"}" stroke="currentColor" stroke-width="2.2"/><text x="${x + 26}" y="47" text-anchor="middle" font-family="JetBrains Mono" font-weight="700" font-size="18" fill="currentColor">${on}</text><text x="${x + 26}" y="88" text-anchor="middle" font-family="Bricolage Grotesque" font-weight="700" font-size="14" fill="currentColor">${v}</text>`; }); return `<svg viewBox="0 0 540 140" width="540">${s}${mano(270, 128, "00001101 = 8 + 4 + 1 = 13", "var(--rojo)", 24)}</svg>`; },
  if: () => `<svg viewBox="0 0 420 300" width="420">${caja(140, 10, 140, 40, "datos")}${flecha(210, 50, 210, 78)}<path d="M210,80 L300,125 L210,170 L120,125 Z" style="fill:color-mix(in srgb,var(--resaltador) 50%,var(--hoja))" stroke="currentColor" stroke-width="2.2"/><text x="210" y="130" text-anchor="middle" font-family="JetBrains Mono" font-weight="700" font-size="14" fill="currentColor">pago &lt; total</text><path d="M300,125 L356,125" ${T}/>${flecha(356, 125, 356, 138)}${mano(318, 113, "True", "var(--verde)")}${caja(300, 140, 112, 44, "bloque del if")}${flecha(356, 184, 356, 220)}<path d="M210,170 L210,242" ${T}/>${mano(232, 212, "False", "var(--rojo)")}${flecha(210, 242, 270, 242)}${caja(272, 222, 140, 40, "sigue el programa")}</svg>`,
  while: () => `<svg viewBox="0 0 420 320" width="420">${caja(140, 10, 140, 40, "n = 1")}${flecha(210, 50, 210, 78)}<path d="M210,80 L300,125 L210,170 L120,125 Z" style="fill:color-mix(in srgb,var(--resaltador) 50%,var(--hoja))" stroke="currentColor" stroke-width="2.2"/><text x="210" y="130" text-anchor="middle" font-family="JetBrains Mono" font-weight="700" font-size="14" fill="currentColor">n &lt;= 3</text>${flecha(210, 170, 210, 200)}${mano(232, 192, "True", "var(--verde)")}${caja(140, 202, 140, 44, "print(n); n += 1")}<path d="M140,224 L60,224 L60,125 L118,125" ${T}/>${flecha(100, 125, 118, 125)}${mano(55, 180, "vuelve", "var(--rojo)", 22, "end")}${flecha(300, 125, 360, 125)}${mano(330, 112, "False", "var(--rojo)")}${caja(300, 140, 110, 40, "sale")}</svg>`,
  lista: () => { let s = ""; ["\"mango\"", "\"guayaba\"", "\"lulo\""].forEach((v, i) => { s += caja(20 + i * 150, 40, 140, 50, v); s += mano(90 + i * 150, 120, "índice " + i, "var(--rojo)", 22); }); return `<svg viewBox="0 0 480 140" width="480">${mano(20, 26, "frutas =", "var(--azul)", 24, "start")}${s}</svg>`; },
  verdad: () => null
};
function diagramaHTML(nombre) {
  if (nombre === "verdad") return `<table class="tabla-vars" style="width:auto;margin:0 auto;border-collapse:collapse;font-family:var(--f-codigo)"><tr>${["A", "B", "A Y B", "A O B", "NO A"].map(h => `<th style="border:1.5px solid var(--linea2);padding:6px 12px;background:var(--cuadro);font-family:var(--f-titulo)">${h}</th>`).join("")}</tr>${[[1, 1], [1, 0], [0, 1], [0, 0]].map(([a, b]) => `<tr>${[a, b, a && b, a || b, !a].map(v => `<td style="border:1.5px solid var(--linea2);padding:6px 12px;text-align:center;${v ? "background:color-mix(in srgb,var(--verde) 18%,transparent)" : ""}">${v ? "V" : "F"}</td>`).join("")}</tr>`).join("")}</table>`;
  const f = B.DIAGRAMAS[nombre]; return f ? f() : "";
}

/* =========================================================
   BLOQUES DE CLASE
   ========================================================= */
const INTERACTIVOS = new Set(["inicio", "predecir", "traza", "error", "chequeo", "autoexplica", "critica"]);
B.esInteractivo = b => INTERACTIVOS.has(b.t);
B.bloqueResuelto = b => {
  if (!B.esInteractivo(b)) return true;
  if (b.t === "chequeo") return !!(B.P.ej[b.id] || S.res[b.id]);
  return !!(B.P.resp[b.id] && B.P.resp[b.id].hecho);
};
const resp = id => B.P.resp[id] || {};
function marcarResuelto(id, extra = {}) { B.P.resp[id] = Object.assign({}, B.P.resp[id] || {}, extra, { hecho: true }); B.actividad(); B.guardar(); }

B.renderBloque = (b, ctx = {}) => {
  const id = b.id, R = resp(id);
  switch (b.t) {
    case "texto": return `<section class="bloque leer">${B.conTerminos(b.html)}</section>`;
    case "tip": case "ojo": case "dato": {
      const titulo = { tip: "Tip", ojo: "Ojo con esto", dato: "Dato" }[b.t];
      return `<aside class="bloque nota-${b.t}"><p class="tipo-bloque">${titulo}</p>${B.conTerminos(b.html)}</aside>`;
    }
    case "analogia": return `<section class="bloque hoja analogia"><p class="tipo-bloque">Para entenderlo mejor</p><h3>${esc(b.titulo)}</h3>${B.conTerminos(b.html)}</section>`;
    case "conecta": return `<section class="bloque hoja sin-margen" style="border-style:dashed"><p class="tipo-bloque">Conexión</p>${B.conTerminos(b.html)}</section>`;
    case "diagrama": return `<figure class="bloque diagrama">${diagramaHTML(b.svg)}${b.pie ? `<figcaption>${esc(b.pie)}</figcaption>` : ""}</figure>`;
    case "resumen": return `<section class="bloque hoja"><p class="tipo-bloque">Para llevar</p><ul>${b.puntos.map(p => `<li>${B.conTerminos(esc(p))}</li>`).join("")}</ul></section>`;
    case "simbolos": return `<section class="bloque"><p class="tipo-bloque">Los signos de este código</p><div class="tabla-simbolos">${b.claves.map(k => tarjetaSimbolo(k)).join("")}</div></section>`;
    case "comparar": return `<section class="bloque"><div class="comparar"><div><h4>${esc(b.izquierda.titulo)}</h4>${B.bloqueCodigo(b.izquierda.codigo, b.izquierda.lang)}</div><div><h4>${esc(b.derecha.titulo)}</h4>${B.bloqueCodigo(b.derecha.codigo, b.derecha.lang, { botones: probarBtn(b.derecha.codigo, b.derecha.lang) })}</div></div>${b.nota ? `<p class="mano" style="text-align:center">${esc(b.nota)}</p>` : ""}</section>`;
    case "ejemplo": return bloqueEjemplo(b);
    case "inicio": return `<section class="bloque hoja" id="bl-${id}"><p class="tipo-bloque">Antes de empezar</p><h3>${esc(b.pregunta)}</h3>
      <textarea class="campo-texto" data-a="nota-bloque" data-id="${id}" placeholder="Escribe lo que piensas (opcional)…">${esc(R.texto || "")}</textarea>
      ${R.hecho ? `<div class="retro ok" style="grid-template-columns:62px 1fr">${B.nala("cara-piensa")}<div>${B.conTerminos(esc(b.nota))}</div></div>` : `<div class="acciones"><button class="btn" data-a="revelar" data-id="${id}">Ver qué piensa Nala</button></div>`}</section>`;
    case "critica": return `<section class="bloque hoja" id="bl-${id}"><p class="tipo-bloque">Piensa con criterio</p><h3>${esc(b.pregunta)}</h3>
      <textarea class="campo-texto" data-a="nota-bloque" data-id="${id}" placeholder="Escribe tu postura y por qué…">${esc(R.texto || "")}</textarea>
      ${R.hecho ? `<div class="respuesta-experta"><b>Otra mirada:</b> ${B.conTerminos(esc(b.respuesta))}<p class="mano" style="margin-top:8px">¿En qué coincides y en qué no? No hay una sola forma de pensarlo.</p></div>` : `<div class="acciones"><button class="btn" data-a="revelar" data-id="${id}">Comparar con otra mirada</button></div>`}</section>`;
    case "autoexplica": return `<section class="bloque hoja autoexpl" id="bl-${id}"><p class="tipo-bloque">Explícalo con tus palabras</p><h3>${esc(b.pregunta)}</h3>
      <textarea class="campo-texto" data-a="nota-bloque" data-id="${id}" placeholder="Escribe como si se lo explicaras a un amigo…">${esc(R.texto || "")}</textarea>
      ${R.hecho ? `<p style="margin:12px 0 0"><b>Revisa si tu explicación incluye:</b></p><ul class="ideas">${b.ideas.map((x, i) => `<li><input type="checkbox" data-a="idea" data-id="${id}" data-k="${i}" ${(R.ideas || [])[i] ? "checked" : ""} id="${id}-i${i}"><label for="${id}-i${i}">${esc(x)}</label></li>`).join("")}</ul><p class="suave" style="font-size:.9rem;margin-top:8px">Si te faltó algo, mejora tu texto y vuelve a guardar. Queda en tu bitácora.</p><div class="acciones"><button class="btn claro peq" data-a="guardar-explicacion" data-id="${id}">Guardar cambios</button></div>` : `<div class="acciones"><button class="btn" data-a="guardar-explicacion" data-id="${id}">Guardar en mi bitácora</button></div>`}</section>`;
    case "predecir": return bloquePredecir(b);
    case "traza": return bloqueTraza(b);
    case "error": return bloqueError(b);
    case "chequeo": return `<section class="bloque">${B.ejercicio(b.e, "chequeo")}</section>`;
  }
  return "";
};
function tarjetaSimbolo(k) {
  const info = (window.SIMBOLOS || {})[k];
  if (info) { const vis = k.includes(":") && k.length > 2 ? k.split(":").slice(1).join(":") : k; return `<div class="simbolo"><span class="s">${esc(vis === "\"" ? "\" \"" : vis)}</span><div><b>${esc(info.nombre)}</b><small class="mano" style="font-size:1.15rem">se lee ${esc(info.lee)}</small><small>${esc(info.que)}</small></div></div>`; }
  const p = B.infoPalabra(k);
  return p ? `<div class="simbolo"><span class="s">${esc(k)}</span><div><b>Palabra clave</b><small>${esc(p)}</small></div></div>` : "";
}
function probarBtn(codigo, lang) {
  if (!["python", "javascript", "html"].includes(lang)) return "";
  return `<button data-a="abrir-lab" data-lang="${lang}" data-codigo="${esc(codigo)}">Probar</button>`;
}
function bloqueEjemplo(b) {
  let n = 0;
  const todo = b.partes.map(p => p.lineas.map(l => l[0]).join("\n")).join("\n");
  const partes = b.partes.map(p => {
    const desde = n; n += p.lineas.length;
    const html = p.lineas.map((l, i) => `<span class="ln" data-n="${desde + i + 1}">${B.resaltarLinea(l[0], b.lang) || " "}</span>`).join("");
    return `<div class="parte"><div class="meta">${esc(p.meta)}</div><div class="codigo" data-lang="${b.lang}"><pre><code>${html}</code></pre></div><div class="anotaciones">${p.lineas.filter(l => l[1]).map(l => `<div class="anot">${B.conTerminos(esc(l[1]))}</div>`).join("")}</div></div>`;
  }).join("");
  return `<section class="bloque hoja ejemplo"><div class="fila entre"><p class="tipo-bloque" style="margin:0">Ejemplo resuelto</p><span class="fila">${probarBtn(todo, b.lang) ? `<button class="btn claro peq" data-a="abrir-lab" data-lang="${b.lang}" data-codigo="${esc(todo)}">Probar en el laboratorio</button>` : ""}</span></div><h3>${esc(b.titulo)}</h3><p class="suave" style="font-size:.9rem">Toca cualquier signo o palabra resaltada del código para ver qué significa.</p>${partes}</section>`;
}
function bloquePredecir(b) {
  const R = resp(b.id), elegido = R.eleccion, visto = R.hecho;
  const ops = b.opciones.map((o, k) => {
    let c = "opcion"; if (elegido === k) c += " sel"; if (visto && k === b.respuesta) c += " bien"; else if (visto && elegido === k) c += " mal";
    return `<button class="${c}" data-a="predecir" data-id="${b.id}" data-k="${k}" ${visto ? "disabled" : ""}><span class="letra">${"ABCD"[k]}</span><span>${esc(o)}</span></button>`;
  }).join("");
  const ejecutable = ["python", "javascript"].includes(b.lang);
  return `<section class="bloque hoja" id="bl-${b.id}"><p class="tipo-bloque">Predice antes de ejecutar</p>
    ${B.bloqueCodigo(b.codigo, b.lang)}${b.entradas && b.entradas.length ? `<p class="suave" style="font-size:.9rem">El usuario escribirá: <code>${b.entradas.map(esc).join("</code>, <code>")}</code></p>` : ""}
    <div class="ejer"><div class="enunciado">${esc(b.pregunta)}</div><div class="opciones">${ops}</div></div>
    ${elegido !== undefined && !visto ? `<div class="acciones"><button class="btn verde" data-a="ejecutar-prediccion" data-id="${b.id}">${ejecutable ? "Ejecutar y comprobar" : "Ver el resultado"}</button></div>` : ""}
    ${visto ? `<p style="margin:14px 0 4px"><b>Al ejecutarlo:</b></p><div class="consola">${esc(R.salidaReal ?? b.salida)}</div>
      <div class="retro ${elegido === b.respuesta ? "ok" : "no"}">${B.nala(elegido === b.respuesta ? "cara-feliz" : "cara-piensa")}<div><b>${elegido === b.respuesta ? "¡Predijiste bien!" : "Tu predicción no coincidió, y eso está bien."}</b><div>${B.conTerminos(esc(b.explicacion))}</div>${elegido !== b.respuesta ? `<p class="mano" style="margin-top:6px">Lo que te sorprendió es justo lo que acabas de aprender.</p>` : ""}</div></div>
      ${ejecutable ? `<div class="acciones"><button class="btn claro peq" data-a="abrir-lab" data-lang="${b.lang}" data-codigo="${esc(b.codigo)}" data-entradas="${esc((b.entradas || []).join("\n"))}">Investiga: modifícalo en el laboratorio</button></div>` : ""}` : ""}
  </section>`;
}
function bloqueTraza(b) {
  const i = S.traza[b.id] ?? (resp(b.id).hecho ? b.pasos.length - 1 : 0);
  S.traza[b.id] = i;
  const p = b.pasos[i], ant = i > 0 ? b.pasos[i - 1] : { v: {} };
  const celdas = b.vars.map(v => { const val = p.v[v] ?? ""; const cambio = val !== (ant.v[v] ?? "") && val !== ""; return `<td class="${cambio ? "cambio" : ""}">${esc(val || "-")}</td>`; }).join("");
  return `<section class="bloque hoja" id="bl-${b.id}"><p class="tipo-bloque">Sigue el código paso a paso</p>
    <div class="traza"><div>${B.bloqueCodigo(b.codigo, b.lang, { marcar: p.l, sinCopiar: true })}</div>
      <div><table class="tabla-vars"><tr>${b.vars.map(v => `<th>${esc(v)}</th>`).join("")}</tr><tr>${celdas}</tr></table>
        <div class="salida" aria-label="Salida">${esc(p.sal) || '<span style="color:#7D8B97;font-style:italic">(la pantalla todavía está vacía)</span>'}</div>
        <p class="nota-paso">${esc(p.nota || "")}</p></div></div>
    <div class="controles"><button class="btn claro peq" data-a="traza" data-id="${b.id}" data-d="-1" ${i === 0 ? "disabled" : ""}>Atrás</button><button class="btn peq" data-a="traza" data-id="${b.id}" data-d="1" ${i === b.pasos.length - 1 ? "disabled" : ""}>Siguiente paso</button><span class="paso">Paso ${i + 1} de ${b.pasos.length}</span>${i === b.pasos.length - 1 && !resp(b.id).hecho ? `<button class="btn verde peq" data-a="fin-traza" data-id="${b.id}">Entendido</button>` : ""}</div>
    <p class="suave" style="font-size:.88rem;margin:8px 0 0">La línea resaltada es la que se está ejecutando. Las celdas amarillas son las variables que acaban de cambiar.</p></section>`;
}
function bloqueError(b) {
  const R = resp(b.id), intentos = R.intentos || 0;
  const visto = R.hecho;
  return `<section class="bloque hoja" id="bl-${b.id}"><p class="tipo-bloque">Encuentra el error</p><p>Este código tiene un error. <b>Toca la línea donde está.</b></p>
    ${B.bloqueCodigo(b.codigo, b.lang, { tocable: !visto, id: b.id, mala: visto ? b.linea : (R.ultima && R.ultima !== b.linea ? R.ultima : 0) })}
    ${!visto && intentos > 0 ? `<p class="mano roja">Esa línea está bien. Lee de arriba hacia abajo, como la computadora.</p>${intentos >= 2 ? `<button class="btn texto" data-a="mostrar-error" data-id="${b.id}">Muéstrame dónde está</button>` : ""}` : ""}
    ${visto ? `<div class="retro ${R.acierto ? "ok" : "no"}">${B.nala(R.acierto ? "cara-feliz" : "explica")}<div><b>${R.acierto ? "¡Lo encontraste!" : "Aquí estaba:"} línea ${b.linea}.</b><div>${B.conTerminos(esc(b.explicacion))}</div>${b.arreglo ? `<p style="margin:8px 0 0"><span class="mano roja">Corrección:</span> <code>${esc(b.arreglo)}</code></p>` : ""}</div></div>` : ""}</section>`;
}

/* =========================================================
   EJERCICIOS (práctica, chequeos, prueba, repaso, validación)
   ctx: "chequeo" | "practica" | "repaso" | "prueba" | "validar"
   ========================================================= */
const TIPO = { opcion: "Elige", vf: "Verdadero o falso", escribir: "Escribe", ordenar: "Ordena", completar: "Completa", error: "Encuentra el error", codigo: "Programa" };
const opcionesDe = e => e.tipo === "vf" ? ["Verdadero", "Falso"] : e.opciones;
const correctaDe = e => e.tipo === "vf" ? (e.respuesta ? 0 : 1) : e.respuesta;
B.normalizar = s => String(s ?? "").toLowerCase().trim().replace(/[“”]/g, '"').replace(/[‘’']/g, '"').replace(/\s+/g, " ").replace(/\s*([,;()=*<>:])\s*/g, "$1").replace(/;+$/, "").replace(/\(\)$/, "");
function mezclaDe(e) {
  if (!S.mez[e.id]) { let m = B.mezclar(e.lineas.map((_, i) => i)), n = 0; while (m.every((k, i) => k === i) && n++ < 9) m = B.mezclar(m); S.mez[e.id] = m; }
  return S.mez[e.id];
}
const huecosDe = e => (e.plantilla.match(/___/g) || []).length;
B.evaluar = (e, r) => {
  if (e.tipo === "opcion" || e.tipo === "vf") return r === correctaDe(e);
  if (e.tipo === "escribir") return e.respuestas.some(a => B.normalizar(a) === B.normalizar(r));
  if (e.tipo === "ordenar") return Array.isArray(r) && r.length === e.lineas.length && r.every((k, i) => e.lineas[k] === e.lineas[i]);
  if (e.tipo === "completar") return Array.isArray(r) && e.respuestas.every((acep, i) => acep.some(a => B.normalizar(a) === B.normalizar(r[i])));
  if (e.tipo === "error") return r === e.linea;
  return false;
};
B.tieneRespuesta = (e, r) => {
  if (e.tipo === "opcion" || e.tipo === "vf" || e.tipo === "error") return r !== undefined;
  if (e.tipo === "escribir") return !!(r && String(r).trim());
  if (e.tipo === "ordenar") return Array.isArray(r) && r.length === e.lineas.length;
  if (e.tipo === "completar") return Array.isArray(r) && r.length === huecosDe(e) && r.every(x => x && x.trim());
  return true;
};
const PISTAS_GEN = {
  opcion: ["Descarta primero la opción que estás seguro de que es falsa. ¿Por qué lo es?", "Vuelve a leer la pregunta palabra por palabra: a veces la clave está en un «no» o en un «más»."],
  vf: ["Busca un ejemplo concreto que pruebe que es falso. Si no lo encuentras, puede ser verdadero."],
  escribir: ["Piensa en el ejemplo de la clase que más se parece.", "Si es una cuenta, hazla en papel paso a paso."],
  ordenar: ["¿Qué tiene que existir primero para que lo demás funcione?", "Piensa en entrada, proceso y salida."],
  completar: ["Lee la línea completa en voz alta: ¿qué palabra o signo falta para que tenga sentido?"],
  error: ["Lee el código de arriba hacia abajo, como la computadora. En cada línea pregúntate: ¿esto ya existe? ¿está bien escrito?", "Revisa signos: = contra ==, dos puntos, comillas y paréntesis."],
  codigo: ["Escribe primero en español qué debe hacer, paso a paso. Luego tradúcelo.", "Ejecuta aunque no esté terminado y lee el error o lo que muestra: es una pista.", "Mira la explicación del ejemplo resuelto más parecido de la clase."]
};

B.ejercicio = (e, ctx, num) => {
  const id = e.id, r = S.r[id];
  const enPrueba = ctx === "prueba" || ctx === "validar";
  const rev = enPrueba ? S.prueba.resultado && S.prueba.resultado.det : null;
  const estado = enPrueba ? (rev ? (rev[id] ? "ok" : "no") : undefined) : S.res[id];
  const mostrar = estado !== undefined, bloq = mostrar;
  let cuerpo = "";
  if (e.tipo === "opcion" || e.tipo === "vf") {
    const ops = opcionesDe(e), ok = correctaDe(e);
    cuerpo = `<div class="opciones ${e.tipo === "vf" ? "vf" : ""}">${ops.map((o, k) => {
      let c = "opcion"; if (r === k) c += " sel"; if (mostrar && k === ok && (ctx !== "chequeo" || estado === "ok" || S.pista[id] >= 9)) c += " bien"; else if (mostrar && r === k && estado === "no") c += " mal";
      return `<button class="${c}" data-a="elegir" data-id="${id}" data-k="${k}" ${bloq ? "disabled" : ""}><span class="letra">${e.tipo === "vf" ? (k ? "F" : "V") : "ABCDEF"[k]}</span><span>${esc(o)}</span></button>`;
    }).join("")}</div>`;
  } else if (e.tipo === "escribir") {
    cuerpo = `<input class="entrada" data-a="escribir" data-id="${id}" value="${esc(r || "")}" placeholder="Tu respuesta" autocomplete="off" autocapitalize="off" spellcheck="false" ${bloq ? "disabled" : ""}>${mostrar && estado === "no" ? `<p class="suave" style="margin:8px 0 0">Respuesta esperada: <code>${esc(e.respuestas[0])}</code></p>` : ""}`;
  } else if (e.tipo === "ordenar") {
    const m = mezclaDe(e), el = r || [];
    cuerpo = `<div class="zona-orden">${el.map((k, pos) => `<button class="pieza" data-a="quitar-pieza" data-id="${id}" data-k="${pos}" ${bloq ? "disabled" : ""}><span class="pos">${pos + 1}.</span>${esc(e.lineas[k])}</button>`).join("")}</div>
      ${bloq ? (estado === "no" ? `<p class="suave">Orden correcto:</p><div class="piezas">${e.lineas.map((l, i) => `<div class="pieza"><span class="pos">${i + 1}.</span>${esc(l)}</div>`).join("")}</div>` : "") : `<div class="piezas">${m.map(k => `<button class="pieza ${el.includes(k) ? "usada" : ""}" data-a="poner-pieza" data-id="${id}" data-k="${k}">${esc(e.lineas[k])}</button>`).join("")}</div>`}`;
  } else if (e.tipo === "completar") {
    let k = -1; const val = r || [];
    const html = esc(e.plantilla).replace(/___/g, () => { k++; const ok = mostrar ? e.respuestas[k].some(a => B.normalizar(a) === B.normalizar(val[k])) : null; return `<input data-a="hueco" data-id="${id}" data-k="${k}" value="${esc(val[k] || "")}" size="${Math.max(3, (e.respuestas[k][0] || "").length + 1)}" class="${ok === null ? "" : ok ? "bien" : "mal"}" ${bloq ? "disabled" : ""} autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Hueco ${k + 1}">`; });
    cuerpo = `<div class="huecos" data-lang="${e.lang || ""}">${html}</div>${mostrar && estado === "no" ? `<p class="suave" style="margin:8px 0 0">Respuesta: <code>${e.respuestas.map(a => esc(a[0])).join("</code>, <code>")}</code></p>` : ""}`;
  } else if (e.tipo === "error") {
    cuerpo = `<p class="suave" style="margin:0 0 6px">Toca la línea que tiene el error.</p>${B.bloqueCodigo(e.codigo, e.lang, { tocable: !bloq, id, marcar: !mostrar ? r : 0, mala: mostrar ? e.linea : 0, sinCopiar: true })}`;
  } else if (e.tipo === "codigo") {
    cuerpo = editorCodigo(e, ctx, bloq && estado === "ok");
  }
  let pie = "";
  const pistaN = S.pista[id] || 0, pistas = (e.pistas || []).concat(PISTAS_GEN[e.tipo] || []);
  const pistaHTML = pistaN > 0 && pistaN < 9 ? `<div class="pista"><span class="mano">Pista ${Math.min(pistaN, pistas.length)}:</span> ${esc(pistas[Math.min(pistaN, pistas.length) - 1] || "")}</div>` : "";
  if (!enPrueba) {
    if (!mostrar) {
      pie = `${pistaHTML}${ctx === "practica" ? confianzaHTML(id) : ""}<div class="acciones">${e.tipo !== "codigo" && e.tipo !== "error" ? `<button class="btn" data-a="comprobar" data-id="${id}" ${B.tieneRespuesta(e, r) ? "" : "disabled"}>Comprobar</button>` : ""}${pistaN < pistas.length ? `<button class="btn texto" data-a="pista" data-id="${id}">${pistaN ? "Otra pista" : "Pedir una pista"}</button>` : ""}</div>`;
    } else {
      pie = `<div class="retro ${estado}">${B.nala(estado === "ok" ? "cara-feliz" : "cara-piensa")}<div><b>${estado === "ok" ? ["¡Bien hecho!", "¡Exacto!", "¡Eso es!"][B.hash(id) % 3] : "Todavía no."}</b><div>${B.conTerminos(esc(e.explicacion))}</div></div></div>
        <div class="acciones">${estado === "no" ? `<button class="btn" data-a="reintentar" data-id="${id}">Intentar de nuevo</button>` : ""}${estado === "no" && ctx === "chequeo" ? `<button class="btn texto" data-a="seguir-igual" data-id="${id}">Seguir y repasarlo después</button>` : ""}</div>`;
    }
  } else if (!rev) {
    pie = confianzaHTML(id);
  } else {
    pie = `<div class="retro ${estado}">${B.nala(estado === "ok" ? "cara-feliz" : "cara-piensa")}<div><b>${estado === "ok" ? "Correcta" : "Incorrecta"}</b><div>${B.conTerminos(esc(e.explicacion))}</div></div></div>`;
  }
  const yaResuelto = (ctx === "practica" || ctx === "chequeo") && B.P.ej[id] && B.P.ej[id].ok && !mostrar;
  return `<div class="hoja ejer ${estado === "ok" ? "resuelto" : ""}" id="q-${id}" data-ctx="${ctx}" data-num="${num || ""}">
    ${num ? `<span class="num-margen">${num}</span>` : ""}<div class="fila entre" style="margin-bottom:6px"><span class="etiqueta">${TIPO[e.tipo] || ""}</span>${yaResuelto ? '<span class="etiqueta ok">Ya lo resolviste</span>' : ""}</div>
    <div class="enunciado">${B.conTerminos(esc(e.pregunta))}</div>${cuerpo}${pie}</div>`;
};
function confianzaHTML(id) {
  const c = S.conf[id];
  return `<div class="confianza">¿Qué tan seguro estás? ${[["adivino", "Adivino"], ["creo", "Creo que sí"], ["seguro", "Seguro"]].map(([k, t]) => `<button class="${c === k ? "activo" : ""}" data-a="confianza" data-id="${id}" data-v="${k}">${t}</button>`).join("")}</div>`;
}
function editorCodigo(e, ctx, soloLectura) {
  const id = e.id, lang = e.lang || "javascript", t = S.tests[id];
  const usaEntradas = lang === "python" && !e.funcion && !e.casos;
  let res = "";
  if (t) {
    if (t.consola && t.consola.length) res += `<div class="consola">${consolaHTML(t.consola)}</div>`;
    else if (t.logs && t.logs.length) res += `<div class="consola">${esc(t.logs.join("\n"))}</div>`;
    if (t.error) res += `<div class="traduccion"><b>${esc(t.error.tipo)}${t.error.linea ? " en la línea " + t.error.linea : ""}:</b> <code>${esc(t.error.mensaje)}</code><br>${esc(B.traducirError(t.error))}</div>`;
    if (t.resultados) res += `<div class="pruebas">${t.resultados.map(x => `<div class="prueba ${x.ok ? "ok" : "no"}">${x.ok ? "✓" : "✗"} ${esc(e.funcion)}(${esc(x.args)}) → ${x.error ? esc(x.error) : esc(x.r)}${x.ok ? "" : "   (se esperaba " + esc(x.esp) + ")"}</div>`).join("")}</div>`;
    if (t.casosRes) res += `<div class="pruebas">${t.casosRes.map(x => `<div class="prueba ${x.ok ? "ok" : "no"}">${x.ok ? "✓" : "✗"} Con entradas ${esc(x.entradas.join(", "))} mostró: ${esc(x.obtuvo || "(nada)")}${x.ok ? "" : "\n   se esperaba: " + esc(x.esperado)}</div>`).join("")}</div>`;
  }
  const corriendo = S.corriendo[id];
  return `<textarea class="editor" data-a="codigo" data-id="${id}" spellcheck="false" autocapitalize="off" ${soloLectura ? "readonly" : ""} aria-label="Editor de código">${esc(S.r[id] ?? e.inicial ?? "")}</textarea>
    ${usaEntradas ? `<label class="suave" style="font-size:.88rem;display:block;margin-top:6px">Entradas (una por línea, para input()):<textarea class="editor" style="min-height:60px" data-a="entradas" data-id="${id}">${esc(S.r[id + "-ent"] || "")}</textarea></label>` : ""}
    ${!soloLectura ? `<div class="acciones"><button class="btn verde" data-a="correr" data-id="${id}" ${corriendo ? "disabled" : ""}>${corriendo ? (lang === "python" && !B.pythonListo() ? "Preparando Python…" : "Ejecutando…") : (ctx === "prueba" || ctx === "validar" ? "Probar mi código" : "Ejecutar y comprobar")}</button><button class="btn texto" data-a="reiniciar-codigo" data-id="${id}">Volver al código inicial</button></div>` : ""}
    ${res}`;
}
function consolaHTML(c) { return c.map(([t, s]) => t === "ent" ? `<span class="ent">${esc(s)}</span>` : esc(s)).join(""); }
B.consolaHTML = consolaHTML;

/* Corre el código de un ejercicio y deja el resultado en S.tests[id] */
B.correrEjercicio = async e => {
  const id = e.id, lang = e.lang || "javascript", codigo = S.r[id] ?? e.inicial ?? "";
  let out;
  if (lang === "python") {
    if (e.funcion) {
      const r = await B.ejecutarPython(codigo, { funcion: e.funcion, pruebas: e.pruebas });
      out = { consola: r.consola, error: r.error, resultados: r.resultados, ok: !r.error && r.resultados && r.resultados.every(x => x.ok) };
    } else if (e.casos) {
      const casosRes = []; let consola = [], error = null;
      for (const c of e.casos) {
        const r = await B.ejecutarPython(codigo, { entradas: c.entradas });
        if (r.error) { error = r.error; consola = r.consola; break; }
        const limpio = s => String(s).split("\n").map(l => l.trimEnd()).join("\n").trim();
        casosRes.push({ entradas: c.entradas, obtuvo: limpio(r.limpio), esperado: c.salida, ok: limpio(r.limpio) === limpio(c.salida) });
        consola = r.consola;
      }
      out = { consola, error, casosRes: error ? null : casosRes, ok: !error && casosRes.every(x => x.ok) };
    } else {
      const ent = (S.r[id + "-ent"] || "").split("\n").filter(x => x !== "");
      const r = await B.ejecutarPython(codigo, { entradas: ent });
      const lineas = String(r.limpio).split("\n").filter(l => l.trim()).length;
      out = { consola: r.consola, error: r.error, ok: !r.error && lineas >= (e.minSalidas || 1) };
      if (!r.error && !out.ok) out.error = { tipo: "Aviso", mensaje: `Tu programa mostró ${lineas} línea(s) y se piden al menos ${e.minSalidas || 1}.` };
    }
  } else {
    const r = await B.ejecutarJS(codigo, e.funcion || null, e.pruebas || null);
    out = { logs: r.logs, error: r.error, resultados: r.resultados, ok: !!r.ok && (!!e.funcion || (r.logs || []).length >= (e.minSalidas || 0)) };
  }
  S.tests[id] = out;
  return out;
};
})(window.B);
