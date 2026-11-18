"""Genera las poses de Nala (gatica caleta: blanca, gris oscuro y naranja) como SVG.
Uso: python3 herramientas/nala.py  -> escribe img/nala/*.svg
"""
import os

SALIDA = os.path.join(os.path.dirname(__file__), "..", "img", "nala")
os.makedirs(SALIDA, exist_ok=True)

TINTA = "#23262E"      # contorno
BLANCO = "#FBFAF7"
GRIS = "#4A4E57"       # manchas oscuras
GRIS2 = "#6B707B"
NARANJA = "#E8A04B"
NARANJA2 = "#F3C27A"
OJO = "#D9B44A"
NARIZ = "#E58C78"
OREJA_IN = "#E9D9D2"
RUBOR = "#F3A79A"
LW = 3.2


def cabeza(cx, cy, s=1.0, ojos="abiertos", boca="sonrisa", orejas="arriba", mirada=(0, 0), id_="h"):
    """Cabeza de Nala centrada en (cx, cy). s = escala."""
    def P(x, y):
        return f"{cx + x * s:.1f},{cy + y * s:.1f}"

    # orejas: puntas según estado
    if orejas == "arriba":
        oi = [(-52, -18), (-46, -78), (-14, -46)]
        od = [(52, -18), (48, -76), (14, -46)]
    elif orejas == "abajo":
        oi = [(-50, -16), (-84, -34), (-24, -48)]
        od = [(50, -16), (84, -34), (24, -48)]
    else:  # ladeadas (curiosa)
        oi = [(-52, -18), (-58, -78), (-16, -46)]
        od = [(52, -16), (66, -66), (14, -46)]

    def oreja(pts, dentro):
        a, b, c = pts
        ext = f"M{P(*a)} Q{P(a[0]*0.9 + b[0]*0.1, b[1]+10)} {P(*b)} Q{P((b[0]+c[0])/2+4, (b[1]+c[1])/2)} {P(*c)} Z"
        # interior
        k = 0.55
        ia = (a[0] + (b[0] - a[0]) * 0.2 + (c[0]-a[0])*0.15, a[1] + (b[1] - a[1]) * 0.2 + 6)
        ib = (a[0] + (b[0] - a[0]) * 0.85 + (c[0]-a[0])*0.05, a[1] + (b[1] - a[1]) * 0.85)
        ic = (c[0] + (a[0]-c[0])*0.25, c[1] + 4)
        inn = f"M{P(*ia)} Q{P(ia[0], ib[1]+8)} {P(*ib)} Q{P((ib[0]+ic[0])/2, (ib[1]+ic[1])/2)} {P(*ic)} Z"
        pelo = f'<path d="M{P(ia[0]+2, ia[1]-4)} l{6*s:.1f},{-10*s:.1f} M{P(ia[0]+8, ia[1]-2)} l{4*s:.1f},{-12*s:.1f}" stroke="{BLANCO}" stroke-width="{1.6*s:.1f}" stroke-linecap="round"/>'
        return (f'<path d="{ext}" fill="{GRIS}" stroke="{TINTA}" stroke-width="{LW}" stroke-linejoin="round"/>'
                f'<path d="{inn}" fill="{OREJA_IN}"/>{pelo}')

    # contorno de la cabeza con mejillas esponjosas
    cab = (f"M{P(-58,-10)} C{P(-60,-46)} {P(-30,-60)} {P(0,-60)} C{P(30,-60)} {P(60,-46)} {P(58,-10)} "
           f"C{P(66,4)} {P(70,16)} {P(62,22)} C{P(66,30)} {P(56,40)} {P(48,40)} "
           f"C{P(36,54)} {P(18,58)} {P(0,58)} C{P(-18,58)} {P(-36,54)} {P(-48,40)} "
           f"C{P(-56,40)} {P(-66,30)} {P(-62,22)} C{P(-70,16)} {P(-66,4)} {P(-58,-10)} Z")
    clip = f"cabeza-{id_}"
    out = [oreja(oi, True), oreja(od, True)]
    out.append(f'<clipPath id="{clip}"><path d="{cab}"/></clipPath>')
    out.append(f'<path d="{cab}" fill="{BLANCO}"/>')
    g = [f'<g clip-path="url(#{clip})">']
    # manchas grises sobre ojos y frente (como la foto)
    g.append(f'<path d="M{P(-70,-70)} L{P(-6,-70)} C{P(-10,-40)} {P(-14,-20)} {P(-20,4)} C{P(-30,10)} {P(-50,6)} {P(-72,0)} Z" fill="{GRIS}"/>')
    g.append(f'<path d="M{P(70,-70)} L{P(8,-70)} C{P(12,-40)} {P(16,-20)} {P(22,6)} C{P(34,12)} {P(52,4)} {P(72,-2)} Z" fill="{GRIS}"/>')
    # franja naranja de la frente hasta la nariz
    g.append(f'<path d="M{P(-12,-64)} C{P(-16,-40)} {P(-14,-16)} {P(-9,6)} C{P(-6,12)} {P(6,12)} {P(9,6)} C{P(15,-16)} {P(17,-40)} {P(13,-64)} Z" fill="{NARANJA}"/>')
    g.append(f'<path d="M{P(-4,-60)} C{P(-6,-40)} {P(-4,-22)} {P(-2,-4)}" stroke="{NARANJA2}" stroke-width="{4*s:.1f}" fill="none" stroke-linecap="round"/>')
    # manchita negra junto a la boca (lado derecho de quien mira)
    g.append(f'<ellipse cx="{cx+15*s:.1f}" cy="{cy+28*s:.1f}" rx="{6*s:.1f}" ry="{4.5*s:.1f}" fill="{TINTA}" opacity=".85"/>')
    g.append("</g>")
    out += g
    out.append(f'<path d="{cab}" fill="none" stroke="{TINTA}" stroke-width="{LW}" stroke-linejoin="round"/>')
    # mechones de las mejillas
    out.append(f'<path d="M{P(-62,22)} l{-8*s:.1f},{2*s:.1f} M{P(62,22)} l{8*s:.1f},{2*s:.1f}" stroke="{TINTA}" stroke-width="{2*s:.1f}" stroke-linecap="round"/>')

    # ojos
    mx, my = mirada
    def ojo(x):
        if ojos == "cerrados":
            return f'<path d="M{P(x-10,-6)} Q{P(x,-0)} {P(x+10,-6)}" stroke="{TINTA}" stroke-width="{LW}" fill="none" stroke-linecap="round"/>'
        if ojos == "felices":
            return f'<path d="M{P(x-11,-2)} Q{P(x,-14)} {P(x+11,-2)}" stroke="{TINTA}" stroke-width="{LW+0.4}" fill="none" stroke-linecap="round"/>'
        ry = 14 if ojos != "tristes" else 15
        o = (f'<ellipse cx="{cx+x*s:.1f}" cy="{cy-6*s:.1f}" rx="{12*s:.1f}" ry="{ry*s:.1f}" fill="{OJO}" stroke="{TINTA}" stroke-width="{LW-0.6}"/>'
             f'<ellipse cx="{cx+(x+mx)*s:.1f}" cy="{cy+(-5+my)*s:.1f}" rx="{6.5*s:.1f}" ry="{10*s:.1f}" fill="{TINTA}"/>'
             f'<circle cx="{cx+(x+mx+3)*s:.1f}" cy="{cy+(-10+my)*s:.1f}" r="{3.6*s:.1f}" fill="#fff"/>'
             f'<circle cx="{cx+(x+mx-3)*s:.1f}" cy="{cy+(-1+my)*s:.1f}" r="{1.6*s:.1f}" fill="#fff" opacity=".8"/>')
        if ojos == "tristes":
            o += f'<path d="M{P(x-12,-24)} L{P(x+10,-20) if x<0 else P(x+12,-24)}" stroke="{TINTA}" stroke-width="{2.4*s:.1f}" stroke-linecap="round"/>' if False else ""
            o += f'<path d="M{P(x-11 if x<0 else x-9,-23 if x<0 else -27)} L{P(x+9 if x<0 else x+11,-27 if x<0 else -23)}" stroke="{TINTA}" stroke-width="{2.6*s:.1f}" stroke-linecap="round"/>'
        return o
    out.append('<g class="ojos">' + ojo(-24) + ojo(24) + "</g>")

    # nariz y boca
    out.append(f'<path d="M{P(-6,12)} Q{P(0,9)} {P(6,12)} Q{P(4,17)} {P(0,19)} Q{P(-4,17)} {P(-6,12)} Z" fill="{NARIZ}" stroke="{TINTA}" stroke-width="{2*s:.1f}" stroke-linejoin="round"/>')
    if boca == "sonrisa":
        out.append(f'<path d="M{P(0,19)} L{P(0,23)} M{P(-10,22)} Q{P(-5,29)} {P(0,23)} Q{P(5,29)} {P(10,22)}" stroke="{TINTA}" stroke-width="{2.4*s:.1f}" fill="none" stroke-linecap="round"/>')
    elif boca == "abierta":
        out.append(f'<path d="M{P(-10,23)} Q{P(0,22)} {P(10,23)} Q{P(8,38)} {P(0,39)} Q{P(-8,38)} {P(-10,23)} Z" fill="#B5434A" stroke="{TINTA}" stroke-width="{2.4*s:.1f}" stroke-linejoin="round"/>'
                   f'<path d="M{P(-5,34)} Q{P(0,30)} {P(5,34)} Q{P(0,38)} {P(-5,34)} Z" fill="#E98A92"/>')
    elif boca == "o":
        out.append(f'<ellipse cx="{cx:.1f}" cy="{cy+28*s:.1f}" rx="{4.5*s:.1f}" ry="{5.5*s:.1f}" fill="#B5434A" stroke="{TINTA}" stroke-width="{2*s:.1f}"/>')
    else:  # triste
        out.append(f'<path d="M{P(0,19)} L{P(0,24)} M{P(-9,30)} Q{P(0,22)} {P(9,30)}" stroke="{TINTA}" stroke-width="{2.4*s:.1f}" fill="none" stroke-linecap="round"/>')
    # rubor
    out.append(f'<ellipse cx="{cx-40*s:.1f}" cy="{cy+16*s:.1f}" rx="{8*s:.1f}" ry="{4.5*s:.1f}" fill="{RUBOR}" opacity=".55"/>'
               f'<ellipse cx="{cx+40*s:.1f}" cy="{cy+16*s:.1f}" rx="{8*s:.1f}" ry="{4.5*s:.1f}" fill="{RUBOR}" opacity=".55"/>')
    # bigotes
    bg = []
    for sgn in (-1, 1):
        for dy, ang in ((14, -6), (20, 0), (26, 7)):
            x1 = 30 * sgn
            bg.append(f"M{P(x1, dy)} L{P(x1 + 40 * sgn, dy + ang)}")
    out.append(f'<path d="{" ".join(bg)}" stroke="{TINTA}" stroke-width="{1.3*s:.1f}" stroke-linecap="round" opacity=".7"/>')
    return "".join(out)


def cola(d):
    """Cola esponjosa con franjas (d = path de la línea central)."""
    return (f'<path d="{d}" stroke="{TINTA}" stroke-width="26" fill="none" stroke-linecap="round"/>'
            f'<path d="{d}" stroke="{GRIS}" stroke-width="20" fill="none" stroke-linecap="round"/>'
            f'<path d="{d}" stroke="{NARANJA}" stroke-width="20" fill="none" stroke-linecap="round" stroke-dasharray="14 22"/>'
            f'<path d="{d}" stroke="{BLANCO}" stroke-width="20" fill="none" stroke-linecap="round" stroke-dasharray="0.1 200" stroke-dashoffset="-1"/>')


def cuerpo_sentado(cx, base, id_="b"):
    """Cuerpo sentado visto de frente. base = y del suelo."""
    clip = f"cuerpo-{id_}"
    cu = (f"M{cx-40},{base-96} C{cx-62},{base-70} {cx-66},{base-20} {cx-58},{base-4} "
          f"C{cx-40},{base+4} {cx+40},{base+4} {cx+58},{base-4} C{cx+66},{base-20} {cx+62},{base-70} {cx+40},{base-96} Z")
    s = [f'<clipPath id="{clip}"><path d="{cu}"/></clipPath>',
         f'<path d="{cu}" fill="{BLANCO}"/>',
         f'<g clip-path="url(#{clip})">',
         f'<path d="M{cx+18},{base-100} C{cx+50},{base-80} {cx+70},{base-50} {cx+70},{base} L{cx+30},{base} C{cx+36},{base-40} {cx+30},{base-70} {cx+18},{base-100} Z" fill="{GRIS}"/>',
         f'<path d="M{cx+38},{base-58} C{cx+52},{base-50} {cx+62},{base-36} {cx+64},{base-20} C{cx+52},{base-24} {cx+42},{base-38} {cx+38},{base-58} Z" fill="{NARANJA}"/>',
         f'<path d="M{cx-60},{base-60} C{cx-44},{base-56} {cx-40},{base-36} {cx-46},{base-14} L{cx-70},{base-10} Z" fill="{GRIS}"/>',
         "</g>",
         f'<path d="{cu}" fill="none" stroke="{TINTA}" stroke-width="{LW}"/>',
         # pecho esponjoso
         f'<path d="M{cx-18},{base-86} q6,8 0,14 q8,4 4,12 M{cx+14},{base-84} q-6,8 0,14" stroke="{TINTA}" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".5"/>']
    return "".join(s)


def patas_delanteras(cx, base, izq=True, der=True):
    s = []
    for x, on in ((cx - 18, izq), (cx + 18, der)):
        if not on:
            continue
        s.append(f'<path d="M{x-11},{base-50} L{x-12},{base-6} Q{x},{base+4} {x+12},{base-6} L{x+11},{base-50}" fill="{BLANCO}" stroke="{TINTA}" stroke-width="{LW}" stroke-linejoin="round"/>'
                 f'<path d="M{x-4},{base-4} v-6 M{x+4},{base-4} v-6" stroke="{TINTA}" stroke-width="1.8" stroke-linecap="round"/>')
    return "".join(s)


def pata_levantada(x0, y0, x1, y1):
    """Una pata levantada (saludo, señalar)."""
    return (f'<path d="M{x0},{y0} Q{(x0+x1)/2-10},{(y0+y1)/2} {x1},{y1}" stroke="{TINTA}" stroke-width="27" fill="none" stroke-linecap="round"/>'
            f'<path d="M{x0},{y0} Q{(x0+x1)/2-10},{(y0+y1)/2} {x1},{y1}" stroke="{BLANCO}" stroke-width="20" fill="none" stroke-linecap="round"/>'
            f'<circle cx="{x1}" cy="{y1}" r="3" fill="{NARIZ}"/>')


def svg(contenido, vb="0 0 240 240", titulo="Nala"):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" role="img" aria-label="{titulo}">'
            f'<title>{titulo}</title>{contenido}</svg>')


def sombra(cx, y, rx=62):
    return f'<ellipse cx="{cx}" cy="{y}" rx="{rx}" ry="7" fill="{TINTA}" opacity=".12"/>'


poses = {}

# 1. Saluda: sentada, pata derecha arriba
poses["saluda"] = svg(
    sombra(120, 228) + cola("M170,214 C210,210 214,170 196,150") + cuerpo_sentado(120, 224, "s1")
    + patas_delanteras(120, 224, der=False)
    + pata_levantada(146, 150, 184, 96)
    + '<path d="M196,80 q8,4 6,14 M204,98 q10,2 10,12" stroke="#23262E" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
    + cabeza(116, 92, 0.95, ojos="abiertos", boca="abierta", id_="s1"), titulo="Nala saludando")

# 2. Piensa: pata en la barbilla, mirada arriba, signo de pregunta
poses["piensa"] = svg(
    sombra(120, 228) + cola("M170,214 C214,214 220,170 200,146") + cuerpo_sentado(120, 224, "s2")
    + patas_delanteras(120, 224, izq=False)
    + pata_levantada(102, 160, 118, 128)
    + cabeza(120, 90, 0.95, ojos="abiertos", boca="o", orejas="ladeadas", mirada=(4, -4), id_="s2")
    + '<text x="186" y="52" font-family="Georgia,serif" font-size="40" font-weight="700" fill="#E8A04B" stroke="#23262E" stroke-width="1.5">?</text>',
    titulo="Nala pensando")

# 3. Celebra: saltando, patas arriba, estrellitas
est = lambda x, y, r, c: (f'<path d="M{x},{y-r} L{x+r*0.3},{y-r*0.3} L{x+r},{y} L{x+r*0.3},{y+r*0.3} L{x},{y+r} L{x-r*0.3},{y+r*0.3} L{x-r},{y} L{x-r*0.3},{y-r*0.3} Z" fill="{c}" stroke="#23262E" stroke-width="1.6" stroke-linejoin="round"/>')
poses["celebra"] = svg(
    sombra(120, 232, 44) + cola("M156,190 C200,196 214,160 204,128")
    + f'<path d="M80,130 C70,160 76,196 96,206 C110,212 130,212 144,206 C164,196 170,160 160,130 Z" fill="{BLANCO}" stroke="{TINTA}" stroke-width="{LW}"/>'
    + f'<path d="M142,134 C160,146 166,170 158,196 C150,186 146,160 142,134 Z" fill="{GRIS}"/>'
    + f'<path d="M96,206 q-6,14 -18,16 M144,206 q6,14 18,16" stroke="{TINTA}" stroke-width="24" stroke-linecap="round" fill="none"/>'
    + f'<path d="M96,206 q-6,14 -18,16 M144,206 q6,14 18,16" stroke="{BLANCO}" stroke-width="17" stroke-linecap="round" fill="none"/>'
    + pata_levantada(90, 140, 52, 92) + pata_levantada(150, 140, 190, 90)
    + cabeza(120, 88, 0.92, ojos="felices", boca="abierta", id_="s3")
    + est(30, 50, 12, "#F5D547") + est(212, 46, 10, "#F5D547") + est(200, 170, 7, "#E8A04B") + est(28, 160, 8, "#E8A04B"),
    titulo="Nala celebrando")

# 4. Triste/apenada: orejas abajo
poses["triste"] = svg(
    sombra(120, 228) + cola("M70,216 C34,216 26,186 40,168") + cuerpo_sentado(120, 224, "s4")
    + patas_delanteras(120, 224)
    + cabeza(120, 96, 0.95, ojos="tristes", boca="triste", orejas="abajo", mirada=(0, 3), id_="s4")
    + '<path d="M176,58 q4,8 0,12 q-4,-4 0,-12 Z" fill="#7FB8E0" stroke="#23262E" stroke-width="1.4"/>',
    titulo="Nala apenada")

# 5. Explica: con un lápiz
poses["explica"] = svg(
    sombra(110, 228) + cola("M160,214 C204,212 210,174 192,152") + cuerpo_sentado(110, 224, "s5")
    + patas_delanteras(110, 224, der=False)
    + '<g transform="rotate(-35 190 92)"><rect x="150" y="84" width="78" height="14" rx="3" fill="#F5D547" stroke="#23262E" stroke-width="2.4"/>'
      '<path d="M228,84 L246,91 L228,98 Z" fill="#F3D9B0" stroke="#23262E" stroke-width="2.4" stroke-linejoin="round"/>'
      '<path d="M241,89 L246,91 L241,93 Z" fill="#23262E"/><rect x="142" y="84" width="10" height="14" rx="2" fill="#C8402E" stroke="#23262E" stroke-width="2.4"/></g>'
    + pata_levantada(134, 150, 164, 112)
    + cabeza(104, 90, 0.95, ojos="abiertos", boca="sonrisa", mirada=(4, 0), id_="s5"),
    titulo="Nala explicando")

# 6. Duerme: enroscada, para los descansos
poses["duerme"] = svg(
    sombra(120, 214, 86)
    + f'<path d="M40,196 C30,150 70,118 124,118 C182,118 214,150 204,192 C196,214 54,216 40,196 Z" fill="{BLANCO}" stroke="{TINTA}" stroke-width="{LW}"/>'
    + f'<path d="M124,120 C170,118 206,146 204,186 C186,170 160,150 124,120 Z" fill="{GRIS}"/>'
    + f'<path d="M150,128 C166,134 178,146 182,158 C168,156 156,144 150,128 Z" fill="{NARANJA}"/>'
    + cola("M196,192 C180,214 120,214 92,204")
    + cabeza(84, 168, 0.72, ojos="cerrados", boca="sonrisa", id_="s6")
    + '<text x="150" y="70" font-family="Georgia,serif" font-size="26" font-weight="700" fill="#4A4E57">z</text>'
      '<text x="172" y="48" font-family="Georgia,serif" font-size="34" font-weight="700" fill="#4A4E57">z</text>',
    titulo="Nala durmiendo")

# 7. Lee: con un cuaderno
poses["lee"] = svg(
    sombra(120, 228) + cola("M172,214 C214,212 218,172 198,150") + cuerpo_sentado(120, 224, "s7")
    + f'<g transform="rotate(-6 120 176)"><path d="M70,150 L120,160 L170,150 L170,206 L120,214 L70,206 Z" fill="#E8F0E4" stroke="{TINTA}" stroke-width="2.6" stroke-linejoin="round"/>'
      f'<path d="M120,160 L120,214" stroke="{TINTA}" stroke-width="2"/>'
      f'<path d="M80,168 l30,5 M80,178 l30,5 M80,188 l24,4 M130,173 l30,-5 M130,183 l30,-5 M130,193 l22,-4" stroke="#8FA88A" stroke-width="2" stroke-linecap="round"/></g>'
    + f'<circle cx="78" cy="176" r="11" fill="{BLANCO}" stroke="{TINTA}" stroke-width="{LW}"/><circle cx="162" cy="176" r="11" fill="{BLANCO}" stroke="{TINTA}" stroke-width="{LW}"/>'
    + cabeza(120, 94, 0.95, ojos="abiertos", boca="sonrisa", mirada=(0, 5), id_="s7"),
    titulo="Nala leyendo")

# 8. Cara (avatar)
poses["cara"] = svg(cabeza(80, 92, 1.0, ojos="abiertos", boca="sonrisa", id_="c"), vb="0 0 160 160", titulo="Nala")
poses["cara-feliz"] = svg(cabeza(80, 92, 1.0, ojos="felices", boca="abierta", id_="c2"), vb="0 0 160 160", titulo="Nala feliz")
poses["cara-piensa"] = svg(cabeza(80, 92, 1.0, ojos="abiertos", boca="o", orejas="ladeadas", mirada=(4, -4), id_="c3"), vb="0 0 160 160", titulo="Nala pensando")
poses["cara-triste"] = svg(cabeza(80, 96, 1.0, ojos="tristes", boca="triste", orejas="abajo", mirada=(0, 3), id_="c4"), vb="0 0 160 160", titulo="Nala apenada")

for nombre, contenido in poses.items():
    with open(os.path.join(SALIDA, f"{nombre}.svg"), "w", encoding="utf-8") as f:
        f.write(contenido)
print("poses:", ", ".join(poses))
