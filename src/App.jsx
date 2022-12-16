import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";

function App() {
  const [user, setuser] = useState(null);
  const [token, setToken] = useState("");
  const PORT = import.meta.env.VITE_REACT_APP_URI;
  useEffect(() => {
    const checkLoggedIn = async () => {
      let currToken = localStorage.getItem("auth-token");
      if (currToken) {
        const userRes = await fetch(`${PORT}/api/`, {
          headers: { "x-auth-token": currToken },
        });
        const userData = await userRes.json();
        setuser(userData);
      } else {
        setuser(null);
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <div className='p-2'>
      {user ? (
        <Home user={user} setUser={setuser} />
      ) : (
        <Authentication setuser={setuser} setToken={setToken} />
      )}
    </div>
  );
}

export default App;
