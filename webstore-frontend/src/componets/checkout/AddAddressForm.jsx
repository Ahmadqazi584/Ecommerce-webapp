import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaAddressCard } from 'react-icons/fa';
import InputField from '../shared/InputField';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addUpdateUserAddress } from '../../store/actions/authActions';

const AddAddressForm = ({ setOpenAddressModal, onSuccess }) => {
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const { user, selectedAddress } = useSelector(state => state.auth);

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onTouched',
        defaultValues: {}
    });

    // Reset form when selectedAddress changes
    useEffect(() => {
        reset(selectedAddress || {});
    }, [selectedAddress, reset, setOpenAddressModal]); 

    const onSaveAddressHandler = async (data) => {
        if (!user) {
            toast.error("Please login first");
            return;
        }

        setLoader(true);
        try {
            await dispatch(addUpdateUserAddress(
                selectedAddress ? { ...data, addressId: selectedAddress.addressId } : data,
                toast,
                setOpenAddressModal,
                reset
            ));
            onSuccess?.(); // Refresh the address list
        } catch (error) {
            console.error("Address save error:", error);
            // Error is already handled in the action, but you could add additional handling here if needed
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-lg">
                <div className="flex items-center justify-center space-x-3 py-3">
                    <div className="p-3 bg-blue-100 rounded-full">
                        <FaAddressCard className="text-blue-600 text-2xl" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 text-montserrat">
                        {selectedAddress ? 'Edit Address' : 'Add Address'}
                    </h1>
                </div>

                <form onSubmit={handleSubmit(onSaveAddressHandler)} className="space-y-4 px-6 pt-6 pb-8">
                    <InputField
                        label="Building Name"
                        id="buildingName"
                        type="text"
                        placeholder="Enter building name"
                        register={register}
                        required={true}
                        errors={errors}
                        message="Building name is required"
                    />
                    <InputField
                        label="Street"
                        id="street"
                        type="text"
                        placeholder="Enter street name"
                        register={register}
                        required={true}
                        errors={errors}
                        message="Street is required"
                    />
                    <InputField
                        label="City"
                        id="city"
                        type="text"
                        placeholder="Enter city"
                        register={register}
                        required={true}
                        errors={errors}
                        message="City is required"
                    />
                    <InputField
                        label="State"
                        id="state"
                        type="text"
                        placeholder="Enter state"
                        register={register}
                        required={true}
                        errors={errors}
                        message="State is required"
                    />
                    <InputField
                        label="Pincode"
                        id="pincode"
                        type="text"
                        placeholder="Enter pincode"
                        register={register}
                        required={true}
                        errors={errors}
                        message="Pincode is required"
                    />
                    <InputField
                        label="Country"
                        id="country"
                        type="text"
                        placeholder="Enter country"
                        register={register}
                        required={true}
                        errors={errors}
                        message="Country is required"
                    />

                    <button
                        type="submit"
                        disabled={loader}
                        className={`bg-blue-600 w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loader ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loader ? 'Saving...' : selectedAddress ? 'Update Address' : 'Save Address'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddAddressForm;