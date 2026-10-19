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


  //delete client from backend- pass through client id from button
async function deleteClient(id: number) {

  //await to find backend delete method - pass through client id
    const response = await fetch(
      `http://localhost:5001/api/clients/${id}`,
      {
        method: "DELETE"
      }
    );

    if (!response.ok){
      console.error("failed to delete")
      return;
    }

    console.log("Deleted!")
    //refresh client list with method call
    getClient();
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
          
          <button type="button" className="btn" onClick={() => deleteClient(client.id)}>Delete</button>
        </div>
      ))}

      <AddClient updateClient={getClient} />
    </div>
  );
}

export default Clients;