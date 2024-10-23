'use client';


const Home = () => {
  const addCategory = () => {
    console.log('Successfully added category');
  };

  const closeCategory = () => {
    console.log('Rejected add category request');
  };

  return (
    <div className="container mx-auto flex flex-col gap-30">
      <h1>
        <div className="container mx-auto flex flex-col padding-30">
          {' '}
          Add Category👋, <br /> {' '}
        </div>
      </h1>
      <button className="border-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg" onClick={addCategory}>
        Add Category
      </button>

      <br />
      <button className="border-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg" onClick={closeCategory}>
        Close
      </button>
    </div>
  );
};
export default Home;
