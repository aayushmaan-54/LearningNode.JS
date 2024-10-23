import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import Menu from '../../components/Menu';
import Loader from '../../components/Loader';
import Footer from '../../components/Footer';
import useRedirectLoggedOutUser from '../../hooks/useRedirectLoggedOutUser';
import { useSelector, useDispatch } from 'react-redux';
import { Verified } from '../../assets/SVG';
import { getUserProfile, updateUserProfile } from '../../redux/features/auth/authSlice';
import toast from 'react-hot-toast';
import axios from 'axios';
import EmailVerificationNotification from '../../components/EmailVerificationNotification';

const DefaultProfile = '/profile.png';


const Profile = () => {
  useRedirectLoggedOutUser('/login');
  const dispatch = useDispatch();

  const { isLoading, user } = useSelector((state) => state.auth);

  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    bio: '',
    photo: DefaultProfile,
    role: '',
    isVerified: false,
  });

  const [originalData, setOriginalData] = useState(null);

  useLayoutEffect(() => {
    if (user) {
      const userData = {
        name: user?.name || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        bio: user?.bio || '',
        photo: user?.photo || DefaultProfile,
        role: user?.role || '',
        isVerified: user?.isVerified || false,
      };
      setProfileData(userData);
      setOriginalData(userData);
    }
  }, [user]);


  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);


  const capitalizeFirstLetter = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


  const validateImage = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (!validTypes.includes(file.type)) {
      throw new Error('Please upload a valid image file (JPEG, PNG, or JPG)');
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error('Image file is too large. Please upload a file smaller than 5MB');
    }
    return true;
  };


  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };


  const handleProfileImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      validateImage(file);
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({ ...prev, photo: e.target?.result }));
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error(error.message);
      fileInputRef.current.value = '';
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };


  const handleCancel = () => {
    setProfileData(originalData);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setIsEditing(false);
  };


  const saveUserProfileData = async (e) => {
    e.preventDefault();
    try {
      let imgURL = profileData.photo;

      if (selectedFile) {
        const image = new FormData();
        image.append("file", selectedFile);
        image.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        image.append("cloud_name", import.meta.env.VITE_CLOUDINARY_NAME);

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
          image,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: false
          }
        );

        if (response.status !== 200) {
          throw new Error('Failed to upload image');
        }

        imgURL = response.data.url;
      }

      const userData = {
        name: profileData.name,
        phoneNumber: profileData.phoneNumber,
        bio: profileData.bio,
        photo: imgURL
      };

      await dispatch(updateUserProfile(userData)).unwrap();
      setIsEditing(false);
      setSelectedFile(null);
      const updatedProfile = await dispatch(getUserProfile()).unwrap();
      setOriginalData({
        ...originalData,
        ...userData,
        photo: imgURL
      });
      toast.success('Profile updated successfully');
    } catch (error) {
      const errorMessage = error.response?.data?.error?.message || error.message || 'Failed to update profile';
      toast.error(errorMessage);
      
      setProfileData(originalData);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  
  if (isLoading) return <Loader />;

  return (
    <>
      {!user?.isVerified && <EmailVerificationNotification />}
      <div className='flex items-center justify-center flex-col gap-3'>
        <h1 className='pixelMonoFont text-5xl text-center mt-7'>Profile</h1>
        <Menu />
        <form className="space-y-4" onSubmit={saveUserProfileData}>
          <div className="sm:w-[600px] mx-auto bg-white border border-black w-[90vw] mb-14">
            <div className="bg-black h-48 relative">
              <div
                className={`absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full border-4 border-invert bg-white overflow-hidden ${isEditing ? 'cursor-pointer' : ''}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={handleImageClick}
              >
                <img
                  src={profileData?.photo}
                  alt="user profile"
                  className="w-full h-full object-cover"
                />
                {isEditing && isHovering && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                    <span className="text-white text-sm font-black">Upload Image</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleProfileImageChange}
                className="hidden"
                accept="image/*"
              />
            </div>

            <div className="pt-20 pb-8 px-6">
              <div className="text-center mb-6">
                <span className="bg-gray-200 text-black text-xs font-medium px-2.5 py-0.5 rounded">
                  {capitalizeFirstLetter(profileData?.role)}
                </span>
              </div>

              <div className='my-3'>
                <label htmlFor="name" className="block text-sm font-medium">Name:</label>
                {isEditing ? (
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileData?.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 py-2 px-3 outline-none focus:border-black"
                  />
                ) : (
                  <p className="mt-1 py-2 flex items-center">
                    {profileData?.name}
                    {profileData?.isVerified && (
                      <Verified className="ml-2 size-5 mt-1" />
                    )}
                  </p>
                )}
              </div>

              <div className='my-3 mt-4'>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                <p className="mt-1 py-2">{profileData?.email}</p>
              </div>

              <div className='my-3 mt-4'>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone:</label>
                {isEditing ? (
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={profileData?.phoneNumber}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 py-2 px-3 outline-none focus:border-black"
                  />
                ) : (
                  <p className="mt-1 py-2">{profileData?.phoneNumber}</p>
                )}
              </div>

              <div className='my-3 mt-4'>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio:</label>
                {isEditing ? (
                  <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    value={profileData?.bio}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 py-2 px-3 outline-none focus:border-black resize-none"
                  />
                ) : (
                  <p className="mt-1 py-2">{profileData?.bio}</p>
                )}
              </div>

              {isEditing ? (
                <div className="flex space-x-4">
                  <button
                    type="button"
                    className='bg-black border border-black text-white w-1/2 py-2 hover:bg-transparent hover:text-black'
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className='bg-black border border-black text-white w-1/2 py-2 hover:bg-transparent hover:text-black'
                  >
                    Update Profile
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className='bg-black border border-black text-white w-full py-2 hover:bg-transparent hover:text-black'
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </form>
        <Footer />
      </div>
    </>
  );
};

export default Profile;