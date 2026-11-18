/* =========================================================
   APP: marco, navegación, acciones y arranque
   ========================================================= */
(function (B) {
"use strict";
const { esc, $, $$, S, acc } = B;

/* ---------- íconos ---------- */
const ic = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const IC = {
  inicio: ic('<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4M8 14l2.5 2.5L16 12"/>'),
  pensum: ic('<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>'),
  repaso: ic('<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>'),
  bitacora: ic('<path d="M5 3h12a2 2 0 0 1 2 2v16H7a2 2 0 0 1-2-2z"/><path d="M5 17a2 2 0 0 1 2-2h12M9 7h6M9 11h4"/>'),
  simbolos: ic('<path d="M8 4c-2 0-3 1-3 3v2c0 1.5-1 2.5-2 3 1 .5 2 1.5 2 3v2c0 2 1 3 3 3M16 4c2 0 3 1 3 3v2c0 1.5 1 2.5 2 3-1 .5-2 1.5-2 3v2c0 2-1 3-3 3"/>'),
  glosario: ic('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M8 7h8M8 11h6"/>'),
  lab: ic('<path d="M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3"/><path d="M7 15h10"/>'),
  perfil: ic('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),
  reloj: ic('<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6"/>')
};
const MENU = [["inicio", "Hoy"], ["pensum", "Plan de estudios"], ["repaso", "Repaso"], ["bitacora", "Mi bitácora"], ["simbolos", "Símbolos"], ["glosario", "Glosario"], ["lab", "Laboratorio"], ["perfil", "Perfil"]];
const MENU_MOVIL = [["inicio", "Hoy"], ["pensum", "Plan"], ["repaso", "Repaso"], ["lab", "Lab"], ["perfil", "Perfil"]];

/* ---------- marco ---------- */
function seccion() {
  const v = vista();
  if (/^(materia|clase|validar)-/.test(v)) return "pensum";
  if (v.startsWith("constancia")) return "perfil";
  return v;
}
function rutaTexto() {
  const v = vista();
  if (v.startsWith("materia-")) { const c = B.CUR[v.slice(8)]; return c ? `<span>Plan de estudios /</span> ${esc(c.codigo)} ${esc(c.titulo)}` : ""; }
  if (v.startsWith("clase-")) { const x = B.CLASE[v.slice(6)]; return x ? `<span>${esc(x.curso.codigo)} /</span> ${esc(x.clase.titulo)}` : ""; }
  if (v.startsWith("validar-")) { const c = B.CUR[v.slice(8)]; return c ? `<span>Validar /</span> ${esc(c.codigo)}` : ""; }
  const m = MENU.find(x => x[0] === v); return m ? esc(m[1]) : "";
}
B.marco = () => {
  const sec = seccion(), rep = B.cuantosRepaso(), racha = B.racha(), n = B.P.perfil.nombre;
  $("#lomo").innerHTML = `<a class="marca" href="#inicio"><img src="img/nala/cara.svg" alt=""><div><b>Bitácora</b><small>Universidad abierta de programación</small></div></a>
    ${MENU.map(([k, t]) => `<button class="pestana ${sec === k ? "activa" : ""}" data-a="ir" data-v="${k}" title="${t}">${IC[k]}<span>${t}</span>${k === "repaso" && rep ? `<em class="cuenta">${rep}</em>` : ""}</button>`).join("")}
    <div class="pie">${n ? `<b>${esc(n)}</b><br>` : ""}${B.CURSOS.filter(c => B.estadoCurso(c).completo).length} de ${B.CURSOS.length + (window.PROXIMAS || []).length} materias</div>`;
  $("#barra").innerHTML = `<div class="ruta">${rutaTexto()}</div><a class="marca-movil" href="#inicio"><img src="img/nala/cara.svg" alt="">Bitácora</a>
    <span class="chip-barra racha-chip ${racha ? "" : "apagado"}" title="Días seguidos estudiando">${racha} <span class="txt">${racha === 1 ? "día" : "días"} seguidos</span></span>
    <button class="boton-icono ${S.enfoque ? "activo" : ""}" data-a="enfoque" title="Sesión de enfoque" aria-label="Sesión de enfoque">${IC.reloj}</button>
    <button class="boton-icono" data-a="ir" data-v="simbolos" title="Símbolos" aria-label="Símbolos">${IC.simbolos}</button>`;
  $("#inferior").innerHTML = MENU_MOVIL.map(([k, t]) => `<button class="${sec === k ? "activa" : ""}" data-a="ir" data-v="${k}">${IC[k]}<span>${t}</span>${k === "repaso" && rep ? `<em class="cuenta">${rep}</em>` : ""}</button>`).join("");
};

/* ---------- navegación ---------- */
function vista() { return (location.hash || "#inicio").slice(1) || "inicio"; }
B.vista = vista;
B.render = (op = {}) => {
  const y = scrollY, v = vista();
  let html = null;
  B.cerrarGlobo();
  if (v.startsWith("materia-") && B.CUR[v.slice(8)]) html = B.V.materia(B.CUR[v.slice(8)]);
  else if (v.startsWith("clase-") && B.CLASE[v.slice(6)]) html = B.V.clase(B.CLASE[v.slice(6)].clase);
  else if (v.startsWith("validar-") && B.CUR[v.slice(8)]) html = B.V.validar(B.CUR[v.slice(8)]);
  else if (v.startsWith("constancia-")) html = B.V.constancia(+v.slice(11));
  else if (B.V[v] && !["materia", "clase", "validar", "examen", "constancia"].includes(v)) html = B.V[v]();
  if (html === null) html = B.V.inicio();
  const main = $("#vista");
  main.innerHTML = html;
  if (op.anim !== false) { main.classList.remove("entra"); void main.offsetWidth; main.classList.add("entra"); }
  if (op.mantener) scrollTo(0, y); else if (S.ultimaVista !== v) scrollTo(0, 0);
  S.ultimaVista = v;
  B.marco();
  document.title = (rutaTexto().replace(/<[^>]+>/g, "") || "Hoy") + " · Bitácora";
  if (v === "lab" && B.labEstado().modo === "html") actualizarVistaWeb();
};
addEventListener("hashchange", () => { B.cerrarModal(); B.render(); });
acc.ir = el => { B.sonar("clic"); const v = el.dataset.v; if (vista() === v) B.render(); else location.hash = v; };

/* ---------- capas ---------- */
B.modal = html => { $("#capa").innerHTML = `<div class="fondo-modal" data-a="fondo-modal"><div class="modal" role="dialog" aria-modal="true"><button class="boton-icono cerrar" data-a="cerrar-modal" aria-label="Cerrar">✕</button>${html}</div></div>`; };
B.cerrarModal = () => { $("#capa").innerHTML = ""; };
acc["cerrar-modal"] = () => B.cerrarModal();
acc["fondo-modal"] = (el, ev) => { if (ev.target === el) B.cerrarModal(); };
acc["cerrar-globo"] = () => B.cerrarGlobo();
B.aviso = (pose, titulo, texto) => {
  const d = document.createElement("div"); d.className = "aviso";
  d.innerHTML = `${B.nala(pose)}<div><b>${esc(titulo)}</b><small>${esc(texto || "")}</small></div>`;
  $("#avisos").appendChild(d);
  setTimeout(() => { d.classList.add("sale"); setTimeout(() => d.remove(), 300); }, 4200);
};

/* ---------- Nala como guía ---------- */
const CONSEJOS = {
  inicio: "No hay respuesta mala aquí. Pensar antes de leer prepara tu cerebro para lo nuevo.",
  predecir: "Elige tu predicción ANTES de ejecutar. Comprometerte con una respuesta, aciertes o no, hace que aprendas más.",
  traza: "Avanza paso a paso y mira qué variable cambia. Así piensa la computadora.",
  error: "Lee de arriba hacia abajo, como la computadora. En cada línea pregúntate: ¿esto ya existe? ¿está bien escrito?",
  chequeo: "Responde sin volver a mirar arriba. Intentar recordar es lo que fija lo aprendido.",
  autoexplica: "Escríbelo como si se lo explicaras a un amigo. Si no te sale, ahí está justo lo que falta.",
  critica: "No hay una sola respuesta. Lo importante es que puedas defender tu idea con razones."
};
B.coach = (texto, pose = "cara-piensa") => {
  if (!B.P.perfil.coach) return;
  $("#coach").innerHTML = `<div class="dice"><button data-a="cerrar-coach" aria-label="Cerrar">✕</button>${esc(texto)}</div><img src="img/nala/${pose}.svg" alt="Nala" data-a="cerrar-coach">`;
  clearTimeout(S.coachT); S.coachT = setTimeout(() => { $("#coach").innerHTML = ""; }, 14000);
};
acc["cerrar-coach"] = () => { $("#coach").innerHTML = ""; };
function consejoPara(b) { S.coachVisto = S.coachVisto || {}; if (b && CONSEJOS[b.t] && !S.coachVisto[b.t]) { S.coachVisto[b.t] = 1; B.coach(CONSEJOS[b.t]); } }

/* =========================================================
   CLASE: avanzar, terminar, bloques interactivos
   ========================================================= */
B.parada = (cl, desde) => { for (let i = desde; i < cl.bloques.length; i++) if (B.esInteractivo(cl.bloques[i])) return i; return cl.bloques.length - 1; };
const claseActual = () => { const v = vista(); return v.startsWith("clase-") ? B.CLASE[v.slice(6)] : null; };
const bloque = id => { const x = claseActual(); return x ? x.clase.bloques.find(b => b.id === id) : null; };
function refrescarBloque(b) { const el = $("#bl-" + b.id); if (el) el.outerHTML = B.renderBloque(b); refrescarPie(); }
function refrescarPie() {
  const x = claseActual(); if (!x) return;
  const tmp = document.createElement("div"); tmp.innerHTML = B.V.clase(x.clase);
  const pie = tmp.querySelector("#pie-clase"), barra = tmp.querySelector(".clase-top .progreso");
  if (pie) $("#pie-clase").innerHTML = pie.innerHTML;
  if (barra) $(".clase-top .progreso").innerHTML = barra.innerHTML;
}
acc.continuar = el => {
  const { clase: cl } = B.CLASE[el.dataset.id], reg = B.P.clases[cl.id];
  const desde = reg.hasta + 1;
  reg.hasta = B.parada(cl, desde); B.guardar();
  B.render({ anim: false, mantener: true });
  const nuevo = $$("#bloques > *")[desde];
  if (nuevo) nuevo.scrollIntoView({ behavior: "smooth", block: "start" });
  consejoPara(cl.bloques[reg.hasta]);
};
acc["terminar-clase"] = el => {
  const { clase: cl, curso: c } = B.CLASE[el.dataset.id], reg = B.P.clases[cl.id];
  reg.fin = B.hoy(); reg.claridad = +el.dataset.v;
  if (reg.claridad === 1) cl.bloques.filter(b => b.t === "chequeo").forEach(b => { const s = B.P.srs[b.id]; if (s) s.prox = B.sumarDias(B.hoy(), 1); });
  B.actividad(); B.guardar(); B.sonar("logro");
  B.aviso("cara-feliz", "Clase terminada", reg.claridad === 1 ? "La repasaremos pronto. No pasa nada: así se aprende." : "Lo que respondiste vuelve en tu repaso en unos días.");
  verificarCurso(c);
  B.render({ anim: false, mantener: true });
};
acc.revelar = el => {
  const b = bloque(el.dataset.id); if (!b) return;
  const t = $(`textarea[data-id="${b.id}"]`), texto = t ? t.value : "";
  B.P.resp[b.id] = Object.assign({}, B.P.resp[b.id], { texto, hecho: true });
  if (texto.trim() && b.t === "critica") B.anotar(claseActual().curso.id, claseActual().clase.id, "Pensamiento crítico", b.pregunta, texto);
  B.actividad(); B.guardar(); refrescarBloque(b);
};
acc["guardar-explicacion"] = el => {
  const b = bloque(el.dataset.id); if (!b) return;
  const texto = ($(`textarea[data-id="${b.id}"]`) || {}).value || "";
  if (texto.trim().length < 15) { B.coach("Escribe un poco más: al menos una o dos frases con tus palabras. Es la parte que más te ayuda a recordar.", "cara-piensa"); return; }
  B.P.resp[b.id] = Object.assign({}, B.P.resp[b.id], { texto, hecho: true });
  const x = claseActual(); B.anotar(x.curso.id, x.clase.id, "Explicación propia", b.pregunta, texto);
  B.actividad(); B.guardar(); B.sonar("correcto"); refrescarBloque(b);
};
acc.predecir = el => { const b = bloque(el.dataset.id); B.P.resp[b.id] = Object.assign({}, B.P.resp[b.id], { eleccion: +el.dataset.k }); B.guardar(); refrescarBloque(b); };
acc["ejecutar-prediccion"] = async el => {
  const b = bloque(el.dataset.id); if (!b) return;
  let salidaReal = null;
  if (b.lang === "python") {
    el.disabled = true; el.textContent = B.pythonListo() ? "Ejecutando…" : "Preparando Python (solo la primera vez)…";
    const r = await B.ejecutarPython(b.codigo, { entradas: b.entradas || [] });
    if (r.error && r.error.tipo === "Carga") salidaReal = null;
    else salidaReal = (r.limpio || "").replace(/\n$/, "") + (r.error ? (r.limpio ? "\n" : "") + r.error.tipo + ": " + r.error.mensaje : "");
  } else if (b.lang === "javascript") {
    const r = await B.ejecutarJS(b.codigo); salidaReal = (r.logs || []).join("\n") + (r.error ? "\n" + r.error.tipo + ": " + r.error.mensaje : "");
  }
  const ok = B.P.resp[b.id].eleccion === b.respuesta;
  B.P.resp[b.id] = Object.assign({}, B.P.resp[b.id], { hecho: true, salidaReal });
  B.actividad(); B.guardar(); B.sonar(ok ? "correcto" : "error"); refrescarBloque(b);
};
acc.traza = el => { const b = bloque(el.dataset.id); S.traza[b.id] = Math.max(0, Math.min(b.pasos.length - 1, (S.traza[b.id] || 0) + +el.dataset.d)); refrescarBloque(b); };
acc["fin-traza"] = el => { const b = bloque(el.dataset.id); B.P.resp[b.id] = { hecho: true }; B.actividad(); B.guardar(); refrescarBloque(b); };
acc["mostrar-error"] = el => { const b = bloque(el.dataset.id); B.P.resp[b.id] = Object.assign({}, B.P.resp[b.id], { hecho: true, acierto: false }); B.guardar(); refrescarBloque(b); };
acc["tocar-linea"] = (el) => {
  const id = el.dataset.id, n = +el.dataset.n;
  if (B.EJ[id]) { S.r[id] = n; const q = $("#q-" + id); if (q && (q.dataset.ctx === "prueba" || q.dataset.ctx === "validar")) refrescarEjercicio(id); else comprobar(id); return; }
  const b = bloque(id); if (!b) return;
  const R = B.P.resp[b.id] || {};
  if (n === b.linea) { B.P.resp[b.id] = Object.assign({}, R, { hecho: true, acierto: !(R.intentos || 0) }); B.sonar("correcto"); }
  else { B.P.resp[b.id] = Object.assign({}, R, { intentos: (R.intentos || 0) + 1, ultima: n }); B.sonar("error"); }
  B.actividad(); B.guardar(); refrescarBloque(b);
};
acc.idea = el => { const b = bloque(el.dataset.id); const R = B.P.resp[b.id]; R.ideas = R.ideas || []; R.ideas[+el.dataset.k] = el.checked; B.guardar(); };

/* =========================================================
   EJERCICIOS
   ========================================================= */
function refrescarEjercicio(id) {
  const q = $("#q-" + id); if (!q) return null;
  q.outerHTML = B.ejercicio(B.EJ[id].e, q.dataset.ctx, +q.dataset.num || 0);
  return $("#q-" + id);
}
async function comprobar(id) {
  const { e, curso } = B.EJ[id], q = $("#q-" + id), ctx = q ? q.dataset.ctx : "practica";
  let ok;
  if (e.tipo === "codigo") {
    S.corriendo[id] = true; refrescarEjercicio(id);
    const out = await B.correrEjercicio(e); S.corriendo[id] = false; ok = out.ok;
    if (!ok) { B.registrar(id, false, S.conf[id]); B.sonar("error"); refrescarEjercicio(id); if (ctx === "chequeo") refrescarPie(); return; }
  } else ok = B.evaluar(e, S.r[id]);
  S.res[id] = ok ? "ok" : "no";
  B.registrar(id, ok, S.conf[id]);
  B.sonar(ok ? "correcto" : "error");
  const nuevo = refrescarEjercicio(id);
  if (nuevo && !ok) nuevo.classList.add("sacude");
  if (ctx === "chequeo") refrescarPie();
  if (ctx === "practica") { verificarCurso(curso); setTimeout(() => B.render({ anim: false, mantener: true }), 900); }
  if (ctx === "repaso" && ok) B.marco();
}
acc.comprobar = el => comprobar(el.dataset.id);
acc.correr = el => {
  const id = el.dataset.id, q = $("#q-" + id);
  if (q && (q.dataset.ctx === "prueba" || q.dataset.ctx === "validar")) { S.corriendo[id] = true; refrescarEjercicio(id); B.correrEjercicio(B.EJ[id].e).then(() => { S.corriendo[id] = false; refrescarEjercicio(id); }); }
  else comprobar(id);
};
acc.elegir = el => { S.r[el.dataset.id] = +el.dataset.k; refrescarEjercicio(el.dataset.id); };
acc["poner-pieza"] = el => { const a = S.r[el.dataset.id] || []; const k = +el.dataset.k; if (!a.includes(k)) a.push(k); S.r[el.dataset.id] = a; refrescarEjercicio(el.dataset.id); };
acc["quitar-pieza"] = el => { const a = S.r[el.dataset.id] || []; a.splice(+el.dataset.k, 1); S.r[el.dataset.id] = a; refrescarEjercicio(el.dataset.id); };
acc.reintentar = el => { const id = el.dataset.id; delete S.res[id]; delete S.tests[id]; if (B.EJ[id].e.tipo === "ordenar") { delete S.r[id]; delete S.mez[id]; } if (B.EJ[id].e.tipo === "completar") delete S.r[id]; refrescarEjercicio(id); };
acc["seguir-igual"] = () => { const p = $("#pie-clase"); if (p) p.scrollIntoView({ behavior: "smooth", block: "center" }); };
acc.pista = el => { S.pista[el.dataset.id] = (S.pista[el.dataset.id] || 0) + 1; refrescarEjercicio(el.dataset.id); };
acc.confianza = el => { S.conf[el.dataset.id] = el.dataset.v; refrescarEjercicio(el.dataset.id); };
acc["reiniciar-codigo"] = el => { delete S.r[el.dataset.id]; delete S.tests[el.dataset.id]; refrescarEjercicio(el.dataset.id); };

/* ---------- exámenes ---------- */
acc["enviar-examen"] = async el => {
  const c = B.CUR[el.dataset.id], modo = S.prueba.modo;
  const preg = modo === "validar" ? B.preguntasValidacion(c) : c.prueba;
  const faltan = preg.filter(e => e.tipo !== "codigo" && !B.tieneRespuesta(e, S.r[e.id]));
  if (faltan.length) { B.aviso("cara-piensa", `Te ${faltan.length === 1 ? "falta 1 pregunta" : "faltan " + faltan.length + " preguntas"}`, "Responde todo antes de entregar."); const q = $("#q-" + faltan[0].id); if (q) q.scrollIntoView({ behavior: "smooth", block: "center" }); return; }
  el.disabled = true; el.textContent = "Calificando…";
  let bien = 0; const det = {}, fallidas = [];
  for (const e of preg) {
    let ok;
    if (e.tipo === "codigo") ok = (await B.correrEjercicio(e)).ok; else ok = B.evaluar(e, S.r[e.id]);
    det[e.id] = ok; if (ok) bien++; else fallidas.push(e.id);
    B.registrar(e.id, ok, S.conf[e.id]);
  }
  const nota = Math.round(bien * 100 / preg.length);
  S.prueba.resultado = { nota, bien, det };
  if (modo === "prueba") B.P.pruebas[c.id] = Math.max(B.P.pruebas[c.id] || 0, nota);
  else {
    if (nota >= 80) { B.P.validadas[c.id] = { fecha: B.hoy(), nota }; delete B.P.refuerzo[c.id]; }
    else B.P.refuerzo[c.id] = [...new Set(fallidas.map(id => B.EJ[id].clase && B.EJ[id].clase.id).filter(Boolean))];
  }
  B.guardar(); B.sonar(nota >= 80 ? "nivel" : "error");
  B.render({ anim: false }); scrollTo({ top: 0, behavior: "smooth" });
  verificarCurso(c);
};
acc["repetir-examen"] = el => { const c = B.CUR[el.dataset.id]; const preg = S.prueba.modo === "validar" ? B.preguntasValidacion(c) : c.prueba; preg.forEach(e => { delete S.r[e.id]; delete S.tests[e.id]; delete S.mez[e.id]; delete S.conf[e.id]; }); S.prueba.resultado = null; B.render({ anim: false }); scrollTo(0, 0); };

/* ---------- materia: pestañas y proyecto ---------- */
acc.tab = el => { S.tab = S.tab || {}; S.tab[el.dataset.id] = el.dataset.v; const v = "materia-" + el.dataset.id; if (vista() !== v) location.hash = v; else { B.render({ anim: false, mantener: true }); const n = $(".pasos-materia"); if (n) n.scrollIntoView({ behavior: "smooth", block: "start" }); } };
function verificarCurso(c) {
  const st = B.estadoCurso(c);
  if (st.completo && !B.P.completas[c.id]) {
    B.P.completas[c.id] = B.hoy(); B.guardar();
    setTimeout(() => {
      B.sonar("nivel");
      const sig = B.CURSOS[c.idx + 1];
      B.modal(`<div style="text-align:center">${B.nala("celebra")}<span class="sello-grande" style="margin:6px 0 16px">${st.validada ? "VALIDADA" : "APROBADA"}</span><h2>${esc(c.codigo)} ${esc(c.titulo)}</h2></div>
        <div class="para-que" style="background:color-mix(in srgb,var(--verde) 12%,var(--hoja));border-color:var(--verde)"><b>Ahora entiendes por qué:</b> ${esc(c.cierre)}</div>
        ${c.hilo ? `<p class="mano" style="text-align:center;margin-top:12px">Pieza lista: ${esc(c.hilo)}</p>` : ""}
        <div class="acciones" style="justify-content:center">${sig ? `<button class="btn" data-a="ir" data-v="materia-${sig.id}">Siguiente: ${esc(sig.codigo)} ${esc(sig.titulo)}</button>` : `<button class="btn" data-a="ir" data-v="pensum">Ver el plan de estudios</button>`}</div>`);
    }, 600);
  }
}
B.verificarCurso = verificarCurso;

/* =========================================================
   ENTRADAS DE TEXTO Y CAMBIOS
   ========================================================= */
document.addEventListener("input", ev => {
  const t = ev.target, a = t.dataset && t.dataset.a, id = t.dataset && t.dataset.id;
  if (!a) return;
  if (a === "escribir") { S.r[id] = t.value; const b = t.closest(".ejer").querySelector('[data-a="comprobar"]'); if (b) b.disabled = !t.value.trim(); }
  else if (a === "hueco") { const e = B.EJ[id].e; const arr = S.r[id] || Array((e.plantilla.match(/___/g) || []).length).fill(""); arr[+t.dataset.k] = t.value; S.r[id] = arr; t.size = Math.max(3, t.value.length + 1); const b = t.closest(".ejer").querySelector('[data-a="comprobar"]'); if (b) b.disabled = !B.tieneRespuesta(e, arr); }
  else if (a === "codigo") S.r[id] = t.value;
  else if (a === "entradas") S.r[id + "-ent"] = t.value;
  else if (a === "nota-bloque") { B.P.resp[id] = Object.assign({}, B.P.resp[id], { texto: t.value }); clearTimeout(S.tg); S.tg = setTimeout(B.guardar, 600); }
  else if (a === "nota-proyecto") { B.P.notasProyecto[id] = t.value; clearTimeout(S.tg); S.tg = setTimeout(() => { B.anotar(id, "", "Proyecto", "Notas del proyecto: " + B.CUR[id].proyecto.titulo, t.value); }, 900); }
  else if (a === "buscar-bitacora") { S.bq = t.value; refrescarParte("#lista-bitacora"); }
  else if (a === "buscar-simbolos") { S.sq = t.value; refrescarParte("#lista-simbolos"); }
  else if (a === "buscar-glosario") { S.gq = t.value; refrescarParte("#lista-glosario"); }
  else if (a === "lab-codigo") { const L = B.labEstado(); L[L.modo] = t.value; B.guardarLab(); if (L.modo === "html") { clearTimeout(S.tl); S.tl = setTimeout(actualizarVistaWeb, 700); } }
  else if (a === "lab-entradas") { B.labEstado().pythonEnt = t.value; B.guardarLab(); }
  else if (a === "perfil-nombre") { B.P.perfil.nombre = t.value.slice(0, 40); clearTimeout(S.tg); S.tg = setTimeout(() => { B.guardar(); B.marco(); }, 500); }
});
function refrescarParte(sel) { const tmp = document.createElement("div"); tmp.innerHTML = B.V[vista()](); const n = tmp.querySelector(sel); if (n && $(sel)) $(sel).innerHTML = n.innerHTML; }
document.addEventListener("change", ev => {
  const t = ev.target, a = t.dataset && t.dataset.a;
  if (a === "paso-proyecto") {
    B.P.proyecto[t.dataset.k] = t.checked; B.actividad(); B.guardar(); if (t.checked) B.sonar("correcto");
    t.closest(".check").classList.toggle("hecho", t.checked);
    verificarCurso(B.CUR[t.dataset.id]); B.marco();
  } else if (a === "idea") acc.idea(t);
  else if (a === "lab-ejemplo" && t.value !== "") acc["lab-ejemplo"](t);
  else if (a === "importar") importar(t);
});

/* =========================================================
   LABORATORIO
   ========================================================= */
acc["abrir-lab"] = el => { const L = B.labEstado(), lang = el.dataset.lang === "javascript" ? "javascript" : el.dataset.lang; L.modo = lang; L[lang] = el.dataset.codigo; if (el.dataset.entradas !== undefined) L.pythonEnt = el.dataset.entradas; B.guardarLab(); location.hash = "lab"; };
acc["abrir-lab-proyecto"] = el => {
  const c = B.CUR[el.dataset.id], et = c.proyecto.etapas[+el.dataset.k], L = B.labEstado();
  const lab = c.proyecto.lab && +el.dataset.k === 0 ? c.proyecto.lab : { modo: et.lang || c.proyecto.lang, codigo: et.plantilla, entradas: "" };
  L.modo = lab.modo; L[lab.modo] = lab.codigo; L.pythonEnt = lab.entradas || ""; B.guardarLab(); location.hash = "lab";
};
acc["lab-modo"] = el => { B.labEstado().modo = el.dataset.v; B.guardarLab(); B.render({ anim: false }); };
acc["lab-ejemplo"] = el => { const L = B.labEstado(), f = B.ejemplosLab[L.modo][+el.value]; if (!f) return; L[L.modo] = f[1]; if (L.modo === "python") L.pythonEnt = f[2] || ""; B.guardarLab(); B.render({ anim: false }); };
acc["lab-limpiar"] = () => { const o = $("#lab-out"); if (o) o.innerHTML = ""; };
acc["lab-actualizar"] = () => actualizarVistaWeb();
acc["lab-correr"] = async el => {
  const L = B.labEstado(), out = $("#lab-out"); if (!out) return;
  el.disabled = true;
  if (L.modo === "python") {
    out.innerHTML = `<span class="info">${B.pythonListo() ? "Ejecutando…" : "Preparando Python (la primera vez tarda unos segundos)…"}</span>`;
    const r = await B.ejecutarPython(L.python, { entradas: (L.pythonEnt || "").split("\n").filter(x => x !== ""), limite: 8000 });
    out.innerHTML = B.consolaHTML(r.consola || []) + (r.error ? `<span class="err">\n${esc(r.error.tipo)}${r.error.linea ? " (línea " + r.error.linea + ")" : ""}: ${esc(r.error.mensaje)}</span>\n<span class="info">${esc(B.traducirError(r.error))}</span>` : "") || `<span class="info">(El programa no mostró nada. Usa print().)</span>`;
  } else {
    out.innerHTML = "";
    const r = await B.ejecutarJS(L.javascript, null, null, { esperaExtra: 1200, onLog: t => { out.insertAdjacentHTML("beforeend", esc(t) + "\n"); } });
    if (r.error) out.insertAdjacentHTML("beforeend", `<span class="err">${esc(r.error.tipo)}: ${esc(r.error.mensaje)}</span>\n<span class="info">${esc(B.traducirError(r.error))}</span>`);
    if (!out.textContent.trim()) out.innerHTML = `<span class="info">(El programa no mostró nada. Usa console.log().)</span>`;
  }
  el.disabled = false; B.actividad(); B.guardar();
};
function actualizarVistaWeb() { const f = $("#lab-prev"); if (f) f.srcdoc = B.labEstado().html; }

/* =========================================================
   OTRAS ACCIONES
   ========================================================= */
acc.copiar = el => {
  const lineas = $$(".ln", el.closest(".codigo")).map(l => l.textContent).join("\n");
  const ok = () => { el.textContent = "¡Copiado!"; setTimeout(() => el.textContent = "Copiar", 1300); };
  try { navigator.clipboard.writeText(lineas).then(ok, () => B.aviso("cara-piensa", "No se pudo copiar", "Selecciona el texto y cópialo a mano.")); } catch (e) {}
};
acc["filtro-bitacora"] = el => { S.bf = el.dataset.v; B.render({ anim: false, mantener: true }); };
const descargar = (nombre, texto, tipo = "text/plain") => { const u = URL.createObjectURL(new Blob([texto], { type: tipo + ";charset=utf-8" })); const a = document.createElement("a"); a.href = u; a.download = nombre; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 2000); };
acc["descargar-bitacora"] = () => descargar("mi-bitacora.txt", B.P.bitacora.map(x => `${x.fecha} · ${B.CUR[x.curso] ? B.CUR[x.curso].codigo : ""}\n${x.pregunta}\n${x.texto}\n`).join("\n---\n\n"));
acc.exportar = () => descargar("bitacora-progreso.json", JSON.stringify(B.P, null, 1), "application/json");
function importar(input) {
  const f = input.files && input.files[0]; if (!f) return;
  const r = new FileReader();
  r.onload = () => { try { B.P = B.unir(B.P, B.fusionar(JSON.parse(r.result))); B.guardar(); aplicarTema(); B.render(); B.aviso("cara-feliz", "Progreso cargado", "Se unió con lo que ya tenías."); } catch (e) { B.aviso("cara-triste", "Archivo no válido", "Debe ser el archivo que descargaste desde Perfil."); } };
  r.readAsText(f);
}
acc.reiniciar = () => B.modal(`<div style="text-align:center">${B.nala("triste")}</div><h2 style="text-align:center">¿Borrar todo tu progreso?</h2><p style="text-align:center">Se borran tus clases, ejercicios, exámenes y tu bitácora. Te recomiendo descargar una copia antes.</p><div class="acciones" style="justify-content:center"><button class="btn claro" data-a="cerrar-modal">Cancelar</button><button class="btn" style="background:var(--rojo);border-color:var(--rojo)" data-a="reiniciar-ok">Sí, borrar todo</button></div>`);
acc["reiniciar-ok"] = () => { const p = B.P.perfil; B.P = B.BASE(); B.P.perfil = p; B.P.bienvenida = true; B.guardar(); location.hash = "inicio"; B.cerrarModal(); B.render(); };
acc.tema = () => { B.P.perfil.tema = B.P.perfil.tema === "noche" ? "dia" : "noche"; B.guardar(); aplicarTema(); B.render({ anim: false, mantener: true }); };
acc["perfil-sonido"] = () => { B.P.perfil.sonido = !B.P.perfil.sonido; B.guardar(); B.sonar("correcto"); B.render({ anim: false, mantener: true }); };
acc["perfil-coach"] = () => { B.P.perfil.coach = !B.P.perfil.coach; B.guardar(); B.render({ anim: false, mantener: true }); };
acc["perfil-libre"] = () => { B.P.libre = !B.P.libre; B.guardar(); B.render({ anim: false, mantener: true }); };
acc["perfil-tipo"] = el => { B.P.perfil.tipo = el.dataset.v; B.guardar(); if ($("#ob")) { $$("#ob .perfil-op").forEach(b => b.classList.toggle("activo", b === el)); return; } B.render({ anim: false, mantener: true }); };
acc["perfil-min"] = el => { B.P.perfil.minutos = +el.dataset.v; B.guardar(); if ($("#ob")) { $$("#ob .segmentado button").forEach(b => b.classList.toggle("activo", b === el)); return; } B.render({ anim: false, mantener: true }); };
acc.imprimir = () => { try { print(); } catch (e) {} };

/* ---------- sesión de enfoque (25 + 5) ---------- */
acc.enfoque = () => {
  if (S.enfoque) { B.modal(`<h2>Sesión de enfoque</h2><p>¿Quieres detener la sesión?</p><div class="acciones"><button class="btn claro" data-a="cerrar-modal">Seguir</button><button class="btn" data-a="enfoque-parar">Detener</button></div>`); return; }
  iniciarFase("foco", 25);
  B.coach("25 minutos. Silencia el celular y cierra las redes. Si te trabas, anótalo y sigue: en el descanso tu cerebro lo sigue pensando.", "cara-feliz");
};
acc["enfoque-parar"] = () => { clearInterval(S.enfoqueT); S.enfoque = null; $("#enfoque").innerHTML = ""; B.cerrarModal(); B.marco(); };
function iniciarFase(fase, min) {
  S.enfoque = { fase, fin: Date.now() + min * 60000 };
  clearInterval(S.enfoqueT); S.enfoqueT = setInterval(tick, 1000); tick(); B.marco();
}
function tick() {
  const e = S.enfoque; if (!e) return;
  const resta = Math.max(0, e.fin - Date.now()), m = Math.floor(resta / 60000), s = Math.floor(resta / 1000) % 60;
  $("#enfoque").innerHTML = `<div class="enfoque" role="timer">${e.fase === "foco" ? "Enfoque" : "Descanso"} ${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}<button data-a="enfoque-parar">Detener</button></div>`;
  if (resta <= 0) {
    clearInterval(S.enfoqueT); B.sonar("logro");
    if (e.fase === "foco") {
      B.P.sesiones++; B.actividad(); B.guardar();
      B.modal(`<div class="descanso">${B.nala("duerme")}<h2>¡Sesión completa! Ahora descansa</h2><p>5 minutos lejos de la pantalla: camina, toma agua, mira lejos. Mientras descansas, tu cerebro sigue ordenando lo que estudiaste (es el modo difuso).</p><div class="acciones" style="justify-content:center"><button class="btn" data-a="descanso">Iniciar descanso de 5 minutos</button></div></div>`);
      S.enfoque = null; $("#enfoque").innerHTML = ""; B.marco();
    } else { S.enfoque = null; $("#enfoque").innerHTML = ""; B.marco(); B.aviso("saluda", "Fin del descanso", "¿Otra sesión? Tu cerebro ya está listo."); }
  }
}
acc.descanso = () => { B.cerrarModal(); iniciarFase("descanso", 5); };

/* ---------- bienvenida ---------- */
function bienvenida() {
  B.modal(`<div id="ob"><div style="display:grid;grid-template-columns:110px 1fr;gap:14px;align-items:center">${B.nala("saluda")}<div><h2 style="margin:0">¡Hola! Soy Nala</h2><p class="suave" style="margin:4px 0 0">Te voy a acompañar en esta universidad de programación. Vamos paso a paso y sin afán: lo importante es que lo entiendas de verdad.</p></div></div>
    <label style="display:block;margin-top:16px"><b>¿Cómo te llamas?</b><input class="campo" id="ob-nombre" value="${esc(B.P.perfil.nombre)}" autocomplete="given-name" style="margin-top:6px"></label>
    <p style="margin:16px 0 8px"><b>¿Cómo llegas?</b></p>${B.perfilesHTML(B.P.perfil.tipo)}
    <p style="margin:16px 0 8px"><b>¿Cuánto puedes estudiar al día?</b></p><div class="segmentado">${[15, 20, 30, 45, 60].map(v => `<button class="${B.P.perfil.minutos === v ? "activo" : ""}" data-a="perfil-min" data-v="${v}">${v} min</button>`).join("")}</div>
    <p class="suave" style="font-size:.88rem;margin-top:10px">Mejor poco todos los días que mucho una vez a la semana. Tu progreso se guarda en este navegador.</p>
    <div class="acciones der"><button class="btn" data-a="ob-listo">Empezar</button></div></div>`);
}
acc["ob-listo"] = () => {
  B.P.perfil.nombre = ($("#ob-nombre").value || "").trim().slice(0, 40); B.P.bienvenida = true; B.guardar(); B.cerrarModal(); B.sonar("logro");
  if (B.P.perfil.tipo === "reforzar") B.coach("Como ya estudiaste, entra a cada materia y usa «Ya sé esto: validar materia». Te diré exactamente qué repasar.", "explica");
  else B.coach("Empieza por PRG-100 Aprender a aprender. Son 30 minutos que hacen que todo lo demás rinda más.", "cara-feliz");
  B.render();
};

/* =========================================================
   CLICS, TECLADO Y ARRANQUE
   ========================================================= */
document.addEventListener("click", ev => {
  const tok = ev.target.closest(".tok");
  if (tok && !ev.target.closest("[data-a='tocar-linea']")) { B.globo(tok); return; }
  if (!ev.target.closest(".globo")) B.cerrarGlobo();
  const el = ev.target.closest("[data-a]"); if (!el || el.disabled) return;
  if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT") return;
  const f = acc[el.dataset.a]; if (f) f(el, ev);
});
document.addEventListener("keydown", ev => {
  const t = ev.target;
  if (ev.key === "Escape") { B.cerrarGlobo(); if ($("#capa").innerHTML) B.cerrarModal(); return; }
  if ((ev.key === "Enter" || ev.key === " ") && t.classList && (t.classList.contains("tok") || t.classList.contains("term") || t.classList.contains("tocable"))) { ev.preventDefault(); if (t.classList.contains("tok")) B.globo(t); else acc[t.dataset.a](t, ev); return; }
  if (ev.key === "Enter" && t.dataset && t.dataset.a === "escribir") { const b = t.closest(".ejer").querySelector('[data-a="comprobar"]'); if (b && !b.disabled) { ev.preventDefault(); comprobar(t.dataset.id); } return; }
  if (ev.key === "Tab" && t.classList && t.classList.contains("editor") && !t.readOnly) {
    ev.preventDefault(); const s = t.selectionStart, e = t.selectionEnd, esp = "    ";
    t.value = t.value.slice(0, s) + esp + t.value.slice(e); t.selectionStart = t.selectionEnd = s + esp.length; t.dispatchEvent(new Event("input", { bubbles: true }));
  }
});
function aplicarTema() { document.documentElement.dataset.tema = B.P.perfil.tema === "noche" ? "noche" : "dia"; const m = $('meta[name="theme-color"]'); if (m) m.content = B.P.perfil.tema === "noche" ? "#0F2A40" : "#1F2A37"; }
function detectar() { const w = innerWidth, d = document.documentElement; d.dataset.dispositivo = w <= 760 ? "celular" : w <= 1100 ? "tablet" : "computador"; d.dataset.puntero = matchMedia("(pointer: coarse)").matches ? "tactil" : "mouse"; }
addEventListener("resize", () => { clearTimeout(S.rz); S.rz = setTimeout(detectar, 150); });

detectar(); aplicarTema(); B.render();
if (!B.P.bienvenida) setTimeout(bienvenida, 300);
// Si la persona va a usar Python pronto, se va preparando en segundo plano
if (B.P.bienvenida && B.CURSOS.some(c => c.semestre === 2 && B.disponible(c))) setTimeout(() => B.prepararPython().catch(() => {}), 2500);
})(window.B);
