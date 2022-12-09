import { useState, useEffect } from "react";
import "./App.css";
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
    <div className='App'>
      {user ? <Home user={user} /> : <Authentication setuser={setuser} />}
    </div>
  );
}

export default App;
