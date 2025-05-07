import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
  Grid
} from '@mui/material';
import {
  Email as EmailIcon,
  Badge as RoleIcon,
  Home as AddressIcon,
  Phone as PhoneIcon,
  Apartment as BuildingIcon,
  Signpost as StreetIcon,
  LocationCity as CityIcon,
  Map as StateIcon,
  Flag as CountryIcon,
  Pin as PincodeIcon
} from '@mui/icons-material';
import { showUserAddress } from '../store/actions/authActions';
import ProfilePicIcon from '../assets/checkitprofile.png';


const Profile = () => {
  const dispatch = useDispatch();
  const { user, address = [] } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(showUserAddress());
  }, [dispatch]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar 
            sx={{ width: 80, height: 80, mr: 3 }}
            src={ProfilePicIcon} // Path to user's profile image
            alt={user.username}
          >
            {!user.avatar && user.username?.charAt(0)?.toUpperCase()}
          </Avatar>
          <Typography variant="h4" component="h1">
            {user.username || 'User'}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <List>
          <ListItem>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Email" secondary="userexample@gmail.com" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <PhoneIcon />
            </ListItemIcon>
            <ListItemText primary="Phone" secondary="+92 331 040 6565" />
          </ListItem>

          {user.roles && (
            <ListItem>
              <ListItemIcon>
                <RoleIcon />
              </ListItemIcon>
              <ListItemText primary="Role" secondary={user.roles} />
            </ListItem>
          )}

          {address.length > 0 ? (
            address.map((addr, index) => (
              <React.Fragment key={`address-${index}`}>
                <ListItem sx={{ display: 'block', px: 0 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {index === 0 ? "Primary Address" : "Additional Address"}
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2">{addr.buildingName}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2">{addr.street}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2">{addr.city}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2">{addr.state}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2">{addr.country}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2">{addr.pincode}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </ListItem>
                {index < address.length - 1 && <Divider/>}
              </React.Fragment>
            ))
          ) : (
            <Alert severity="info">No address found</Alert>
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default Profile;