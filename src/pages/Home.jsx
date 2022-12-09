import { useState, useEffect } from "react";
import Loader from "../components/loader";

const Home = ({ user, setUser }) => {
  const [origUrl, setOrigUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const PORT = import.meta.env.VITE_REACT_APP_URI;

  const handleShrink = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await fetch(`${PORT}/short`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ origUrl, id: user.id }),
      });
      const data = await res.json();
      if (res.ok) {
        setUrls([...urls, data.savedUrl]);
        setLoading(false);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    setUser(null);
  };
  useEffect(() => {
    const getShortUrls = async () => {
      const res = await fetch(`${PORT}/urls/${user.id}`);
      const data = await res.json();
      setUrls(data);
    };
    if (user) {
      getShortUrls();
    }
  }, []);
  return (
    <div className='container'>
      <div className='flex justify-center align-center'>
        <form onSubmit={(e) => handleShrink(e)}>
          <input
            className='form-control h-9 m-1 inline-block px-3  text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
            placeholder='enter url..'
            value={origUrl}
            onChange={(e) => setOrigUrl(e.target.value)}
          />
        </form>
        <button className='h-9 m-1 mb-6 px-7 bg-green-500 font-medium text-xs leading-tight uppercase rounded shadow-sm hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-md transition duration-150 ease-in-out'>
          Short {isLoading && <Loader />}
        </button>
        <button
          onClick={handleLogout}
          className='px-7 h-9 m-1 bg-red-200 font-medium text-xs leading-tight uppercase rounded shadow-sm hover:bg-red-200 hover:shadow-md focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out'>
          Logout
        </button>
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full table-auto border-collapse border border-slate-400 text-left '>
          <thead>
            <tr>
              <th className='border border-slate-500 p-1'>Full URL</th>
              <th className='border border-slate-500 p-1'>Short URL</th>
              <th className='border border-slate-500 p-1'>Clicks</th>
            </tr>
          </thead>
          <tbody>
            {urls.length > 0 &&
              urls.map((url) => (
                <tr key={url.short}>
                  <td className='border border-slate-300 p-1'>
                    <a className='text-sm' href={url.full}>
                      {url.full}
                    </a>
                  </td>
                  <td className='border border-slate-300 p-1'>
                    <a className='text-sm ' href={url.short}>
                      {url.short}
                    </a>
                  </td>
                  <td className='border border-slate-300 p-1 text-sm'>
                    {url.clicks}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
