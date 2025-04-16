import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

import { toast } from 'react-toastify';
import { PiEye, PiEyeClosed } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
// import { createToken } from '../../apis/authApi';

const LoginForm = () => {
  const { setUser, signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const [passwordType, setPasswordType] = useState('password');
  const [inputEmail, setInputEmail] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    const form = new FormData(e.target);
    const user_email = form.get('email');
    const password = form.get('password');
    //console.log(user_email, password);


    try{
      const res = await signInUser(user_email, password);
      const user = res.user;

      const res2 = await createToken(user_email);      
      //console.log(res2.data);

      setUser(user);
      navigate('/');
      toast.success('Successfully logged in!', {
        position: "top-center",
        autoClose: 1000,
        theme: "dark",
      });
    }
    catch(e){
      const errorCode = e.code;
      const errorMessage = e.message;
      toast.error(`Invalid email or password !`, {
        position: "top-center",
        autoClose: 1000,
        theme: "dark",
      });
    }
  };

  const handleGoogleSignIn = async () => {
     try{
      const res = await signInWithGoogle();

      // const res2 = await axios.post('https://marathon-management-server-side.vercel.app/api/jwt/login', email, {withCredentials: true});
      // //console.log(res2.data);
      
      navigate('/')
    }
    catch(e){
      // //console.log('ERROR', e.message)
    }
  };

  const togglePasswordType = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  return (
    <div className='max-w-[420px] mx-auto bg-orchid/15 my-14 shadow-lg p-6 rounded-lg'>
      <h3 className='text-center font-semibold text-2xl md:text-3xl'>Login Your Account</h3>
      <p className='text-center mt-2 flex justify-center items-center gap-1'> <FcGoogle className='text-xl' /> Continue with <button onClick={handleGoogleSignIn} className='text-blue-500 underline'>Google</button> </p>
      
      {/* form */}
      <form onSubmit={handleLoginSubmit} className="mt-4">
        <fieldset className="form-control mb-3">
          <label className="label mb-1"><span className="label-text">Email</span></label>
          <input name='email' type="email" placeholder="Email" className="input w-full" value={inputEmail} required
            onChange={(e) => setInputEmail(e.target.value)}  />
        </fieldset>

        <fieldset className="form-control">
          <label className="label mb-1"><span className="label-text">Password</span></label>
          <div className='relative'>
            <input name='password' type={passwordType} placeholder="Password" className="input w-full" required />
            <span onClick={togglePasswordType} className='absolute right-3 top-3 cursor-pointer'>
              {passwordType === 'password' ? <PiEyeClosed /> : <PiEye />}
            </span>
          </div>
          {/* forget password? */}
          <label className="label">
            <Link to={'/auth/forgetpassword'} state={{ inputEmail }} className="link link-hover text-sm text-blue-500"> Forgot password? </Link>
          </label>
        </fieldset>

        {/* login button */}
        <div className="form-control mt-4"> 
          <button className="btn bg-purple text-white w-full">Login</button>
        </div>

        <p className='text-center text-sm mt-3'> Don’t Have An Account? <Link to='/auth/register' className='text-red-500 ml-1'>Register</Link> </p>
      </form>
    </div>
  );
};

export default LoginForm;
