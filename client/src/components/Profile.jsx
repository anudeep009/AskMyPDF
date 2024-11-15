import { useEffect, useState } from "react";
import { Mail, User, Camera } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl: "https://via.placeholder.com/128",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log(JSON.parse(storedUser))
    if (storedUser) {
      const { displayName, emails, _json } = JSON.parse(storedUser);
      if (displayName && emails?.[0]?.value && _json?.picture) {
        setUser({
          name: displayName,
          email: emails[0].value,
          avatarUrl: _json.picture,
        });
        console.log({
          name: displayName,
          email: emails[0].value,
          avatarUrl: _json.picture,
        })
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#171926] flex items-center justify-center p-4">
      <div className="bg-[#1f2433] rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-white mb-6">User Profile</h2>

        <div className="flex flex-col sm:flex-row items-center mb-6">
          <div className="relative mb-4 sm:mb-0 sm:mr-6">
            <img
              src={user.avatarUrl || "https://via.placeholder.com/128"}
              alt="Profile"
              className="h-32 w-32 rounded-full object-cover"
            />
          </div>
          <div className="flex-1 w-full">
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Username
              </label>
              <div className="relative">
                <User
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  id="username"
                  type="text"
                  value={user.name}
                  readOnly
                  className="w-full bg-[#2a2f3d] text-white rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  id="email"
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full bg-[#2a2f3d] text-white rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
