import "./Drivers.css";

const Drivers = () => {
  const drivers = [
    { id: 1, name: "Lewis Hamilton", team: "Mercedes" },
    { id: 2, name: "Max Verstappen", team: "Red Bull" },
  ];

  return (
    <div className="drivers-page">
      <h2>Pilotos 2024</h2>
      <ul className="drivers-list">
        {drivers.map((driver) => (
          <li key={driver.id}>
            <strong>{driver.name}</strong> - {driver.team}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Drivers;