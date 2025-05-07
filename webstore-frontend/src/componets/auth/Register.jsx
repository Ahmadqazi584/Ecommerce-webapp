import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaUser, FaLock, FaEnvelope, FaUserPlus } from 'react-icons/fa';
import InputField from '../shared/InputField';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { registerUserAction } from '../../store/actions/authActions'; // Uncomment when your action is ready

const Register = () => {
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
        console.log("Registering:", data);
        dispatch(registerUserAction(data, toast, reset, navigate, setLoader));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <div className="flex flex-col items-center">
                    <div className="p-3 bg-blue-100 rounded-full">
                        <FaUserPlus className="text-blue-600 text-2xl" />
                    </div>
                    <h1 className="mt-4 text-2xl font-bold text-gray-800 text-montserrat">Register</h1>
                    <p className="text-gray-500 text-sm">Create your account by filling the form below</p>
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
                        placeholder="Choose a username"
                        icon={<FaUser className="text-gray-400" />}
                    />

                    <InputField
                        label="Email"
                        id="email"
                        type="email"
                        errors={errors}
                        register={register}
                        required={true}
                        message="Email is required"
                        placeholder="Enter your email"
                        icon={<FaEnvelope className="text-gray-400" />}
                    />

                    <InputField
                        label="Password"
                        id="password"
                        type="password"
                        errors={errors}
                        register={register}
                        required={true}
                        message="Password is required"
                        placeholder="Create a password"
                        min={6}
                        icon={<FaLock className="text-gray-400" />}
                    />

                    <button
                        type="submit"
                        disabled={loader}
                        className={`bg-gradient-to-r from-green-500 to-blue-500 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${loader ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                    >
                        {loader ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <div className="text-center text-sm text-gray-600">
                    <p>
                        Already have an account?{' '}
                        <span
                            className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </span>
                    </p>
                </div>
            </div>

            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
            />
        </div>
    );
};

export default Register;
