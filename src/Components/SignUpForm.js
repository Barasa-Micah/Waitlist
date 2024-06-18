import React from 'react';
import { useForm } from 'react-hook-form';
import ErrorSharpIcon from '@mui/icons-material/ErrorSharp';
import { pink } from '@mui/material/colors';

const SignUpForm = () => {
    const { handleSubmit,
        register,
        formState: { errors, isSubmitted, }
    } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',

    },
     
});


console.log(errors, {isSubmitted} )

    const onSignup = (data) => {
        console.log(data);
    };
    
    

     return (
        <>
        <section className='bg-gray-50'>
            <div className='w-full flex flex-col items-center justify-center bg-white rounded-lg shadow-xl sm:max-w-md px-6 py-8 mt-5 md:mt-0  mx-auto md:h-screen'>
                
            <form onSubmit={handleSubmit(onSignup)} noValidate
            className='space-y-4 md:space-y-6 max-w-[400px] w-full bg-white '>
                <div>
                    <label className='block mb-2 text-sm font-medium text-gray-900'>First Name:</label>
                    <input type="text" id='firstname' {...register("firstName", {
                        required: {
                            value: true,
                            message: 'First name is required',
                        }})}
                    className='border border-gray-400 focus:shadow-md focus:border-amber-500 focus:outline-none focus:ring-0 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5' placeholder="firstname" 
                    />
                    
                    <p className='text-sm font-sans font-medium text-pink-600 text-left mt-1 mb-2'>
                    {errors.firstName?.message && (
    <span className='flex items-center'>
      <ErrorSharpIcon className='mr-1' sx={{ color: pink[500], fontSize: 16, verticalAlign: 'middle' }} />
      {errors.firstName.message}
    </span>
  )}
                    </p>
                    
                </div>
                <div>
                    <label className='block mb-2 text-sm font-medium text-gray-900 '>Last Name:</label>
                    <input type="text" id='lastname' {...register("lastName", {
                        required: {
                            value: true,
                            message: 'Last name is required',
                        }})}
                    className='border border-gray-400 focus:shadow-md focus:border-amber-500 focus:outline-none focus:ring-0 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5' placeholder="lastname"  />
                    <p className='text-xs font-medium text-pink-600 text-left mb-2'>
                        {errors.lastName?.message && (
    <span className='flex items-center'>
      <ErrorSharpIcon className='mr-1' sx={{ color: pink[500], fontSize: 16, verticalAlign: 'middle' }} />
      {errors.lastName.message}
    </span>
  )}
                       </p>
                </div>
                <div>
                    <label className='block mb-2 text-sm font-medium text-gray-900 '>Email:</label>
                    <input type="email" id='email' {...register("email", {
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Invalid email',
                        }
                    })}
                     className=' border border-gray-400 focus:shadow-md focus:border-amber-500 focus:outline-none focus:ring-0 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5' placeholder="your email"  />
                    <p className='text-xs font-medium text-pink-600 text-left mb-2'>{errors.email?.message && (
    <span className='flex items-center'>
      <ErrorSharpIcon className='mr-1' sx={{ color: pink[500], fontSize: 16, verticalAlign: 'middle' }} />
      {errors.email.message}
    </span>
  )}</p>
                </div>
                <div>
                    <label className='block mb-2 text-sm font-medium text-gray-900 '>Username:</label>
                    <input type="text" id='username' {...register("username", { 
                        required: {
                            value: true,
                            message: 'Username is required',
                        }})}
                    className=' border border-gray-400 focus:shadow-md focus:border-amber-500 focus:outline-none focus:ring-0 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5' placeholder="username"  />
                    <p className='text-xs font-medium text-pink-600 text-left mb-2'>{errors.username?.message && (
    <span className='flex items-center'>
      <ErrorSharpIcon className='mr-1' sx={{ color: pink[500], fontSize: 16, verticalAlign: 'middle' }} />
      {errors.username.message}
    </span>
  )}</p>
                </div>
                <div>
                    <label className='block mb-2 text-sm font-medium text-gray-900 '>Password:</label>
                    <input type="password" id='password' {...register("password", {
                         required: {
                            value: true,
                            message: 'Password is required',
                         }})}
                    className=' border border-gray-400 focus:shadow-md focus:border-amber-500 focus:outline-none focus:ring-0 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5' placeholder=""/>
                    <p className='text-xs font-medium text-pink-600 text-left mb-2'>{errors.password?.message && (
    <span className='flex items-center'>
      <ErrorSharpIcon className='mr-1' sx={{ color: pink[500], fontSize: 16, verticalAlign: 'middle' }} />
      {errors.password.message}
    </span>
  )}</p>
                </div>
                <div className='my-5'>
                <button type='submit'
                className='w-full text-white  bg-black hover:bg-[#FA8E10]  font-medium rounded-md text-sm px-5 py-2.5 text-center duration-100 ease-in '>Signup</button>
                </div>
            </form>
            </div>
        </section>
        </>
    )
}

export default SignUpForm;