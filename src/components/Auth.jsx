import Loader from "./loader";

const Auth = ({
  email,
  setEmail,
  password,
  setPassword,
  handleAuth,
  isLogin,
  setLogin,
  isLoading,
  setName,
  name,
}) => {
  return (
    <>
      <section className='h-full gradient-form'>
        <div className='container py-12 px-6 w-full flex justify-center items-center'>
          <div className='flex justify-center items-center flex-wrap h-full text-gry-800'>
            <div className='block bg-white shadow-lg rouned-lg p-4'>
              <div className='text-enter'>
                <h4 className='text-xl font-semibold mt-1 mb-1 pb-1'>
                  Welcome to <span className='text-blue-900'>MernShort</span>
                </h4>
              </div>
              <form>
                <p className='mb-4'>Please login to your account</p>
                {!isLogin && (
                  <div className='mb-4'>
                    <input
                      type='text'
                      className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                      id='exampleFormControlInput1'
                      value={name}
                      placeholder='Name'
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                )}
                <div className='mb-4'>
                  <input
                    type='email'
                    className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                    id='exampleFormControlInput1'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='b-4'>
                  <input
                    type='password'
                    className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                    id='exampleFormControlInput1'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className='text-center pt-1 my-4 pb-1'>
                  <button
                    className='inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md bg-blue-700 hover:bg-blue-500 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3'
                    type='button'
                    data-mdb-ripple='true'
                    onClick={handleAuth}>
                    {isLoading && <Loader />} {isLogin ? "Log in" : "Register"}
                  </button>
                </div>
                <div className='flex items-center justify-between pb-6'>
                  <p className='mb-0 mr-2'>
                    {isLogin
                      ? "Don't have an account?"
                      : "Already have an account!"}
                  </p>
                  <button
                    type='button'
                    data-mdb-ripple='true'
                    data-mdb-ripple-color='light'
                    onClick={() => setLogin(!isLogin)}>
                    <a className='text-gray-800' href='#!'>
                      {isLogin ? "Register" : "Login"}
                    </a>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Auth;
