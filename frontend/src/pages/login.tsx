
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';


function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  function handlelogin(){
      
    fetch("http://localhost:5001/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password

      })
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
        navigate("/clients");
      })
      .catch((error) => console.error(error));
  
  }
  return (
    <>
    <div>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

          <button onClick={handlelogin}>
            LOG IN
          </button>
    </div>

    <p>{message}</p>
    </>
  )
}

export default Login
