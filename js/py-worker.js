/* Worker que ejecuta Python con Pyodide (Python compilado a WebAssembly).
   Los archivos de Pyodide están en vendor/pyodide para que funcione
   sin depender de servidores externos (y en GitHub Pages). */
const BASE = new URL("../vendor/pyodide/", self.location).href;
let py = null;

const ARNES = `
import sys, json, traceback, io

def _igual(a, b):
    if isinstance(a, bool) or isinstance(b, bool):
        return a == b
    if isinstance(a, (int, float)) and isinstance(b, (int, float)):
        return abs(a - b) < 1e-9
    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):
        return len(a) == len(b) and all(_igual(x, y) for x, y in zip(a, b))
    if isinstance(a, dict) and isinstance(b, dict):
        return a.keys() == b.keys() and all(_igual(a[k], b[k]) for k in a)
    return a == b

class _Salida(io.TextIOBase):
    def __init__(self):
        self.limpio = []
        self.consola = []
    def write(self, s):
        self.limpio.append(s)
        self.consola.append(["out", s])
        return len(s)
    def flush(self):
        pass

def _ejecutar(codigo, entradas_json, funcion, pruebas_json):
    entradas = json.loads(entradas_json)
    sal = _Salida()
    def _input(msg=""):
        if not entradas:
            raise EOFError("El programa pidió un dato con input() y ya no quedan entradas")
        v = str(entradas.pop(0))
        sal.consola.append(["ent", f"{msg}{v}\\n"])
        return v
    g = {"__name__": "__main__", "input": _input}
    viejo = sys.stdout
    sys.stdout = sal
    res = {"error": None, "resultados": None}
    try:
        exec(compile(codigo, "programa.py", "exec"), g)
        if funcion:
            f = g.get(funcion)
            if not callable(f):
                res["error"] = {"tipo": "NameError", "mensaje": "No encontré la función " + funcion, "linea": None}
            else:
                rs = []
                for args, esp in json.loads(pruebas_json):
                    txt = ", ".join(repr(a) for a in args)
                    try:
                        r = f(*json.loads(json.dumps(args)))
                        rs.append({"args": txt, "esp": repr(esp), "r": repr(r), "ok": bool(_igual(r, esp))})
                    except Exception as e:
                        rs.append({"args": txt, "esp": repr(esp), "error": type(e).__name__ + ": " + str(e), "ok": False})
                res["resultados"] = rs
    except BaseException as e:
        linea = None
        if isinstance(e, SyntaxError):
            linea = e.lineno
        else:
            for fr in traceback.extract_tb(e.__traceback__):
                if fr.filename == "programa.py":
                    linea = fr.lineno
        res["error"] = {"tipo": type(e).__name__, "mensaje": str(e), "linea": linea}
    finally:
        sys.stdout = viejo
    res["limpio"] = "".join(sal.limpio)
    res["consola"] = sal.consola
    return json.dumps(res)
`;

const listo = (async () => {
  try {
    importScripts(BASE + "pyodide.js");
    py = await loadPyodide({ indexURL: BASE });
    py.runPython(ARNES);
    postMessage({ tipo: "listo" });
  } catch (e) {
    postMessage({ tipo: "fallo", mensaje: String(e && e.message || e) });
  }
})();

self.onmessage = async ev => {
  await listo;
  const { id, codigo, entradas, funcion, pruebas } = ev.data;
  try {
    const f = py.globals.get("_ejecutar");
    const r = f(codigo, JSON.stringify(entradas || []), funcion || "", JSON.stringify(pruebas || []));
    f.destroy && f.destroy();
    postMessage(Object.assign({ id }, JSON.parse(r)));
  } catch (e) {
    postMessage({ id, error: { tipo: "Error", mensaje: String(e && e.message || e) }, consola: [], limpio: "" });
  }
};
