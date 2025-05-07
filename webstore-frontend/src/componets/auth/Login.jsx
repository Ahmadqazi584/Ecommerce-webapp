import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';
import InputField from '../shared/InputField';
import { useDispatch } from 'react-redux';
import { loginUserAction } from '../../store/actions/authActions';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onTouched"
    });

    const onSubmit = (data) => {
        dispatch(loginUserAction(data, toast, reset, navigate, setLoader))
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <div className="flex flex-col items-center">
                    <div className="p-3 bg-blue-100 rounded-full">
                        <FaSignInAlt className="text-blue-600 text-2xl" />
                    </div>
                    <h1 className="mt-4 text-2xl font-bold text-gray-800 text-montserrat">Login</h1>
                    <p className="text-gray-500 text-sm">Enter your credentials to access your account</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <InputField
                        label="Username"
                        id="username"
                        type="text"
                        errors={errors}
                        register={register}
                        required={true}
                        message="Username is required"
                        placeholder="Enter your username"
                        icon={<FaUser className="text-gray-400" />}
                    />

                    <InputField
                        label="Password"
                        id="password"
                        type="password"
                        errors={errors}
                        register={register}
                        required={true}
                        message="Password is required"
                        placeholder="Enter your password"
                        min={6}
                        icon={<FaLock className="text-gray-400" />}
                    />
                    
                    <button
                        type="submit"
                        disabled={loader}
                        className={`bg-gradient-to-r from-green-500 to-blue-500 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${loader ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                    >
                        {loader ? 'Logging in...' : 'Login'}
                        </button>
                </form>

                <div className="text-center text-sm text-gray-600">
                    <p>
                        Don't have an account?{' '}
                        <span
                            className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                            onClick={() => navigate('/register')}
                        >
                            Sign up
                        </span>
                    </p>
                </div>
            </div>
            {/* Toast Notification */}
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
            />
        </div>
    );
};

export default Login;

{/* <button
                        type="submit"
                        disabled={loader}
                        className={`bg-gradient-to-r from-purple-500 to-red-500" : "bg-gradient-to-r from-purple-600 to-red-600 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loader ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                    >
                        {loader ? 'Logging in...' : 'Login'}
                    </button> */}