import { useState, useEffect } from "react";
import Loader from "../components/loader";
import Toast from "../components/Toast";

const Home = ({ user, setUser }) => {
  const [origUrl, setOrigUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [toastUrl, setToastUrl] = useState("");

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
        setToastUrl(data.savedUrl.short);
        setShow(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
    setOrigUrl("");
    setLoading(false);
  };
  const handleLogout = () => {
    localStorage.setItem("auth-token", "");
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
    <div className='container relative'>
      <div className='absolute left-0 right-0'>
        {show && <Toast setShow={setShow} toastUrl={toastUrl} />}
      </div>
      <div className='flex justify-between align-center'>
        <form onSubmit={(e) => handleShrink(e)}>
          <input
            className='form-control h-9 m-1 inline-block px-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
            placeholder='http://'
            value={origUrl}
            onChange={(e) => setOrigUrl(e.target.value)}
          />
        </form>
        <button
          onClick={handleShrink}
          className='text-white h-9 m-1 mb-6 px-4 bg-green-500 font-medium text-xs leading-tight uppercase rounded shadow-sm hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-md transition duration-150 ease-in-out'>
          Short {isLoading && <Loader />}
        </button>
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full table-auto border-collapse border border-slate-400 text-left '>
          <thead>
            <tr>
              <th className='border border-slate-500 p-1 text-sm'>Full URL</th>
              <th className='border border-slate-500 p-1 text-sm'>Short URL</th>
              <th className='border border-slate-500 p-1 text-sm'>Clicks</th>
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
      <button
        onClick={handleLogout}
        className='absolute bottom-0 right-2 px-4 my-3 h-9 m-1 bg-gray-500 font-medium text-xs text-white leading-tight uppercase rounded shadow-sm hover:bg-red-200 hover:shadow-md focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out'>
        Logout
      </button>
    </div>
  );
};

export default Home;
