import { Avatar, Backdrop, Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { IoExitOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUserAction } from '../store/actions/authActions';
import ProfilePicIcon from '../assets/checkitprofile.png';


const UserMenu = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOutHandle = () => {
        handleClose();
        dispatch(logoutUserAction(navigate));
    };

    const menuItemBaseStyle = {
        px: 1, // reduce horizontal padding
        borderRadius: '5px', // slightly rounded
        gap: '8px',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
    };

    return (
        <div>
            <Button onClick={handleClick}>
                <Avatar
                    alt="user profile"
                    src={ProfilePicIcon}
                    className="border rounded"
                />
            </Button>

            {/* Backdrop */}
            <Backdrop
                open={open}
                onClick={handleClose}
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer - 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                }}
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    sx: {
                        p: 1, // outer padding for the menu list
                    },
                }}
                sx={{
                    '& .MuiPaper-root': {
                        minWidth: 180,
                    },
                }}
            >
                <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to="/profile"
                    sx={menuItemBaseStyle}
                >
                    <FaUser className="text-[16px]" />
                    <span>{user?.username}</span>
                </MenuItem>

                <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to="/profile/orders"
                    sx={menuItemBaseStyle}
                >
                    <FaShoppingCart className="text-[16px]" />
                    <span>Orders</span>
                </MenuItem>

                <MenuItem
                    onClick={logOutHandle}
                    component={Link}
                    to="/"
                    sx={{
                        ...menuItemBaseStyle,
                        background: 'linear-gradient(to right, #a855f7, #ec4899)',
                        color: 'white',
                        '& svg': { color: 'white' },
                        '&:hover': {
                            background: 'linear-gradient(to right, #9333ea, #db2777)',
                        },
                    }}
                >
                    <IoExitOutline className="text-[16px]" />
                    <span>Logout</span>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default UserMenu;
