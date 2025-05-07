import React from 'react';
import { useDispatch } from 'react-redux';
import { decreaseCartQuantity, increaseCartQuantity } from '../../store/actions/cartActions';

const QuantityCounter = ({ item }) => {
    const dispatch = useDispatch();

    const onIncrease = () => {
        dispatch(increaseCartQuantity(item));
    };

    const onDecrease = () => {
        dispatch(decreaseCartQuantity(item));
    };

    return (
        <div className="flex justify-center items-center gap-2">
            <button
                className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                onClick={onDecrease}
            >
                -
            </button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button
                className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                onClick={onIncrease}
            >
                +
            </button>
        </div>
    );
};

export default QuantityCounter;
