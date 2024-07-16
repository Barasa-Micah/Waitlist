import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import ErrorSharpIcon from '@mui/icons-material/ErrorSharp';
import { pink, red } from '@mui/material/colors';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const SignUpForm = () => {
    const { handleSubmit, register, reset, formState: { errors, isSubmitting, isSubmitted } } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
        },
    });

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const onSignup = async (data) => {
        try {
            setIsButtonDisabled(true); // Disable the button on form submission
            const response = await axios.post(`http://localhost:5000/signup`, data);
            
            if (response.data.message.includes('successfully')) {
               setMessage(response.data.message);
               reset(); // Reset form fields if signup was successful
           } else {
               setMessage(response.data.message); // Show error message
           }
        } catch (error) {
            setMessage("Registration failed. Please try again.");
        } finally {
            setIsButtonDisabled(false);
        }
    };

    const toggle = () => {
        setOpen(!open);
    }

    // autofocus
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <>
            <section className='bg-gray-50 py-5'>
                <div className='w-full flex flex-col items-center justify-center bg-white rounded-lg shadow-2xl sm:max-w-md px-6 py-8 mt-5 md:mt-0 mx-auto md:h-screen'>
                    <form onSubmit={handleSubmit(onSignup)} noValidate className='space-y-4 md:space-y-6 max-w-[400px] w-full bg-white'>
                        <div className='flex flex-col justify-center items-center '>
                            <div className='w-16 h-16'>
                                <img src={require('../Assets/logoimage/sokobeautylogo.png')} alt='' className='rounded-full object-cover' />
                            </div>
                            <p className='text-center text-4xl text-red-700 font-cookie font-bold tracking-wide'>Sokobeauty</p>
                        </div>
                        <p className='text-center text-lg font-sans font-medium'>Sokobeauty Registration</p>

                        {/* First Name */}
                        <div>
                            <label className='block mb-2 text-sm font-medium text-gray-900'>First Name:</label>
                            <input type="text" id='firstname' {...register("firstName", { required: { value: true, message: 'First name is required' } })}
                                ref={inputRef}
                                className='border border-gray-400 focus:shadow-md focus:border-amber-500 focus:outline-none focus:ring-0 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5' placeholder="firstname" />
                            <p className='text-sm font-sans font-medium text-pink-600 text-left mt-1 mb-2'>
                                {errors.firstName?.message && (
                                    <span className='flex items-center'>
                                        <ErrorSharpIcon className='mr-1' sx={{ color: pink[500], fontSize: 16, verticalAlign: 'middle' }} />
                                        {errors.firstName.message}
                                    </span>
                                )}
                            </p>
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className='block mb-2 text-sm font-medium text-gray-900'>Last Name:</label>
                            <input type="text" id='lastname' {...register("lastName", { required: { value: true, message: 'Last name is required' } })}
                                className='border border-gray-400 focus:shadow-md focus:border-amber-500 focus:outline-none focus:ring-0 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5' placeholder="lastname" />
                            <p className='text-sm font-medium text-pink-600 text-left mt-1 mb-2'>
                                {errors.lastName?.message && (
                                    <span className='flex items-center'>
                                        <ErrorSharpIcon className='mr-1' sx={{ color: pink[500], fontSize: 16, verticalAlign: 'middle' }} />
                                        {errors.lastName.message}
                                    </span>
                                )}
                            </p>
                        </div>

                        {/* Email */}
                        <div>
                            <label className='block mb-2 text-sm font-medium text-gray-900'>Email:</label>
                            <input type="email" id='email' {...register("email", {
                                required: { value: true, message: 'Email is required' },
                                pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email' }
                            })}
                                className='border border-gray-400 focus:shadow-md focus:border-amber-500 focus:outline-none focus:ring-0 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5' placeholder="your email" />
                            <p className='text-sm font-medium text-pink-600 text-left mt-1 mb-2'>
                                {errors.email?.message && (
                                    <span className='flex items-center'>
                                        <ErrorSharpIcon className='mr-1' sx={{ color: pink[500], fontSize: 16, verticalAlign: 'middle' }} />
                                        {errors.email.message}
                                    </span>
                                )}
                            </p>
                        </div>

                        {/* Username */}
                        <div>
                            <label className='block mb-2 text-sm font-medium text-gray-900'>Username:</label>
                            <input type="text" id='username' {...register("username", { required: { value: true, message: 'Username is required' } })}
                                className='border border-gray-400 focus:shadow-md focus:border-amber-500 focus:outline-none focus:ring-0 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5' placeholder="username" />
                            <p className='text-sm font-medium text-pink-600 text-left mt-1 mb-2'>
                                {errors.username?.message && (
                                    <span className='flex items-center'>
                                        <ErrorSharpIcon className='mr-1' sx={{ color: pink[500], fontSize: 16, verticalAlign: 'middle' }} />
                                        {errors.username.message}
                                    </span>
                                )}
                            </p>
                        </div>

                        {/* Password */}
                        <div className='relative'>
                            <label className='block mb-2 text-sm font-medium text-gray-900'>Password:</label>
                            <input type={(open === false) ? 'password' : 'text'} id='password' {...register("password", { required: { value: true, message: 'Password is required' } })}
                                className='border border-gray-400 focus:shadow-md focus:border-amber-500 focus:outline-none focus:ring-0 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5' placeholder="" />
                            <p className='text-sm font-medium text-pink-600 text-left mt-1 mb-2'>
                                {errors.password?.message && (
                                    <span className='flex items-center'>
                                        <ErrorSharpIcon className='mr-1' sx={{ color: pink[500], fontSize: 16, verticalAlign: 'middle' }} />
                                        {errors.password.message}
                                    </span>
                                )}
                            </p>
                            <div className='text-md absolute top-11 right-3'>
                                {open === false ? <AiFillEyeInvisible style={{ color: "rgb(90, 90, 90)" }} onClick={toggle} /> : <AiFillEye style={{ color: "rgb(90, 90, 90)" }} onClick={toggle} />}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className='my-5'>
                            <button type='submit' disabled={isSubmitting || isButtonDisabled} className={`w-full text-white bg-black hover:bg-[#FA8E10] font-medium rounded-md text-sm px-5 py-2.5 text-center duration-100 ease-in ${isSubmitting || isButtonDisabled ? 'cursor-not-allowed opacity-50' : ''}`}>
                                {isSubmitting || isButtonDisabled ? 'Signing up...' : 'Signup'}
                            </button>
                        </div>
                        {/* Display Message */}
                        {message && <p className="text-center text-red-500">{message}</p>}
                    </form>
                </div>
            </section>
        </>
    );
}

export default SignUpForm;
