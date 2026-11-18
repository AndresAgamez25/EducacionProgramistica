/* =========================================================
   VISTAS (cada pantalla de la universidad)
   ========================================================= */
(function (B) {
"use strict";
const { esc, $, $$, S } = B;
B.V = {};

/* ---------- HOY (inicio) ---------- */
B.V.inicio = () => {
  const P = B.P, act = B.cursoActual(), sig = act && B.siguienteClase(act), stAct = act && B.estadoCurso(act);
  const rep = B.cuantosRepaso(), racha = B.racha();
  const dias = []; for (let i = 13; i >= 0; i--) dias.push(B.sumarDias(B.hoy(), -i));
  const hecho = B.estudioHoy();
  const pose = !hecho ? "saluda" : rep ? "piensa" : "celebra";
  const saludo = (() => { const h = new Date().getHours(); return (h < 12 ? "Buenos días" : h < 19 ? "Buenas tardes" : "Buenas noches") + (P.perfil.nombre ? ", " + P.perfil.nombre : ""); })();
  let siguienteTxt, siguienteDest;
  if (sig) { siguienteTxt = `${act.codigo} · Clase ${act.clases.indexOf(sig) + 1}: ${sig.titulo}`; siguienteDest = "clase-" + sig.id; }
  else if (act && !stAct.ejOk) { siguienteTxt = `${act.codigo} · Práctica de la materia`; siguienteDest = "materia-" + act.id; }
  else if (act && !stAct.pruebaOk) { siguienteTxt = `${act.codigo} · Prueba de dominio`; siguienteDest = "materia-" + act.id; }
  else if (act) { siguienteTxt = `${act.codigo} · Proyecto: ${act.proyecto.titulo}`; siguienteDest = "materia-" + act.id; }
  const hilos = B.CURSOS.filter(c => c.hilo);
  const mensaje = !Object.keys(P.clases).length ? "Empieza por la primera clase. Vamos despacio y en orden: así se aprende de verdad."
    : rep ? `Primero el repaso: ${rep} ${rep === 1 ? "pregunta vuelve" : "preguntas vuelven"} justo hoy para que no se te olviden.`
    : hecho ? "Ya estudiaste hoy. Si te queda energía, sigue; si no, descansar también es parte de aprender."
    : "Una clase de 20 minutos hoy vale más que tres horas el domingo.";
  return `
  <section class="hoja hoy">
    <div class="nala">${B.nala(pose, "Nala")}</div>
    <div>
      <div class="fecha">${esc(B.fechaLarga(B.hoy()))}</div>
      <h1 style="margin:.1em 0 .2em">${esc(saludo)}</h1>
      <p class="mano" style="font-size:1.45rem">${esc(mensaje)}</p>
      <ul class="plan-dia">
        ${rep ? `<li><span class="caja"></span><div><b>Repaso del día</b><small>${rep} ${rep === 1 ? "pregunta" : "preguntas"} de clases anteriores, mezcladas</small></div><button class="btn amarillo peq" data-a="ir" data-v="repaso">Repasar</button></li>` : `<li class="hecho"><span class="caja">✓</span><div><b>Repaso del día</b><small>Al día. Lo que aprendas hoy volverá en el momento justo.</small></div><span></span></li>`}
        ${act ? `<li class="${hecho && !sig ? "hecho" : ""}"><span class="caja">${hecho && !sig ? "✓" : ""}</span><div><b>${esc(siguienteTxt)}</b><small>${sig ? "~" + sig.min + " minutos" : esc(act.titulo)}</small></div><button class="btn peq" data-a="ir" data-v="${siguienteDest}">${sig && P.clases[sig.id] ? "Seguir" : "Empezar"}</button></li>` : ""}
        <li><span class="caja"></span><div><b>Sesión de enfoque</b><small>25 minutos sin celular ni redes, luego 5 de descanso</small></div><button class="btn claro peq" data-a="enfoque">Iniciar</button></li>
      </ul>
    </div>
  </section>
  <div class="rejilla dos">
    <section class="hoja sin-margen">
      <h3>Tu constancia</h3>
      <p class="suave" style="margin:0">${racha ? `Llevas <b>${racha} ${racha === 1 ? "día" : "días"}</b> seguidos estudiando.` : "Estudia hoy para empezar tu racha."}</p>
      <div class="racha" aria-label="Últimos 14 días">${dias.map(d => `<i class="${P.diario[d] ? "si" : ""} ${d === B.hoy() ? "hoy" : ""}" title="${d}"></i>`).join("")}</div>
      <p class="suave" style="font-size:.88rem;margin:10px 0 0">Con ${P.perfil.minutos} minutos al día terminas los semestres disponibles cerca del <b>${esc(B.fechaCorta(B.sumarDias(B.hoy(), Math.ceil(B.CURSOS.reduce((s, c) => s + c.horas * (1 - B.estadoCurso(c).pct / 100), 0) * 60 / P.perfil.minutos))))}</b>.</p>
    </section>
    <section class="hoja sin-margen">
      <h3>El proyecto que construyes</h3>
      <p class="suave" style="margin:0 0 8px">Toda la carrera construye una tienda real, pieza por pieza. Cada materia te deja una parte:</p>
      <ol style="margin:0;padding-left:1.2em">${hilos.map(c => { const ok = B.estadoCurso(c).completo; return `<li style="${ok ? "" : "color:var(--grafito)"}">${ok ? "<b>" : ""}${esc(c.hilo)}${ok ? "</b> <span class=\"mano\" style=\"font-size:1.1rem;color:var(--verde)\">listo</span>" : ""}</li>`; }).join("")}<li style="color:var(--suave)">La vitrina web, la base de datos, la API... (semestres 3 a 6)</li></ol>
    </section>
  </div>`;
};

/* ---------- PENSUM ---------- */
B.V.pensum = () => {
  const sems = window.SEMESTRES || [], prox = window.PROXIMAS || [], act = B.cursoActual();
  const col = s => {
    const listas = B.CURSOS.filter(c => c.semestre === s.n).map(c => {
      const st = B.estadoCurso(c), disp = B.disponible(c);
      return `<button class="materia ${disp ? "" : "bloqueada"} ${c === act && !st.completo ? "actual" : ""}" style="--c:${c.color}" data-a="ir" data-v="materia-${c.id}">
        <span class="cod">${esc(c.codigo)}</span><b>${esc(c.titulo)}</b>
        <span class="meta">${c.horas} h · ${c.clases.length} clases</span>
        ${st.completo ? `<span class="sello ${st.validada ? "validada" : ""}">${st.validada ? "VALIDADA" : "APROBADA"}</span>` : disp ? `<div class="progreso" style="margin-top:8px"><i style="width:${st.pct}%"></i></div>` : `<span class="meta" style="display:block;margin-top:4px">Requiere ${(c.requiere || []).map(r => B.CUR[r] ? B.CUR[r].codigo : r).join(", ")}</span>`}
      </button>`;
    }).join("");
    const futuras = prox.filter(c => c.semestre === s.n).map(c => `<button class="materia pronto" style="--c:${c.color}" data-a="ver-proxima" data-v="${c.id}"><span class="cod">${esc(c.codigo)}</span><b>${esc(c.titulo)}</b><span class="meta">${c.horas} h · en preparación</span></button>`).join("");
    return `<div class="semestre"><h3>Semestre ${s.n}</h3><div class="idea">${esc(s.nombre)}. ${esc(s.idea)}</div>${listas}${futuras}</div>`;
  };
  return `<section class="hoja sin-margen"><h1>Plan de estudios</h1><p class="suave">Las materias se ven en orden, de la más básica a la más avanzada. Cada una necesita la anterior, porque todo lo que aprendes se usa después. Si ya sabes una materia, puedes <b>validarla</b> con un examen.</p>
    ${B.P.perfil.tipo === "reforzar" || B.P.libre ? `<p class="mano">Tienes el modo libre activado: puedes entrar a cualquier materia.</p>` : ""}</section>
    <div class="pensum">${sems.map(col).join("")}</div>`;
};
B.acc["ver-proxima"] = el => {
  const c = (window.PROXIMAS || []).find(x => x.id === el.dataset.v); if (!c) return;
  B.modal(`<p class="etiqueta pronto">${esc(c.codigo)} · Semestre ${c.semestre} · ${c.horas} h</p><h2 style="margin-top:10px">${esc(c.titulo)}</h2>
    <div class="para-que"><b>Para qué te va a servir:</b> ${esc(c.paraQue)}</div>
    <h3 style="margin-top:16px">Lo que vas a ver</h3><ol>${c.temas.map(t => `<li>${esc(t)}</li>`).join("")}</ol>
    <p><b>Pieza del proyecto:</b> ${esc(c.hilo)}</p>
    <p class="mano">Esta materia está en preparación. Llegará con el mismo método: predecir, trazar, encontrar errores, proyecto por etapas.</p>`);
};

/* ---------- MATERIA ---------- */
B.V.materia = c => {
  if (!B.disponible(c)) return `<section class="hoja vacio">${B.nala("triste", "")}<h2>Esta materia todavía está cerrada</h2><p>Necesitas aprobar o validar: ${(c.requiere || []).map(r => esc(B.CUR[r].codigo + " " + B.CUR[r].titulo)).join(", ")}.</p><p class="suave">El orden importa: cada materia usa lo de la anterior. Si ya sabes ese tema, puedes validarlo con un examen.</p><div class="acciones" style="justify-content:center">${(c.requiere || []).map(r => `<button class="btn" data-a="ir" data-v="materia-${r}">Ir a ${esc(B.CUR[r].codigo)}</button>`).join("")}</div></section>`;
  const st = B.estadoCurso(c), tab = S.tab && S.tab[c.id] || "clases";
  const tabs = [["clases", "Clases", `${st.clases}/${c.clases.length}`, st.clasesOk], ["practica", "Práctica", `${st.ej}/${c.ejercicios.length}`, st.ejOk], ["prueba", "Prueba", B.pruebaAbierta(c, st) ? (st.nota ? st.nota + "%" : "80% para aprobar") : "Se abre al terminar", st.pruebaOk], ["proyecto", "Proyecto", `${st.proy}/${st.totalPasos} pasos`, st.proyOk]];
  let cuerpo = "";
  if (tab === "clases") cuerpo = tabClases(c);
  else if (tab === "practica") cuerpo = `<p class="suave">Practica mezclando todo lo de la materia. Si fallas, inténtalo otra vez: cada ejercicio vuelve después en tu repaso.</p>` + c.ejercicios.map((e, i) => B.ejercicio(e, "practica", i + 1)).join("");
  else if (tab === "prueba") cuerpo = B.V.examen(c, "prueba");
  else cuerpo = tabProyecto(c);
  return `
  <section class="hoja cabeza-materia" style="--c:${c.color}">
    <div class="fila entre"><span class="cod">${esc(c.codigo)} · Semestre ${c.semestre} · ${c.horas} horas</span>${st.completo ? `<span class="sello-grande" style="font-size:1.2rem;padding:2px 10px">${st.validada ? "VALIDADA" : "APROBADA"}</span>` : ""}</div>
    <h1 style="margin-top:8px">${esc(c.titulo)}</h1>
    <p class="suave">${esc(c.resumen)}</p>
    <div class="para-que"><b>Para qué te va a servir:</b> ${esc(c.paraQue)}</div>
    <p class="mano" style="margin-top:14px">Pregunta guía: ${esc(c.pregunta)}</p>
    ${st.completo ? `<div class="para-que" style="background:color-mix(in srgb,var(--verde) 12%,var(--hoja));border-color:var(--verde)"><b>Ahora entiendes por qué:</b> ${esc(c.cierre)}</div>` : ""}
    <div class="fila" style="margin-top:12px"><div class="progreso" style="flex:1;min-width:160px"><i style="width:${st.pct}%"></i></div><span class="suave" style="font-size:.88rem">${st.pct}%</span>${!st.completo ? `<button class="btn texto" data-a="ir" data-v="validar-${c.id}">Ya sé esto: validar materia</button>` : ""}</div>
  </section>
  <nav class="pasos-materia" aria-label="Partes de la materia">${tabs.map(([k, t, sub, ok]) => `<button class="paso-m ${tab === k ? "activo" : ""} ${ok ? "ok" : ""} ${k === "prueba" && !B.pruebaAbierta(c, st) ? "bloq" : ""}" data-a="tab" data-id="${c.id}" data-v="${k}">${ok ? "✓ " : ""}${t}<small>${esc(sub)}</small></button>`).join("")}</nav>
  ${cuerpo}`;
};
function tabClases(c) {
  const refuerzo = B.P.refuerzo[c.id] || [];
  return `<section class="hoja"><h3>Clases</h3>${refuerzo.length ? `<p class="mano roja">Según tu examen de validación, repasa las clases marcadas.</p>` : ""}
    <ol class="indice">${c.clases.map((cl, i) => { const h = B.claseHecha(cl.id), empezada = B.P.clases[cl.id]; return `<li class="${h ? "hecha" : ""}"><span class="n">${h ? "✓" : i + 1}</span><div><b>${esc(cl.titulo)}</b><small>~${cl.min} min${refuerzo.includes(cl.id) ? " · <span style=\"color:var(--rojo)\">repasar</span>" : ""}</small></div><button class="btn ${h ? "claro" : ""} peq" data-a="ir" data-v="clase-${cl.id}">${h ? "Repasar" : empezada ? "Seguir" : "Empezar"}</button></li>`; }).join("")}</ol></section>
    <section class="hoja sin-margen"><h3>Lo que vas a poder hacer</h3><ul>${c.metas.map(m => `<li>${esc(m)}</li>`).join("")}</ul></section>`;
}
function tabProyecto(c) {
  const pr = c.proyecto, st = B.estadoCurso(c);
  return `<section class="hoja"><p class="tipo-bloque">Proyecto de la materia</p><h2>${esc(pr.titulo)}</h2><p>${esc(pr.objetivo)}</p>
    ${c.hilo ? `<p class="mano">Pieza del proyecto de la carrera: ${esc(c.hilo)}</p>` : ""}
    <div class="para-que"><b>Antes de empezar, ¿ya sabes esto?</b><ul style="margin:6px 0 0">${pr.antes.map(a => `<li>${esc(a)}</li>`).join("")}</ul></div></section>
    ${pr.etapas.map((et, i) => `<section class="etapa"><div class="cab-etapa"><span class="etiqueta">${et.tipo === "guiada" ? "Etapa guiada" : et.tipo === "semi" ? "Etapa con menos ayuda" : "Etapa libre"}</span><b>${i + 1}. ${esc(et.nombre)}</b></div>
      ${et.descripcion ? `<p>${esc(et.descripcion)}</p>` : ""}
      ${et.plantilla ? B.bloqueCodigo(et.plantilla, et.lang || pr.lang, { botones: ["python", "javascript", "html"].includes(et.lang || pr.lang) ? `<button data-a="abrir-lab-proyecto" data-id="${c.id}" data-k="${i}">Abrir en el laboratorio</button>` : "" }) : ""}
      ${et.pasos.map((p, j) => { const k = c.id + "-" + i + "-" + j, ok = !!B.P.proyecto[k]; return `<label class="check ${ok ? "hecho" : ""}"><input type="checkbox" data-a="paso-proyecto" data-id="${c.id}" data-k="${k}" ${ok ? "checked" : ""}><span>${esc(p)}</span></label>`; }).join("")}</section>`).join("")}
    <section class="hoja sin-margen"><h3>Notas del proyecto</h3><p class="suave" style="font-size:.9rem">Escribe aquí tus predicciones, tus casos de prueba y lo que fue difícil. Se guarda en tu bitácora.</p>
      <textarea class="campo-texto" data-a="nota-proyecto" data-id="${c.id}" placeholder="Mis notas…">${esc(B.P.notasProyecto[c.id] || "")}</textarea>
      <details class="plegable"><summary>Ver una solución de referencia</summary><p class="suave" style="font-size:.9rem">Inténtalo primero por tu cuenta. Compara después: hay muchas soluciones correctas.</p>${B.bloqueCodigo(pr.solucion, pr.lang)}</details></section>
    ${st.completo ? `<section class="hoja sin-margen" style="text-align:center"><span class="sello-grande">APROBADA</span><p style="margin-top:18px">${esc(c.cierre)}</p>${siguienteMateriaBtn(c)}</section>` : ""}`;
}
function siguienteMateriaBtn(c) {
  const sig = B.CURSOS[c.idx + 1];
  return sig ? `<div class="acciones" style="justify-content:center"><button class="btn" data-a="ir" data-v="materia-${sig.id}">Siguiente materia: ${esc(sig.codigo)} ${esc(sig.titulo)}</button></div>` : `<p class="mano">Terminaste las materias disponibles. Las del semestre 3 vienen en camino.</p>`;
}

/* ---------- EXAMEN: prueba de dominio o validación ---------- */
B.preguntasValidacion = c => {
  const porClase = c.clases.map(cl => cl.bloques.find(b => b.t === "chequeo")).filter(Boolean).map(b => b.e);
  return porClase.concat(c.prueba);
};
B.V.examen = (c, modo) => {
  const st = B.estadoCurso(c);
  if (modo === "prueba" && !B.pruebaAbierta(c, st)) return `<section class="hoja vacio">${B.nala("piensa")}<h2>La prueba se abre al terminar</h2><p>Primero termina las clases (${st.clases}/${c.clases.length}) y la práctica (${st.ej}/${c.ejercicios.length}). Así llegas preparado de verdad.</p></section>`;
  const preg = modo === "validar" ? B.preguntasValidacion(c) : c.prueba;
  if (!S.prueba || S.prueba.curso !== c.id || S.prueba.modo !== modo) S.prueba = { curso: c.id, modo, resultado: null };
  const res = S.prueba.resultado;
  let cab;
  if (res) {
    const paso = res.nota >= 80;
    cab = `<section class="hoja" style="text-align:center">${B.nala(paso ? "celebra" : "triste")}<div style="font-family:var(--f-titulo);font-size:clamp(2.6rem,9vw,4.4rem);font-weight:800;line-height:1">${res.nota}%</div>
      <h2>${paso ? (modo === "validar" ? "Materia validada" : "Prueba aprobada") : "Todavía no"}</h2>
      <p>${res.bien} de ${preg.length} correctas. ${paso ? (modo === "validar" ? "Ya puedes seguir con la siguiente materia. Las preguntas quedan en tu repaso para que no se te olviden." : "Ahora sigue el proyecto.") : modo === "validar" ? "Te armé una ruta de refuerzo: las clases marcadas en rojo son las que te conviene repasar." : "Lee las explicaciones de abajo, repasa y vuelve a intentarlo. Se necesita 80%."}</p>
      ${paso && modo === "validar" ? '<span class="sello-grande" style="margin:8px 0 16px">VALIDADA</span>' : ""}
      <div class="acciones" style="justify-content:center"><button class="btn claro" data-a="repetir-examen" data-id="${c.id}">Intentar otra vez</button>${paso ? `<button class="btn" data-a="${modo === "validar" ? "ir" : "tab"}" data-id="${c.id}" data-v="${modo === "validar" ? "pensum" : "proyecto"}">${modo === "validar" ? "Volver al plan de estudios" : "Ir al proyecto"}</button>` : `<button class="btn" data-a="tab" data-id="${c.id}" data-v="clases">Ver las clases</button>`}</div></section>`;
  } else {
    cab = `<section class="hoja"><p class="tipo-bloque">${modo === "validar" ? "Examen de validación" : "Prueba de dominio"}</p><h2>${esc(c.codigo)} ${esc(c.titulo)}</h2>
      <p>${preg.length} preguntas. Se aprueba con <b>80%</b>. ${modo === "validar" ? "Si la apruebas, la materia queda validada. Si no, te digo exactamente qué clases repasar." : ""} Responde todo sin mirar tus notas: así sabrás qué dominas de verdad.</p>
      ${modo === "prueba" && st.nota ? `<p class="suave">Tu mejor nota: ${st.nota}%</p>` : ""}</section>`;
  }
  return cab + preg.map((e, i) => B.ejercicio(e, modo, i + 1)).join("") + (res ? "" : `<div class="acciones der"><button class="btn verde" data-a="enviar-examen" data-id="${c.id}">Entregar examen</button></div>`);
};
B.V.validar = c => `<div class="fila" style="margin-bottom:12px"><button class="btn texto" data-a="ir" data-v="materia-${c.id}">Volver a la materia</button></div>` + B.V.examen(c, "validar");

/* ---------- CLASE ---------- */
B.V.clase = (cl) => {
  const { curso: c, idx } = B.CLASE[cl.id];
  if (!B.disponible(c)) return B.V.materia(c);
  const reg = B.P.clases[cl.id] || (B.P.clases[cl.id] = { hasta: 0 });
  // muestra todos los bloques hasta "hasta"; avanza solo
  let hasta = Math.min(reg.hasta, cl.bloques.length - 1);
  const visibles = cl.bloques.slice(0, hasta + 1);
  const ultimo = cl.bloques[hasta], resuelto = B.bloqueResuelto(ultimo), alFinal = hasta >= cl.bloques.length - 1;
  const pct = Math.round((hasta + (resuelto ? 1 : 0)) * 100 / cl.bloques.length);
  let pie = "";
  if (resuelto && !alFinal) pie = `<div class="continuar"><button class="btn" data-a="continuar" data-id="${cl.id}">Continuar</button></div>`;
  if (resuelto && alFinal) {
    const sig = c.clases[idx + 1];
    pie = reg.fin ? `<section class="hoja sin-margen" style="text-align:center"><p class="mano" style="font-size:1.6rem">Clase terminada</p><div class="acciones" style="justify-content:center">${sig ? `<button class="btn" data-a="ir" data-v="clase-${sig.id}">Siguiente clase: ${esc(sig.titulo)}</button>` : `<button class="btn" data-a="tab" data-id="${c.id}" data-v="practica">Ir a la práctica de la materia</button>`}<button class="btn claro" data-a="ir" data-v="materia-${c.id}">Volver a la materia</button></div></section>`
      : `<section class="hoja sin-margen" style="text-align:center"><h3>¿Qué tan claro te quedó?</h3><p class="suave">Ser honesto aquí te ayuda: lo que marques como «más o menos» volverá antes en tu repaso.</p><div class="acciones" style="justify-content:center"><button class="btn claro" data-a="terminar-clase" data-id="${cl.id}" data-v="1">Poco</button><button class="btn claro" data-a="terminar-clase" data-id="${cl.id}" data-v="2">Más o menos</button><button class="btn" data-a="terminar-clase" data-id="${cl.id}" data-v="3">Muy claro</button></div></section>`;
  }
  return `
  <div class="clase-top"><div class="fila entre"><button class="btn texto" data-a="ir" data-v="materia-${c.id}">${esc(c.codigo)} ${esc(c.titulo)}</button><span class="suave" style="font-size:.88rem">Clase ${idx + 1} de ${c.clases.length} · ~${cl.min} min</span></div><div class="progreso"><i style="width:${pct}%"></i></div></div>
  <h1 style="margin:14px 0 18px">${esc(cl.titulo)}</h1>
  <div id="bloques">${visibles.map(b => B.renderBloque(b)).join("")}</div>
  <div id="pie-clase">${pie}</div>`;
};

/* ---------- REPASO ---------- */
B.V.repaso = () => {
  if (!S.repasoIds || S.repasoDia !== B.hoy()) { S.repasoIds = B.pendientesRepaso(12); S.repasoDia = B.hoy(); }
  const ids = S.repasoIds.filter(id => B.EJ[id]);
  if (!ids.length) return `<section class="hoja vacio">${B.nala("celebra", "")}<h2>Repaso al día</h2><p>No hay preguntas pendientes para hoy. Cada ejercicio que resuelves vuelve después de 1, 3, 7, 16 y 35 días, justo cuando estás a punto de olvidarlo.</p><button class="btn" data-a="ir" data-v="inicio">Volver a Hoy</button></section>`;
  const listos = ids.filter(id => S.res[id] === "ok").length;
  return `<section class="hoja"><p class="tipo-bloque">Repaso del día</p><h2>${ids.length} preguntas mezcladas</h2><p>Vienen de distintas clases y materias, a propósito: mezclar temas obliga a tu cerebro a elegir qué herramienta usar, y eso es lo que pasa en un problema real. Responde sin mirar tus notas.</p><div class="progreso"><i style="width:${listos * 100 / ids.length}%"></i></div></section>`
    + ids.map((id, i) => `<p class="suave" style="font-size:.82rem;margin:16px 0 4px">${esc(B.EJ[id].curso.codigo)} · ${esc(B.EJ[id].curso.titulo)}</p>` + B.ejercicio(B.EJ[id].e, "repaso", i + 1)).join("");
};

/* ---------- BITÁCORA ---------- */
B.V.bitacora = () => {
  const q = (S.bq || "").toLowerCase(), f = S.bf || "todas";
  const lista = B.P.bitacora.filter(x => (f === "todas" || x.curso === f) && (!q || (x.texto + " " + x.pregunta).toLowerCase().includes(q)));
  const cursos = [...new Set(B.P.bitacora.map(x => x.curso))];
  return `<section class="hoja"><h1>Mi bitácora</h1><p>Aquí queda todo lo que has explicado con tus palabras. Releerlo no basta: tápalo y trata de explicarlo otra vez antes de mirar.</p>
    <div class="fila"><button class="btn claro peq" data-a="descargar-bitacora">Descargar como texto</button></div></section>
    ${B.P.bitacora.length ? `<input class="buscador" data-a="buscar-bitacora" value="${esc(S.bq || "")}" placeholder="Buscar en mis notas…"><div class="filtros"><button class="${f === "todas" ? "activo" : ""}" data-a="filtro-bitacora" data-v="todas">Todas</button>${cursos.map(id => `<button class="${f === id ? "activo" : ""}" data-a="filtro-bitacora" data-v="${esc(id)}">${esc(B.CUR[id] ? B.CUR[id].codigo : id)}</button>`).join("")}</div>
    <section class="hoja" id="lista-bitacora">${lista.map(x => `<div class="entrada-bitacora"><div class="cuando">${esc(B.fechaCorta(x.fecha))} · ${esc(B.CUR[x.curso] ? B.CUR[x.curso].codigo : "")} · ${esc(B.CLASE[x.clase] ? B.CLASE[x.clase].clase.titulo : x.tipo)}</div><p style="margin:4px 0;font-weight:700">${esc(x.pregunta)}</p><div class="texto">${esc(x.texto)}</div></div>`).join("") || `<p class="suave">Nada coincide con la búsqueda.</p>`}</section>`
    : `<section class="hoja vacio">${B.nala("lee", "")}<p>Tu bitácora está vacía. Se llena sola cuando respondes los bloques «Explícalo con tus palabras» y «Piensa con criterio» de cada clase.</p></section>`}`;
};

/* ---------- SÍMBOLOS ---------- */
B.V.simbolos = () => {
  const q = (S.sq || "").toLowerCase();
  const items = Object.entries(window.SIMBOLOS || {}).filter(([k, v]) => !q || (k + v.nombre + v.que + v.lee).toLowerCase().includes(q));
  const grupos = {}; items.forEach(([k, v]) => (grupos[v.grupo] = grupos[v.grupo] || []).push(k));
  return `<section class="hoja"><h1>Diccionario de símbolos</h1><p>Cada signo de un código tiene un trabajo. Aquí están todos, con cómo se leen en voz alta. Además, dentro de cualquier código de las clases puedes <b>tocar un signo</b> para ver qué significa.</p></section>
    <input class="buscador" data-a="buscar-simbolos" value="${esc(S.sq || "")}" placeholder="Buscar: igual, paréntesis, residuo…">
    <div id="lista-simbolos">${Object.entries(grupos).map(([g, ks]) => `<section class="hoja sin-margen"><h3>${esc(g)}</h3><div class="tabla-simbolos">${ks.map(k => { const v = window.SIMBOLOS[k], vis = k.includes(":") && k.length > 2 ? k.split(":").slice(1).join(":") : k, lang = k.includes(":") && k.length > 2 ? k.split(":")[0] : ""; return `<div class="simbolo"><span class="s">${esc(vis === "\"" ? "\" \"" : vis)}</span><div><b>${esc(v.nombre)}${lang ? ` <span class="etiqueta">${esc(B.nombreLang(lang))}</span>` : ""}</b><small class="mano" style="font-size:1.15rem">se lee ${esc(v.lee)}</small><small>${esc(v.que)}</small></div></div>`; }).join("")}</div></section>`).join("") || `<p class="suave">No encontré ese símbolo.</p>`}</div>`;
};

/* ---------- GLOSARIO ---------- */
B.V.glosario = () => {
  const q = (S.gq || "").toLowerCase();
  const items = Object.values(B.GLOS).filter(t => !q || (t.nombre + " " + t.def).toLowerCase().includes(q)).sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
  return `<section class="hoja"><h1>Glosario</h1><p>Las palabras técnicas explicadas en sencillo. En las clases aparecen <span class="term">subrayadas así</span>: tócalas para leer la definición sin salir de la clase.</p></section>
    <input class="buscador" data-a="buscar-glosario" value="${esc(S.gq || "")}" placeholder="Buscar un término…">
    <div class="rejilla tres" id="lista-glosario">${items.map(t => `<button class="simbolo" data-a="termino" data-t="${esc(t.nombre.toLowerCase())}" style="display:block"><b>${esc(t.nombre.charAt(0).toUpperCase() + t.nombre.slice(1))}</b><small>${esc(t.def)}</small></button>`).join("")}</div>`;
};
B.acc.termino = el => {
  const t = B.GLOS[el.dataset.t]; if (!t) return;
  B.modal(`<p class="etiqueta">${esc(t.cat || "Término")}</p><h2 style="margin-top:10px">${esc(t.nombre.charAt(0).toUpperCase() + t.nombre.slice(1))}</h2><p>${esc(t.def)}</p>${t.ej ? `<p class="suave" style="margin-bottom:4px">Ejemplo:</p><div class="consola" style="color:var(--codigo-texto)">${esc(t.ej)}</div>` : ""}`);
};

/* ---------- LABORATORIO ---------- */
const LAB_CLAVE = "bitacora-lab";
const EJEMPLOS = {
  python: [["Hola mundo", 'print("¡Hola, mundo!")\nnombre = input("¿Cómo te llamas? ")\nprint(f"Mucho gusto, {nombre}")', "Andrés"],
    ["Caja registradora", 'precio = float(input("Precio: "))\ncantidad = int(input("Cantidad: "))\ntotal = precio * cantidad * 1.19\nprint(f"Total con IVA: {round(total)}")', "10000\n2"],
    ["Bucle y acumulador", 'total = 0\nfor i in range(1, 6):\n    total += i\n    print(f"i = {i}, total = {total}")', ""],
    ["Inventario", 'inventario = [\n    {"nombre": "cargador", "precio": 25000, "stock": 10},\n    {"nombre": "forro", "precio": 15000, "stock": 0},\n]\nfor p in inventario:\n    estado = "agotado" if p["stock"] == 0 else "disponible"\n    print(p["nombre"], "->", estado)', ""]],
  javascript: [["Hola mundo", 'console.log("¡Hola, mundo!");\nconst nombre = "Nala";\nconsole.log("Me llamo " + nombre);', ""],
    ["Bucle", "for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}", ""]],
  html: [["Página básica", '<h1>Hola, soy Nala</h1>\n<p>Estoy aprendiendo HTML.</p>\n<button onclick="document.body.style.background=\'#F6D44C\'">Cambiar color</button>\n<style>body{font-family:sans-serif;padding:20px}</style>', ""]]
};
B.ejemplosLab = EJEMPLOS;
B.labEstado = () => {
  if (!S.lab) { let g = {}; try { g = JSON.parse(localStorage.getItem(LAB_CLAVE)) || {}; } catch (e) {} S.lab = Object.assign({ modo: "python", python: EJEMPLOS.python[0][1], pythonEnt: EJEMPLOS.python[0][2], javascript: EJEMPLOS.javascript[0][1], html: EJEMPLOS.html[0][1] }, g); }
  return S.lab;
};
B.guardarLab = () => { try { localStorage.setItem(LAB_CLAVE, JSON.stringify(S.lab)); } catch (e) {} };
B.V.lab = () => {
  const L = B.labEstado(), m = L.modo;
  return `<section class="hoja sin-margen"><h1>Laboratorio</h1><p class="suave">Aquí puedes probar y modificar cualquier código. Equivocarte aquí no cuesta nada.</p>
    <div class="fila"><div class="segmentado">${[["python", "Python"], ["javascript", "JavaScript"], ["html", "Web (HTML)"]].map(([k, t]) => `<button class="${m === k ? "activo" : ""}" data-a="lab-modo" data-v="${k}">${t}</button>`).join("")}</div>
    <select class="campo" style="width:auto" data-a="lab-ejemplo" aria-label="Cargar un ejemplo"><option value="">Cargar un ejemplo…</option>${EJEMPLOS[m].map((x, i) => `<option value="${i}">${esc(x[0])}</option>`).join("")}</select></div>
    ${m === "python" && !B.pythonListo() ? `<p class="suave" style="font-size:.88rem;margin:10px 0 0">La primera vez que ejecutes Python tarda unos segundos: la página está cargando el lenguaje completo en tu navegador.</p>` : ""}
    <p class="suave" style="font-size:.85rem;margin:8px 0 0">Java, C# y C++ no se pueden ejecutar en el navegador: para esos usa onlinegdb.com o programiz.com.</p></section>
  <div class="lab"><div><textarea class="editor" id="lab-ed" data-a="lab-codigo" spellcheck="false" autocapitalize="off" aria-label="Editor">${esc(L[m])}</textarea>
    ${m === "python" ? `<label class="suave" style="font-size:.88rem;display:block;margin-top:8px">Entradas para input(), una por línea:<textarea class="editor" style="min-height:70px" data-a="lab-entradas">${esc(L.pythonEnt || "")}</textarea></label>` : ""}
    <div class="acciones">${m === "html" ? `<button class="btn" data-a="lab-actualizar">Actualizar vista</button>` : `<button class="btn verde" data-a="lab-correr">Ejecutar</button>`}<button class="btn claro" data-a="lab-limpiar">Limpiar</button></div></div>
  <div>${m === "html" ? `<iframe class="vista-previa" id="lab-prev" sandbox="allow-scripts" title="Vista previa"></iframe>` : `<div class="consola" id="lab-out"><span class="info">La salida aparecerá aquí.</span></div>`}</div></div>`;
};

/* ---------- PERFIL ---------- */
B.V.perfil = () => {
  const P = B.P, c = P.calib;
  const pct = k => c[k][1] ? Math.round(c[k][0] * 100 / c[k][1]) + "%" : "sin datos";
  const sems = (window.SEMESTRES || []).filter(s => { const cs = B.CURSOS.filter(x => x.semestre === s.n); return cs.length && cs.every(x => B.estadoCurso(x).completo); });
  return `<section class="hoja"><h1>Perfil</h1>
    <label>Tu nombre<input class="campo" data-a="perfil-nombre" value="${esc(P.perfil.nombre)}" placeholder="Para tu constancia" autocomplete="given-name"></label>
    <h3 style="margin-top:18px">¿Cómo llegas a esta universidad?</h3>${B.perfilesHTML(P.perfil.tipo)}
    <h3 style="margin-top:18px">Tiempo de estudio al día</h3><div class="segmentado">${[15, 20, 30, 45, 60, 90].map(v => `<button class="${P.perfil.minutos === v ? "activo" : ""}" data-a="perfil-min" data-v="${v}">${v} min</button>`).join("")}</div>
    <p class="suave" style="margin-top:10px">Te faltan unas <b>${Math.round(B.horasRestantes())} horas</b> para toda la carrera (incluye las materias en preparación).</p></section>
  <section class="hoja sin-margen"><h3>¿Sabes cuándo sabes?</h3><p class="suave">Cuando marcas qué tan seguro estás, aprendes a reconocer lo que dominas de verdad. Así te ha ido:</p>
    <ul><li>Cuando dices «Seguro», aciertas: <b>${pct("seguro")}</b></li><li>Cuando dices «Creo que sí»: <b>${pct("creo")}</b></li><li>Cuando dices «Adivino»: <b>${pct("adivino")}</b></li></ul>
    <p class="suave" style="font-size:.9rem">Si aciertas mucho menos de lo que crees, repasa más; si aciertas más de lo que crees, confía un poco más en ti.</p></section>
  ${sems.length ? `<section class="hoja sin-margen"><h3>Constancias</h3>${sems.map(s => `<button class="btn claro" data-a="ir" data-v="constancia-${s.n}">Semestre ${s.n}: ${esc(s.nombre)}</button>`).join(" ")}</section>` : ""}
  <section class="hoja sin-margen"><h3>Ajustes</h3>
    <div class="ajuste"><span>Modo noche (plano azul)</span><button class="interruptor ${P.perfil.tema === "noche" ? "on" : ""}" data-a="tema" aria-label="Modo noche"></button></div>
    <div class="ajuste"><span>Sonidos</span><button class="interruptor ${P.perfil.sonido ? "on" : ""}" data-a="perfil-sonido" aria-label="Sonidos"></button></div>
    <div class="ajuste"><span>Consejos de Nala durante las clases</span><button class="interruptor ${P.perfil.coach ? "on" : ""}" data-a="perfil-coach" aria-label="Consejos de Nala"></button></div>
    <div class="ajuste"><span>Modo libre<br><small class="suave">Abre todas las materias sin importar el orden</small></span><button class="interruptor ${P.libre ? "on" : ""}" data-a="perfil-libre" aria-label="Modo libre"></button></div>
    <div class="ajuste"><span>Dispositivo detectado</span><span class="etiqueta">${esc(document.documentElement.dataset.dispositivo || "")}</span></div></section>
  <section class="hoja sin-margen"><h3>Copia de seguridad</h3><p class="suave">Tu progreso se guarda en este navegador. Para pasarlo a otro dispositivo, descárgalo y cárgalo allá.</p>
    <div class="fila"><button class="btn claro" data-a="exportar">Descargar mi progreso</button><label class="btn claro" style="cursor:pointer">Cargar progreso<input type="file" accept=".json,application/json" data-a="importar" hidden></label></div></section>
  <section class="hoja sin-margen"><h3>Empezar de cero</h3><p class="suave">Borra todo tu progreso y tu bitácora. No se puede deshacer.</p><button class="btn claro" style="border-color:var(--rojo);color:var(--rojo)" data-a="reiniciar">Borrar mi progreso</button></section>`;
};
B.perfilesHTML = tipo => `<div class="perfiles">${[
  ["cero", "lee", "Empiezo de cero", "Nunca he programado o sé muy poco. Voy materia por materia, en orden."],
  ["estudiando", "piensa", "Estoy estudiando y tengo temas flojos", "Voy en orden, pero puedo validar las materias que ya domino."],
  ["reforzar", "explica", "Ya estudié y quiero reforzar", "Todas las materias abiertas. Te recomiendo validar para encontrar tus puntos débiles."]
].map(([k, pose, t, d]) => `<button class="perfil-op ${tipo === k ? "activo" : ""}" data-a="perfil-tipo" data-v="${k}">${B.nala(pose)}<div><b>${t}</b><small class="suave">${d}</small></div></button>`).join("")}</div>`;

/* ---------- CONSTANCIA ---------- */
B.V.constancia = n => {
  const s = (window.SEMESTRES || []).find(x => x.n === n), cs = B.CURSOS.filter(x => x.semestre === n);
  if (!s || !cs.length || !cs.every(x => B.estadoCurso(x).completo)) return `<section class="hoja vacio">${B.nala("piensa")}<p>Esta constancia aparece cuando completes todas las materias del semestre.</p></section>`;
  const fin = cs.map(c => B.P.completas[c.id] || (B.P.validadas[c.id] || {}).fecha || B.hoy()).sort().pop();
  return `<div class="acciones no-imprimir"><button class="btn" data-a="imprimir">Imprimir o guardar en PDF</button></div>
  <section class="constancia"><img src="img/nala/lee.svg" alt="" style="width:110px;margin:0 auto"><p class="suave">Bitácora · Universidad abierta de programación</p><h2>Constancia de semestre</h2>
    <p>Se deja constancia de que</p><div class="nombre">${esc(B.P.perfil.nombre || "Estudiante")}</div>
    <p>completó el <b>Semestre ${n}: ${esc(s.nombre)}</b>, con las materias:</p><p>${cs.map(c => `${esc(c.codigo)} ${esc(c.titulo)}${B.estadoCurso(c).validada ? " (validada)" : ""}`).join("<br>")}</p>
    <p class="suave">${cs.reduce((a, c) => a + c.horas, 0)} horas de estudio estimadas · ${esc(B.fechaCorta(fin))}</p><span class="sello-grande">APROBADO</span>
    <p class="suave" style="font-size:.8rem;margin-top:20px">Esta constancia es de autoaprendizaje y no reemplaza un título académico.</p></section>`;
};
})(window.B);
