package com.packersandmovers.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import com.packersandmovers.pojos.ShiftingType;
import java.util.Optional;

public interface ShiftingTypeDao extends JpaRepository<ShiftingType, Long> {
    Optional<ShiftingType> findByShiftingTypeName(String shiftingTypeName);
}
