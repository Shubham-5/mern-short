import { useState } from "react";

import Auth from "../components/Auth";
const Authentication = ({ setuser, setToken }) => {
  const [isLogin, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const PORT = import.meta.env.VITE_REACT_APP_URI;
  const handleRegister = async () => {
    if ((!name || !password, !email)) return alert("All field required");
    setLoading(true);
    try {
      const res = await fetch(`${PORT}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (res.ok) {
        if (data) {
          setuser(data.user);
          setToken(data.token);
          localStorage.setItem("auth-token", data.token);
          setLoading(false);
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    if (!password || !email) return alert("All field required");
    setLoading(true);
    try {
      const res = await fetch(`${PORT}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        if (data) {
          setuser(data.user);
          setToken(data.token);
          localStorage.setItem("auth-token", data.token);
          setLoading(false);
        }
        setEmail("");
        setPassword("");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  return (
    <>
      {isLogin ? (
        <Auth
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleAuth={handleLogin}
          setLogin={setLogin}
          isLogin={isLogin}
          isLoading={isLoading}
        />
      ) : (
        <Auth
          setName={setName}
          name={name}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleAuth={handleRegister}
          setLogin={setLogin}
          isLogin={isLogin}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default Authentication;
