import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";

function App() {
  const [user, setuser] = useState(null);
  useEffect(() => {
    const id = localStorage.getItem("userId");
    const email = localStorage.getItem("userEmail");
    if (id && email) {
      setuser({ email, id });
    }
  }, []);
  return (
    <div>
      {user ? (
        <Home user={user} setUser={setuser} />
      ) : (
        <Authentication setuser={setuser} />
      )}
    </div>
  );
}

export default App;
