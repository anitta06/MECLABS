package com.demo.hostel_management.service;


import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.hostel_management.entity.Hostel;
import com.demo.hostel_management.repository.IHostelRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HostelService {  
    private final IHostelRepository hostelRepository;
    public List<Hostel> getAllHostels() {
        return hostelRepository.findAll();
    }

    public Hostel createHostel(Hostel hostel) {
        return hostelRepository.save(hostel);
    }

    public Hostel updateHostel(Hostel hostel) {
        if (hostelRepository.existsById(hostel.getId())) {
            // Fetch the existing hostel from the database
            Hostel existingHostel = hostelRepository.findById(hostel.getId()).get();

            // Update the details of the existing hostel with the details from the `hostel` parameter
            existingHostel.setHostelName(hostel.getHostelName());
            existingHostel.setAddress(hostel.getAddress());
            existingHostel.setType(hostel.getType());
            existingHostel.setContact(hostel.getContact());
            existingHostel.setRent(hostel.getRent());
            existingHostel.setImageUrl(hostel.getImageUrl());

           

            // Save the updated entity back to the database
            return hostelRepository.save(existingHostel);
        } else {
            throw new EntityNotFoundException("Hostel not found for ID: " + hostel.getId());
        }
    }
    public boolean deleteHostel(Long id) {
        if (hostelRepository.existsById(id)) {
            hostelRepository.deleteById(id);
            return true;
        } else {
            throw new EntityNotFoundException("Hostel not found for ID: " + id);
        }
    }

    public List<Hostel> gethostelbyName(String hostelName) {
        return hostelRepository.findByHostelName(hostelName);
    }

    
   


}

