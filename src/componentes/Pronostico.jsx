import { describirClima } from "../clima";

function Pronostico({ ciudad, datos, resumen }) {
  return (
    <div className="pronostico">
      <h2>{ciudad.name}</h2>
      <p className="hoy">
        <span className="temperatura">{datos.current.temperature_2m} °C</span>
        <span>{describirClima(datos.current.weather_code)}</span>
        <span className="viento">💨 viento {datos.current.wind_speed_10m} km/h</span>
      </p>

      {resumen != null && (
        <p className="resumen">
          Esta semana: máxima {resumen.maxima} °C, mínima {resumen.minima} °C. El día más caluroso es el {resumen.diaCaluroso}.
        </p>
      )}

      <ul className="dias">
        {datos.daily.time.map((fecha, i) => (
          <li key={fecha}>
            <span className="fecha">{fecha}</span>
            <span>{describirClima(datos.daily.weather_code[i])}</span>
            <span className="rango">
              {datos.daily.temperature_2m_min[i]} - {datos.daily.temperature_2m_max[i]} °C
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pronostico;
