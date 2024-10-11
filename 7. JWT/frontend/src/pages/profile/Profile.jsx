import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Menu from '../../components/Menu';
import Loader from '../../components/Loader';
import Footer from '../../components/Footer';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    bio: 'A short bio about me.',
    image: '/profile.png'
  });
  const [originalData, setOriginalData] = useState({ ...profileData });
  const [originalPhone, setOriginalPhone] = useState(profileData.phone);
  const [showVerifyButton, setShowVerifyButton] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isEditing && profileData.phone !== originalPhone) {
      setShowVerifyButton(true);
    } else {
      setShowVerifyButton(false);
      setShowOtpInput(false);
    }
  }, [profileData.phone, isEditing, originalPhone]);

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({ ...prev, image: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const editButtonClickHandler = (e) => {
    e.preventDefault();
    setOriginalData({ ...profileData });
    setIsEditing(true);
  };

  const cancelEditHandler = (e) => {
    e.preventDefault();
    setProfileData({ ...originalData });
    setIsEditing(false);
    setShowVerifyButton(false);
    setShowOtpInput(false);
  };

  const handleVerifyClick = () => {
    setShowOtpInput(true);
    alert("An OTP has been sent to your new phone number.");
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === '1234') {
      setShowOtpInput(false);
      setShowVerifyButton(false);
      alert("Phone number verified successfully!");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className='flex items-center justify-center flex-col'>
      <h1 className='pixelMonoFont text-5xl text-center mt-7'>Profile</h1>
      <Menu />
      <div className="sm:w-[600px] mx-auto bg-white border border-black w-[90vw] mb-14">
        <div className="bg-black h-48 relative">
          <div
            className={`absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full border-4 border-invert bg-white overflow-hidden ${isEditing ? 'cursor-pointer' : ''}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={handleImageClick}
          >
            <img
              src={profileData.image}
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
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        </div>

        <div className="pt-20 pb-8 px-6">
          <div className="text-center mb-6">
            <span className="bg-gray-200 text-black text-xs font-medium px-2.5 py-0.5 rounded">Admin</span>
          </div>

          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">Name:</label>
              {isEditing ? (
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 py-2 px-3 outline-none focus:border-black"
                />
              ) : (
                <p className="mt-1 py-2">{profileData.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
              {isEditing ? (
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  disabled
                  className="mt-1 block w-full border border-gray-300 py-2 px-3 outline-none focus:border-black disabled:bg-gray-200 disabled:text-gray-500 cursor-not-allowed"
                />
              ) : (
                <p className="mt-1 py-2">{profileData.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone:</label>
              {isEditing ? (
                <div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 py-2 px-3 outline-none focus:border-black"
                  />
                  {showVerifyButton && (
                    <button
                      type="button"
                      onClick={handleVerifyClick}
                      className="mt-2 bg-black text-white px-4 py-2 hover:bg-transparent hover:text-black border border-black"
                    >
                      Verify New Number
                    </button>
                  )}
                  {showOtpInput && (
                    <div className="mt-2">
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        className="border border-gray-300 py-2 px-3 outline-none focus:border-black"
                      />
                      <button
                        type="button"
                        onClick={handleOtpSubmit}
                        className="ml-2 bg-black text-white px-4 py-2 hover:bg-transparent hover:text-black border border-black"
                      >
                        Submit OTP
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <p className="mt-1 py-2">{profileData.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio:</label>
              {isEditing ? (
                <textarea
                  id="bio"
                  name="bio"
                  rows="4"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 py-2 px-3 outline-none focus:border-black resize-none"
                ></textarea>
              ) : (
                <p className="mt-1 py-2">{profileData.bio}</p>
              )}
            </div>

            {isEditing ? (
              <div className="flex space-x-4">
                <button
                  className='bg-black border border-black text-white w-1/2 py-2 hover:bg-transparent hover:text-black'
                  onClick={cancelEditHandler}
                >
                  Cancel
                </button>
                <button
                  className='bg-black border border-black text-white w-1/2 py-2 hover:bg-transparent hover:text-black'
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEditing(false);
                    setOriginalPhone(profileData.phone);
                    setShowVerifyButton(false);
                    setShowOtpInput(false);
                    console.log('Updated profile:', profileData);
                    // Send data to server
                  }}
                >
                  Update Profile
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={editButtonClickHandler}
                className='bg-black border border-black text-white w-full py-2 hover:bg-transparent hover:text-black'
              >
                Edit Profile
              </button>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;