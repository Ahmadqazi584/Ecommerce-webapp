import { FaHome, FaGlobeAmericas, FaCity, FaRoad, FaMapMarkerAlt, FaHashtag, FaCheck, FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteUserAddress, selectUserAddress } from '../../store/actions/authActions';
import { toast } from 'react-toastify';

const AddressCard = ({ address, setSelectAddress, setOpenAddressModal, selectAddress }) => {
  const dispatch = useDispatch();
  const isSelected = selectAddress?.addressId === address?.addressId;

  const handleSelect = () => {
    setSelectAddress(address);
    dispatch(selectUserAddress(address));
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setSelectAddress(address);
    setOpenAddressModal(true);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      if (window.confirm("Are you sure you want to delete this address?")) {
        await dispatch(deleteUserAddress(selectAddress?.addressId, toast));
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div
      className={`border p-4 rounded-lg hover:shadow-md transition cursor-pointer w-96 relative 
        ${isSelected ? 'bg-green-50 border-green-300' : ''}`}
      onClick={handleSelect}
    >
      {/* Edit and Delete Icons */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button onClick={handleEdit} disabled={!isSelected}>
          <FaEdit className={`transition ${isSelected ? "text-yellow-500" : "text-gray-400"}`} size={14} />
        </button>
        <button onClick={handleDelete} disabled={!isSelected}>
          <FaTrash className={`transition ${isSelected ? "text-red-500" : "text-gray-400"}`} size={13} />
        </button>
      </div>

      {isSelected && (
        <div className="absolute top-2 left-2 text-green-500">
          <FaCheck />
        </div>
      )}

      <div className="ml-6">
        <div className="flex items-center gap-2 mb-2">
          <FaHome className="text-blue-500" />
          <span>{address.buildingName}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <FaRoad className="text-blue-500" />
          <span>{address.street}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <FaCity className="text-blue-500" />
          <span>{address.city}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <FaMapMarkerAlt className="text-blue-500" />
          <span>{address.state+ ", " + address.country }</span>
        </div>
        {/* <div className="flex items-center gap-2 mb-2">
          <FaGlobeAmericas className="text-blue-500" />
          <span>{address.country}</span>
        </div> */}
        <div className="flex items-center gap-2">
          <FaHashtag className="text-blue-500" />
          <span>{address.pincode}</span>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;