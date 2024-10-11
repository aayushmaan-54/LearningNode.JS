import React, { useEffect, useState } from 'react';
import { AddUser, DoubleTick, Eye, EyeClose } from '../assets/SVG';
import { Link } from 'react-router-dom';

const SignUpCard = () => {
  const [isPasswordHidden1, setIsPasswordHidden1] = useState(true);
  const [isPasswordHidden2, setIsPasswordHidden2] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [formDataValidation, setFormDataValidation] = useState({
    alphaCase: false,
    number: false,
    specialChar: false,
    passwordLength: false,
  });

  useEffect(() => {
    const hasAlphaCase = /(?=.*[a-z])(?=.*[A-Z])/.test(formData.password);
    const hasNumber = /\d/.test(formData.password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
    const isPasswordLengthValid = formData.password.length >= 6;

    setFormDataValidation({
      alphaCase: hasAlphaCase,
      number: hasNumber,
      specialChar: hasSpecialChar,
      passwordLength: isPasswordLengthValid,
    });
  }, [formData.password]);

  const passwordVisibilityHandler1 = () => {
    setIsPasswordHidden1(!isPasswordHidden1);
  }

  const passwordVisibilityHandler2 = () => {
    setIsPasswordHidden2(!isPasswordHidden2);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  return (
    <main className='border-black border flex items-center justify-center flex-col bg-opacity-10 backdrop-blur-[2px] w-[90vw] sm:w-[50vw] p-6 lg:w-[500px] mb-10'>
      <div className='w-full'>
        <Link to={"/"} className='underline underline-offset-4 font-black'> &lt; Home </Link>
      </div>

      <div className='w-full text-center mb-4'>
        <AddUser className='w-13 mx-auto' />
        <h1 className='pixelMonoFont text-5xl'>Sign Up</h1>
      </div>

      <div className='w-full space-y-4'>
        <input 
          type="text" 
          placeholder='Name' 
          className='border border-black focus:outline-none px-2 py-1 w-full'
          name='name'
          value={formData.name}
          onChange={handleInputChange}
        />
        <input 
          type="text" 
          placeholder='Email' 
          className='border border-black focus:outline-none px-2 py-1 w-full'
          name='email'
          value={formData.email}
          onChange={handleInputChange}
        />
        <div className='relative w-full'>
          <input 
            type={isPasswordHidden1 ? "password" : "text"} 
            placeholder='Password' 
            className='border border-black focus:outline-none px-2 py-1 w-full'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
          />
          <div onClick={passwordVisibilityHandler1} className='absolute inset-y-0 right-0 flex items-center pr-2'>
            {
              isPasswordHidden1 ?
                (<Eye className="size-4 cursor-pointer bg-white" />)
                :
                (<EyeClose className="size-4 cursor-pointer bg-white" />)
            }
          </div>
        </div>

        <div className='relative w-full'>
          <input 
            type={isPasswordHidden2 ? "password" : "text"} 
            placeholder='Confirm Password' 
            className='border border-black focus:outline-none px-2 py-1 w-full'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleInputChange} 
          />
          <div onClick={passwordVisibilityHandler2} className='absolute inset-y-0 right-0 flex items-center pr-2'>
            {
              isPasswordHidden2 ?
                (<Eye className="size-4 cursor-pointer bg-white" />)
                :
                (<EyeClose className="size-4 cursor-pointer bg-white" />)
            }
          </div>
        </div>

        <div className='border border-black px-2 py-2'>
          <div className='flex items-center justify-start gap-1'>
            <DoubleTick className={`size-4 fill-slate-400 ${formDataValidation.alphaCase ? 'fill-[#000000]' : ''}`} />
            <span>LowerCase & UpperCase</span>
          </div>

          <div className='flex items-center justify-start gap-1'>
            <DoubleTick className={`size-4 fill-slate-400 ${formDataValidation.number ? 'fill-[#000000]' : ''}`} />
            <span>Number(0 - 9)</span>
          </div>

          <div className='flex items-center justify-start gap-1'>
            <DoubleTick className={`size-4 fill-slate-400 ${formDataValidation.specialChar ? 'fill-[#000000]' : ''}`} />
            <span>Special Character(!@#$%^&*)</span>
          </div>

          <div className='flex items-center justify-start gap-1'>
            <DoubleTick className={`size-4 fill-slate-400 ${formDataValidation.passwordLength ? 'fill-[#000000]' : ''}`} />
            <span>At least 6 Characters</span>
          </div>
        </div>

        <button className='bg-black text-white w-full py-2 border border-black hover:bg-white hover:text-black'>Sign Up</button>
      </div>

      <p className='text-[13px] mt-4'>Already have an account? <Link to={"/login"} className='underline'>LogIn</Link></p>
    </main>
  );
}

export default SignUpCard;