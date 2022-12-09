const loader = () => {
  return (
    <div
      className='spinner-border animate-spin inline-block w-4 h-4 border-1 rounded-full'
      role='status'>
      <span className='visually-hidden'>.</span>
    </div>
  );
};

export default loader;
