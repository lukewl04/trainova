import { useState } from "react";


//define prop
interface AddClientProps {
  updateClient: () => void;
}

//recieve prop, add client

function AddClient({ updateClient }: AddClientProps) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");

  async function saveClient() {
    const response = await fetch(
      "http://localhost:5001/api/clients",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          age: Number(age),
          weight: Number(weight)
        })
      }
    );

    if (!response.ok) {
      console.error("Failed to save client");
      return;
    }

    console.log("Client saved!");
    //tell parent to refresh client list
    updateClient();
  }

  return (
    <div>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
        <input
        type="number"
        placeholder="Weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />

      <button onClick={saveClient}>
        Save 
      </button>
    </div>
  );
}

export default AddClient;