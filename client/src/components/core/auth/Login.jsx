import React, { useState } from 'react';
import { login } from '../../../services/operations/authAPI';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logo from '../../../assets/atpl-logo.png';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(login(email, password, navigate));
  };
  return (
    <div className="min-h-screen flex flex-wrap justify-center items-center">
    <div className='w-full md:w-1/2 min-w-[384px] flex items-center justify-center p-10 max-h-min'>
       <img src={logo} className='w-[50vmax] md:w-[30vmax]' alt='ATPL' loading='lazy'/>
     </div>
     <div className="w-full md:w-1/2 min-w-[384px] h-full flex items-center justify-center">
     <div className='blurcard py-4 px-8 flex flex-col gap-5'>
    <div className='text-center'>
    <p className='text-[4vmax] font-bold leading-normal'>Login to CRM</p>
     <p>Yaha par kuch aachi si line likhni hai </p>
    </div>
     <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full min-w-[40vmax] md:min-w-[30vmax]'>
     <div>
       <input
         type="email"
         placeholder="Email"
         value={formData.email}
         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
         className="inputbox w-full"
       />
     </div>
     <div>
       <input
         type="password"
         placeholder="Password"
         value={formData.password}
         onChange={(e) => setFormData({ ...formData, password: e.target.value })}
         className="inputbox w-full"
       />
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
   </div>
  )
}

export default Login