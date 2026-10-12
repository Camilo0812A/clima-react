import { useState, useEffect } from "react";

export function useFetch(url) {
  // Se guarda la url junto con la respuesta para saber a que busqueda pertenece
  const [resultado, setResultado] = useState({ url: null, datos: null, error: null });

  useEffect(() => {
    if (!url) return;

    const controlador = new AbortController();

    async function pedir() {
      try {
        const respuesta = await fetch(url, { signal: controlador.signal });

        if (!respuesta.ok) {
          throw new Error("Error " + respuesta.status);
        }

        const json = await respuesta.json();
        setResultado({ url: url, datos: json, error: null });
      } catch (err) {
        if (err.name === "AbortError") return;
        setResultado({ url: url, datos: null, error: err.message });
      }
    }

    pedir();

    return () => controlador.abort();
  }, [url]);

  // Si la respuesta guardada es de otra url, todavia se esta cargando la actual
  const esDeEstaUrl = url != null && resultado.url === url;

  return {
    datos: esDeEstaUrl ? resultado.datos : null,
    cargando: url != null && !esDeEstaUrl,
    error: esDeEstaUrl ? resultado.error : null,
  };
}
