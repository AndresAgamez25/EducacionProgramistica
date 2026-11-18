/* =========================================================
   NÚCLEO: utilidades, datos, progreso y repaso espaciado.
   Todo el estado vive en B (Bitácora) para que los demás
   archivos lo compartan.
   ========================================================= */
window.B = window.B || {};
(function (B) {
"use strict";

/* ---------- utilidades ---------- */
B.$ = (s, r = document) => r.querySelector(s);
B.$$ = (s, r = document) => [...r.querySelectorAll(s)];
B.esc = s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const z2 = n => String(n).padStart(2, "0");
B.fecha = (d = new Date()) => d.getFullYear() + "-" + z2(d.getMonth() + 1) + "-" + z2(d.getDate());
B.hoy = () => B.fecha();
B.diasEntre = (a, b) => Math.round((new Date(b + "T12:00") - new Date(a + "T12:00")) / 864e5);
B.sumarDias = (f, n) => { const d = new Date(f + "T12:00"); d.setDate(d.getDate() + n); return B.fecha(d); };
B.fechaLarga = f => new Date(f + "T12:00").toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" });
B.fechaCorta = f => new Date(f + "T12:00").toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
B.hash = s => { let h = 2166136261; for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } return h; };
B.mezclar = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
B.propio = (o, k) => Object.prototype.hasOwnProperty.call(o, k);

/* ---------- datos del curso ---------- */
B.CURSOS = window.CURSOS || [];
B.CUR = {};      // id de materia -> materia
B.EJ = {};       // id de ejercicio -> { e, curso, origen, clase }
B.CLASE = {};    // id de clase -> { clase, curso, idx }
B.CURSOS.forEach((c, i) => {
  c.idx = i; B.CUR[c.id] = c;
  c.clases.forEach((cl, k) => {
    B.CLASE[cl.id] = { clase: cl, curso: c, idx: k };
    cl.bloques.forEach((b, j) => {
      b.id = cl.id + "-b" + j;
      if (b.t === "chequeo") { b.e.id = b.id; B.EJ[b.id] = { e: b.e, curso: c, origen: "chequeo", clase: cl }; }
    });
  });
  c.ejercicios.forEach((e, k) => { e.id = c.id + "-e" + k; B.EJ[e.id] = { e, curso: c, origen: "practica" }; });
  c.prueba.forEach((e, k) => { e.id = c.id + "-p" + k; B.EJ[e.id] = { e, curso: c, origen: "prueba" }; });
});
B.GLOS = Object.create(null);
Object.keys(window.GLOSARIO || {}).forEach(k => B.GLOS[k.toLowerCase()] = Object.assign({ nombre: k }, window.GLOSARIO[k]));

/* ---------- estado guardado ---------- */
const CLAVE = "bitacora-v1";
const BASE = () => ({
  v: 1, bienvenida: false,
  perfil: { nombre: "", tipo: "cero", minutos: 30, tema: "dia", sonido: true, coach: true },
  libre: false,
  clases: {},        // id clase -> { hasta: índice de bloque alcanzado, fin: fecha }
  resp: {},          // id bloque -> respuesta guardada (textos, decisiones)
  ej: {},            // id ejercicio -> { ok, intentos, conf }
  pruebas: {},       // id materia -> mejor nota
  proyecto: {},      // clave paso -> true
  notasProyecto: {}, // id materia -> texto
  completas: {},     // id materia -> fecha
  validadas: {},     // id materia -> { fecha, nota }
  refuerzo: {},      // id materia -> [ids de clase para repasar]
  srs: {},           // id ejercicio -> { caja, prox }
  diario: {},        // fecha -> cantidad de actividades
  bitacora: [],      // [{ fecha, curso, clase, tipo, pregunta, texto }]
  calib: { seguro: [0, 0], creo: [0, 0], adivino: [0, 0] },
  sesiones: 0,
  actualizado: 0
});
B.BASE = BASE;
B.fusionar = o => {
  const r = Object.assign(BASE(), o || {});
  r.perfil = Object.assign(BASE().perfil, (o && o.perfil) || {});
  r.calib = Object.assign(BASE().calib, (o && o.calib) || {});
  ["clases", "resp", "ej", "pruebas", "proyecto", "notasProyecto", "completas", "validadas", "refuerzo", "srs", "diario"].forEach(k => { if (!r[k] || typeof r[k] !== "object" || Array.isArray(r[k])) r[k] = {}; });
  if (!Array.isArray(r.bitacora)) r.bitacora = [];
  return r;
};
B.P = BASE();
try { const g = localStorage.getItem(CLAVE); if (g) B.P = B.fusionar(JSON.parse(g)); } catch (e) {}
B.guardar = () => { B.P.actualizado = Date.now(); try { localStorage.setItem(CLAVE, JSON.stringify(B.P)); } catch (e) {} };

/* ---------- actividad diaria y racha ---------- */
B.actividad = () => { const h = B.hoy(); B.P.diario[h] = (B.P.diario[h] || 0) + 1; };
B.racha = () => {
  let n = 0, d = B.hoy();
  if (!B.P.diario[d]) d = B.sumarDias(d, -1);       // si hoy aún no estudia, la racha sigue viva desde ayer
  while (B.P.diario[d]) { n++; d = B.sumarDias(d, -1); }
  return n;
};
B.estudioHoy = () => !!B.P.diario[B.hoy()];

/* ---------- repaso espaciado (sistema Leitner) ----------
   Cada ejercicio resuelto entra en la caja 1 y vuelve al día
   siguiente. Si aciertas sube de caja (más días entre repasos);
   si fallas vuelve a la caja 1. */
const INTERVALOS = [1, 3, 7, 16, 35, 90];
B.programar = (id, ok) => {
  const s = B.P.srs[id] || { caja: 0, prox: B.hoy() };
  s.caja = ok ? Math.min(s.caja + 1, INTERVALOS.length) : 1;
  s.prox = B.sumarDias(B.hoy(), INTERVALOS[s.caja - 1]);
  B.P.srs[id] = s;
};
B.pendientesRepaso = (max = 12) => {
  const h = B.hoy();
  const vencidos = Object.keys(B.P.srs).filter(id => B.EJ[id] && B.P.srs[id].prox <= h);
  // intercalar: mezcla de materias distintas
  const porCurso = {};
  B.mezclar(vencidos).forEach(id => { const c = B.EJ[id].curso.id; (porCurso[c] = porCurso[c] || []).push(id); });
  const listas = Object.values(porCurso), out = [];
  while (out.length < max && listas.some(l => l.length)) listas.forEach(l => { if (l.length && out.length < max) out.push(l.shift()); });
  return out;
};
B.cuantosRepaso = () => { const h = B.hoy(); return Object.keys(B.P.srs).filter(id => B.EJ[id] && B.P.srs[id].prox <= h).length; };

/* ---------- registrar el resultado de un ejercicio ---------- */
B.registrar = (id, ok, conf) => {
  const r = B.P.ej[id] || { ok: false, intentos: 0 };
  r.intentos++;
  if (ok) r.ok = true;
  if (conf) { r.conf = conf; const c = B.P.calib[conf]; if (c) { c[1]++; if (ok) c[0]++; } }
  B.P.ej[id] = r;
  B.programar(id, ok);
  B.actividad();
  B.guardar();
};

/* ---------- estado de una materia ---------- */
B.claseHecha = id => !!(B.P.clases[id] && B.P.clases[id].fin);
B.estadoCurso = c => {
  const clases = c.clases.filter(cl => B.claseHecha(cl.id)).length;
  const ej = c.ejercicios.filter(e => B.P.ej[e.id] && B.P.ej[e.id].ok).length;
  const nota = B.P.pruebas[c.id] || 0, pruebaOk = nota >= 80;
  const pasos = B.pasosProyecto(c), proy = pasos.filter(k => B.P.proyecto[k]).length;
  const total = c.clases.length + c.ejercicios.length + 1 + pasos.length;
  const hecho = clases + ej + (pruebaOk ? 1 : 0) + proy;
  const validada = !!B.P.validadas[c.id];
  return {
    clases, ej, nota, pruebaOk, proy, totalPasos: pasos.length,
    clasesOk: clases === c.clases.length, ejOk: ej === c.ejercicios.length, proyOk: proy === pasos.length,
    pct: validada ? 100 : Math.round(hecho * 100 / total),
    completo: validada || hecho === total, validada
  };
};
B.pasosProyecto = c => {
  const k = []; (c.proyecto.etapas || []).forEach((et, i) => et.pasos.forEach((_, j) => k.push(c.id + "-" + i + "-" + j))); return k;
};
B.cursoListo = id => { const c = B.CUR[id]; return !!c && B.estadoCurso(c).completo; };
B.disponible = c => B.P.libre || B.P.perfil.tipo === "reforzar" || (c.requiere || []).every(B.cursoListo);
B.pruebaAbierta = (c, st = B.estadoCurso(c)) => B.P.libre || B.P.perfil.tipo === "reforzar" || (st.clasesOk && st.ejOk);
B.cursoActual = () => B.CURSOS.find(c => B.disponible(c) && !B.estadoCurso(c).completo) || B.CURSOS[B.CURSOS.length - 1];
B.siguienteClase = c => c.clases.find(cl => !B.claseHecha(cl.id));
B.horasRestantes = () => B.CURSOS.reduce((s, c) => s + c.horas * (1 - B.estadoCurso(c).pct / 100), 0)
  + (window.PROXIMAS || []).reduce((s, c) => s + c.horas, 0);

/* ---------- sonidos (cortos y opcionales) ---------- */
const SON = {};
["clic", "correcto", "error", "logro", "nivel"].forEach(n => { try { SON[n] = new Audio("sonidos/" + n + ".wav"); SON[n].preload = "auto"; } catch (e) {} });
B.sonar = n => {
  if (!B.P.perfil.sonido || !SON[n]) return;
  try { const a = SON[n].cloneNode(); a.volume = n === "clic" ? .3 : .55; const p = a.play(); if (p && p.catch) p.catch(() => {}); } catch (e) {}
};

/* ---------- bitácora personal ---------- */
B.anotar = (curso, clase, tipo, pregunta, texto) => {
  if (!texto || !texto.trim()) return;
  const id = clase + "|" + pregunta;
  const ex = B.P.bitacora.find(x => x.clave === id);
  if (ex) { ex.texto = texto; ex.fecha = B.hoy(); }
  else B.P.bitacora.unshift({ clave: id, fecha: B.hoy(), curso, clase, tipo, pregunta, texto });
  B.guardar();
};

/* ---------- exportar / importar progreso ---------- */
B.unir = (a, b) => {
  const A = (a.actualizado || 0) >= (b.actualizado || 0) ? a : b, X = A === a ? b : a;
  const r = B.fusionar(JSON.parse(JSON.stringify(A)));
  ["clases", "resp", "ej", "proyecto", "completas", "validadas", "notasProyecto"].forEach(k => Object.entries(X[k] || {}).forEach(([kk, v]) => { if (v && !r[k][kk]) r[k][kk] = v; }));
  Object.entries(X.pruebas || {}).forEach(([k, v]) => r.pruebas[k] = Math.max(r.pruebas[k] || 0, v));
  Object.entries(X.diario || {}).forEach(([k, v]) => r.diario[k] = Math.max(r.diario[k] || 0, v));
  const claves = new Set(r.bitacora.map(x => x.clave));
  (X.bitacora || []).forEach(x => { if (!claves.has(x.clave)) r.bitacora.push(x); });
  r.actualizado = Date.now();
  return r;
};
})(window.B);
