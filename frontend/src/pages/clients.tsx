
import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';


interface Client {
  name: string;
  age: number;
  weight: number;
}

function Clients() {
  const [Client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/jack")
    .then((response) => response.json())
    .then((data) => {
    setClient(data);
    });
  // Code here
}, []);
  return (
    <>
    <div className="container text-center">
         <p
          className="text-uppercase mb-3 d-inline-block"
          style={{
            letterSpacing: "0.15em",
            fontSize: "0.8rem",
            borderBottom: "2px solid currentColor",
            paddingBottom: "3px",
          }}
        >
                    </p>
          <div>
             <p>Clients!!</p>
                  {Client && (
        <div>
          <p>Name: {Client.name}</p>
          <p>Age: {Client.age}</p>
          <p>Weight: {Client.weight}kg</p>
        </div>
      )}
          </div>


        <div>
          <p
          className="text-uppercase mb-3 d-inline-block"
          style={{
            letterSpacing: "0.1em",
            fontSize: "0.8rem",
            paddingBottom: "3px",
          }}
        >
          Pending....
        </p>
        </div>
        <div>
          <button type="button" className="btn">Base class</button>
        </div>


    </div>
    <Alert dismissible variant="danger">
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>Change this and that and try again.</p>
    </Alert>
    </>
  )
}

export default Clients
