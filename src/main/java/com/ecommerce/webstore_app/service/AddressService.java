package com.ecommerce.webstore_app.service;

import com.ecommerce.webstore_app.model.User;
import com.ecommerce.webstore_app.payload.AddressDTO;

import java.util.List;

public interface AddressService {
    AddressDTO insertAddress(AddressDTO addressDTO, User user);

    List<AddressDTO> getAllAddress();

    AddressDTO getAddressById(Long addressId);

    List<AddressDTO> getUserAddresses(User user);

    AddressDTO updateAddress(Long addressId, AddressDTO addressDTO);

    String deleteAddress(Long addressId);
}
