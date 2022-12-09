import { useState } from "react";

import Auth from "../components/Auth";
const Authentication = ({ setuser }) => {
  const [isLogin, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const PORT = import.meta.env.VITE_REACT_APP_URI;
  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${PORT}/api/register`, {
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
          localStorage.setItem("userId", data.user.id);
          localStorage.setItem("userEmail", data.user.email);
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
