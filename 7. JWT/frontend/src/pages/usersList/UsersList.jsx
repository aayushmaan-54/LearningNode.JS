import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu';
import { MagnifyingGlass, MultipleUsers, SuspendedUser, UnverifiedAccount, VerifiedAccount, Bin, CheckBox } from '../../assets/SVG';
import Footer from '../../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import useRedirectLoggedOutUser from '../../hooks/useRedirectLoggedOutUser';
import { CALC_SUSPENDED_USERS, CALC_VERIFIED_USERS, deleteUser, getAllUsers, updateUserRole } from '../../redux/features/auth/authSlice';
import Loader from '../../components/Loader';
import { EMAIL_RESET, sendAutomatedEmail } from '../../redux/features/email/emailSlice';
import { FILTERED_USERS, selectFilteredUsers } from '../../redux/features/search/searchSlice';


const UsersList = () => {
  useRedirectLoggedOutUser('/login');

  const { users, isLoading, verifiedUsers, suspendedUsers } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(null);

  const [selectedUserName, setSelectedUserName] = useState('');
  const [userRoles, setUserRoles] = useState({});
  const [pendingRoles, setPendingRoles] = useState({});

  const [searchTerm, setSearchTerm] = useState('');
  const filteredUsers = useSelector(selectFilteredUsers);


  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);


  useEffect(() => {
    const initialRoles = {};
    users.forEach(user => {
      initialRoles[user._id] = user.role;
    });
    setUserRoles(initialRoles);
    setPendingRoles(initialRoles);
  }, [users]);


  const handleRoleChange = (userId, newRole) => {
    setPendingRoles(prev => ({
      ...prev,
      [userId]: newRole
    }));
  };


  const handleCheckboxClick = async (userId, email) => {
    if (pendingRoles[userId] !== userRoles[userId]) {
      setUserRoles(prev => ({
        ...prev,
        [userId]: pendingRoles[userId]
      }));

      const userData = {
        id: userId,
        role: pendingRoles[userId]
      }

      const emailData = {
        subject: 'User Account Role Changed - ://AuthN',
        send_to: email,
        reply_to: 'noreply@aayushmaan.com',
        template: 'changeRole',
        url: '/login',
      }

      await dispatch(updateUserRole(userData));
      await dispatch(sendAutomatedEmail(emailData));
      await dispatch(getAllUsers());
      await dispatch(EMAIL_RESET());
    }
  };


  const confirmDelete = async () => {
    if (selectedUserId) {
      await dispatch(deleteUser(selectedUserId));
      await dispatch(getAllUsers());
      setIsModalOpen(false);
      setSelectedUserId(null);
      setSelectedUserName('');
    }
  };


  const userDeleteHandler = (id, name) => {
    setSelectedUserId(id);
    setSelectedUserName(name);
    setIsModalOpen(true);
  };


  const cancelDeleteHandler = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
    setSelectedUserName('');
  };


  useEffect(() => {
    dispatch(FILTERED_USERS({ 
      users: users || [], 
      searchTerm: searchTerm || ''
    }));
  }, [dispatch, users, searchTerm]);

  useEffect(() => {
    dispatch(CALC_VERIFIED_USERS());
    dispatch(CALC_SUSPENDED_USERS());
  }, [dispatch, users, filteredUsers])



  if (isLoading) return <Loader />;


  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 shadow-lg max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4 text-red-600">Delete User</h2>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete <span className="font-semibold">{selectedUserName}</span>?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelDeleteHandler}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

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
                <span className="pixelMonoFont text-2xl sm:text-3xl lg:text-4xl">{users.length}</span>
              </div>
            </div>

            <div className="border border-black flex items-center pl-4 sm:pl-6">
              <VerifiedAccount className="size-12 sm:size-14" />
              <div className="flex flex-col items-start justify-start ml-4 pr-4 sm:pr-6">
                <span className="text-sm sm:text-base">Verified Users</span>
                <span className="pixelMonoFont text-2xl sm:text-3xl lg:text-4xl">{verifiedUsers}</span>
              </div>
            </div>

            <div className="border border-black flex items-center pl-4 sm:pl-6">
              <UnverifiedAccount className="size-12 sm:size-14" />
              <div className="flex flex-col items-start justify-start ml-4 pr-4 sm:pr-6">
                <span className="text-sm sm:text-base">Unverified Users</span>
                <span className="pixelMonoFont text-2xl sm:text-3xl lg:text-4xl">{users.length - verifiedUsers}</span>
              </div>
            </div>

            <div className="border border-black flex items-center pl-4 sm:pl-6">
              <SuspendedUser className="size-12 sm:size-14" />
              <div className="flex flex-col items-start justify-start ml-4 pr-4 sm:pr-6">
                <span className="text-sm sm:text-base">Suspended Users</span>
                <span className="pixelMonoFont text-2xl sm:text-3xl lg:text-4xl">{suspendedUsers}</span>
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {!isLoading && users.length === 0 ? (
            <p className='text-3xl text-center mt-12 bg-black text-white py-3 w-fit px-2 mx-auto'>No Users Found!</p>
          ) : (
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
                  {filteredUsers.map((user, index) => (
                    <tr key={user._id}>
                      <td className="border px-2 py-2 whitespace-nowrap">{index + 1}</td>
                      <td className="border px-2 py-2 whitespace-nowrap">{user.name}</td>
                      <td className="border px-2 py-2 whitespace-nowrap">{user.email}</td>
                      <td className="border px-2 py-2 whitespace-nowrap">{userRoles[user._id]}</td>
                      <td className="border px-2 py-2">
                        <div className="flex items-center space-x-2">
                          <select
                            className="w-full p-2 border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black rounded-none border-black"
                            value={pendingRoles[user._id]}
                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                          >
                            <option className="bg-white text-black" value="admin">Admin</option>
                            <option className="bg-white text-black" value="subscriber">Subscriber</option>
                            <option className="bg-white text-black" value="author">Author</option>
                            <option className="bg-white text-black" value="suspended">Suspended</option>
                          </select>
                          <button
                            onClick={() => handleCheckboxClick(user._id, user.email)}
                            className={`flex-shrink-0 p-1 rounded ${pendingRoles[user._id] !== userRoles[user._id]
                              ? 'bg-blue-50 hover:bg-blue-100'
                              : ''
                              }`}
                          >
                            <CheckBox className="w-6 h-6 cursor-pointer" />
                          </button>
                        </div>
                      </td>
                      <td className="border px-2 py-2 text-center">
                        <button
                          className="p-1 hover:bg-gray-100 rounded"
                          onClick={() => userDeleteHandler(user._id, user.name)}
                        >
                          <Bin className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};


export default UsersList;