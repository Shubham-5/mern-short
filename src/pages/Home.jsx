import { useState, useEffect } from "react";

const Home = ({ user }) => {
  const [origUrl, setOrigUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const handleShrink = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_URI}/short`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ origUrl, id: user.id }),
      });
      const data = await res.json();
      if (res.ok) {
        setUrls([...urls, data.savedUrl]);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getShortUrls = async () => {
      const res = await fetch(`${process.env.REACT_APP_URI}/urls/${user.id}`);
      const data = await res.json();
      setUrls(data);
    };
    if (user) {
      getShortUrls();
    }
  }, []);
  return (
    <div className='container'>
      <div>
        <form onSubmit={(e) => handleShrink(e)}>
          <input
            className='form-control inline-block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
            placeholder='enter url..'
            value={origUrl}
            onChange={(e) => setOrigUrl(e.target.value)}
          />
          <button className=' m-2 inline-block px-7 py-2.5 bg-green-500 font-medium text-xs leading-tight uppercase rounded shadow-sm hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out'>
            Short
          </button>
        </form>
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
                <tr>
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
