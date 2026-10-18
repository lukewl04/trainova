import { useState, useEffect } from "react";
import AddClient from "../components/addClient";

interface Client {
  id: number;
  name: string;
  age: number;
  weight: number;
}

function Clients() {
  const [clients, setClients] = useState<Client[]>([]);

  function getClient() {
    fetch("http://localhost:5001/api/clients")
      .then((response) => response.json())
      .then((data) => {
        setClients(data);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getClient();
  }, []);

  return (
    <div className="container text-center">
      <h1>Clients</h1>

      {clients.map((client) => (
        <div key={client.id}>
          <h3>{client.name}</h3>
          <p>Age: {client.age}</p>
          <p>Weight: {client.weight}kg</p>
        </div>
      ))}

      <AddClient updateClient={getClient} />
    </div>
  );
}

export default Clients;