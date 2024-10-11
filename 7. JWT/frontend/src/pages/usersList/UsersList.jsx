import React from 'react';
import Menu from '../../components/Menu';
import { MagnifyingGlass, MultipleUsers, SuspendedUser, UnverifiedAccount, VerifiedAccount, Bin, CheckBox } from '../../assets/SVG';
import Footer from '../../components/Footer';

const UsersList = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'subscriber' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'moderator' },
  ];

  return (
    <div className="flex items-center justify-center flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
      <h1 className="pixelMonoFont text-4xl sm:text-5xl lg:text-6xl text-center">User List</h1>
      <Menu />


      <div className="w-full mt-7">
        <h2 className="pixelMonoFont text-3xl sm:text-4xl lg:text-5xl mb-4">User Stats:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border border-black flex items-center pl-4 sm:pl-6">
            <MultipleUsers className="size-12 sm:size-14 lg:size-16" />
            <div className="flex flex-col items-start justify-start ml-4 pr-4 sm:pr-6">
              <span className="text-sm sm:text-base">Total Users</span>
              <span className="pixelMonoFont text-2xl sm:text-3xl lg:text-4xl">10</span>
            </div>
          </div>

          <div className="border border-black flex items-center pl-4 sm:pl-6">
            <VerifiedAccount className="size-12 sm:size-14" />
            <div className="flex flex-col items-start justify-start ml-4 pr-4 sm:pr-6">
              <span className="text-sm sm:text-base">Verified Users</span>
              <span className="pixelMonoFont text-2xl sm:text-3xl lg:text-4xl">2</span>
            </div>
          </div>

          <div className="border border-black flex items-center pl-4 sm:pl-6">
            <UnverifiedAccount className="size-12 sm:size-14" />
            <div className="flex flex-col items-start justify-start ml-4 pr-4 sm:pr-6">
              <span className="text-sm sm:text-base">Unverified Users</span>
              <span className="pixelMonoFont text-2xl sm:text-3xl lg:text-4xl">4</span>
            </div>
          </div>

          <div className="border border-black flex items-center pl-4 sm:pl-6">
            <SuspendedUser className="size-12 sm:size-14" />
            <div className="flex flex-col items-start justify-start ml-4 pr-4 sm:pr-6">
              <span className="text-sm sm:text-base">Suspended Users</span>
              <span className="pixelMonoFont text-2xl sm:text-3xl lg:text-4xl">1</span>
            </div>
          </div>
        </div>
      </div>


      <div className="w-full mt-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="pixelMonoFont text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-0">All Users:</h2>
          <div className="relative w-full sm:w-64">
            <MagnifyingGlass className="absolute w-5 h-5 text-gray-500 left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Search User"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-2 text-left whitespace-nowrap">S.No.</th>
                <th className="border px-2 py-2 text-left whitespace-nowrap">Name</th>
                <th className="border px-2 py-2 text-left whitespace-nowrap">Email</th>
                <th className="border px-2 py-2 text-left whitespace-nowrap">Role</th>
                <th className="border px-2 py-2 text-left whitespace-nowrap">Change Role</th>
                <th className="border px-2 py-2 text-center whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td className="border px-2 py-2 whitespace-nowrap">{index + 1}</td>
                  <td className="border px-2 py-2 whitespace-nowrap">{user.name}</td>
                  <td className="border px-2 py-2 whitespace-nowrap">{user.email}</td>
                  <td className="border px-2 py-2 whitespace-nowrap">{user.role}</td>
                  <td className="border px-2 py-2">
                    <div className="flex items-center space-x-2">
                      <select className="w-full p-2 border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black rounded-none border-black">
                        <option className="bg-white text-black" value="admin">Admin</option>
                        <option className="bg-white text-black" value="subscriber">Subscriber</option>
                        <option className="bg-white text-black" value="moderator">Author</option>
                        <option className="bg-white text-black" value="moderator">Suspended</option>
                      </select>
                      <CheckBox className="flex-shrink-0 w-6 h-6 cursor-pointer" />
                    </div>
                  </td>
                  <td className="border px-2 py-2 text-center">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Bin className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}


export default UsersList;