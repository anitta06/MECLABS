

package com.demo.hostel_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.hostel_management.entity.Hostel;

import java.util.List;

public interface IHostelRepository extends JpaRepository<Hostel, Long> {
    List<Hostel> findByHostelName(String hostelName);
    List<Hostel> findByType(String type);


}
