import React, { useState } from 'react';
import { login } from '../../../services/operations/authAPI';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MdOutlineLock, MdOutlineMailOutline } from 'react-icons/md';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(login(email, password, navigate));
  };
  return (
    <div className="w-full min-w-[384px] h-full flex items-center justify-center">
    <div className='blurcard py-4 px-8 flex flex-col gap-5'>
   <div className='text-center'>
   <p className='text-[4vmax] font-bold leading-normal'>Login to CRM</p>
    <p>Yaha par kuch aachi si line likhni hai </p>
   </div>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full min-w-[40vmax] md:min-w-[30vmax]'>
    <div className='relative'>
      <input
        type="email"
        placeholder="Email..."
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="inputbox w-full"
      />
      <MdOutlineMailOutline className='icon'/>
    </div>
    <div className='relative'>
      <input
        type={showPassword ? "text" : "password"}
        required
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        className="inputbox w-full !pr-10"
      />
      <MdOutlineLock className='icon'/>
      <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[10px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
            </div>
    </div>
    <Link to="/forgotPassword">
    <p className="mt-1 ml-auto max-w-max text-xs">
      Forgot Password
    </p>
  </Link>
    <button
      type="submit"
      className="bg-blue-500 text-white rounded p-2 w-full mt-4 hover:bg-blue-700"
    >
      Log In
    </button>
  </form>
 </div>
    </div>
  )
}

export default Login