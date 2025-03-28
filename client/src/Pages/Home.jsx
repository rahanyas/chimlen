

const Home = () => {
  return (
  <main className="border border-yellow-500 m-3 relative w-[]">
    {/* section for sidebar */}
     <section className="border border-blue-500 w-[250px] min-h-fit">
      <div className="flex flex-col gap-3">
      <input type="text" placeholder="search user" className="border ml-5" />

      <div className="flex flex-col gap-5 border mx-3">
      <div className="flex justify-around">
          <img src="#" alt="log" />
          <h1>user name</h1>
        </div> 
       <div className="flex justify-around">
          <img src="#" alt="log" />
          <h1>user name</h1>
        </div> 
       <div className="flex justify-around">
          <img src="#" alt="log" />
          <h1>user name</h1>
        </div> 
       <div className="flex justify-around">
          <img src="#" alt="log" />
          <h1>user name</h1>
        </div> 
       <div className="flex justify-around">
          <img src="#" alt="log" />
          <h1>user name</h1>
        </div> 
       <div className="flex justify-around">
          <img src="#" alt="log" />
          <h1>user name</h1>
        </div> 
      </div>
      </div>
     </section>
    
    {/* this is section for communication */}
     <section className="absolute top-0 left-[255px] border border-gray-500 h-full w-[488px]">
       <div className="flex justify-around w-">
        <h1>user name</h1>
        <div className="flex border ">
          <h1>audio call</h1>
          <h1>vedio calls</h1>
        </div>
       </div>
     </section>
  </main>
  )
};

export default Home;