
const users = ['rahanyas', 'aflah', 'sherlee'];

const SideBar = () => {
  return (
      <div className="w-[250px] border relative top-20 h-[650px] flex flex-col gap-3 p-2 ">
      <input type="text" placeholder="search user" className="p-2 border mt-3 text-balance text-[20px] outline-none"/>
      <div>
        {users.map((item, index) => (
          <div 
          key={index}
          className="flex w-full border items-center justify-evenly p-2"
          >
            <span className="w-12 h-12 border rounded-full bg-gray-50"/>
           <h1 className="capitalize">{item}</h1>
          </div>
        ))}
      </div>
      </div>
  )
};

export default SideBar