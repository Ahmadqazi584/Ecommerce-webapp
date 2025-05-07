import { Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaAddressBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AddressFormModal from './AddressFormModal';
import AddAddressForm from './AddAddressForm';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserAddress, showUserAddress } from '../../store/actions/authActions';
import { toast } from 'react-toastify';
import AddressCard from './AddressCard';

const AddressInfo = ({ address, setLocalSelectedAddress, localSelectedAddress }) => {
    const dispatch = useDispatch();
    const [openAddressModal, setOpenAddressModal] = useState(false);
    const noAddressFound = !address || address.length === 0;

    useEffect(() => {
        dispatch(showUserAddress(toast));
    }, [dispatch]);

    const handleSuccess = () => {
        dispatch(showUserAddress(toast));
        setLocalSelectedAddress(null);
    };

    return (
        <div className="flex justify-center mt-10">
            <div className="w-full max-w-md text-center">
                {noAddressFound ? (
                    <div className="flex flex-col items-center space-y-4">
                        <FaAddressBook className="text-5xl text-gray-400 mx-auto" />
                        <h2 className="text-2xl font-semibold">No Address Added Yet!</h2>
                        <p className="text-gray-500">Please add your address to continue purchasing</p>
                        <button
                            onClick={() => setOpenAddressModal(true)}
                            className="inline-flex items-center gap-2 px-4 py-2 text-customBlue rounded underline hover:scale-105 transition"
                        >
                            Add Your Address
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center space-y-4">
                        <FaAddressBook className="text-5xl text-blue-400 mx-auto" />
                        <h2 className="text-2xl font-semibold">Select Address</h2>
                        <p className="text-gray-500">Please select your address for the purchase</p>
                        <div className="w-full space-y-4 mt-4 flex flex-col items-center">
                            {Array.isArray(address) && address.map((addr) => (
                                <AddressCard
                                    key={addr.addressId}
                                    address={addr}
                                    setSelectAddress={setLocalSelectedAddress}
                                    setOpenAddressModal={setOpenAddressModal}
                                    selectAddress={localSelectedAddress}
                                />
                            ))}
                        </div>
                        <button
                            onClick={() => {
                                dispatch(selectUserAddress(null));
                                setLocalSelectedAddress(null);
                                setOpenAddressModal(true);
                            }}
                            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            Add New Address
                        </button>
                    </div>
                )}
            </div>

            <AddressFormModal open={openAddressModal} setOpen={setOpenAddressModal}>
                <AddAddressForm
                    setOpenAddressModal={setOpenAddressModal}
                    onSuccess={handleSuccess}
                />
            </AddressFormModal>
        </div>
    );
};

export default AddressInfo;