package com.ecommerce.webstore_app.service.impl;

import com.ecommerce.webstore_app.model.Address;
import com.ecommerce.webstore_app.model.User;
import com.ecommerce.webstore_app.payload.AddressDTO;
import com.ecommerce.webstore_app.repository.AddressRepository;
import com.ecommerce.webstore_app.security.utils.AuthUtils;
import com.ecommerce.webstore_app.service.AddressService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class AddressServiceImpl implements AddressService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AuthUtils authUtils;

    @Autowired
    private AddressRepository addressRepository;

    @Override
    public AddressDTO insertAddress(AddressDTO addressDTO, User user) {
        Address address = modelMapper.map(addressDTO, Address.class);
        List<Address> addressList = user.getAddresses();
        addressList.add(address);

        user.setAddresses(addressList);
        address.setUser(user);
        Address updatedAddress = addressRepository.save(address);

        return modelMapper.map(updatedAddress, AddressDTO.class);
    }

    @Override
    public List<AddressDTO> getAllAddress() {
        List<Address> addresses = addressRepository.findAll();

        List<AddressDTO> addressDTOS = new ArrayList<>();
        for (Address address : addresses){
            AddressDTO addressDTO = modelMapper.map(address, AddressDTO.class);
            addressDTOS.add(addressDTO);
        }

        return addressDTOS;
    }

    @Override
    public AddressDTO getAddressById(Long addressId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("The Address with id :: " + addressId + " not found!"));
        AddressDTO addressDTO = modelMapper.map(address, AddressDTO.class);
        return addressDTO;
    }

    @Override
    public List<AddressDTO> getUserAddresses(User user) {

        List<Address> addresses = user.getAddresses();

        List<AddressDTO> addressDTOS = new ArrayList<>();
        for (Address address : addresses) {
            AddressDTO addressDTO = modelMapper.map(address, AddressDTO.class);
            addressDTOS.add(addressDTO);
        }

        return addressDTOS;
    }

    @Override
    public AddressDTO updateAddress(Long addressId, AddressDTO addressDTO) {

        Address retrieveAddress = addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("The address with id :: " + addressId + " not exists!"));
        User user = retrieveAddress.getUser();
        Address address = modelMapper.map(addressDTO, Address.class);

        retrieveAddress.setAddressId(addressId);
        retrieveAddress.setUser(user);
        retrieveAddress.setCountry(address.getCountry());
        retrieveAddress.setState(address.getState());
        retrieveAddress.setCity(address.getCity());
        retrieveAddress.setPincode(address.getPincode());
        retrieveAddress.setStreet(address.getStreet());
        retrieveAddress.setBuildingName(address.getBuildingName());
        Address updatedAddress = addressRepository.save(retrieveAddress);

        return modelMapper.map(updatedAddress, AddressDTO.class);

    }

    @Override
    public String deleteAddress(Long addressId) {
        Address address = addressRepository.findById(addressId)
                        .orElseThrow(() -> new RuntimeException("The address id :: " + addressId + " doesn't not exists!"));
        addressRepository.delete(address);
        return "address deleted successfully!";
    }

}
