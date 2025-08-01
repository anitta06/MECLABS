
package com.demo.hostel_management.controller;


import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.demo.hostel_management.entity.Hostel;
import com.demo.hostel_management.repository.IHostelRepository;
import com.demo.hostel_management.service.HostelService;

import java.nio.file.Paths;
import java.util.List;
import java.util.jar.Attributes.Name;


@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/hostels")
public class HostelController {

    private final HostelService hostelService;

    @GetMapping
    public ResponseEntity<List<Hostel>> getAllHostels() {
        try{
            List<Hostel> hostelList = hostelService.getAllHostels();
            return ResponseEntity.ok(hostelList);
        }catch (Exception e){
            log.error("Error fetching hostel list due to : {}",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PostMapping("/create")
    public ResponseEntity<Void> createHostel(@RequestBody Hostel hostel){
        try{
            hostelService.createHostel(hostel);
            return ResponseEntity.noContent().build(); // 204 No Content
        }catch(Exception e){
            log.error("Error occurred while creating hostel: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PutMapping("/update")
    public ResponseEntity<Hostel> updateHostel(@RequestBody Hostel hostel){
        try{
            // Check if the image URL is provided and update it
            Hostel updatedHostel = hostelService.updateHostel(hostel);
            return ResponseEntity.ok(updatedHostel); // 204 No Content
        }catch(Exception e){
            log.error("Error occurred while updating hostel: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteHostel(@PathVariable Long id) {
        try {
            hostelService.deleteHostel(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Hostel deleted successfully."); // 204 No Content
        } catch (EntityNotFoundException e) {
            log.error("Hostel not found for deletion: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 Not Found
        } catch (Exception e) {
            log.error("Error occurred while deleting hostel: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 500 Internal Server Error
        }
    }

        @GetMapping("/hostelbyname")
    public ResponseEntity<List<Hostel>> gethostelbyName(@RequestParam String hostelName) {
        try {
            List<Hostel> hostelList = hostelService.gethostelbyName(hostelName);
            return ResponseEntity.ok(hostelList);
        } catch (EntityNotFoundException e) {
            log.error("Unable to fetch the list of hostels {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 Not Found
        } catch (Exception e) {
            log.error("Error occurred while fetching hostels: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 500 Internal Server Error
        }
    }
  
    
}

