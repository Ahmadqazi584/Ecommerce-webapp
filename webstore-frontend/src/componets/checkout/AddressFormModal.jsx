import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close'; // <-- Added for 'X' icon

const AddressFormModal = ({ open, setOpen, children }) => {
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: 500,
        maxHeight: '80vh',
        overflowY: 'auto',
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 3,
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="address-modal-title"
            aria-describedby="address-modal-description"
        >
            <Box sx={style} position="relative">
                {/* ✨ Added close icon top-right */}
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'grey.500',
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <div id="address-modal-description">
                    {children}
                </div>
            </Box>
        </Modal>
    );
};

export default AddressFormModal;
