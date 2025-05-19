import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [nextRace, setNextRace] = useState(null);
  const [standings, setStandings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Obtener próxima carrera
        const raceResponse = await fetch('https://ergast.com/api/f1/2024.json');
        const raceData = await raceResponse.json();
        const nextRaceData = raceData.MRData.RaceTable.Races[0];
        
        // 2. Obtener clasificación de pilotos
        const standingsResponse = await fetch('https://ergast.com/api/f1/current/driverStandings.json');
        const standingsData = await standingsResponse.json();
        const topDrivers = standingsData.MRData.StandingsTable.StandingsLists[0].DriverStandings.slice(0, 4);

        setNextRace({
          name: nextRaceData.raceName,
          date: nextRaceData.date,
          circuit: nextRaceData.Circuit.circuitName,
          country: nextRaceData.Circuit.Location.country,
          round: nextRaceData.round
        });

        setStandings(topDrivers.map(driver => ({
          id: driver.Driver.driverId,
          name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
          team: driver.Constructors[0].name,
          points: driver.points,
          number: driver.Driver.permanentNumber
        })));

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Cargando datos de Fórmula 1...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <h2>Error al cargar los datos</h2>
      <p>{error}</p>
      <button onClick={() => window.location.reload()}>Reintentar</button>
    </div>
  );

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Bienvenido al Mundo de la <span>Fórmula 1</span></h1>
          <p>Temporada {new Date().getFullYear()} - Datos en tiempo real</p>
          <Link to="/schedule" className="cta-button">Ver Calendario Completo</Link>
        </div>
      </section>

      {/* Next Race Section */}
      {nextRace && (
        <section className="next-race glass-card">
          <h2>Próxima Carrera</h2>
          <div className="race-info">
            <h3>{nextRace.name}</h3>
            <p><strong>Circuito:</strong> {nextRace.circuit}</p>
            <p><strong>Ubicación:</strong> {nextRace.country}</p>
            <p><strong>Fecha:</strong> {new Date(nextRace.date).toLocaleDateString('es-ES', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}</p>
            <Link to={`/races/${nextRace.round}`} className="details-link">
              Ver Detalles →
            </Link>
          </div>
        </section>
      )}

      {/* Drivers Standings */}
      <section className="featured-drivers">
        <h2>Clasificación de Pilotos</h2>
        <div className="drivers-grid">
          {standings.map((driver, index) => (
            <div key={driver.id} className="driver-card glass-card">
              <div className="driver-header">
                <span className="driver-position">#{index + 1}</span>
                <span className="driver-number">#{driver.number}</span>
              </div>
              <h3>{driver.name}</h3>
              <p><strong>Equipo:</strong> {driver.team}</p>
              <p><strong>Puntos:</strong> {driver.points}</p>
              <Link to={`/drivers/${driver.id}`} className="driver-link">
                Ver Perfil
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Last Results */}
      <section className="last-results glass-card">
        <h2>Últimos Resultados</h2>
        <p>Consulta los resultados de la carrera anterior</p>
        <Link to="/results" className="cta-button secondary">
          Ver Resultados
        </Link>
      </section>
    </div>
  );
};

export default Home;