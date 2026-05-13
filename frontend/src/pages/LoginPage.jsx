import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = () => {

    // Simple dummy login
    if (username && password) {

      const fakeToken = "jwt-token-demo";

      login(fakeToken);

      navigate("/list");

    } else {

      alert("Enter username and password");

    }

  };

  return (
    <div className="p-4 max-w-md mx-auto">

      <h1 className="text-2xl font-bold mb-4">
        Login
      </h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Login
      </button>

    </div>
  );
}