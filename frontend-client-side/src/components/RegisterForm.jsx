import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/AuthProvider';
import { PiEye, PiEyeClosed } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
// import { createUser } from '../../apis/userApi';
// import { createToken } from '../../apis/authApi';

// utils import
import { validPassword } from '../Utils/Validators/passValidator';



const RegisterForm = () => {
  const navigate = useNavigate();
  const { createNewUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);

  const [error, setError] = useState('');
  const [passwordType, setPasswordType] = useState('password')



  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    // get the form data
    const form = new FormData(e.target);   
    const user_name = form.get('name');
    const user_email = form.get('email');
    const user_image = form.get('photo');
    const password = form.get('password');
    const user_role = 'student';
    const course_enrollment = 0;
    const user = {user_name, user_email, user_image, password, user_role, course_enrollment};
    //console.log(user);

    const passError = validPassword(password);
    if(passError){
      setError(passError);
      return;
    }

    
    try{
      // register -> firebase
      const res1 = await createNewUser(user_email, password);
      console.log(res1.user);

      // token create korlam
      const res2 = await createToken(user_email);
      console.log(res2.data);

      // update kore dibo
      await updateUserProfile({
        displayName: user_name,
        photoURL: user_image,
      })
      // //console.log(res.user);
      toast.success('Successfully registered user!', {
        position: "top-center",
        autoClose: 1000,
        theme: "dark",
      });

      navigate('/');

      // database e add korbo ekhn
      const res3 = await createUser(user);
      console.log(res3.data);
    }
    catch(e){
      const errorCode = e.code;
      const errorMessage = e.message;
      // //console.log(errorCode, errorMessage);
      toast.error(`Error: ${errorMessage} !`, {
        position: "top-center",
        autoClose: 1000,
        theme: "dark",
      });
    }
  }


  const handleGoogleSignIn = async() => {
    try{
      const res = await signInWithGoogle();
      navigate('/')
    }
    catch(e){
      //console.log('ERROR', e.message)
    }

  }


  // handle Toggle Eye for password
  const togglePasswordType = () => {
    passwordType==='password' ? setPasswordType('text') : setPasswordType('password');
  }


  return (
    <div className='max-w-[420px] mx-auto bg-orchid/15 my-14 shadow-lg p-6 rounded-lg'>
      <h3 className='text-center font-semibold text-2xl md:text-3xl'> Register Your Account </h3>
      <p className='text-center mt-2 flex justify-center items-center gap-1 '> <span className='text-xl'> <FcGoogle /> </span> continue with <button onClick={handleGoogleSignIn} className='text-blue underline'>Google</button> </p>

      {/* form  */}
      <form onSubmit={handleRegisterSubmit} className="mt-4">
        <fieldset className="form-control mb-3">
          <label className="label mb-1"> <span className="label-text"> Your Name </span> </label>
          <input name='name' type="text" placeholder="name" className="input w-full" required />
        </fieldset>
        <fieldset className="form-control mb-3">
          <label className="label mb-1"> <span className="label-text"> Your Photo URL </span> </label>
          <input name='photo' type="text" placeholder="photo url" className="input w-full" required />
        </fieldset>
        <fieldset className="form-control mb-3">
          <label className="label mb-1"> <span className="label-text">Email</span> </label>
          <input name='email' type="email" placeholder="email" className="input w-full" required />
        </fieldset>
        <fieldset className="form-control">
          <label className="label mb-1"> <span className="label-text">Password</span> </label>
          <div className='relative'>
            <input name='password' type={passwordType} placeholder="password" className="input  w-full" required />
            <span onClick={togglePasswordType} className='absolute right-3 top-3 cursor-pointer'> {passwordType==='password' ? <PiEye />  : <PiEyeClosed /> }  </span>
          </div>
        </fieldset>

        {/* error showing div */}
        <div className='text-sm text-red-600 pt-3 mr-3'> {error} </div>

        {/* register button */}
        <div className="form-control mt-4">
          <button className="btn bg-purple text-white w-full"> Register </button>
        </div>

        {/* alter */}
        <p className='text-center text-sm mt-3'> Already have an account? <span  className='text-red-600 ml-1'> <Link to='/auth/login'> Sign In </Link> </span> </p>
      </form>
    </div>
  );
};

export default RegisterForm;