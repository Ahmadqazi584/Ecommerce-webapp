import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

const ProductViewModel = ({ ProductModelDetails, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} as="div" className="relative z-50" onClose={onClose}>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-xl bg-white shadow-xl overflow-hidden">
            {/* Image */}
            <div className="mb-0">
              <img 
                src={ProductModelDetails.productImage} 
                alt={ProductModelDetails.productName} 
                className="w-full h-48 object-cover rounded-t-xl rounded-b-none"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <DialogTitle className="text-xl font-bold text-gray-900 mb-3">
                {ProductModelDetails.productName}
              </DialogTitle>

              {/* Price and Stock */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {ProductModelDetails.discount > 0 ? (
                    <>
                      <span className="text-gray-500 line-through">${ProductModelDetails.price.toFixed(2)}</span>
                      <span className="text-lg font-bold text-red-600">
                        ${ProductModelDetails.specialPrice.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-gray-900">
                      ${ProductModelDetails.price.toFixed(2)}
                    </span>
                  )}
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  ProductModelDetails.quantity > 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {ProductModelDetails.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <hr className="border-t border-gray-200 my-4" />

              <p className="text-gray-600 mb-6">
                {ProductModelDetails.description}
              </p>

              <div className="flex justify-end">
                <button
                  className="inline-flex items-center gap-2 rounded-md border border-gray-800 py-2 px-4 text-sm font-medium text-gray-800 hover:bg-gray-100 transition-colors"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductViewModel;