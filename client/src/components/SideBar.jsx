import SearchBox from "./SearchBox";
import useUser from "../Context/userStore";

const SideBar = () => {
  const { users } = useUser();

  return (
    <div className="w-full h-screen sm:w-[300px]  border mt-[110px] p-4 overflow-y-auto [scrollbar-width:thin] [-ms-overflow-style:auto] [&::-webkit-scrollbar]:w-2 [scrollbar-color:#999_transparent] [&::-webkit-scrollbar-thumb]:bg-gray-400 hover:[&::-webkit-scrollbar-thumb]:bg-gray-500 pb-9">
      {/* User search input */}
      <SearchBox className="border-2 outline-none p-3 w-full rounded-full mb-6" />

      {/* Users list */}
      <div className="w-full space-y-4 ">
        {users.map((user, index) => (
          <div
            key={index}
            className="flex items-center justify-center gap-x-4 p-3 border rounded-md shadow-sm"
          >
            {/* Profile circle */}
            <div>
              <span className="w-[40px] h-[40px] bg-gray-200 border rounded-full flex items-center justify-center text-sm font-semibold">
                {user.charAt(0).toUpperCase()}
              </span>
            </div>

            {/* Username */}
            <div>
              <h1 className="text-base font-medium">{user}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
